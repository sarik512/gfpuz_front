import { useState } from "react";
import axios from "axios";

const useSubmitData = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const submitData = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}${endpoint}/`,
        {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          description: formData.description,
        }
      );
      setData(response.data);
      setSubmitStatus("success");
      console.log("success");
    } catch (err) {
      setError(err.message || "Что-то пошло не так");
      setSubmitStatus("error");
      console.error("Ошибка при отправке данных:", err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, submitData, submitStatus, setSubmitStatus };
};

export default useSubmitData;
