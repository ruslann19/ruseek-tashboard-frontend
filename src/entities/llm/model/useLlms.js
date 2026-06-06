import { useState, useEffect } from "react";
import llmsApi from "@/shared/api/llms";

const useLlms = () => {
  const [llms, setLlms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedLlms = await llmsApi.getAll();
        setLlms(loadedLlms || []);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      }
    };

    fetchData();
  }, []);

  return {
    llms,
    setLlms,
  };
};

export default useLlms;
