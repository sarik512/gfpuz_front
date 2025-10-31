"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import "./gallerry.css";
import { useEffect } from "react";
import usePageTitle from "../Routers/usepagetitle";
import { useTranslation } from "react-i18next";
import useAxiosGet from "../../Hooks/useAxiosGet";

export default function Gallery() {
  const { data } = useAxiosGet("galleries");
  const { t } = useTranslation();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  usePageTitle(t("naviagtion.gallery"));
  const handleImageClick = (images, index) => {
    setCurrentImages(images);
    setPhotoIndex(index);
    setIsOpen(true);
  };
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Box sx={{ paddingBottom: "5%", position: "relative" }}>
      <Box
        className="GalleryHeader"
        sx={{
          backgroundImage: `url(${"https://graund.net/sites/default/files/managerfiles/top-09.jpg"})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",

            backgroundColor: "rgba(0, 0, 0, 0.5)",

            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            zIndex: 1,
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1
            id="gallerytitleheader"
            className={isHeaderVisible ? "" : "hidden"}
          >
            {t("naviagtion.gallery")}
          </h1>
        </Box>
      </Box>
      <Box>
        {data.map((item, galleryIndex) => (
          <Box key={galleryIndex}>
            <h1 className="gallerytitle">{item.title}</h1>
            <Box
              sx={{ display: "flex", flexWrap: "wrap" }}
              className="galleryimgscontent"
            >
              {item.images.map((image, imgIndex) => (
                <Box key={imgIndex} className="galleryimgs">
                  <img
                    src={image.photo_small}
                    alt={`png`}
                    onClick={() =>
                      handleImageClick(
                        item.images.map((img) => img.photo),
                        imgIndex
                      )
                    }
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      {isOpen && (
        <Lightbox
          mainSrc={currentImages[photoIndex]}
          nextSrc={currentImages[(photoIndex + 1) % currentImages.length]}
          prevSrc={
            currentImages[
              (photoIndex + currentImages.length - 1) % currentImages.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + currentImages.length - 1) % currentImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % currentImages.length)
          }
        />
      )}
    </Box>
  );
}
