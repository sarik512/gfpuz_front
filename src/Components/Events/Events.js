import { Box } from "@mui/material";
import React from "react";
import "./events.css";
import { useTranslation } from "react-i18next";
import usePageTitle from "../Routers/usepagetitle";
import useAxiosGet from "../../Hooks/useAxiosGet";

export default function Events() {
  const { data } = useAxiosGet("events");
  const { t } = useTranslation();
  usePageTitle(t("naviagtion.events"));
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <Box>
      <Box className="EventsTitle">
        <h1>{t("naviagtion.events")}</h1>
      </Box>
      <Box className="ContenEvents">
        {data &&
          data.map((item, index) => (
            <Box
              key={index}
              className="Events"
              sx={{ backgroundImage: `url(${item.photo})` }}
            >
              <Box className="BackgroundOpacityEvents"></Box>
              <Box className="AboutEvents">
                <p className="Eventdata">{formatDate(item.event_date)}</p>
                <h4>{item.title}</h4>
                <Box className='EventDescription'>
                  <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
