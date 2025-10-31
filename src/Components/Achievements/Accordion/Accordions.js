import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import "./accardion.css";

export default function Accordions({ data }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 30;

  const handleAccordionChange = (isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={(event, isExpanded) => handleAccordionChange(isExpanded)}
      sx={{ backgroundColor: "#F9F9F9" }}
    >
      <AccordionSummary
        aria-controls="panel-content"
        id="panel-header"
        expandIcon={
          <div style={{ transform: expanded ? "none" : "rotate(45deg)" }}>
            <CloseIcon />
          </div>
        }
      >
        <h2>{data.name}</h2>
      </AccordionSummary>
      <AccordionDetails sx={{ position: "relative" }}>
        <Box className="AchievementsContents">
          {data.achievements.map((achievement, index) => (
            <Box key={index} className="AchievementsCards">
              <a
                href={achievement.book_file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={achievement.cover} alt={achievement.title} />
                <p>
                  {achievement.title && achievement.title.length > maxLength
                    ? `${achievement.title.substring(0, maxLength)}...`
                    : achievement.title || ""}
                </p>
              </a>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
