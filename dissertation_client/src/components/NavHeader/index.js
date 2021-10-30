import React, { useState } from "react";
import { localization } from "../../config/en";
import "../../assets/scss/_navheader.scss";
import { Link } from "react-router-dom";

const NavHeader = (props) => {
  const { onConnect, title, onResetText,onSearch } = props;

  return (
    <React.Fragment>
      <div className="navheader">
        <input
          type="text"
          name="default"
          placeholder={localization.NavBar.searchPlaceHolder}
          className="lg:px-4 py-2 sm:32 md:w-96 lg:w-1/2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          {...props}

        />
        <Link className="navheader-connect" to={onSearch}>
          {"Search"}
        </Link>
        <button className="navheader-connect" onClick={onResetText}>
          {"Reset"}
        </button>
        <button className="navheader-connect" onClick={onConnect}>
          {title ? title : localization.NavBar.connect}
        </button>
      </div>
    </React.Fragment>
  );
};

export default NavHeader;
