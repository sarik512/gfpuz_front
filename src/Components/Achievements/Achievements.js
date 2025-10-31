import { Box } from "@mui/material";
import React from "react";
import "./achievements.css";
import Accordions from "./Accordion/Accordions";
import { useTranslation } from "react-i18next";
import usePageTitle from "../Routers/usepagetitle";
import useAxiosGet from "../../Hooks/useAxiosGet";

export default function Achievements() {
  const { data: achievementData } = useAxiosGet("achievements");
  const { data: achievementsectionData } = useAxiosGet("achievements-section");
  const { data: socials } = useAxiosGet("socials");
  const { t } = useTranslation();
  usePageTitle(t("naviagtion.Ourachievement"));

  return (
    <Box className="AchievementConteiner">
      <Box
        className="Achievements"
        sx={{
          padding: "2%",
        }}
      >
        <h1 id="achivmentstitle">{t("achievementpage.achievementitle")}</h1>
        <p
          className="AboutText"
          dangerouslySetInnerHTML={{ __html: achievementsectionData[0]?.text }}
        ></p>{" "}
        <br />
        <Box className="AccordionsContent">
          {achievementData.map((item, index) => (
            <Accordions key={index} data={item} />
          ))}
        </Box>
        <Box className="BottomAchivment">
          <a href={socials[0]?.link} target="blank">
            <button>
              <p id="endAchievements">
                {t("achievementpage.achievementfoottext1")}
              </p>
            </button>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
