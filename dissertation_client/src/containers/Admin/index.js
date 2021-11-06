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
  TotalVaccinationStation,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";
import { Trans, useTranslation } from "react-i18next";

const columns = [
  {
    title: "Batch No",
    dataIndex: "batchNo",
    key: "batchNo",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Producer",
    dataIndex: "producer",
    key: "producer",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Distributor",
    dataIndex: "distributor",
    key: "distributor",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Vaccination Station",
    dataIndex: "vaccinationStation",
    key: "vaccinationStation",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Total",
    dataIndex: "totalWeight",
    key: "totalWeight",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <Tag color={"green"}>{text}</Tag>,
  },
];

const ProcessPage = () => {
  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/logistic-details/${text}`;

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/process/all?currentPage=${currentPage}&perPage=7`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/process/all?currentPage=${page}&perPage=7`
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
            {/* {localization.Dashboard.dashboard} */}
            <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("de")}>DE</button>
            <Trans i18nKey="description.part1"> sas</Trans>
          </p>
          <Link to="/create-process" className="main-header_btnText">
            {localization.Dashboard.addProcess}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalProgress}
            quantity={15}
            desc={localization.Dashboard.progress}
          />
          <CardTotal
            srcImg={TotalWarehouse}
            quantity={101}
            desc={localization.Dashboard.warehouse}
          />
          <CardTotal
            srcImg={TotalDistributor}
            quantity={86}
            desc={localization.Dashboard.distributor}
          />
          <CardTotal
            srcImg={TotalVaccinationStation}
            quantity={92}
            desc={localization.Dashboard.vaccinationStation}
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
