import React, { useState } from "react";
import "./feedback.css";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import useSubmitData from "../../../../Hooks/useSubmitData";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const FeedbackForm = ({ isVisible, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const { data, error, loading, submitData, submitStatus, setSubmitStatus } =
    useSubmitData("send-email");
  console.log(data);
  console.log(error);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors["name"] = t("feedbackform.inputnameerror");
      isValid = false;
    }
    if (!formData.email) {
      tempErrors["email"] = t("feedbackform.inputemailerror");
      isValid = false;
    }
    if (!formData.phone_number) {
      tempErrors["phone_number"] = t("feedbackform.inputnumbererror");
      isValid = false;
    }
    if (!formData.description) {
      tempErrors["description"] = t("feedbackform.inputmessageerror");
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await submitData(formData);
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          description: "",
        });
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    }
  };

  return (
    <Box
      className={`feedback-form-container ${isVisible ? "visible" : "hidden"}`}
    >
      <Box className="feedback-form">
        <Box className="feedback-title">
          <p>{t("feedbackform.titlefeedback")}</p>
          <ClearIcon
            className="feedback-close-btn"
            fontSize="30px"
            onClick={onClose}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box className="HeaderFeedBackInputs">
            <Box className="form-group">
              <label>{t("feedbackform.inputnamelabel")}</label>
              <input
                type="text"
                name="name"
                placeholder={t("feedbackform.inputnameplaceholder")}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="errors">{errors.name}</span>}
            </Box>
            <Box className="form-group">
              <label>{t("feedbackform.inputemaillabel")}</label>
              <input
                type="email"
                name="email"
                placeholder={t("feedbackform.inputemailplaceholder")}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="errors">{errors.email}</span>}
            </Box>
          </Box>
          <Box className="form-group">
            <label>{t("feedbackform.inputnumberlabel")}</label>
            <input
              type="text"
              name="phone_number"
              placeholder="+998"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && (
              <span className="errors">{errors.phone_number}</span>
            )}
          </Box>
          <Box className="form-group">
            <label>{t("feedbackform.inputmessagelabel")}</label>
            <textarea
              name="description"
              placeholder={t("feedbackform.inputmessageplaceholder")}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <span className="errors">{errors.description}</span>
            )}
          </Box>
          <Box className="feedback-sumbit">
            <button type="submit" disabled={loading}>
              {t("feedbackform.sumbitbtnform")}
            </button>
          </Box>
        </form>
      </Box>
      {submitStatus === "success" && (
        <Box className="modal success">
          <Box className="modal-content">
            <CheckCircleIcon className="success-icon" />
            <p>{t("feedbackform.successformsubit.successtitle")}</p>
            <button onClick={() => setSubmitStatus(null)}>
              {t("feedbackform.successformsubit.successbtnclose")}
            </button>
          </Box>
        </Box>
      )}
      {submitStatus === "error" && (
        <Box className="modal error">
          <Box className="modal-content">
            <ErrorIcon className="error-icon" />
            <p>{t("feedbackform.errorformsubit.errortitle")}</p>
            <button onClick={() => setSubmitStatus(null)}>
              {t("feedbackform.successformsubit.successbtnclose")}
            </button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FeedbackForm;
