import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSCEthereumVaccineSupplyChain from "../../web3/VaccineSupplyChain";
import { NavHeader, NavCover } from "../../components";
import { localization } from "../../config/en";
import "../../assets/scss/_createprocess.scss";
import { SERVER } from "../../constants/Config";
import dayjs from "dayjs";

const TempDashboard = () => {
  const [accounts, setAccounts] = useState(undefined);
  const [tmpAccountUI, setTmpAccountUI] = useState("");
  const [vaccineSupplyChainContract, setVaccineSupplyChainContract] =
    useState(undefined);
  const [dataTemp, setDataTemp] = useState(null);
  useEffect(async () => {
    const data = await axios.get(`${SERVER.baseURL}/temperature`);
    console.log(data.data);
    setDataTemp(data.data);
  }, []);

  const onConnectWallet = async () => {
    const { vaccineSPSC } = await getSCEthereumVaccineSupplyChain();
    setVaccineSupplyChainContract(vaccineSPSC);
    console.log("ok");
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
  return (
    <React.Fragment>
      <NavCover />

      <div className="main">
        <NavHeader onConnect={() => onConnectWallet()} title={tmpAccountUI} />
        <div className="w-full flex justify-center gap-20 flex-wrap mt-8 bg-white p-8">
          {dataTemp && dataTemp.length
            ? dataTemp.map((item) => {
                return (
                  <div
                    className={`w-1/4 shadow-2xl p-8 rounded-lg  ${
                      item?.temperature > 35 ? "bg-red-700" : "bg-gray-900"
                    }`}
                    key={item?._id}
                  >
                    <p className="font-bold text-gray-50 text-lg text-center">
                      {item?.sensorName}
                    </p>
                    <p className="font-bold text-gray-50 text-md mt-2">
                      Nhiệt độ: {item?.temperature}
                    </p>
                    <p className="font-bold text-gray-50 text-md mt-2">
                      Độ ẩm: {item?.humidity}
                    </p>
                    <p className="font-bold text-gray-50 text-md mt-2">
                      Cập nhật vào ngày:{" "}
                      {dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TempDashboard;
