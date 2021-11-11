import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { NavCover, NavHeader, CardTotal, TableComponent } from "../../components";
import {
  TotalProgress,
  TotalDistributor,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";


const AdminPage = () => {
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/person/${text}`;
  const { t, i18n } = useTranslation();

  const columns = [
    {
      title: t("admin.address"),
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("admin.name"),
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("admin.contactNo"),
      dataIndex: "contactNo",
      key: "contactNo",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("admin.role"),
      dataIndex: "role",
      key: "role",
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("admin.status"),
      dataIndex: "status",
      key: "status",
      render: (text) => <a>{text}</a>,
    },
  ];

  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const [total, setTotal] = useState(undefined);
  const [totalSuccess, setTotalSuccess] = useState(undefined);

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/user/all?currentPage=${currentPage}&perPage=10`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);

    const getTotal = await axios.get(
      `${SERVER.baseURL}/user/count`
    );
    const getTotalSuccess = await axios.get(
      `${SERVER.baseURL}/user/role`
    );

    if(getTotal)  setTotal(getTotal.data.data);
    if(getTotalSuccess) setTotalSuccess(getTotalSuccess.data.data.length);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/user/all?currentPage=${page}&perPage=10`
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
            {t("admin.admin")}
          </p>
          <Link to="/create-admin" className="main-header_btnText">
            {t("admin.create")}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalDistributor}
            quantity={total}
            desc={t("admin.totalUser")}
          />
          <CardTotal srcImg={TotalProgress} quantity={totalSuccess} desc={t("admin.totalRole")} />
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

export default AdminPage;
