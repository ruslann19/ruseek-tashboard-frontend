import { useEffect, useState } from "react";

import { benchmarkVersionsApi } from "@/shared/api";
import monthNumberToName from "@/shared/utils/monthNumberToName";

const useAllVersions = () => {
  const [allVersions, setAllVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const loadedVersions = await benchmarkVersionsApi.getAll();

      const titledVersions = loadedVersions.map((version) => {
        return {
          ...version,
          title: `${monthNumberToName(version.month)} ${version.year}`,
        };
      });

      setAllVersions(titledVersions || []);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { allVersions, isVersionsLoading: isLoading };
};

export default useAllVersions;
