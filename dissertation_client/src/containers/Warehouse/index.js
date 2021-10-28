import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { localization } from "../../config/en";
import { NavCover, NavHeader, CardTotal,TableComponent } from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
  
} from "../../assets/icon";
import "../../assets/scss/_warehouse.scss";
import axios from "axios";
import { SERVER } from "../../constants/Config";
import { Tag } from "antd";

const columns = [
  {
    title: "Batch No",
    dataIndex: "batchNo",
    key: "batchNo",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Vaccine",
    dataIndex: "vaccineName",
    key: "vaccineName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Temperature",
    dataIndex: "optimumTemp",
    key: "optimumTemp",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Humidity",
    dataIndex: "optimumHum",
    key: "optimumHum",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Violate",
    dataIndex: "isViolation",
    key: "isViolation",
    render: (text) => <Tag color={"green"}>{text ? 'violate' : 'normal'}</Tag>,
  },
  {
    title: "Storage Date",
    dataIndex: "storageDate",
    key: "storageDate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <Tag color={"green"}>{text}</Tag>,
  },
  {
    title: "Next Acction",
    dataIndex: "nextAcction",
    key: "nextAcction",
    render: (text) => <Tag color={"green"}>{text}</Tag>,
  },
];

const WarehousePage = () => {
  const { warehouse, addConsignments, success, failure } =
    localization.WarehouseDashboard;

  const [totalItems, setTotalItems] = useState();
  const [currentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  useEffect(async () => {
    const getData = await axios.get(
      `${SERVER.baseURL}/warehouse/all?currentPage=${currentPage}&perPage=7`
    );
    setDataTable(getData.data.data.result);
    setTotalItems(getData.data.data.totalItems);
  }, []);

  const onChangePage = async (page) => {
    const getData = await axios.get(
      `${SERVER.baseURL}/warehouse/all?currentPage=${page}&perPage=7`
    );
    setDataTable(getData.data.data.result);
  };

  return (
    <React.Fragment>
      <NavCover />
      <div className="main">
        <NavHeader />
        <div className="main-header mt-8">
          <p className="main-header_title font-bold text-xl">{warehouse}</p>
          <Link to="/create-warehouse" className="main-header_btnText">
            {addConsignments}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal srcImg={TotalProgress} quantity={15} desc={warehouse} />
          <CardTotal srcImg={TotalWarehouse} quantity={101} desc={success} />
          <CardTotal srcImg={TotalDistributor} quantity={86} desc={failure} />
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
