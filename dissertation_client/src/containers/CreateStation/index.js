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
import { Select } from "antd";
import Moralis from "moralis";
import { startMoralisServer } from "../../config/moralis";
const { Option } = Select;

const CreateStation = () => {
  const { t } = useTranslation();
  const { emtyValue } = localization.station;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [arrivalDateValue, setArrivalDateTimeValue] = useState("");
  const [vaccinationStationIdValue, setVaccinationStationIdValue] = useState(
    dayjs().unix()
  );
  const [shippingNameValue, setShippingNameValue] = useState("");
  const [shippingNoValue, setShippingNoValue] = useState("");
  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [distributorData, setDistributorData] = useState([]);

  useEffect(async () => {
    startMoralisServer();
    const getDistributorData = await axios.get(
      `${SERVER.baseURL}/general/distributor`
    );

    setDistributorData(getDistributorData.data);
  }, []);

  useEffect(async () => {
    if (batchNoValue && batchNoValue.length >= 42) {
      const getBatchNoDate = await axios.get(
        `${SERVER.baseURL}/distributor?keyword=${batchNoValue}`
      );
      if (getBatchNoDate?.data?.data && getBatchNoDate.data.data?.length) {
        const data = getBatchNoDate.data.data[0];
        const { shippingName, quantity, shippingNo } = data;
        setShippingNameValue(shippingName);
        setQuantityValue(quantity);
        setLocationAddress(shippingNo);
      }
    } else {
      setShippingNameValue("");
      setQuantityValue("");
      setLocationAddress("");
    }
  }, [batchNoValue]);

  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handleQuantity = (text) => setQuantityValue(text.target.value);
  const handleArrivalDate = (value) =>
    setArrivalDateTimeValue(dayjs(value).unix());
  const handleVaccinationStation = (text) =>
    setVaccinationStationIdValue(dayjs().unix());
  const handleShippingName = (value) => setShippingNameValue(value);
  const handleShippingNo = (value) => setShippingNoValue(dayjs().unix());
  const handleLocationAddress = (text) => setLocationAddress(text.target.value);

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
            autoClose: 2000,
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

  const updateVaccinationStation = async () => {
    // const newNumber = new BigNumber(arrivalDateValue);
    // console.log(newNumber);
    if (accounts) {
      const transaction =
        await vaccineSupplyChainContract.updateVaccinationStation(
          batchNoValue,
          quantityValue,
          arrivalDateValue,
          vaccinationStationIdValue,
          shippingNameValue,
          shippingNoValue,
          locationAddress
        );
      toast.info("Create process is pending!", {
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
          quantity: quantityValue,
          arrivalDateTime: arrivalDateValue,
          vaccinationStationId: vaccinationStationIdValue,
          shippingName: shippingNameValue,
          shippingNo: shippingNoValue,
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
          quantity: quantityValue,
          arrivalDateTime: arrivalDateValue,
          vaccinationStationId: vaccinationStationIdValue,
          shippingName: shippingNameValue,
          shippingNo: shippingNoValue,
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

        const metadataFile = new Moralis.File(`${tx?.blockNumber}.json`, {
          base64: btoa(JSON.stringify(object)),
        });
        await metadataFile.saveIPFS();

        const createProcess = axios.post(
          `${SERVER.baseURL}/vaccinationstation`,
          {...processData, ipfsLink: metadataFile.hash() }
        );

        setBatchNoValue("");
        setQuantityValue("");
        setArrivalDateTimeValue("");
        setVaccinationStationIdValue("");
        setShippingNameValue("");
        setShippingNoValue("");

        toast.success("Create station is Success!", {
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
          {t("stationForm.title")}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{t("stationForm.info")}</p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.batchNo")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={batchNoValue}
                  onChange={handleBatchNo}
                  placeholder={t("stationForm.batchNoHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.quantity")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={quantityValue}
                  onChange={handleQuantity}
                  placeholder={t("stationForm.quantityHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.arrivalDateTime")}
                </label>
                <DatePicker
                  onChange={handleArrivalDate}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={t("stationForm.arrivalDateTimeHolder")}
                />
              </div>

              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.vaccinationStationId")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={vaccinationStationIdValue}
                  onChange={handleVaccinationStation}
                  placeholder={t("stationForm.vaccinationStationIdHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div> */}
              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.shippingName")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={shippingNameValue}
                  onChange={handleShippingName}
                  placeholder={t("stationForm.shippingNameHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div> */}
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("stationForm.shippingName")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("stationForm.shippingName")}
                </label>
                <Select
                  id="countrya"
                  name="countrya"
                  autoComplete="country-namea"
                  // className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={shippingNameValue}
                  onChange={handleShippingName}
                  placeholder={t("stationForm.shippingNameHolder")}
                >
                  {distributorData?.map((item) => {
                    return <Option value={item.content}>{item.content}</Option>;
                  })}
                </Select>
              </div>
              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("stationForm.shippingName")}
                  className="block text-sm font-medium text-gray-700"
                >
                   {t("stationForm.shippingNo")}
                </label>
                <Select
                  id="countrya"
                  name="countrya"
                  autoComplete="country-namea"
                  // className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={shippingNoValue}
                  onChange={handleShippingNo}
                  placeholder={t("stationForm.shippingNoHolder")}
                >
                  {distributorData?.map((item) => {
                    return <Option value={"ASN - " + item.id}>ASN - {item.id}</Option>;
                  })}
                </Select>
              </div> */}
              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.shippingNo")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={shippingNoValue}
                  onChange={handleShippingNo}
                  placeholder={t("stationForm.shippingNoHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div> */}
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("stationForm.locationAddress")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={locationAddress}
                  onChange={handleLocationAddress}
                  placeholder={t("stationForm.locationAddressHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateVaccinationStation()}
                >
                  {t("stationForm.confirm")}
                </button>
                <Link
                  to="/"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {t("stationForm.cancel")}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {t("preview")}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.batchNo")}{" "}
                  <strong>{batchNoValue ? batchNoValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.quantity")}{" "}
                  <strong>{quantityValue ? quantityValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.arrivalDateTime")}{" "}
                  <strong>
                    {arrivalDateValue
                      ? dayjs(Number(arrivalDateValue) * 1000).format(
                          "DD-MM-YYYY"
                        )
                      : emtyValue}
                  </strong>
                </p>
                {/* <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.vaccinationStationId")}{" "}
                  <strong>
                    {vaccinationStationIdValue
                      ? vaccinationStationIdValue
                      : emtyValue}
                  </strong>
                </p> */}
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.shippingName")}{" "}
                  <strong>
                    {shippingNameValue ? shippingNameValue : emtyValue}
                  </strong>
                </p>
                {/* <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.shippingNo")}{" "}
                  <strong>
                    {shippingNoValue ? shippingNoValue : emtyValue}
                  </strong>
                </p> */}
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("stationForm.locationAddress")}{" "}
                  <strong>
                    {locationAddress ? locationAddress : emtyValue}
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

export default CreateStation;
