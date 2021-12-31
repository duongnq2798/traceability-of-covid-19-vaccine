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
} from "../../assets/icon";
import "../../assets/scss/_warehouse.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const DistributorPage = () => {
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
      render: (text) => 
      <Link to={`/distributor/${text}`}><Tag color={"purple"}>{text}</Tag></Link> ,
    },
    {
      title: t("distributor.shippingName"),
      dataIndex: "shippingName",
      key: "shippingName",
      render: (text) => <>{text}</>,
    },
    {
      title: t("distributor.departureDateTime"),
      dataIndex: "departureDateTime",
      key: "departureDateTime",
      render: (text) => (
        <Tag color="green">{dayjs(Number(text) * 1000).format("DD-MM-YYYY")}</Tag>
      ),
    },
    {
      title: t("distributor.estimateDateTime"),
      dataIndex: "estimateDateTime",
      key: "estimateDateTime",
      render: (text) => <Tag color="orange">{dayjs(Number(text) * 1000).format("DD-MM-YYYY")}</Tag>,
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
      render: (text) => <Tag color={"green"}>{text}</Tag>,
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
  const [total, setTotal] = useState(undefined);
  const [totalSuccess, setTotalSuccess] = useState(undefined);
  const [totalFailure, setTotalFailure] = useState(undefined);

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/distributor/all?currentPage=${currentPage}&perPage=10`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);

    const getTotal = await axios.get(`${SERVER.baseURL}/distributor/count`);
    // const getTotalSuccess = await axios.get(
    //   `${SERVER.baseURL}/distributor/countsuccess`
    // );
    // const getTotalFailure = await axios.get(
    //   `${SERVER.baseURL}/distributor/countunsuccess`
    // );

    if (getTotal) setTotal(getTotal.data.data);
    // if(getTotalSuccess) setTotalSuccess(getTotalSuccess.data.data);
    // if(getTotalFailure) setTotalFailure(getTotalFailure.data.data);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/distributor/all?currentPage=${page}&perPage=10`
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
            {t("distributor.title")}
          </p>
          <Link to="/create-distributor" className="main-header_btnText">
            {t("distributor.create")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalProgress}
            quantity={total}
            desc={t("distributor.create")}
          />
          {/* <CardTotal srcImg={TotalWarehouse} quantity={totalSuccess} desc={t("distributor.success")} />
          <CardTotal srcImg={TotalDistributor} quantity={totalFailure} desc={t("distributor.failure")} /> */}
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
