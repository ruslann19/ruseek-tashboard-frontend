import { useEffect, useState } from "react";

import { answersApi } from "@/shared/api";

const useAllVersions = () => {
  const [allAnswers, setAllAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const loadedAnswers = await answersApi.getAll();

      setAllAnswers(loadedAnswers || []);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { allAnswers, isAnswersLoading: isLoading };
};

export default useAllVersions;
