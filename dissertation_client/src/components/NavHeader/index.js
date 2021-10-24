import React, { useState } from "react";
import { localization } from "../../config/en";
import "../../assets/scss/_navheader.scss";

const NavHeader = ({onConnect, title }) => {
  const [text, setText] = useState("");

  const changeText = (text) => setText(text.target.value);
  return (
    <React.Fragment>
      <div className="navheader">
        <input
          type="text"
          name="default"
          placeholder={localization.NavBar.searchPlaceHolder}
          className="lg:px-4 py-2 sm:32 md:w-96 lg:w-1/2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          defaultValue={text}
          onChange={(text) => changeText(text)}
        />
        <button className="navheader-connect" onClick={onConnect}>
            {title ? title : localization.NavBar.connect}
        </button>
      </div>
    </React.Fragment>
  );
};

export default NavHeader;
