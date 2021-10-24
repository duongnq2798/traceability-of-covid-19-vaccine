import React from "react";
import {Link} from 'react-router-dom'
import { localization } from "../../config/en";
import { NavCover, NavHeader, CardTotal } from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
  TotalVaccinationStation,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";

const ProcessPage = () => {
  return (
    <React.Fragment>
      <NavCover />
      <div className="main">
        <NavHeader />
        <div className="main-header mt-8">
          <p className="main-header_title font-bold text-xl">
            {localization.Dashboard.dashboard}
          </p>
          <Link to="/create-process" className="main-header_btnText">
            {localization.Dashboard.addProcess}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal srcImg={TotalProgress} quantity={15} desc={localization.Dashboard.progress}/>
          <CardTotal srcImg={TotalWarehouse} quantity={101} desc={localization.Dashboard.warehouse}/>
          <CardTotal srcImg={TotalDistributor} quantity={86} desc={localization.Dashboard.distributor}/>
          <CardTotal srcImg={TotalVaccinationStation} quantity={92} desc={localization.Dashboard.vaccinationStation}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProcessPage;
