import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import { startMoralisServer } from "../../config/moralis";
import Moralis from "moralis";
const { Option } = Select;

const CreateProcess = () => {
  const { enterpriseDistributorName } = localization.CreateProcess;
  const { t } = useTranslation();
  const [producerValue, setProducerValue] = useState("");
  const [warehouseValue, setWarehouseValue] = useState("");
  const [distributorValue, setDistributorValue] = useState("");
  const [vaccinationStationValue, setVaccinationStationValue] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [optimumRangeTemp, setOptimumRangeTemp] = useState("");
  const [optimumRangeHum, setOptimumRangeHum] = useState("");
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
  const handleTempRange = (text) => setOptimumRangeTemp(text.target.value);
  const handleHumRange = (text) => setOptimumRangeHum(text.target.value);

  const [producerData, setProducerData] = useState([]);
  const [distributorData, setDistributorData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);

  useEffect(async () => {
    startMoralisServer();
    const getProducerData = await axios.get(
      `${SERVER.baseURL}/general/producer`
    );
    setProducerData(getProducerData.data);
    const getDistributorData = await axios.get(
      `${SERVER.baseURL}/general/distributor`
    );
    setDistributorData(getDistributorData.data);
    const getWarehouseData = await axios.get(
      `${SERVER.baseURL}/general/warehouse`
    );
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

  const addBasicDetails = async () => {
    if (accounts) {
      try {
        const transaction = await vaccineSupplyChainContract.addBasicDetails(
          producerValue,
          totalWeight,
          optimumRangeTemp,
          optimumRangeHum
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
            // warehouse: warehouseValue,
            // distributor: distributorValue,
            // vaccinationStation: vaccinationStationValue,
            totalWeight: Number(totalWeight),
            optimumRangeTemp: optimumRangeTemp,
            optimumRangeHum: optimumRangeHum,
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
            batchNo: event?.args[1],
            producer: producerValue,
            totalWeight: Number(totalWeight),
            optimumRangeTemp: optimumRangeTemp,
            optimumRangeHum: optimumRangeHum,
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
          const createProcess = axios.post(`${SERVER.baseURL}/process`, {
            ...processData,
            ipfsLink: metadataFile.hash(),
          });

          setProducerValue("");
          // setWarehouseValue("");
          // setDistributorValue("");
          // setVaccinationStationValue("");
          setTotalWeight("");
          setOptimumRangeHum("");
          setOptimumRangeTemp("");
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
        <p className="main-title font-bold text-xl mt-8 mb-6">
          {t("producerDetails.title")}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">
                {t("producerDetails.info")}
              </p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("producerDetails.producer")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("producerDetails.producer")}
                </label>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  defaultValue={producerValue}
                  onChange={handleProducer}
                >
                  {producerData.map((item) => {
                    return <Option value={item.content}>{item.content}</Option>;
                  })}
                </Select>
              </div>

              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("producerDetails.warehouse")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("producerDetails.warehouse")}
                </label>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  defaultValue={warehouseValue}
                  onChange={handleWarehouse}
                >
                  {warehouseData.map((item) => {
                    return <Option value={item.content}>{item.content}</Option>;
                  })}
                </Select>
              </div> */}

              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("producerDetails.distributor")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("producerDetails.distributor")}
                </label>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  // className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={distributorValue}
                  onChange={handleDistributor}
                  placeholder={enterpriseDistributorName}
                >
                  {distributorData.map((item) => {
                    return <Option value={item.content}>{item.content}</Option>;
                  })}
                </Select>
              </div> */}

              {/* <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("producerDetails.vaccinationStation")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={vaccinationStationValue}
                  onChange={handleVaccinationStation}
                  placeholder={t("producerDetails.vaccinationStation")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div> */}
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("producerDetails.quantity")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={totalWeight}
                  onChange={handleTotalWeight}
                  placeholder={t("producerDetails.quantityHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("producerDetails.optimumRangeTemp")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimumRangeTemp}
                  onChange={handleTempRange}
                  placeholder={t("producerDetails.rangeTempHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("producerDetails.optimumRangeHum")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimumRangeHum}
                  onChange={handleHumRange}
                  placeholder={t("producerDetails.rangeHumHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => addBasicDetails()}
                >
                  {t("producerDetails.confirm")}
                </button>
                <Link
                  to="/"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {t("producerDetails.cancel")}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {t("preview")}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.producer")}:{" "}
                  <strong>{producerValue}</strong>
                </p>
                {/* <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.warehouse")}:{" "}
                  <strong>{warehouseValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.distributor")}:{" "}
                  <strong>{distributorValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.vaccinationStation")} :
                  <strong>{vaccinationStationValue}</strong>
                </p> */}
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.quantity")}:{" "}
                  <strong>{totalWeight}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.optimumRangeTemp")}:{" "}
                  <strong>{optimumRangeTemp}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("producerDetails.optimumRangeHum")}:{" "}
                  <strong>{optimumRangeHum}</strong>
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
