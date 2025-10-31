import { Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./about.css";
import usePageTitle from "../Routers/usepagetitle";
import useAxiosGet from "../../Hooks/useAxiosGet";
import Partners from "../Main/Partners/Partners";
import { useTranslation } from "react-i18next";

export default function AboutCompany() {
  usePageTitle("О компании");
  const { data: aboutData } = useAxiosGet("about");
  const { data: branchesData } = useAxiosGet("branches");
  const [activeFilials, setActiveFilials] = useState(true);
  const { t } = useTranslation();
  usePageTitle(t("naviagtion.aboutcompany"));

  let replacedDescriptions = "";
  if (aboutData && aboutData.description) {
    replacedDescriptions = aboutData.description.replace(
      /&laquo;|&raquo;/g,
      ""
    );
  } else {
    console.error("Data or description is undefined.");
  }

  useEffect(() => {
    const locationElements = document.querySelectorAll(".LocationSubtitle");
    locationElements.forEach((element) => {
      element.classList.remove("animate");
      // Триггер для перезапуска анимации
      void element.offsetWidth;
      element.classList.add("animate");
    });
  }, [branchesData, activeFilials]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "#000",
          position: "absolute",
          opacity: ".4",
        }}
      ></Box>
      <Box className="AboutPage">
        <h2
          id="TitleAbout"
          style={{
            paddingBottom: "1%",
          }}
        >
          {t("aboutpage.abouttitle1")}
        </h2>
        <Box className="AboutBoxLacation3" id="parter-main-advantages">
          <p
            className="AboutText"
            dangerouslySetInnerHTML={{ __html: replacedDescriptions }}
          ></p>
        </Box>
        <h2 id="TitleAbout">{t("aboutpage.abouttitle2")}</h2>
        <Box className="AboutPageLocationSubtitle">
          <h2
            onClick={() => setActiveFilials(true)}
            style={{ color: activeFilials ? "#ffb342" : "" }}
          >
            {branchesData && branchesData[0]?.title}
          </h2>
          <h2
            onClick={() => setActiveFilials(false)}
            style={{ color: activeFilials ? "" : "#ffb342" }}
          >
            {branchesData && branchesData[1]?.title}
          </h2>
        </Box>
        <Box className="AboutCompanyLacation">
          <Box className="AboutBoxLacation1">
            {activeFilials ? (
              branchesData && branchesData[0] ? (
                <>
                  <img
                    src={branchesData[0]?.map_photo}
                    alt="svg"
                    className="AnimateFilals"
                  />
                  <Box className="LocationSubtitle animate">
                    <p
                      id="brancheslocation"
                      dangerouslySetInnerHTML={{
                        __html: branchesData[0].address,
                      }}
                    ></p>
                    <p
                      id="brancheslocation"
                      dangerouslySetInnerHTML={{
                        __html: branchesData[0].contacts,
                      }}
                    ></p>
                  </Box>
                </>
              ) : (
                <CircularProgress />
              )
            ) : branchesData && branchesData[1] ? (
              <>
                <img
                  src={branchesData[1]?.map_photo}
                  alt="svg"
                  className="AnimateFilals"
                />
                <Box className="LocationSubtitle animate">
                  <p
                    id="brancheslocation"
                    dangerouslySetInnerHTML={{
                      __html: branchesData[1].address,
                    }}
                  ></p>
                  <p
                    id="brancheslocation"
                    dangerouslySetInnerHTML={{
                      __html: branchesData[1].contacts,
                    }}
                  ></p>
                </Box>
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Box className="videoWrapper AboutBoxLacation2">
            {activeFilials ? (
              branchesData && branchesData[0] ? (
                <img src={branchesData[1]?.photo} alt="" />
              ) : (
                <CircularProgress />
              )
            ) : branchesData && branchesData[1] ? (
              <img
                src={branchesData[1]?.photo}
                alt="svg"
                className="AnimateFilals2"
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
        <Box>
          <Partners />
          <br />
        </Box>
      </Box>
    </Box>
  );
}
