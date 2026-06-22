import { useEffect, useState } from "react";

import llmsApi from "@/shared/api/llms";

const useLlms = () => {
  const [llms, setLlms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedLlms = await llmsApi.getAll();
        setLlms(loadedLlms || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      }
    };

    fetchData();
  }, []);

  return {
    llms,
    setLlms,
    isLoading,
  };
};

export default useLlms;
