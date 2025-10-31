import { Box } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import "./parnter.css";
import { useWidth } from "../../../Hooks/useWidth";
import { useTranslation } from "react-i18next";
import useAxiosGet from "../../../Hooks/useAxiosGet";
import { Link } from "react-router-dom";

SwiperCore.use([Autoplay, Pagination]);

export default function Partners() {
  const { data } = useAxiosGet("partners");
  const { t } = useTranslation();
  const width = useWidth();
  const [slides, setSlides] = useState(7);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (width < 500) {
      setSlides(3);
    } else if (width < 700) {
      setSlides(4);
    } else if (width < 1000) {
      setSlides(5);
    } else {
      setSlides(6);
    }
  }, [width]);

  // Обновляем Swiper после загрузки данных
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [data]);

  return (
    <Box sx={{ paddingTop: "4%" }}>
      <Box className="Partners">
        <h1 className="swipertitle">{t("aboutpage.partnerstitle1")}</h1>
        <h1 className="swipersubtitle">{t("aboutpage.partnerstitle2")}</h1>
        <br />
      </Box>
      {data.length > 0 && (
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={slides}
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 1000 }}
          className="Swiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={''}>
                <img src={item.photo} alt="png" className="rate__company" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
}
