import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSCEthereumVaccineSupplyChain from "../../web3/VaccineSupplyChain";
import { NavHeader, NavCover } from "../../components";
import { localization } from "../../config/en";
import "../../assets/scss/_createprocess.scss";
import { TRANSACTION_STATUS, SERVER } from "../../constants/Config";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Moralis from "moralis";
import { startMoralisServer } from "../../config/moralis";

const CreateObjectInjection = () => {
  const { t } = useTranslation();
  const { emtyValue } = localization.person;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [personNameValue, setPersonNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [identityCardValue, setIdentityCardValue] = useState("");
  const [numberOfVaccineValue, setNumberOfVaccine] = useState("");
  const [vaccinationDateValue, setVaccinationDateValue] = useState("");
  const [typeOfVaccineValue, setTypeOfVaccine] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handlePersonName = (text) => setPersonNameValue(text.target.value);
  const handleAge = (text) => setAgeValue(text.target.value);
  const handleIdentityCard = (text) => setIdentityCardValue(text.target.value);
  const handleNumberOfVaccine = (text) => setNumberOfVaccine(text.target.value);
  const handlePhoneNumber = (text) => setPhoneNumberValue(text.target.value);
  const handleVaccinationDate = (value) =>
    setVaccinationDateValue(dayjs(value).unix());
  const handleTypeOfVaccine = (text) => setTypeOfVaccine(text.target.value);

  useEffect(async () => {
    startMoralisServer();
    if (batchNoValue && batchNoValue.length >= 42) {
      const getBatchNoDate = await axios.get(
        `${SERVER.baseURL}/process?keyword=${batchNoValue}`
      );
      if (getBatchNoDate?.data?.data && getBatchNoDate.data.data?.length) {
        const data = getBatchNoDate.data.data[0];
        const { producer } = data;
        setTypeOfVaccine(producer);
      }
    } else {
      setTypeOfVaccine("");
    }
  }, [batchNoValue]);

  const onConnectWallet = async () => {
    const { vaccineSPSC } = await getSCEthereumVaccineSupplyChain();
    setVaccineSupplyChainContract(vaccineSPSC);

    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (account && account[0]) {
          setAccounts(account[0]);
          let user = Moralis.User.current();

          if (!user) {
            Moralis.authenticate({ signingMessage: "Log in using Moralis" });
          }
          const str = `${account[0]}`;
          const subStr1 = account[0].substring(0, 5);
          const subStr2 = account[0].substring(str.length - 4);
          setTmpAccountUI(subStr1 + "..." + subStr2);
          toast.success("Connect Wallet Success!", {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (err) {
        if (err.code === 4001) {
        }
      }
    }
  };

  const updateVaccinatePerson = async () => {
    console.log(
      batchNoValue,
      personNameValue,
      ageValue,
      identityCardValue,
      numberOfVaccineValue,
      vaccinationDateValue,
      typeOfVaccineValue
    );
    if (accounts) {
      try {
        const transaction =
          await vaccineSupplyChainContract.updateVaccinatePerson(
            batchNoValue,
            personNameValue,
            ageValue,
            identityCardValue,
            numberOfVaccineValue,
            vaccinationDateValue,
            typeOfVaccineValue,
            phoneNumberValue
          );
        toast.info("Create Object Injection is pending!", {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let tx = await transaction.wait();
        let event = tx.events[0];

        if (tx.status === TRANSACTION_STATUS.SUCCESS) {
          // CALL API STORE DATA AGAIN
          const processData = {
            batchNo: batchNoValue,
            personName: personNameValue,
            age: ageValue,
            identityCard: identityCardValue,
            numberOfVaccinations: numberOfVaccineValue,
            vaccinationDate: vaccinationDateValue,
            typeOfVaccine: typeOfVaccineValue,
            from: tx?.from,
            to: tx?.to,
            status: Number(tx?.status),
            transactionHash: tx?.transactionHash,
            blockHash: tx?.blockHash || event?.blockHash,
            blockNumber: `${tx?.blockNumber}` || `${event?.blockNumber}`,
            confirmations: Number(tx?.confirmations),
            byzantium: Number(tx?.byzantium),
            transactionIndex: Number(tx?.transactionIndex),
            contractAddress: event?.address,
          };

          const object = {
            batchNo: batchNoValue,
            personName: personNameValue,
            age: ageValue,
            identityCard: identityCardValue,
            numberOfVaccinations: numberOfVaccineValue,
            vaccinationDate: vaccinationDateValue,
            typeOfVaccine: typeOfVaccineValue,
            from: tx?.from,
            to: tx?.to,
            status: Number(tx?.status),
            transactionHash: tx?.transactionHash,
            blockHash: tx?.blockHash || event?.blockHash,
            blockNumber: `${tx?.blockNumber}` || `${event?.blockNumber}`,
            confirmations: Number(tx?.confirmations),
            byzantium: Number(tx?.byzantium),
            transactionIndex: Number(tx?.transactionIndex),
            contractAddress: event?.address,
          };
          let objJsonStr = JSON.stringify(object);
          let objJsonB64 = Buffer.from(objJsonStr).toString("base64");


          const metadataFile = new Moralis.File(`${tx?.blockNumber}.json`, {
            base64: objJsonB64,
          });
          await metadataFile.saveIPFS();

          const createProcess = axios.post(
            `${SERVER.baseURL}/objectinjection`,
            { ...processData, ipfsLink: metadataFile.hash() }
          );

          setBatchNoValue("");
          setPersonNameValue("");
          setAgeValue("");
          setIdentityCardValue("");
          setNumberOfVaccine("");
          setVaccinationDateValue("");
          setTypeOfVaccine("");

          toast.success("Create Object Injection is Success!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return createProcess;
        }
      } catch (error) {
        toast.error("Create Object Injection is Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please Connect Wallet!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <NavCover />
      <div className="main">
        <NavHeader onConnect={() => onConnectWallet()} title={tmpAccountUI} />
        <p className="main-title font-bold text-xl mt-8 mb-6">
          {t("objectForm.title")}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{t("objectForm.info")}</p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.batchNo")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={batchNoValue}
                  onChange={handleBatchNo}
                  placeholder={t("objectForm.batchNoHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.personName")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={personNameValue}
                  onChange={handlePersonName}
                  placeholder={t("objectForm.personNameHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.age")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={ageValue}
                  onChange={handleAge}
                  placeholder={t("objectForm.ageHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.indetityCard")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={identityCardValue}
                  onChange={handleIdentityCard}
                  placeholder={t("objectForm.identityCardHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.phoneNumber")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={phoneNumberValue}
                  onChange={handlePhoneNumber}
                  placeholder={t("objectForm.phoneNumber")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.numberOfVaccination")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={numberOfVaccineValue}
                  onChange={handleNumberOfVaccine}
                  placeholder={t("objectForm.numberOfVaccinationHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.vaccineDate")}
                </label>
                <DatePicker
                  onChange={handleVaccinationDate}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={t("objectForm.vaccineDateHolder")}
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("objectForm.typeOfVaccine")}
                </label>
                <input
                  disabled={typeOfVaccineValue ? true : false}
                  id="default"
                  type="text"
                  name="default"
                  value={typeOfVaccineValue}
                  onChange={handleTypeOfVaccine}
                  placeholder={t("objectForm.typeOfVaccineHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateVaccinatePerson()}
                >
                  {t("objectForm.confirm")}
                </button>
                <Link
                  to="/"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {t("objectForm.cancel")}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {t("preview")}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.batchNo")}{" "}
                  <strong>{batchNoValue ? batchNoValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.personName")}{" "}
                  <strong>
                    {personNameValue ? personNameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.age")}{" "}
                  <strong>{ageValue ? ageValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.indetityCard")}{" "}
                  <strong>
                    {identityCardValue ? identityCardValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.phoneNumber")}{" "}
                  <strong>
                    {phoneNumberValue ? phoneNumberValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.numberOfVaccination")}{" "}
                  <strong>
                    {numberOfVaccineValue ? numberOfVaccineValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.vaccineDate")}{" "}
                  <strong>
                    {vaccinationDateValue ? vaccinationDateValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("objectForm.typeOfVaccine")}{" "}
                  <strong>
                    {typeOfVaccineValue ? typeOfVaccineValue : emtyValue}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateObjectInjection;
