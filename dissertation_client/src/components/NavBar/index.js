import React, { useState, useEffect } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
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
  const location = useLocation();
  const [selectKey, setSelectKey] = useState(null);
  const { pathname } = location;

  useEffect(() => {
    if(pathname.includes('/logistic-details')) {
      setSelectKey(1);
    }
    if(pathname.includes('/warehouse')) {
      setSelectKey(2);
    }
    if(pathname.includes('/distributor')) {
      setSelectKey(3);
    }
    if(pathname.includes('/station')) {
      setSelectKey(4);
    }
    if(pathname.includes('/person')) {
      setSelectKey(5);
    }
    if(pathname.includes('/manage-admin')) {
      setSelectKey(6);
    }


    switch (pathname) {
      case "/": {
        setSelectKey(1);
        break;
      }
      case "/create-process": {
        setSelectKey(1);
        break;
      }
      case "/warehouse": {
        setSelectKey(2);
        break;
      }
      case "/create-warehouse": {
        setSelectKey(2);
        break;
      }
      case "/distributor": {
        setSelectKey(3);
        break;
      }
      case "/create-distributor": {
        setSelectKey(3);
        break;
      }
      case "/station": {
        setSelectKey(4);
        break;
      }
      case "/create-station": {
        setSelectKey(4);
        break;
      }
      case "/person": {
        setSelectKey(5);
        break;
      }
      case "/create-person": {
        setSelectKey(5);
        break;
      }
      case "/manage-admin": {
        setSelectKey(6);
        break;
      }
    }
  }, [location, selectKey, pathname]);

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/">
          <h1 className="navbar-title text-2xl font-black mt-4 mb-8">
            {NavBar.title}
          </h1>
        </Link>

        <NavLink
          to="/"
          exact={true}
          className={`navbar-item pt-3 pb-3 ${
            selectKey === 1 && "navbar-item-active"
          }`}
          activeClassName="navbar-item-active"
        >
          <img className="mr-7" src={ProcessIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.initialProcess}</p>
        </NavLink>
        <NavLink
          to="/warehouse"
          exact={true}
          className={`navbar-item pt-3 pb-3 ${
            selectKey === 2 && "navbar-item-active"
          }`}
          activeClassName="navbar-item-active"
        >
          <img className="mr-8" src={WarehouseIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.warehouse}</p>
        </NavLink>
        <NavLink
          to="/distributor"
          exact={true}
          className={`navbar-item pt-3 pb-3 ${
            selectKey === 3 && "navbar-item-active"
          }`}
          activeClassName="navbar-item-active"
        >
          <img className="mr-8" src={DistributorIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.distributor}</p>
        </NavLink>
        <NavLink
          to="/station"
          exact={true}
          className={`navbar-item pt-3 pb-3 ${
            selectKey === 4 && "navbar-item-active"
          }`}
          activeClassName="navbar-item-active"
        >
          <img className="mr-8" src={StationIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.station}</p>
        </NavLink>
        <NavLink
          to="/person"
          exact={true}
          className={`navbar-item pt-3 pb-3 ${
            selectKey === 5 && "navbar-item-active"
          }`}
          activeClassName="navbar-item-active"
        >
          <img className="mr-8" src={ObjectInjectionIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.objectInjection}</p>
        </NavLink>
        <NavLink
          to="/person"
          exact={true}
          className={`navbar-item pt-3 pb-3 ${
            selectKey === 6 && "navbar-item-active"
          }`}
          activeClassName="navbar-item-active"
        >
          <img className="mr-8" src={ObjectInjectionIcon} alt="" />
          <p className="font-bold navbar-item-text">Manage Admin</p>
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
