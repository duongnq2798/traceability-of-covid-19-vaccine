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
  TotalVaccinationStation,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

const ProcessPage = () => {
  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [text, setText] = useState("");
  const [totalProcess, setTotalProcess] = useState(undefined);
  const [totalWarehouse, setTotalWarehouse] = useState(undefined);
  const [totalDistributor, setTotalDistributor] = useState(undefined);
  const [totalStation, setTotalStation] = useState(undefined);
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/logistic-details/${text}`;
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("dashboard.batchNo"),
      dataIndex: "batchNo", 
      key: "batchNo",
      render: (text) => <Link to={`/logistic-details/${text}`}><Tag color={"cyan"}>{text}</Tag></Link> ,
    },
    {
      title: t("dashboard.producer"),
      dataIndex: "producer",
      key: "producer",
      render: (text) => <Tag color="#2f54eb">{text}</Tag>,
    },
    {
      title: t("dashboard.total"),
      dataIndex: "totalWeight",
      key: "totalWeight",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("dashboard.status"),
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color={"#237804"}>{text}</Tag>,
    },
  ];
  

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/process/all?currentPage=${currentPage}&perPage=10`
    );
    console.log(getData.data.data.totalItems)
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);

    const getTotalProcess = await axios.get(
      `${SERVER.baseURL}/process/count`
    );
    const getTotalDistributor = await axios.get(
      `${SERVER.baseURL}/distributor/count`
    );
    const getTotalWarehouse = await axios.get(
      `${SERVER.baseURL}/warehouse/count`
    );
    const getTotalStation = await axios.get(
      `${SERVER.baseURL}/vaccinationstation/count`
    );
    if(getTotalProcess) setTotalProcess(getTotalProcess.data.data);
    if(getTotalDistributor) setTotalDistributor(getTotalDistributor.data.data);
    if(getTotalWarehouse) setTotalWarehouse(getTotalWarehouse.data.data);
    if(getTotalStation) setTotalStation(getTotalStation.data.data);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/process/all?currentPage=${page}&perPage=10`
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
          {t("sidebar.dashboard")}
          </p>
          <Link to="/create-process" className="main-header_btnText">
          {t("dashboard.createProcess")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalProgress}
            quantity={totalProcess}
            desc={t("dashboard.progress")}
          />
          <CardTotal
            srcImg={TotalWarehouse}
            quantity={totalWarehouse}
            desc={t("dashboard.warehouse")}
          />
          <CardTotal
            srcImg={TotalDistributor}
            quantity={totalDistributor}
            desc={t("dashboard.distributor")}
          />
          <CardTotal
            srcImg={TotalVaccinationStation}
            quantity={totalStation}
            desc={t("dashboard.vaccinationStation")}
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

export default ProcessPage;
