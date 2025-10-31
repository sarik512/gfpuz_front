import React from "react";
import Box from "@mui/material/Box";
import "./projects.css";
import useAxiosGet from "../../Hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import usePageTitle from "../Routers/usepagetitle";
export default function Projects() {
  const { data } = useAxiosGet(`projects`);
  const { t } = useTranslation();
  usePageTitle(t("naviagtion.Ourprojects"));

  return (
    <Box className="ProjectPage">
      <Box>
        <h1 className="ProjectsTitle">{t("ProjectPage.projecttitle")}</h1>
      </Box>
      <Box>
        {data.map((item, index) => (
          <Box
            key={item.id}
            className="SectionsProjects"
            style={{
              backgroundImage: `url(${item.photo})`,
            }}
          >
            <Box className="BackgroundOpacity"></Box>
            <h1>{item.title}</h1>
            <br />
            <p id="subtitle">{item.short_description}</p>
            <Box className="HoverActivate">
              <Box className="HoverActivateDescription">
                <Box
                  className="descriptionprojects"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
