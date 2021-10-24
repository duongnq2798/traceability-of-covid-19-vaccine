import React from "react";
import { Link } from "react-router-dom";
import { localization } from "../../config/en";
import {
  DistributorIcon,
  WarehouseIcon,
  StationIcon,
  ProcessIcon,
  ObjectInjectionIcon,
} from "../../assets/icon";
import "../../assets/scss/_navbar.scss";

const NavBar = () => {
  const { NavBar } = localization;

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/">
          <h1 className="navbar-title text-2xl font-black mt-4 mb-8">
            {NavBar.title}
          </h1>
        </Link>

        <div className="navbar-item navbar-item-active pt-3 pb-3">
          <img className="mr-7" src={ProcessIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.initialProcess}</p>
        </div>
        <div className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={WarehouseIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.warehouse}</p>
        </div>
        <div className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={DistributorIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.distributor}</p>
        </div>
        <div className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={StationIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.station}</p>
        </div>
        <div className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={ObjectInjectionIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.objectInjection}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
