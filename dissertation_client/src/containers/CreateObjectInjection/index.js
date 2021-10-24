import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSCEthereumVaccineSupplyChain from "../../web3/VaccineSupplyChain";
import { NavHeader, NavCover } from "../../components";
import { localization } from "../../config/en";
import "../../assets/scss/_createprocess.scss";
import { TRANSACTION_STATUS, SERVER } from "../../constants/Config";
import { Link } from "react-router-dom";

const CreateObjectInjection = () => {
  const {
    newPerson,
    batchNo,
    enterBatchNo,
    personName,
    enterPersonName,
    age,
    enterAge,
    indetityCard,
    enterIndentityCard,
    numberOfVaccination,
    enterNumberOfVaccination,
    vaccinationDate,
    enterVaccinationDate,
    typeOfVaccine,
    enterTypeOfVaccine,
    createPerson,
    cancel,
    batchNoP,
    personNameP,
    ageP,
    indetityCardP,
    numberOfVaccineP,
    vaccinationDateP,
    typeOfVaccineP,
    emtyValue,
    preview
  } = localization.person;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [personNameValue, setPersonNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [identityCardValue, setIdentityCardValue] = useState("");
  const [numberOfVaccineValue, setNumberOfVaccine] = useState("");
  const [vaccinationDateValue, setVaccinationDateValue] = useState("");
  const [typeOfVaccineValue, setTypeOfVaccine] = useState("");
  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handlePersonName = (text) => setPersonNameValue(text.target.value);
  const handleAge = (text) => setAgeValue(text.target.value);
  const handleIdentityCard = (text) => setIdentityCardValue(text.target.value);
  const handleNumberOfVaccine = (text) => setNumberOfVaccine(text.target.value);
  const handleVaccinationDate = (text) =>
    setVaccinationDateValue(text.target.value);
  const handleTypeOfVaccine = (text) => setTypeOfVaccine(text.target.value);

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
    console.log(            batchNoValue,
      personNameValue,
      ageValue,
      identityCardValue,
      numberOfVaccineValue,
      vaccinationDateValue,
      typeOfVaccineValue)
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
            typeOfVaccineValue
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

          const createProcess = axios.post(
            `${SERVER.baseURL}/objectinjection`,
            processData
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
        <p className="main-title font-bold text-xl mt-8 mb-6">{newPerson}</p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{createPerson}</p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {batchNo}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={batchNoValue}
                  onChange={handleBatchNo}
                  placeholder={enterBatchNo}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {personName}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={personNameValue}
                  onChange={handlePersonName}
                  placeholder={enterPersonName}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {age}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={ageValue}
                  onChange={handleAge}
                  placeholder={enterAge}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {indetityCard}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={identityCardValue}
                  onChange={handleIdentityCard}
                  placeholder={enterIndentityCard}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {numberOfVaccination}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={numberOfVaccineValue}
                  onChange={handleNumberOfVaccine}
                  placeholder={enterNumberOfVaccination}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {vaccinationDate}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={vaccinationDateValue}
                  onChange={handleVaccinationDate}
                  placeholder={enterVaccinationDate}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {typeOfVaccine}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={typeOfVaccineValue}
                  onChange={handleTypeOfVaccine}
                  placeholder={enterTypeOfVaccine}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateVaccinatePerson()}
                >
                  {createPerson}
                </button>
                <Link
                  to="/"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {cancel}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {preview}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {batchNoP}{" "}
                  <strong>{batchNoValue ? batchNoValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {personNameP}{" "}
                  <strong>
                    {personNameValue ? personNameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {ageP} <strong>{ageValue ? ageValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {indetityCardP}{" "}
                  <strong>
                    {identityCardValue ? identityCardValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {numberOfVaccineP}{" "}
                  <strong>
                    {numberOfVaccineValue ? numberOfVaccineValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {vaccinationDateP}{" "}
                  <strong>
                    {vaccinationDateValue ? vaccinationDateValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {typeOfVaccineP}{" "}
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
