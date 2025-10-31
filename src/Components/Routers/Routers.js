import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import { Box } from "@mui/material";
import AboutCompany from "../AboutCompany/AboutCompany";
import Services from "../Services/Services";
import Achievements from "../Achievements/Achievements";
import Projects from "../Projects/Projects";
import Events from "../Events/Events";
import Gallery from "../Gallery/Gallery";
import ScrollToTop from "./ScrollToTop";
export default function Routers() {
  return (
    <Box>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about-company" element={<AboutCompany />} />
        <Route path="/services" element={<Services />} />
        <Route path="/our-projects" element={<Projects />} />
        <Route path="/our-achievement" element={<Achievements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route />
      </Routes>
    </Box>
  );
}
