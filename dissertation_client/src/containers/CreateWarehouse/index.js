import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { emtyValue } = localization.CreateConsignment;
  const [batchNoValue, setBatchNoValue] = useState("");
  const [vaccineNameValue, setVaccineNameValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [priceValue, setPiceValue] = useState("");
  const [optimumTempValue, setOptimumTempValue] = useState("");
  const [optimumHumValue, setOptimumHumValue] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [storageDateValue, setStorageDateValue] = useState();
  const [violationValue, setViolationValue] = useState("");

  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleLocationAddress = (text) => setLocationAddress(text.target.value);
  const handleBatchNo = (text) => setBatchNoValue(text.target.value);
  const handleVaccineName = (value) => setVaccineNameValue(value);
  const handleQuantity = (text) => setQuantityValue(text.target.value);
  const handlePrice = (text) => setPiceValue(text.target.value);
  const handleOptimumTemp = (text) => setOptimumTempValue(text.target.value);
  const handleOptimumHum = (text) => setOptimumHumValue(text.target.value);
  const handleStorageDate = (value) => setStorageDateValue(dayjs(value).unix());
  const handleViolation = (value) => setViolationValue(value);
  const [producerData, setProducerData] = useState([]);

  useEffect(async () => {
    const getProducerData = await axios.get(
      `${SERVER.baseURL}/general/producer`
    );
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
      console.log(
        batchNoValue,
        vaccineNameValue,
        quantityValue,
        priceValue,
        storageDateValue,
        optimumTempValue,
        optimumHumValue,
        isViolate
      );
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
          optimumRangeTemp: optimumTempValue,
          optimumRangeHum: optimumHumValue,
          locationAddress: locationAddress,
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
        setLocationAddress("");

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
          {t("warehouseForm.title")}
        </p>

        <div className="process-container">
          <div className="create-process">
            <div className="create-process_left">
              <p className="mb-6 font-bold text-xl ">
                {t("warehouseForm.info")}
              </p>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.batchNo")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={batchNoValue}
                  onChange={handleBatchNo}
                  placeholder={t("warehouseForm.batchNoHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("warehouseForm.vaccineName")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("warehouseForm.vaccineName")}
                </label>
                <Select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  // className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue={vaccineNameValue}
                  onChange={handleVaccineName}
                  placeholder={t("warehouseForm.vaccineName")}
                >
                  {producerData.map((item) => {
                    return <Option value={item.content}>{item.content}</Option>;
                  })}
                </Select>
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.quantity")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={quantityValue}
                  onChange={handleQuantity}
                  placeholder={t("warehouseForm.quantityHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.price")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={priceValue}
                  onChange={handlePrice}
                  placeholder={t("warehouseForm.priceHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.optimumTemp")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimumTempValue}
                  onChange={handleOptimumTemp}
                  placeholder={t("warehouseForm.optimumTempHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.optimumHum")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={optimumHumValue}
                  onChange={handleOptimumHum}
                  placeholder={t("warehouseForm.optimumHumHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.locationAddress")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={locationAddress}
                  onChange={handleLocationAddress}
                  placeholder={t("warehouseForm.locationAddressHolder")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.storageDate")}
                </label>
                <DatePicker
                  onChange={handleStorageDate}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder={t("warehouseForm.storageDateHolder")}
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("warehouseForm.violation")}
                </label>
                <Select
                  defaultValue={violationValue}
                  onChange={handleViolation}
                  placeholder={t("warehouseForm.violation")}
                >
                  <Option value={true}>{t("warehouseForm.yes")}</Option>
                  <Option value={false}>{t("warehouseForm.no")}</Option>
                </Select>
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateWarehouser()}
                >
                  {t("warehouseForm.confirm")}
                </button>
                <Link
                  to="/warehouse"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {t("warehouseForm.cancel")}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {t("preview")}
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.batchNo")}{" "}
                  <strong>{batchNoValue ? batchNoValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.vaccineName")}{" "}
                  <strong>
                    {vaccineNameValue ? vaccineNameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.quantity")}{" "}
                  <strong>{quantityValue ? quantityValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.price")}{" "}
                  <strong>{priceValue ? priceValue : emtyValue}</strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.optimumTemp")}{" "}
                  <strong>
                    {optimumTempValue ? optimumTempValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.optimumHum")}{" "}
                  <strong>
                    {optimumHumValue ? optimumHumValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.storageDate")}{" "}
                  <strong>
                    {storageDateValue ? storageDateValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("warehouseForm.violation")}{" "}
                  <strong>
                    {violationValue
                      ? t("warehouseForm.hasViolate")
                      : t("warehouseForm.noViolate")}
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

export default CreateWarehouse;
