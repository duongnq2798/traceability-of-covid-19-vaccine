import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import QRCode from "react-qr-code";

const QRCodeView = () => {
  const [data, setData] = useState();
  const [isShowQRCode, setIsShowQRCode] = useState(false);
  const onShow = () => setIsShowQRCode(!isShowQRCode)
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://ipfs.moralis.io:2053/ipfs/${id}`)
      .then(function (response) {
        setData(response.data);
      });
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center mx-auto max-w-3xl h-full shadow-xl px-2 py-4 rounded-md mt-4 bg-white">
        <h1 className="text-center text-xl font-extrabold text-xl uppercase text-blue-600">
          Nội Dung Thông tin
        </h1>
        {data && data.batchNo && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Số lô hàng:</div>
            <div className="text-gray-600 font-bold">{data?.batchNo}</div>
          </div>
        )}
        {data && data.contractAddress && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Số hợp đồng:</div>
            <div className="text-gray-600 font-bold">
              {data?.contractAddress}
            </div>
          </div>
        )}
        {data && data.producer && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Nhà sản xuất:</div>
            <div className="text-gray-600 font-bold">{data?.producer}</div>
          </div>
        )}
        {data && data.totalWeight && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Số lượng:</div>
            <div className="text-gray-600 font-bold">{data?.totalWeight}</div>
          </div>
        )}
        {data && data.optimumRangeHum && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Độ ẩm tối ưu</div>
            <div className="text-gray-600 font-bold">
              {data?.optimumRangeHum}
            </div>
          </div>
        )}
        {data && data.optimumRangeTemp && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Nhiệt độ tối ưu</div>
            <div className="text-gray-600 font-bold">
              {data?.optimumRangeTemp}
            </div>
          </div>
        )}
        {data && data.personName && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Họ và tên</div>
            <div className="text-gray-600 font-bold">{data?.personName}</div>
          </div>
        )}
        {data && data.age && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Tuổi</div>
            <div className="text-gray-600 font-bold">{data?.age}</div>
          </div>
        )}
        {data && data.identityCard && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">CMND</div>
            <div className="text-gray-600 font-bold">{data?.identityCard}</div>
          </div>
        )}
        {data && data.numberOfVaccinations && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Số liều</div>
            <div className="text-gray-600 font-bold">
              {data?.numberOfVaccinations}
            </div>
          </div>
        )}
        {data && data.vaccinationDate && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Ngày tiêm</div>
            <div className="text-gray-600 font-bold">
              {dayjs(data?.vaccinationDate * 1000).format("YYYY-MM-DD")}
            </div>
          </div>
        )}
        {data && data.typeOfVaccine && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Loại</div>
            <div className="text-gray-600 font-bold">{data?.typeOfVaccine}</div>
          </div>
        )}

        {data && data.phoneNumber && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Số điện thoại</div>
            <div className="text-gray-600 font-bold">{data?.phoneNumber}</div>
          </div>
        )}
        {data && data.quantity && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Số lượng</div>
            <div className="text-gray-600 font-bold">{data?.quantity}</div>
          </div>
        )}
        {data && data.arrivalDateTime && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Ngày đến</div>
            <div className="text-gray-600 font-bold">
              {dayjs(data?.arrivalDateTime * 1000).format("YYYY-MM-DD")}
            </div>
          </div>
        )}
        {data && data.shippingName && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">
              Đơn vị phân phối
            </div>
            <div className="text-gray-600 font-bold">{data?.shippingName}</div>
          </div>
        )}
        {data && data.shippingNo && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">
              Mã nhà phân phối
            </div>
            <div className="text-gray-600 font-bold">{data?.shippingNo}</div>
          </div>
        )}
        {data && data.vaccineName && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Tên vắc xin</div>
            <div className="text-gray-600 font-bold">{data?.vaccineName}</div>
          </div>
        )}
        {data && data.storageDate && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Ngày nhập kho</div>
            <div className="text-gray-600 font-bold">
              {dayjs(data?.storageDate * 1000).format("YYYY-MM-DD")}
            </div>
          </div>
        )}
        {data && data.locationAddress && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Địa chỉ kho</div>
            <div className="text-gray-600 font-bold">
              {data?.locationAddress}
            </div>
          </div>
        )}
        {data && data.departureDateTime && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">
              Ngày giờ khởi hành
            </div>
            <div className="text-gray-600 font-bold">
              {dayjs(data?.departureDateTime * 1000).format("DD-MM-YYYY")}
            </div>
          </div>
        )}
        {data && data.estimateDateTime && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">
              Thời gian ước lượng
            </div>
            <div className="text-gray-600 font-bold">
              {dayjs(data?.estimateDateTime * 1000).format("DD-MM-YYYY")}
            </div>
          </div>
        )}
        {data && data.distributorI && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">
              Mã nhà phân phối
            </div>
            <div className="text-gray-600 font-bold">{data?.distributorId}</div>
          </div>
        )}
        {data && data.optimumTemp && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Nhiệt độ tối ưu</div>
            <div className="text-gray-600 font-bold">{data?.optimumTemp}</div>
          </div>
        )}
        {data && data.optimumHum && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">Độ ẩm tối ưu</div>
            <div className="text-gray-600 font-bold">{data?.optimumHum}</div>
          </div>
        )}
        {data && data.isViolation && (
          <div className="flex justify-between items-center mt-2 border border-2 border-blue-500 p-1">
            <div className="text-blue-800 font-bold w-2/3">
              Tình trạng nhiệt độ
            </div>
            <div className="text-gray-600 font-bold">
              {data?.isViolation ? "Xấu" : "Tốt"}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 font-semibold ring-2 rounded-md" onClick={onShow}>{
            isShowQRCode ? "Ẩn mã QR Code" : "Hiện mã QR Code"
          }</button>
        </div>
        {
          isShowQRCode && <div className="flex flex-col items-center justify-center gap-5 py-4">
          <span className="font-bold">Mã QR</span>
          <QRCode
            value={`https://traceability-dapps.vercel.app/qrcode-view/${id}`}
          />
        </div>
        }
      </div>
    </div>
  );
};

export default QRCodeView;
