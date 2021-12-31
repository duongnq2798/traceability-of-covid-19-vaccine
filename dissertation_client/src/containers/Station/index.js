import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavCover,
  NavHeader,
  CardTotal,
  TableComponent,
} from "../../components";
import { TotalDistributor } from "../../assets/icon";
import "../../assets/scss/_process.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";

const StationPage = () => {
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/station/${text}`;
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("station.batchNo"),
      dataIndex: "batchNo",
      key: "batchNo",
      render: (text) => (
        <Link to={`/station/${text}`}>
          <Tag color={"gold"}>{text}</Tag>
        </Link>
      ),
    },
    {
      title: t("station.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <Tag color="lime">{text}</Tag>,
    },
    {
      title: t("station.arrivalDateTime"),
      dataIndex: "arrivalDateTime",
      key: "arrivalDateTime",
      render: (text) => (
        <Tag color="cyan">
          {dayjs(Number(text) * 1000).format("DD-MM-YYYY HH:mm:ss")}
        </Tag>
      ),
    },
    // {
    //   title: t("station.vaccinationStationId"),
    //   dataIndex: "vaccinationStationId",
    //   key: "vaccinationStationId",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: t("station.shippingName"),
      dataIndex: "shippingName",
      key: "shippingName",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    // {
    //   title: t("station.shippingNo"),
    //   dataIndex: "shippingNo",
    //   key: "shippingNo",
    //   render: (text) => <Tag color={"green"}>{text}</Tag>,
    // },
    // {
    //   title: t("station.locationAddress"),
    //   dataIndex: "locationAddress",
    //   key: "locationAddress",
    //   render: (text) => <a>{text}</a>,
    // },
  ];

  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [total, setTotal] = useState(undefined);
  const [totalSuccess, setTotalSuccess] = useState(undefined);
  const [totalFailure, setTotalFailure] = useState(undefined);

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/all?currentPage=${currentPage}&perPage=10`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);

    const getTotal = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/count`
    );
    const getTotalSuccess = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/countsuccess`
    );
    const getTotalFailure = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/countunsuccess`
    );

    if (getTotal) setTotal(getTotal.data.data);
    if (getTotalSuccess) setTotalSuccess(getTotalSuccess.data.data);
    if (getTotalFailure) setTotalFailure(getTotalFailure.data.data);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/all?currentPage=${page}&perPage=10`
    );
    setDataTable(getData.data.data.result);
  };
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
        <div className="main-header mt-8">
          <p className="main-header_title font-bold text-xl">
            {t("station.vaccinationStation")}
          </p>
          <Link to="/create-station" className="main-header_btnText">
            {t("station.create")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalDistributor}
            quantity={total}
            desc={t("station.vaccinationStation")}
          />
          {/* <CardTotal
            srcImg={TotalProgress}
            quantity={totalSuccess}
            desc={t("station.success")}
          />
          <CardTotal
            srcImg={TotalWarehouse}
            quantity={totalFailure}
            desc={t("station.failure")}
          /> */}
        </div>
        <div className="px-6 mt-8 mr-8">
          <TableComponent
            dataSource={dataTable}
            columns={columns}
            pagination={{
              total: totalItems,
              onChange: (page, pageSize) => onChangePage(page),
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default StationPage;
