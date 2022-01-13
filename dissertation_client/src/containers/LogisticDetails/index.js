import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavCover, NavHeader } from "../../components";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import QRCode from "react-qr-code";
import {Stepper} from '../../components'

const LogisticDetails = () => {
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/details/${text}`;
  let { id } = useParams();

  const [dataSearch, setDataSearch] = useState();

  useEffect(async () => {
    const data = await axios.get(`${SERVER.baseURL}/process?keyword=${id}`);
    setDataSearch(data.data.data[0]);
  });

  return (
    <React.Fragment>
      <NavCover />
      <div className="main">
        <NavHeader
          onChange={onChangeText}
          value={text}
          onResetText={onResetText}
          onSearch={onSearch}
        />
        <Stepper batchNo={id}/>
        {!dataSearch ? (
          <div className="mt-8 ml-4">
            <h2 className="font-bold text-xl">Search not found: "0 result"</h2>
          </div>
        ) : (
          <div className="flex justify-between ">
            <div className="bg-gray-50 w-3/5 mt-8 ml-4 rounded p-5 mb-80">
              <div className="flex justify-between bg-gray-300 rounded p-4">
                <p className="font-bold text-gray-700">General Information</p>
                <p className="font-bold text-gray-700">#Check</p>
              </div>
              {/* Logistics */}
              {dataSearch?.producer ? (
                <div className="flex justify-between  rounded p-4 ">
                  <p className="font-bold text-gray-700">Producer</p>
                  <p className="font-bold text-gray-700">
                    {dataSearch?.producer}
                  </p>
                </div>
              ) : null}

              {/* {dataSearch?.warehouse ? (
                <div className="flex justify-between  rounded p-4 ">
                  <p className="font-bold text-gray-700">Warehouse</p>
                  <p className="font-bold text-gray-700">
                    {dataSearch?.warehouse}
                  </p>
                </div>
              ) : null} */}

              {/* {dataSearch?.distributor ? (
                <div className="flex justify-between  rounded p-4 ">
                  <p className="font-bold text-gray-700">Distributor</p>
                  <p className="font-bold text-gray-700">
                    {dataSearch?.distributor}
                  </p>
                </div>
              ) : null} */}

              {/* {dataSearch?.vaccinationStation ? (
                <div className="flex justify-between  rounded p-4 ">
                  <p className="font-bold text-gray-700">Vaccination Station</p>
                  <p className="font-bold text-gray-700">
                    {dataSearch?.vaccinationStation}
                  </p>
                </div>
              ) : null} */}

              {dataSearch?.totalWeight ? (
                <div className="flex justify-between  rounded p-4 ">
                  <p className="font-bold text-gray-700">Weight of shipment</p>
                  <p className="font-bold text-gray-700">
                    {dataSearch?.totalWeight}
                  </p>
                </div>
              ) : null}

              <div className="flex justify-between bg-gray-300 rounded p-4">
                <p className="font-bold text-gray-700">General Information</p>
                <p className="font-bold text-gray-700">#Tx</p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Batch no</p>
                <p className="font-bold text-gray-700">{dataSearch?.batchNo}</p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Contract address</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.contractAddress}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">From</p>
                <p className="font-bold text-gray-700">{dataSearch?.from}</p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">To</p>
                <p className="font-bold text-gray-700">{dataSearch?.to}</p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Status</p>
                <p className="font-bold text-gray-700">{dataSearch?.status}</p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Next Action</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.nextAcction}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Transaction Hash</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.transactionHash}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Block hash</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.blockHash}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Block number</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.blockNumber}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Confirmation</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.confirmations}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Byzantium</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.byzantium}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Transaction Index</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.transactionIndex}
                </p>
              </div>

              <div className="flex justify-between  rounded p-4 ">
                <p className="font-bold text-gray-700">Created at</p>
                <p className="font-bold text-gray-700">
                  {dataSearch?.createdAt}
                </p>
              </div>
            </div>

            <div className="w-2/5 h-80 flex justify-center items-center bg-gray-50 rounded mt-8 ml-4 rounded p-5 mb-80 mr-16 ">
              {/* <QRCode
                value={`https://testnet.bscscan.com/tx/${dataSearch?.transactionHash}`}
              /> */}
              <QRCode
                value={`https://traceability-dapps.vercel.app/qrcode-view/${dataSearch?.ipfsLink}`}
              />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LogisticDetails;
