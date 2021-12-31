import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import dayjs from "dayjs";

const WarehousePage = () => {
  const [text, setText] = useState("");
  const [total, setTotal] = useState(undefined);
  const [totalSuccess, setTotalSuccess] = useState(undefined);
  const [totalFailure, setTotalFailure] = useState(undefined);
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/warehouse/${text}`;
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("warehouse.batchNo"),
      dataIndex: "batchNo",
      key: "batchNo",
      render: (text) => 
      <Link to={`/warehouse/${text}`}><Tag color={"#120338"}>{text}</Tag></Link> ,
    },
    {
      title: t("warehouse.vaccine"),
      dataIndex: "vaccineName",
      key: "vaccineName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("warehouse.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("warehouse.temperature"),
      dataIndex: "optimumRangeTemp",
      key: "optimumRangeTemp",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("warehouse.humidity"),
      dataIndex: "optimumRangeHum",
      key: "optimumRangeHum",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("warehouse.violate"),
      dataIndex: "isViolation",
      key: "isViolation",
      render: (text) => (
        <Tag color={"#531dab"}>{text ? "violate" : t("warehouse.normal")}</Tag>
      ),
    },
    {
      title: t("warehouse.storageDate"),
      dataIndex: "storageDate",
      key: "storageDate",
      render: (text) => {
        const date = new Date(Number(text) * 1000);
        const newDate = dayjs(date).format('DD-MM-YYYY HH:mm:ss'); 
        return <Tag color={"#096dd9"}>{newDate}</Tag>
      },
    },
    {
      title: t("warehouse.status"),
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color={"#006d75"}>{text}</Tag>,
    },
    {
      title: t("warehouse.nextAction"),
      dataIndex: "nextAcction",
      key: "nextAcction",
      render: (text) => (
        <Tag color={"#262626"}>
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
      `${SERVER.baseURL}/warehouse/all?currentPage=${currentPage}&perPage=10`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);

    const getTotal = await axios.get(`${SERVER.baseURL}/warehouse/count`);
    // const getTotalSuccess = await axios.get(
    //   `${SERVER.baseURL}/warehouse/countsuccess`
    // );
    // const getTotalFailure = await axios.get(
    //   `${SERVER.baseURL}/warehouse/countunsuccess`
    // );

    if (getTotal) setTotal(getTotal.data.data);
    // if (getTotalSuccess) setTotalSuccess(getTotalSuccess.data.data);
    // if (getTotalFailure) setTotalFailure(getTotalFailure.data.data);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/warehouse/all?currentPage=${page}&perPage=10`
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
            {t("warehouse.title")}
          </p>
          <Link to="/create-warehouse" className="main-header_btnText">
            {t("warehouse.create")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalProgress}
            quantity={total}
            desc={t("warehouse.title")}
          />
          {/* <CardTotal
            srcImg={TotalWarehouse}
            quantity={totalSuccess}
            desc={t("warehouse.success")}
          />
          <CardTotal
            srcImg={TotalDistributor}
            quantity={totalFailure}
            desc={t("warehouse.failure")}
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

export default WarehousePage;
