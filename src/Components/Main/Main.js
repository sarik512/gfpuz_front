import { Box } from "@mui/material";
import React from "react";
import Header from "./Header/Header";
import MainAbout from "./MainAbout/MainAbout";
import MainAdvantages from "./MainAdvantages/MainAdvantages";
import MainCommand from "./MainCommand/MainCommand";
import "./main.css";
import usePageTitle from "../Routers/usepagetitle";
import useAxiosGet from "../../Hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
export default function Main() {
  const { data } = useAxiosGet("home");
  const { t } = useTranslation();
  usePageTitle(t("naviagtion.home"));
  return (
    <Box
      className="main"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#D7D7D7",
        overflow: "hidden",
      }}
    >
      <Header data={data} />
      <Box
        className="BackgroundMain"
        sx={{
          width: "100%",
          height: "100%",
          color: "#000",
          position: "relative",
        }}
      >
        <MainAbout data2={data} />
        <MainAdvantages />
        <MainCommand />
      </Box>
    </Box>
  );
}
