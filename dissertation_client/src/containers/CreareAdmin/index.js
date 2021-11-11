import React, { useState } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSCEthereumVaccineSupplyChain from "../../web3/VaccineUserAttend";
import { NavHeader, NavCover } from "../../components";
import { localization } from "../../config/en";
import "../../assets/scss/_createprocess.scss";
import { TRANSACTION_STATUS, SERVER } from "../../constants/Config";
import { Link } from "react-router-dom";
import { Select } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const CreateAdmin = () => {
  const { t } = useTranslation();
  const { emtyValue } = localization.DistributorDashboard;
  const [userAddressValue, setuserAddressValue] = useState("");
  const [nameValue, setnameValue] = useState("");
  const [contactNoValue, setcontactNoValue] = useState("");
  const [roleValue, setroleValue] = useState("");
  const [isActiveValue, setisActiveValue] = useState(undefined);
  const [profileHashValue, setprofileHashValue] = useState("");

  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");

  const handleUserAddress = (text) => setuserAddressValue(text.target.value);
  const handleName = (text) => setnameValue(text.target.value);
  const handleContactNo = (text) => setcontactNoValue(text.target.value);
  const handleRole = (value) => setroleValue(value);
  const handleIsActive = (value) => {console.log(value)};
  const handleProfileHash = (text) => setprofileHashValue(text.target.value);


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
      const active = isActiveValue === 'true';
      const transaction =
        await vaccineSupplyChainContract.updateUserForAdmin(
          userAddressValue,
          nameValue,
          contactNoValue,
          roleValue,
          active,
          profileHashValue,
        );
      toast.info("Create user is pending!", {
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
          userAddress: userAddressValue,
          name: nameValue,
          contactNo: contactNoValue,
          role: roleValue,
          isActive: active,
          profileHash: profileHashValue,
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
          `${SERVER.baseURL}/user`,
          processData
        );

        setuserAddressValue("");
        setnameValue("");
        setcontactNoValue("");
        setroleValue("");
        setisActiveValue("");
        setprofileHashValue("");

        toast.success("Create User is Success!", {
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
                  {t("adminForm.userAddress")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={userAddressValue}
                  onChange={handleUserAddress}
                  placeholder={t("adminForm.userAddress")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("adminForm.name")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={nameValue}
                  onChange={handleName}
                  placeholder={t("adminForm.name")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("adminForm.contactNo")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={contactNoValue}
                  onChange={handleContactNo}
                  placeholder={t("adminForm.contactNo")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("adminForm.role")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("adminForm.role")}
                </label>
                <Select
                  id={t("adminForm.role")}
                  name={t("adminForm.role")}
                  autoComplete={t("adminForm.role")}
                  onChange={handleRole}
                  placeholder={t("adminForm.role")}
                >
                  <Option value={'PRODUCER'}>PRODUCER</Option>
                  <Option value={'WAREHOUSER'}>WAREHOUSER</Option>
                  <Option value={'DISTRIBUTOR'}>DISTRIBUTOR</Option>
                  <Option value={'VACCINATION_STATION'}>VACCINATION STATION</Option>
                  <Option value={'OBJECT_INJECTION'}>OBJECT INJECTION</Option>
                </Select>
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor={t("adminForm.isActive")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("adminForm.isActive")}
                </label>
                <Select
                  id={t("adminForm.isActive")}
                  name={t("adminForm.isActive")}
                  autoComplete={t("adminForm.isActive")}
                  onChange={handleIsActive}
                  placeholder={t("adminForm.isActive")}
                >
                  <Option value={'true'}>ACTIVE</Option>
                  <Option value={'false'}>DE-ACTIVE</Option>
                </Select>
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <label
                  htmlFor="default"
                  className="text-gray-700 select-none font-medium"
                >
                  {t("adminForm.profileHash")}
                </label>
                <input
                  id="default"
                  type="text"
                  name="default"
                  value={profileHashValue}
                  onChange={handleProfileHash}
                  placeholder={t("adminForm.profileHash")}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="create-process-btn_group">
                <button
                  className="create-process-btn_group__create font-bold"
                  onClick={() => updateDistributorData()}
                >
                  {t("adminForm.confirm")}
                </button>
                <Link
                  to="/warehouse"
                  className="create-process-btn_group__cancel font-bold"
                >
                  {t("adminForm.cancel")}
                </Link>
              </div>
            </div>
            <div className="create-process_right">
              <div className="create-process_right_contain">
                <p className="text-lg font-bold create-process_right_contain--title pb-2">
                  {t("preview")}
                </p>

                <p className="create-process_right_contain--subtitle pb-2">
                  {t("adminForm.userAddress")}{" "}
                  <strong>
                    {userAddressValue ? userAddressValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("adminForm.name")}{" "}
                  <strong>
                    {nameValue ? nameValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("adminForm.contactNo")}{" "}
                  <strong>
                    {contactNoValue ? contactNoValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("adminForm.role")}{" "}
                  <strong>
                    {roleValue ? roleValue : emtyValue}
                  </strong>
                </p>
                <p className="create-process_right_contain--subtitle pb-2">
                  {t("adminForm.profileHash")}{" "}
                  <strong>
                    {profileHashValue ? profileHashValue : emtyValue}
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

export default CreateAdmin;
