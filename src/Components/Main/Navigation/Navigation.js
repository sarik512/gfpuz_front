import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Navigation/ImgLogo/logo.svg";
import Logo2 from "./ImgLogo/2.png";
import MainLine from "../MainImg/Color.png";
import ExitIcon from "./BurgerMenuIcons/Frame 24.svg";
import GreatBritainflag from "./BurgerMenuIcons/GreatBritain.svg";
import Russianflag from "./BurgerMenuIcons/Russian.svg";
import Uzbekistanflag from "./BurgerMenuIcons/Uzbekistan.svg";
import "./Navigation.css";
import BurgerIcon from "./BurgerMenuIcons/BurgerIcon.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18next";
export default function Navigation() {
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState();
  const [activeburger, setActiveBurger] = useState(false);
  const HandleAcitiveBurger = () => {
    setActiveBurger((prevState) => !prevState);
  };
  const location = useLocation();
  const handleLanguageChange = (language) => {
    localStorage.setItem("language", language);
    setActiveLanguage(language);
    i18n.changeLanguage(language);
    window.location.reload();
  };
  useEffect(() => {
    setActiveLanguage(localStorage.getItem("language") || "en");
  }, []);

  const handleContactsClick = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isLinkActive = (path) => {
    return location.pathname === path;
  };
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        className="Navigation1"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box className="Navigation">
          <Box className="NavRigth">
            <Box className="Logo">
              <Link to={"/"}>
                <img src={Logo} className="Logo1" alt="logo" />
              </Link>
            </Box>
          </Box>
          <Box className="NavLeft">
            <Box className="NavLinks">
              <li>
                <Link to={"/"} className={isLinkActive("/") ? "active" : ""}>
                  {t("naviagtion.home")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/about-company"}
                  className={isLinkActive("/about-company") ? "active" : ""}
                >
                  {t("naviagtion.aboutcompany")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/services"}
                  className={isLinkActive("/services") ? "active" : ""}
                >
                  {t("naviagtion.services")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/our-projects"}
                  className={isLinkActive("/our-projects") ? "active" : ""}
                >
                  {t("naviagtion.Ourprojects")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/our-achievement"}
                  className={isLinkActive("/our-achievement") ? "active" : ""}
                >
                  {t("naviagtion.Ourachievement")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/events"}
                  className={isLinkActive("/events") ? "active" : ""}
                >
                  {t("naviagtion.events")}
                </Link>
              </li>
              <li>
                <Link
                  to={"/gallery"}
                  className={isLinkActive("/gallery") ? "active" : ""}
                >
                  {t("naviagtion.gallery")}
                </Link>
              </li>
              <li>
                <Link onClick={handleContactsClick}>
                  {t("naviagtion.Contacts")}
                </Link>
              </li>
            </Box>
            <Box className="LanguageBtn">
              <p
                onClick={() => handleLanguageChange("en")}
                style={{ color: activeLanguage === "en" ? "#ffb342" : "white" }}
              >
                ENG
              </p>
              |
              <p
                onClick={() => handleLanguageChange("ru")}
                style={{ color: activeLanguage === "ru" ? "#ffb342" : "white" }}
              >
                RU
              </p>
              |
              <p
                onClick={() => handleLanguageChange("uz")}
                style={{ color: activeLanguage === "uz" ? "#ffb342" : "white" }}
              >
                UZ
              </p>
            </Box>
          </Box>
        </Box>
        <img
          className="MainLine"
          src={MainLine}
          alt="line"
          style={{
            width: "100%",
            height: "8px",
          }}
        />
      </Box>
      <Box className="BurgerMenuNotActive BurgerMenuNo">
        <Box>
          <Link to={"/"}>
            <img src={Logo2} className="Logo2" alt="svg" />
          </Link>
          <img
            src={BurgerIcon}
            onClick={HandleAcitiveBurger}
            className="BurgerIcon"
            alt="svg"
            style={{
              filter:
                location.pathname === "/our-projects" ||
                location.pathname === "/our-achievement" ||
                location.pathname === "/services" ||
                location.pathname === "/events" ||
                location.pathname === "/about-company"
                  ? "none"
                  : "brightness(0) invert(1)",
            }}
          />
        </Box>
      </Box>
      <Box
        className={`BurgerMenu ${
          activeburger ? "BurgerActive" : "BurgerNotActive"
        }`}
      >
        <img
          src={ExitIcon}
          onClick={HandleAcitiveBurger}
          className="ExitIcon"
          alt="svg"
        />
        <ul>
          <Link to={"/"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.home")}
          </Link>
          <Link to={"/about-company"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.aboutcompany")}
          </Link>
          <Link to={"/services"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.services")}
          </Link>
          <Link to={"/our-projects"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.Ourprojects")}
          </Link>
          <Link to={"/our-achievement"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.Ourachievement")}
          </Link>
          <Link to={"/events"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.events")}
          </Link>
          <Link to={"/gallery"} onClick={HandleAcitiveBurger}>
            {t("naviagtion.gallery")}
          </Link>
          <Link
            onClick={() => {
              HandleAcitiveBurger();
              handleContactsClick();
            }}
          >
            {t("naviagtion.Contacts")}
          </Link>
        </ul>
        <Box className="BoxLanguage">
          <Box onClick={() => handleLanguageChange("en")}>
            <img src={GreatBritainflag} alt="flag" />
            <p>EN</p>
          </Box>
          <Box onClick={() => handleLanguageChange("ru")}>
            <img src={Russianflag} alt="flag" />
            <p>RU</p>
          </Box>
          <Box onClick={() => handleLanguageChange("uz")}>
            <img src={Uzbekistanflag} alt="flag" />
            <p>UZ</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
