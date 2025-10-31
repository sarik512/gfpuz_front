import React, { useState, useEffect } from "react";
import "./mainadvantages.css";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAxiosGet from "../../../Hooks/useAxiosGet";

export default function MainAdvantages() {
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useAxiosGet("advantages");
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const mainAdvantagesElement = document.getElementById("mainAdvantages");
      if (mainAdvantagesElement) {
        const triggerPosition = mainAdvantagesElement.offsetTop;
        if (scrollTop > triggerPosition) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
      id="mainAdvantages"
      className={`OursAdvantage ${isVisible ? "visible" : ""}`}
    >
      <Box className="MainAdvantage">
        <Box
          id="mainAdvantages"
          className={`h1s ${isVisible ? "animate" : ""}`}
        >
          <h1>{t("mainadvantages.text1")}</h1>
          <h2>{t("mainadvantages.text2")}</h2>
        </Box>
        <Box className="BoxMainAdvatageFoot" id="mainAdvantages">
          {data.map((item, index) => (
            <Box
              className={`OurMainAdvantage ${isVisible ? "animate" : ""}`}
              key={index}
            >
              <Box className="MainAdvantageIcon MainAdvantageIcon1">
                <img src={item.icon} alt="png" />
              </Box>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
