import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSCEthereumVaccineSupplyChain from "../../web3/VaccineSupplyChain";
import { NavHeader, NavCover } from "../../components";
import { localization } from "../../config/en";
import "../../assets/scss/_createprocess.scss";
import { TRANSACTION_STATUS, SERVER } from "../../constants/Config";
import { Link } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

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

  const handleProducer = (text) => setProducerValue(text);
  const handleWarehouse = (text) => setWarehouseValue(text);
  const handleDistributor = (text) => setDistributorValue(text);
  const handleVaccinationStation = (text) =>
    setVaccinationStationValue(text.target.value);
  const handleTotalWeight = (text) => setTotalWeight(text.target.value);

  const [producerData, setProducerData] = useState([]);
  const [distributorData, setDistributorData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  
  useEffect(async () => {
    const getProducerData = await axios.get(`${SERVER.baseURL}/general/producer`);
    setProducerData(getProducerData.data);
    const getDistributorData = await axios.get(`${SERVER.baseURL}/general/distributor`);
    setDistributorData(getDistributorData.data);
    const getWarehouseData = await axios.get(`${SERVER.baseURL}/general/warehouse`);
    setWarehouseData(getWarehouseData.data);
  }, []);
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



  const addBasicDetails = async () => {
    if (accounts) {
      try {
        const transaction = await vaccineSupplyChainContract.addBasicDetails(
          producerValue,
          warehouseValue,
          distributorValue,
          vaccinationStationValue,
          totalWeight
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
            totalWeight: Number(totalWeight),
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
        <p className="main-title font-bold text-xl mt-8 mb-6">{newProcess}</p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{createProcessForm}</p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  for={producerName}
                  class="block text-sm font-medium text-gray-700"
                >
                  {producerName}
                </label>
                <Select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={producerValue}
                  onChange={handleProducer}
                  placeholder={enterProducerName}
                >
                  {
                    producerData.map((item) => {
                      return (
                      <Option value={item.content}>{item.content}</Option>
                      )
                    })
                  }
                </Select>
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <label
                  for={warehouse}
                  class="block text-sm font-medium text-gray-700"
                >
                  {warehouse}
                </label>
                <Select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={warehouseValue}
                  onChange={handleWarehouse}
                  placeholder={enterWarehouse}
                >
                  {
                    warehouseData.map((item) => {
                      return (
                      <Option value={item.content}>{item.content}</Option>
                      )
                    })
                  }
                </Select>
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <label
                  for={distributor}
                  class="block text-sm font-medium text-gray-700"
                >
                  {distributor}
                </label>
                <Select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={distributorValue}
                  onChange={handleDistributor}
                  placeholder={enterpriseDistributorName}
                >
                  {
                    distributorData.map((item) => {
                      return (
                      <Option value={item.content}>{item.content}</Option>
                      )
                    })
                  }
                </Select>
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
