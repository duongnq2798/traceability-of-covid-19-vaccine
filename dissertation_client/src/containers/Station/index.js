import React, { useState } from "react";
import { Link } from "react-router-dom";
import { localization } from "../../config/en";
import { NavCover, NavHeader, CardTotal } from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";

const StationPage = () => {
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/station/${text}`;
  const { vaccinationStation, addStation, success, failure } =
    localization.station;
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
            {vaccinationStation}
          </p>
          <Link to="/create-station" className="main-header_btnText">
            {addStation}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalDistributor}
            quantity={86}
            desc={vaccinationStation}
          />
          <CardTotal srcImg={TotalProgress} quantity={15} desc={success} />
          <CardTotal srcImg={TotalWarehouse} quantity={101} desc={failure} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default StationPage;
