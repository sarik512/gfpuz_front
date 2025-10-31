import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./mainabout.css";
import { useTranslation } from "react-i18next";
import useAxiosGet from "../../../Hooks/useAxiosGet";
import { Link } from "react-router-dom";

export default function MainAbout({ data2 }) {
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useAxiosGet("summaries");
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const triggerPosition = document.getElementById("trigger").offsetTop;

      if (scrollTop > triggerPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box className={`MainAbout ${isVisible ? "visible" : ""}`}>
      <Box
        id="trigger"
        className={`LeftMainAbout ${isVisible ? "animate" : ""}`}
      >
        <h1>{t("naviagtion.aboutcompany")}</h1>
        <h2>GeoFundamentProject</h2>
        <div dangerouslySetInnerHTML={{ __html: data2?.about_text }}></div>
      </Box>

      <Box
        id="trigger"
        className={`BoxAboutContent ${isVisible ? "animate" : ""}`}
      >
        <Box className="BoxFirst"></Box>
        {data.map((item, index) => (
          <Box key={index}>
            <span
              style={{
                position: "relative",
              }}
            >
              <h1>{item.title}</h1>
              <p>{item.sub_title}</p>
            </span>
          </Box>
        ))}
        <Box
          className="BoxLast2"
          sx={{
            backgroundColor: "#1C2752 !important",
            color: "#FFFFFF",
          }}
        >
          <h2
            id="InfoCompany"
            style={{
              fontSize: "30px",
              fontWeight: "600",
              width: "120%",
              textAlign: "center",
              border: "2px solid #1C2752",
            }}
          >
            <Link
              to={"/about-company"}
              style={{
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              {t("naviagtion.aboutcompany")}
            </Link>
          </h2>
        </Box>
        <Box className="BoxFirst"></Box>
      </Box>
    </Box>
  );
}
