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

const CreateProcess = () => {
  const {
    newProcess,
    createProcessForm,
    producerName,
    enterProducerName,
    warehouse,
    enterWarehouse,
    distributor,
    enterpriseDistributorName,
    vaccinationStation,
    enterVaccinationStation,
    createProcess,
    cancel,
    preview,
    producerNameP,
    warehouseNameP,
    distributorNameP,
    vaccinationStationNameP,
    weight,
    enterWeight,
    totalWeightNameP,
  } = localization.CreateProcess;
  const [producerValue, setProducerValue] = useState("");
  const [warehouseValue, setWarehouseValue] = useState("");
  const [distributorValue, setDistributorValue] = useState("");
  const [vaccinationStationValue, setVaccinationStationValue] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleProducer = (text) => setProducerValue(text.target.value);
  const handleWarehouse = (text) => setWarehouseValue(text.target.value);
  const handleDistributor = (text) => setDistributorValue(text.target.value);
  const handleVaccinationStation = (text) =>
    setVaccinationStationValue(text.target.value);
  const handleTotalWeight = (text) => setTotalWeight(text.target.value);

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
          toast.success('Connect Wallet Success!', {
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

  const addBasicDetails = async () => {
    if (accounts) {
      try {
        const transaction = await vaccineSupplyChainContract.addBasicDetails(
          producerValue,
          warehouseValue,
          distributorValue,
          vaccinationStationValue,
          100
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
            batchNo: event?.args[1],
            producer: producerValue,
            warehouse: warehouseValue,
            distributor: distributorValue,
            vaccinationStation: vaccinationStationValue,
            totalWeight: totalWeight,
            from: tx?.from,
            to: tx?.to,
            status: tx?.status,
            transactionHash: tx?.transactionHash,
            blockHash: tx?.blockHash || event?.blockHash,
            blockNumber: tx?.blockNumber || event?.blockNumber,
            confirmations: tx?.confirmations,
            byzantium: tx?.byzantium,
            transactionIndex: tx?.transactionIndex,
            contractAddress: event?.address,
          };

          const createProcess = axios.post(
            `${SERVER.baseURL}/process`,
            processData
          );

          setProducerValue("");
          setWarehouseValue("");
          setDistributorValue("");
          setVaccinationStationValue("");
          setTotalWeight("");
          toast.success("Create process is Success!", {
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
        toast.error("Create process is Error!", {
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
      toast.error('Please Connect Wallet!', {
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
        <p className="main-title font-bold text-xl mt-8 mb-6">{newProcess}</p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{createProcessForm}</p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {producerName}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={producerValue}
                  onChange={handleProducer}
                  placeholder={enterProducerName}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {warehouse}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={warehouseValue}
                  onChange={handleWarehouse}
                  placeholder={enterWarehouse}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {distributor}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={distributorValue}
                  onChange={handleDistributor}
                  placeholder={enterpriseDistributorName}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {vaccinationStation}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={vaccinationStationValue}
                  onChange={handleVaccinationStation}
                  placeholder={enterVaccinationStation}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {weight}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={totalWeight}
                  onChange={handleTotalWeight}
                  placeholder={enterWeight}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => addBasicDetails()}
                >
                  {createProcess}
                </button>
                <button className="create-process-btn_group__cancel font-bold">
                  {cancel}
                </button>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {preview}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {producerNameP} <strong>{producerValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {warehouseNameP} <strong>{warehouseValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {distributorNameP} <strong>{distributorValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {vaccinationStationNameP}{" "}
                  <strong>{vaccinationStationValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {totalWeightNameP} <strong>{totalWeight}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateProcess;
