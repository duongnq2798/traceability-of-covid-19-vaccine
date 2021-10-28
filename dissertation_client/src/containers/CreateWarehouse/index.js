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
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const CreateWarehouse = () => {
  const {
    newConsignment,
    createWarehouse,
    batchNo,
    enterBatchNo,
    vaccineName,
    enterVaccineName,
    quantity,
    enterquantity,
    price,
    enterPrice,
    optimumTemperature,
    enterOptimumTemperature,
    optimumHumidity,
    enterOptimumHumidity,
    storageDate,
    preview,
    violation,
    cancel,
    batchNoP,
    optimumHumP,
    optimumTemperatureP,
    priceP,
    quantityP,
    storageDateP,
    vaccineNameP,
    violationP,
    emtyValue,
  } = localization.CreateConsignment;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [vaccineNameValue, setVaccineNameValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [priceValue, setPiceValue] = useState("");
  const [optimumTempValue, setOptimumTempValue] = useState("");
  const [optimumHumValue, setOptimumHumValue] = useState("");
  const [storageDateValue, setStorageDateValue] = useState();
  const [violationValue, setViolationValue] = useState("");

  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handleVaccineName = (value) => setVaccineNameValue(value);
  const handleQuantity = (text) => setQuantityValue(text.target.value);
  const handlePrice = (text) => setPiceValue(text.target.value);
  const handleOptimumTemp = (text) => setOptimumTempValue(text.target.value);
  const handleOptimumHum = (text) => setOptimumHumValue(text.target.value);
  const handleStorageDate = (value) =>
    setStorageDateValue(dayjs(value).format("YYYY-MM-DD"));
  const handleViolation = (value) => setViolationValue(value);
  const [producerData, setProducerData] = useState([]);

  useEffect(async () => {
    const getProducerData = await axios.get(`${SERVER.baseURL}/general/producer`);
    setProducerData(getProducerData.data);
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

  const updateWarehouser = async () => {
    if (accounts) {
      const isViolate = violationValue === "true";
      const transaction = await vaccineSupplyChainContract.updateWarehouser(
        batchNoValue,
        vaccineNameValue,
        quantityValue,
        priceValue,
        storageDateValue,
        optimumTempValue,
        optimumHumValue,
        isViolate
      );
      toast.info("Create consignment is pending!", {
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
          vaccineName: vaccineNameValue,
          quantity: quantityValue,
          price: priceValue,
          optimumTemp: optimumTempValue,
          optimumHum: optimumHumValue,
          storageDate: storageDateValue,
          isViolation: isViolate,
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
          `${SERVER.baseURL}/warehouse`,
          processData
        );

        setBatchNoValue("");
        setVaccineNameValue("");
        setQuantityValue("");
        setPiceValue("");
        setOptimumHumValue("");
        setOptimumTempValue("");
        setStorageDateValue("");
        setViolationValue("");

        toast.success("Create consignment is Success!", {
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
          {newConsignment}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">{createWarehouse}</p>
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
                  for={vaccineName}
                  class="block text-sm font-medium text-gray-700"
                >
                  {vaccineName}
                </label>
                <Select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={vaccineNameValue}
                  onChange={handleVaccineName}
                  placeholder={enterVaccineName}
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
                  placeholder={enterquantity}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {price}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={priceValue}
                  onChange={handlePrice}
                  placeholder={enterPrice}
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
                  value={optimumTempValue}
                  onChange={handleOptimumTemp}
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
                  value={optimumHumValue}
                  onChange={handleOptimumHum}
                  placeholder={enterOptimumHumidity}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {storageDate}
                </label>
                <DatePicker
                  onChange={handleStorageDate}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {violation}
                </label>
                <Select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={violationValue}
                  onChange={handleViolation}
                  placeholder={violation}
                >
                  <Option value={true}>{"Yes"}</Option>
                  <Option value={false}>{"No"}</Option>
                </Select>
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateWarehouser()}
                >
                  {createWarehouse}
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
                  {vaccineNameP}{" "}
                  <strong>
                    {vaccineNameValue ? vaccineNameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {quantityP}{" "}
                  <strong>{quantityValue ? quantityValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {priceP}{" "}
                  <strong>{priceValue ? priceValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {optimumTemperatureP}{" "}
                  <strong>
                    {optimumTempValue ? optimumTempValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {optimumHumP}{" "}
                  <strong>
                    {optimumHumValue ? optimumHumValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {storageDateP}{" "}
                  <strong>
                    {storageDateValue ? storageDateValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {violationP}{" "}
                  <strong>{violationValue ? 'Violation' : 'No violation'}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateWarehouse;
