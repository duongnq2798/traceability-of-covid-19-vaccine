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

const DistributorPage = () => {
  const { distributor, addDistributor, success, failure } =
    localization.DistributorDashboard;
  return (
    <React.Fragment>
      <NavCover />
      <div className="main">
        <NavHeader />
        <div className="main-header mt-8">
          <p className="main-header_title font-bold text-xl">{distributor}</p>
          <Link to="/create-distributor" className="main-header_btnText">
            {addDistributor}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal srcImg={TotalProgress} quantity={15} desc={distributor} />
          <CardTotal srcImg={TotalWarehouse} quantity={101} desc={success} />
          <CardTotal srcImg={TotalDistributor} quantity={86} desc={failure} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DistributorPage;
