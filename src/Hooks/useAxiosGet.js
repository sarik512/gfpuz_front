import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxiosGet = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ru"
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const requestURL = `${process.env.REACT_APP_API_URI}${url}/`;
      const response = await axios.get(requestURL, {
        headers: {
          "Accept-Language": language,
        },
      });
      console.log("Language:", language);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Fetch error:", error);
      setIsLoading(false);
      if (error.response) {
        console.error("Ошибка запроса:", error.response.status);
      } else {
        console.error("Не удалось получить статус ответа");
      }
    }
  }, [url, language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLanguageChange = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
      localStorage.setItem("language", newLanguage);
    },
    [setLanguage]
  );

  useEffect(() => {
    fetchData();
  }, [language, fetchData]);

  return { data, isLoading, handleLanguageChange };
};

export default useAxiosGet;
