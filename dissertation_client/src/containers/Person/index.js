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
import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const PersonPage = () => {
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/person/${text}`;
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("person.batchNo"),
      dataIndex: "batchNo",
      key: "batchNo",
      render: (text) => (
        <Link to={`/person/${text}`}>
          <Tag color={"#002766"}>{text}</Tag>
        </Link>
      ),
    },
    {
      title: t("person.personName"),
      dataIndex: "personName",
      key: "personName",
      render: (text) => <Tag color={"#40a9ff"}>{text}</Tag>,
    },
    {
      title: t("person.age"),
      dataIndex: "age",
      key: "age",
      render: (text) => <Tag color={"#40a9ff"}>{text}</Tag>,
    },
    {
      title: t("person.identityCard"),
      dataIndex: "identityCard",
      key: "identityCard",
      render: (text) => <Tag color={"#40a9ff"}>{text}</Tag>,
    },
    {
      title: t("person.numberOfVaccinations"),
      dataIndex: "numberOfVaccinations",
      key: "numberOfVaccinations",
      render: (text) => <Tag color={"#40a9ff"}>{text}</Tag>,
    },
    {
      title: t("person.vaccinationDate"),
      dataIndex: "vaccinationDate",
      key: "vaccinationDate",
      render: (text) => <Tag color={"#40a9ff"}>{dayjs(Number(text) * 1000).format("DD-MM-YYYY")}</Tag>,
    },
    {
      title: t("person.typeOfVaccine"),
      dataIndex: "typeOfVaccine",
      key: "typeOfVaccine",
      render: (text) => <Tag color={"#40a9ff"}>{text}</Tag>,
    },
    {
      title: t("person.status"),
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color={"#5b8c00"}>{text}</Tag>,
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
      `${SERVER.baseURL}/objectinjection/all?currentPage=${currentPage}&perPage=10`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);

    const getTotal = await axios.get(`${SERVER.baseURL}/objectinjection/count`);
    const getTotalSuccess = await axios.get(
      `${SERVER.baseURL}/objectinjection/countsuccess`
    );
    const getTotalFailure = await axios.get(
      `${SERVER.baseURL}/objectinjection/countunsuccess`
    );

    if (getTotal) setTotal(getTotal.data.data);
    if (getTotalSuccess) setTotalSuccess(getTotalSuccess.data.data);
    if (getTotalFailure) setTotalFailure(getTotalFailure.data.data);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/objectinjection/all?currentPage=${page}&perPage=10`
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
            {t("person.vaccinationPerson")}
          </p>
          <Link to="/create-person" className="main-header_btnText">
            {t("person.create")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalDistributor}
            quantity={total}
            desc={t("person.vaccinationPerson")}
          />
          {/* <CardTotal srcImg={TotalProgress} quantity={totalSuccess} desc={t("person.success")} />
          <CardTotal srcImg={TotalWarehouse} quantity={totalFailure} desc={t("person.failure")} /> */}
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

export default PersonPage;
