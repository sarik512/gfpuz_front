import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "./maincommand.css";
import { useTranslation } from "react-i18next";
import useAxiosGet from "../../../Hooks/useAxiosGet";
export default function MainCommand() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const mainAdvantagesElement = document.getElementById("maincommands");
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
  const { data } = useAxiosGet("management");
  const sanitizeDescription = (description) => {
    return description.replace(/&nbsp;/g, "");
  };
  return (
    <Box
      className={`MainCommand ${isVisible ? "visible" : ""}`}
      style={{
        color: "#000",
      }}
    >
      <Box className={`h112s ${isVisible ? "animate" : ""}`}>
        <h1>{t("maincommand.title")}</h1>
        <h2>GeoFundamentProject</h2>
      </Box>
      <Box
        className="Commands"
        id="maincommands"
        style={{
          color: "#1c2752",
        }}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            className={`InfoCommands ${isVisible ? "animate" : ""}`}
          >
            <Box
              className="ImgUser"
              style={{
                backgroundImage: `url(${item.photo})`,
                imageRendering: "optimizeSpeed",
                backgroundPosition: "center",
                aspectRatio: "1 / 1",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                objectFit: "cover",
              }}
            ></Box>
            <Box className="InfoUser">
              <h3>{item.full_name}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeDescription(item.description),
                }}
              ></p>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
