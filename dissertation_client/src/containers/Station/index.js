import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavCover, NavHeader, CardTotal, TableComponent } from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("station.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("station.arrivalDateTime"),
      dataIndex: "arrivalDateTime",
      key: "arrivalDateTime",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("station.vaccinationStationId"),
      dataIndex: "vaccinationStationId",
      key: "vaccinationStationId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("station.shippingName"),
      dataIndex: "shippingName",
      key: "shippingName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("station.shippingNo"),
      dataIndex: "shippingNo",
      key: "shippingNo",
      render: (text) => <Tag color={"green"}>{text}</Tag>,
    },
    {
      title: t("station.locationAddress"),
      dataIndex: "locationAddress",
      key: "locationAddress",
      render: (text) => <a>{text}</a>,
    },
  ];

  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/all?currentPage=${currentPage}&perPage=7`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/all?currentPage=${page}&perPage=7`
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
            quantity={86}
            desc={t("station.vaccinationStation")}
          />
          <CardTotal
            srcImg={TotalProgress}
            quantity={15}
            desc={t("station.success")}
          />
          <CardTotal
            srcImg={TotalWarehouse}
            quantity={101}
            desc={t("station.failure")}
          />
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
