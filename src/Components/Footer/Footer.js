import { Box } from "@mui/material";
import React from "react";
import Logo2 from "./Icons/LOGO GFP.png";
import IconMessage from "./Icons/iconmessage.svg";
import IconPhone from "./Icons/IconPhone.svg";
import Logoiso from "./Icons/logoiso.PNG";
import IconLocation from "./Icons/IconLocation.svg";
import FooterIcon35 from "./Icons/footer35.png";
import { Link } from "react-router-dom";
import "./footer.css";
import useAxiosGet from "../../Hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { data: contacts } = useAxiosGet("contacts");
  const { data: socials } = useAxiosGet("socials");
  const { t } = useTranslation();
  const phonenumber =
    contacts && contacts.phone_number
      ? contacts.phone_number.replace(/[\r\n]+|<br\s*\/?>/g, "")
      : "";
  return (
    <Box id="footer" className="FooterContainer">
      <Box className="FooterTop">
        <img src={Logo2} alt="svg" />
        <p>OOO “Geofundamentproject”</p>
      </Box>
      <Box className="FooterCenter">
        <Box className="FooterSocials">
          {socials.map((item, index) => (
            <Link to={item.link} key={index}>
              <img src={item.icon} alt="svg" />
            </Link>
          ))}
        </Box>
        <Box className="FooterContacts">
          <Box className="FooterContactsBox">
            <img src={IconMessage} alt="svg" />
            <Box className="FooterContactsBoxText">
              <h4>{t("footer.text1")}</h4>
              <p>
                <a href={`mailto:${contacts.email}`} title="Email Us">
                  <i className="zmdi zmdi-email-open"></i>
                  {contacts.email}
                </a>
              </p>
            </Box>
          </Box>
          <Box className="FooterContactsBox">
            <img src={IconPhone} alt="svg" />
            <Box className="FooterContactsBoxText">
              <h4>{t("footer.text2")}</h4>
              <p dangerouslySetInnerHTML={{ __html: phonenumber }}></p>
            </Box>
          </Box>
          <Box className="FooterContactsBox">
            <img src={IconLocation} alt="svg" />
            <Box className="FooterContactsBoxText">
              <Link
                to={"https://maps.app.goo.gl/9fqXWWgg47q55RAC6"}
                target="_blank"
              >
                <h4>{t("footer.text3")}</h4>
                <p>{contacts.address}</p>
              </Link>
            </Box>
          </Box>
          <Box className="FooterIcon35">
            <img src={FooterIcon35} alt="png" />
          </Box>
        </Box>
        <Box className="Logoiso">
          <img src={Logoiso} alt="png" />
        </Box>
      </Box>
      <Box className="FooterBottom">
        <p class="FooterLast">
          <span>©</span>By NextGen
        </p>
      </Box>
    </Box>
  );
}

/* <Box className="FooterComponentRight">
<Box className="FooterComponentLeftBottom">
  {socials.map((item, index) => (
    <Link to={item.link} key={index}>
      <img src={item.icon} alt="svg" />
    </Link>
  ))}
</Box>
<Box sx={{
  display:'flex',
  gap:'2vw',
}}>
  <Box className="FooterComponentRightTop">
    <img src={IconMessage} alt="svg" />
    <Box className="FooterComponentRightTopRight">
      <p>{t("footer.text1")}</p>
      <p>
        <a href="mailto:uzssmge.com" title="Email Us">
          <i class="zmdi zmdi-email-open"></i>
          {contacts.email}
        </a>
      </p>
    </Box>
  </Box>
  <Box className="FooterComponentRightTop">
    <img src={IconPhone} alt="svg" />
    <Box className="FooterComponentRightCenterRigth">
      <p>{t("footer.text2")}</p>
      <p dangerouslySetInnerHTML={{ __html: phonenumber }}></p>
    </Box>
  </Box>
  <Box className="FooterComponentRightTop">
    <img src={IconLocation} alt="svg" />
    <Box className="FooterComponentRightBottomRight">
      <Link
        to={"https://maps.app.goo.gl/9fqXWWgg47q55RAC6"}
        target="_blank"
      >
        <p>{t("footer.text3")}</p>
        <p>{contacts.address}</p>
      </Link>
    </Box>
  </Box>
</Box>
<img
  id="footer_img"
  style={{
    width: "180px",
    height: "180px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  }}
  src={Footer34}
  alt="svg"
/>
<img src={Logoiso} alt="png" id="logoiso" />
</Box> */
