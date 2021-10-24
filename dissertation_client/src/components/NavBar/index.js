import React from "react";
import { useLocation, NavLink, Link  } from "react-router-dom";
import { localization } from "../../config/en";
import {
  DistributorIcon,
  WarehouseIcon,
  StationIcon,
  ProcessIcon,
  ObjectInjectionIcon,
} from "../../assets/icon";
import "../../assets/scss/_navbar.scss";

const NavBar = (props) => {
  // const location = useLocation()
  // console.log(location.pathname)
  const { NavBar } = localization;

  // const isActive = location.pathname === props.to;
  // const classActive = isActive ? 'navbar-item-active' : '';
  // console.log(location.pathname)

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/" >
          <h1 className="navbar-title text-2xl font-black mt-4 mb-8">
            {NavBar.title}
          </h1>
        </Link>

        <NavLink to="/" exact={true} className="navbar-item pt-3 pb-3" activeClassName="navbar-item-active">
          <img className="mr-7" src={ProcessIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.initialProcess}</p>
        </NavLink>
        <NavLink to="/warehouse" exact={true} className="navbar-item pt-3 pb-3" activeClassName="navbar-item-active">
          <img className="mr-8" src={WarehouseIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.warehouse}</p>
        </NavLink>
        {/* <NavLink className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={DistributorIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.distributor}</p>
        </NavLink> */}
        {/* <NavLink className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={StationIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.station}</p>
        </NavLink> */}
        {/* <NavLink className="navbar-item pt-3 pb-3">
          <img className="mr-8" src={ObjectInjectionIcon} alt="" />
          <p className="font-bold navbar-item-text">{NavBar.objectInjection}</p>
        </NavLink> */}
      </div>
    </React.Fragment>
  );
};

export default NavBar;
