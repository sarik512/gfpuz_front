import { Box } from "@mui/material";
import React from "react";
import "./services.css";
import { useTranslation } from "react-i18next";
import usePageTitle from "../Routers/usepagetitle";
import useAxiosGet from "../../Hooks/useAxiosGet";
export default function Services() {
  const { t } = useTranslation();
  usePageTitle(t("naviagtion.services"));
  const { data } = useAxiosGet("services");
  return (
    <Box className="ConteinerEvents ">
      <h5>
        <span>
          <a href="/">{t("naviagtion.home")}</a>
        </span>{" "}
        / <span>{t("naviagtion.services")}</span>
      </h5>
      <h2 id="services">{t("servicespage.serveicestitle")}</h2>
      <Box className="ContentServices">
        {data.map((item, index) => (
          <Box key={index} className={`BoxService`}>
            <Box
              sx={{
                backgroundImage: `url(${item.photo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                width: "100%",
                height: "100%",
                filter: "brightness(70%)",
              }}
            ></Box>
            <h1
              style={{
                zIndex: "100",
              }}
              id="titleservices"
            >
              {item.title}
            </h1>
            <Box className="BackroundOpacityServices">
              <Box dangerouslySetInnerHTML={{ __html: item.description }}></Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
