import React from "react";
import { Link } from "react-router-dom";
import { localization } from "../../config/en";
import { NavCover, NavHeader, CardTotal } from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
  TotalVaccinationStation,
} from "../../assets/icon";
import "../../assets/scss/_warehouse.scss";

const WarehousePage = () => {
  const { warehouse, addConsignments, success, failure } =
    localization.WarehouseDashboard;
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
      </div>
    </React.Fragment>
  );
};

export default WarehousePage;
