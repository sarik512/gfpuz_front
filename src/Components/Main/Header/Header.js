import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import Logo35 from "../../Footer/Icons/footer35.png";
import CallIcon from "@mui/icons-material/Call";
import "./headers.css";
import ClearIcon from "@mui/icons-material/Clear";
export default function Header({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSwiperReady, setSwiperReady] = useState(false);

  const handleContactsClick = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const slideshowImages = useMemo(() => {
    return data?.images?.map((image) => image.file) || [];
  }, [data?.images]);


  useEffect(() => {
    if (slideshowImages.length > 0) {
      setSwiperReady(true);
    }
  }, [slideshowImages]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box sx={{ zIndex: 1000 }}>
        <FeedbackForm
          isVisible={isFormVisible}
          onClose={toggleFormVisibility}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
          {isSwiperReady && (
          <Swiper
            className="backgroundSwiper"
            direction="horizontal"
            autoplay={{ delay: 1700 }}
            loop={true}
            speed={1650}
            effect="fade"
          >
            {slideshowImages.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "black",
                  filter: "brightness(70%)",
                }}
              />
            ))}
          </Swiper>
        )}
      </Box>
      <Box className="Header">
        <Box className="HeaderRight">
          <h1>
            OOO <br /> “GeoFundamentProject”
          </h1>
          <p className="NotActiveResponsPhone">{data.sub_title}</p>
          <Box className="HeaderBtn">
            <button onClick={() => navigate("/about-company")}>
              {t("header.headerbtn1")}
            </button>
            <button onClick={handleContactsClick} className="HeaderBtn">
              {t("header.headerbtn2")}
            </button>
          </Box>
          <Box className="ActiveResponsPhone">
            <p>{data.sub_title_mobile}</p>
            <Link to={"/about-company"}>
              <button>{t("header.headerbtn3")}</button>
            </Link>
            <Box className="LastHeader">
              <h5>Самарканд</h5>
              <h5>+99897 923 33 73</h5>
            </Box>
          </Box>
        </Box>
        <Box className="HeaderLogo35">
          <img src={Logo35} alt="svg" />
        </Box>
        <Box className="HeaderLeft">
          <Box
            className={isFormVisible ? " IconPhoneClose" : "IconPhone"}
            onClick={toggleFormVisibility}
          >
            {isFormVisible ? (
              <ClearIcon className="CallIcon ClearIcon" color="white" />
            ) : (
              <CallIcon className="CallIcon" color="#fff" />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
