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

const CreateDistributor = () => {
  const {
    distributor,
    newDistributor,
    addDistributor,
    createDistributor,
    batchNo,
    enterBatchNo,
    shippingName,
    enterShippingName,
    shippingNo,
    enterShippingNo,
    quantity,
    enterQuantity,
    departureDateTime,
    enterDepartureDateTime,
    estimateDateTime,
    enterEstimateDateTime,
    distributorId,
    enterDistributorId,
    optimumTemperature,
    enterOptimumTemperature,
    optimumHumidity,
    enterOptimumHumidity,
    cancel,
    preview,
    batchNoP,
    shippingNameP,
    shippingNoP,
    quantityP,
    departureDateTimeP,
    estimateDateTimeP,
    distributorIdP,
    optimumTemperatureP,
    optimumHumidityP,
    emtyValue,
  } = localization.DistributorDashboard;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [shippingNameValue, setShippingNameValue] = useState("");
  const [shippingNoValue, setShippingNoValue] = useState("");
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
  const handleShippingNo = (text) => setShippingNoValue(text.target.value);
  const handleQuantity = (text) => setQuantityValue(text.target.value);
  const handleDepartureDateTime = (text) =>
    setDeparureDateValue(text.target.value);
  const handleEstimateDateTime = (text) =>
    setEstimateDateTimeValue(text.target.value);
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
          shippingNameValue,
          shippingNoValue,
          quantityValue,
          departureDateTimeValue,
          estimateDateTimeValue,
          distributorIdValue,
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
          shippingNo: shippingNoValue,
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
        setShippingNoValue("");
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
          {newDistributor}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{createDistributor}</p>
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
                  {shippingName}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={shippingNameValue}
                  onChange={handleShippingName}
                  placeholder={enterShippingName}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {shippingNo}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={shippingNoValue}
                  onChange={handleShippingNo}
                  placeholder={enterShippingNo}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {quantity}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={quantityValue}
                  onChange={handleQuantity}
                  placeholder={enterQuantity}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {departureDateTime}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={departureDateTimeValue}
                  onChange={handleDepartureDateTime}
                  placeholder={enterDepartureDateTime}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {estimateDateTime}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={estimateDateTimeValue}
                  onChange={handleEstimateDateTime}
                  placeholder={enterEstimateDateTime}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {distributorId}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={distributorIdValue}
                  onChange={handleDistributorId}
                  placeholder={enterDistributorId}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {optimumTemperature}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimumTemperatureValue}
                  onChange={handleOptimumTemperature}
                  placeholder={enterOptimumTemperature}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {optimumHumidity}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimimHumidityValue}
                  onChange={handleOptimumHumidity}
                  placeholder={enterOptimumHumidity}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateDistributorData()}
                >
                  {createDistributor}
                </button>
                <Link
                  to="/warehouse"
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
                  {shippingNameP}{" "}
                  <strong>
                    {shippingNameValue ? shippingNameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {shippingNoP}{" "}
                  <strong>
                    {shippingNoValue ? shippingNoValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {quantityP}{" "}
                  <strong>{quantityValue ? quantityValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {departureDateTimeP}{" "}
                  <strong>
                    {departureDateTimeValue
                      ? departureDateTimeValue
                      : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {estimateDateTimeP}{" "}
                  <strong>
                    {estimateDateTimeValue ? estimateDateTimeValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {distributorIdP}{" "}
                  <strong>
                    {distributorIdValue ? distributorIdValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {optimumTemperatureP}{" "}
                  <strong>
                    {optimumTemperatureValue
                      ? optimumTemperatureValue
                      : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {optimumHumidityP}{" "}
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
