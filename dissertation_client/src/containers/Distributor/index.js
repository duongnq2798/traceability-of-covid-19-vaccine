import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { localization } from "../../config/en";
import {
  NavCover,
  NavHeader,
  CardTotal,
  TableComponent,
} from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
} from "../../assets/icon";
import "../../assets/scss/_warehouse.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

const DistributorPage = () => {
  const { distributor, addDistributor, success, failure } =
    localization.DistributorDashboard;
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/distributor/${text}`;

  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("distributor.batchNo"),
      dataIndex: "batchNo",
      key: "batchNo",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("distributor.shippingName"),
      dataIndex: "shippingName",
      key: "shippingName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("distributor.departureDateTime"),
      dataIndex: "departureDateTime",
      key: "departureDateTime",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("distributor.estimateDateTime"),
      dataIndex: "estimateDateTime",
      key: "estimateDateTime",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("distributor.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("distributor.optimumRangeTemp"),
      dataIndex: "optimumTemp",
      key: "optimumTemp",
      render: (text) => (
        <Tag color={"green"}>{text}</Tag>
      ),
    },
    {
      title: t("distributor.violate"),
      dataIndex: "violate",
      key: "violate",
      render: (text) => <a>{text ? "Violate" : "Normal"}</a>,
    },
    {
      title: t("distributor.status"),
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color={"green"}>{text}</Tag>,
    },
    {
      title: t("distributor.nextAction"),
      dataIndex: "nextAcction",
      key: "nextAcction",
      render: (text) => (
        <Tag color={"green"}>
          {text === "DISTRIBUTOR" ? t("warehouse.distributor") : text}
        </Tag>
      ),
    },
  ];
  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/distributor/all?currentPage=${currentPage}&perPage=7`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/distributor/all?currentPage=${page}&perPage=7`
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
          <p className="main-header_title font-bold text-xl">{t("distributor.title")}</p>
          <Link to="/create-distributor" className="main-header_btnText">
            {t("distributor.create")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal srcImg={TotalProgress} quantity={15} desc={t("distributor.create")} />
          <CardTotal srcImg={TotalWarehouse} quantity={101} desc={t("distributor.success")} />
          <CardTotal srcImg={TotalDistributor} quantity={86} desc={t("distributor.failure")} />
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

export default DistributorPage;
