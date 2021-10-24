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
import BigNumber from "bignumber.js";

const CreateStation = () => {
  const {
    vaccinationStation,
    addStation,
    success,
    failure,
    newStation,
    createStation,
    batchNo,
    enterBatchNo,
    quantity,
    enterQuantity,
    arrivalDateTime,
    enterArrivalDateTime,
    vaccinationStationId,
    enterVaccinationStationId,
    shippingName,
    enterShippingName,
    shippingNo,
    enterShippingNo,
    preview,
    batchNoP,
    quantityP,
    arrivalDateTimeP,
    vaccinationStationIdP,
    shippingNameP,
    shippingNoP,
    createDistributor,
    cancel,
    emtyValue,
  } = localization.station;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [arrivalDateValue, setArrivalDateTimeValue] = useState("");
  const [vaccinationStationIdValue, setVaccinationStationIdValue] =
    useState("");
  const [shippingNameValue, setShippingNameValue] = useState("");
  const [shippingNoValue, setShippingNoValue] = useState("");
  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handleQuantity = (text) => setQuantityValue(text.target.value);
  const handleArrivalDate = (text) =>
    setArrivalDateTimeValue(text.target.value);
  const handleVaccinationStation = (text) =>
    setVaccinationStationIdValue(text.target.value);
  const handleShippingName = (text) => setShippingNameValue(text.target.value);
  const handleShippingNo = (text) => setShippingNoValue(text.target.value);

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
          shippingNoValue
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

        const createProcess = axios.post(
          `${SERVER.baseURL}/vaccinationstation`,
          processData
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
        <p className="main-title font-bold text-xl mt-8 mb-6">{newStation}</p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{createStation}</p>
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
                  {arrivalDateTime}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={arrivalDateValue}
                  onChange={handleArrivalDate}
                  placeholder={enterArrivalDateTime}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {vaccinationStationId}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={vaccinationStationIdValue}
                  onChange={handleVaccinationStation}
                  placeholder={enterVaccinationStationId}
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

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateVaccinationStation()}
                >
                  {createStation}
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
                  {quantityP}{" "}
                  <strong>{quantityValue ? quantityValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {arrivalDateTimeP}{" "}
                  <strong>
                    {arrivalDateValue ? arrivalDateValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {vaccinationStationIdP}{" "}
                  <strong>
                    {vaccinationStationIdValue ? vaccinationStationIdValue : emtyValue}
                  </strong>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateStation;
