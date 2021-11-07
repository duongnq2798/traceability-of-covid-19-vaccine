import React, { useState } from "react";
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

const CreateDistributor = () => {
  const { t } = useTranslation();
  const { emtyValue } = localization.DistributorDashboard;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [shippingNameValue, setShippingNameValue] = useState("");
  const [destinationAddress, setdestinationAddress] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [departureDateTimeValue, setDeparureDateValue] = useState("");
  const [estimateDateTimeValue, setEstimateDateTimeValue] = useState("");
  const [distributorIdValue, setDistributorValue] = useState("");
  const [optimumTemperatureValue, setOptimumTemperatureValue] = useState("");
  const [optimimHumidityValue, setOptimumHumidityValue] = useState("");

  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handleShippingName = (text) => setShippingNameValue(text.target.value);
  const handleShippingNo = (text) => setdestinationAddress(text.target.value);
  const handleQuantity = (text) => setQuantityValue(text.target.value);
  const handleDepartureDateTime = (value) =>
    setDeparureDateValue(dayjs(value).unix());
  const handleEstimateDateTime = (value) =>
    setEstimateDateTimeValue(dayjs(value).unix());
  const handleDistributorId = (text) => setDistributorValue(text.target.value);
  const handleOptimumTemperature = (text) =>
    setOptimumTemperatureValue(text.target.value);
  const handleOptimumHumidity = (text) =>
    setOptimumHumidityValue(text.target.value);

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

  const updateDistributorData = async () => {
    if (accounts) {
      const transaction =
        await vaccineSupplyChainContract.updateDistributorData(
          batchNoValue,
          destinationAddress,
          shippingNameValue,
          quantityValue,
          departureDateTimeValue,
          estimateDateTimeValue,
          optimumTemperatureValue,
          optimimHumidityValue
        );
      toast.info("Create distributor is pending!", {
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
          shippingName: shippingNameValue,
          shippingNo: destinationAddress,
          quantity: quantityValue,
          departureDateTime: departureDateTimeValue,
          estimateDateTime: estimateDateTimeValue,
          distributorId: distributorIdValue,
          optimumTemp: optimumTemperatureValue,
          optimumHum: optimimHumidityValue,
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

        console.log(processData);

        const createProcess = axios.post(
          `${SERVER.baseURL}/distributor`,
          processData
        );

        setBatchNoValue("");
        setShippingNameValue("");
        setdestinationAddress("");
        setQuantityValue("");
        setDeparureDateValue("");
        setEstimateDateTimeValue("");
        setDistributorValue("");
        setOptimumTemperatureValue("");
        setOptimumHumidityValue("");

        toast.success("Create distributor is Success!", {
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
      <ToastContainer />
      <NavCover />
      <div className="main">
        <NavHeader onConnect={() => onConnectWallet()} title={tmpAccountUI} />
        <p className="main-title font-bold text-xl mt-8 mb-6">
          {t("distributorForm.title")}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">
                {t("distributorForm.info")}
              </p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.batchNo")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={batchNoValue}
                  onChange={handleBatchNo}
                  placeholder={t("distributorForm.batchNoHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.shippingName")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={shippingNameValue}
                  onChange={handleShippingName}
                  placeholder={t("distributorForm.shippingNameHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.destinationAddress")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={destinationAddress}
                  onChange={handleShippingNo}
                  placeholder={t("distributorForm.destinationAddressHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.quantity")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={quantityValue}
                  onChange={handleQuantity}
                  placeholder={t("distributorForm.quantityHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.departureDateTime")}
                </label>
                <DatePicker
                  onChange={handleDepartureDateTime}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={t("distributorForm.departureDateTimeHolder")}
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.estimateDateTime")}
                </label>
                <DatePicker
                  onChange={handleEstimateDateTime}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={t("distributorForm.estimateDateTimeHolder")}
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.distributorId")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={distributorIdValue}
                  onChange={handleDistributorId}
                  placeholder={t("distributorForm.distributorIdHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.optimumTemp")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimumTemperatureValue}
                  onChange={handleOptimumTemperature}
                  placeholder={t("distributorForm.optimumTempHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("distributorForm.optimumHum")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimimHumidityValue}
                  onChange={handleOptimumHumidity}
                  placeholder={t("distributorForm.optimumHumHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateDistributorData()}
                >
                  {t("distributorForm.confirm")}
                </button>
                <Link
                  to="/warehouse"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {t("distributorForm.cancel")}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {t("preview")}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.batchNo")}{" "}
                  <strong>{batchNoValue ? batchNoValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.shippingName")}{" "}
                  <strong>
                    {shippingNameValue ? shippingNameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.destinationAddress")}{" "}
                  <strong>
                    {destinationAddress ? destinationAddress : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.quantity")}{" "}
                  <strong>{quantityValue ? quantityValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.departureDateTime")}{" "}
                  <strong>
                    {departureDateTimeValue
                      ? departureDateTimeValue
                      : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.estimateDateTime")}{" "}
                  <strong>
                    {estimateDateTimeValue ? estimateDateTimeValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.distributorId")}{" "}
                  <strong>
                    {distributorIdValue ? distributorIdValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.optimumTemp")}{" "}
                  <strong>
                    {optimumTemperatureValue
                      ? optimumTemperatureValue
                      : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("distributorForm.optimumHum")}{" "}
                  <strong>
                    {optimimHumidityValue ? optimimHumidityValue : emtyValue}
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

export default CreateDistributor;
