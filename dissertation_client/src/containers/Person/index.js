import React, {useState} from "react";
import { Link } from "react-router-dom";
import { localization } from "../../config/en";
import { NavCover, NavHeader, CardTotal } from "../../components";
import {
  TotalProgress,
  TotalWarehouse,
  TotalDistributor,
} from "../../assets/icon";
import "../../assets/scss/_process.scss";

const PersonPage = () => {
  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text.target.value);
  const onResetText = () => setText("");
  const onSearch = () => `/person/${text}`;
  const { vaccinationPerson, addPerson, success, failure } =
    localization.person;
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
            {vaccinationPerson}
          </p>
          <Link to="/create-person" className="main-header_btnText">
            {addPerson}
          </Link>
        </div>
        <div className="main-card mt-8">
          <CardTotal
            srcImg={TotalDistributor}
            quantity={86}
            desc={vaccinationPerson}
          />
          <CardTotal srcImg={TotalProgress} quantity={15} desc={success} />
          <CardTotal srcImg={TotalWarehouse} quantity={101} desc={failure} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonPage;
