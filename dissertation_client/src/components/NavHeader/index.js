import React, { useEffect } from "react";
import { localization } from "../../config/en";
import "../../assets/scss/_navheader.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavHeader = (props) => {
  const { onConnect, title, onResetText, onSearch } = props;
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    i18n.changeLanguage("vn");
  }, []);

  return (
    <React.Fragment>
      <div className="navheader">
        <input
          type="text"
          name="default"
          placeholder={t("header.searchText")}
          className="lg:px-4 py-2 sm:32 md:w-96 lg:w-1/2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          {...props}
        />
        <button className="font-bold" onClick={onResetText}>
          {t("header.reset")}
        </button>

        <Link className="navheader-connect" to={onSearch}>
        {t("header.search")}
        </Link>

        <button className="navheader-connect" onClick={onConnect}>
          {title ? title : t("header.connectWallet")}
        </button>
        <button
          className="bg-gray-700 text-white rounded p-3"
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <button
          className="bg-gray-700 text-white rounded p-3"
          onClick={() => changeLanguage("vn")}
        >
          VN
        </button>
      </div>
    </React.Fragment>
  );
};

export default NavHeader;
