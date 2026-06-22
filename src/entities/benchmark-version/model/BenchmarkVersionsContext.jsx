import { createContext } from "react";

import useAllVersions from "./useAllVersions";

export const BenchmarkVersionsContext = createContext({});

export const BenchmarkVersionsProvider = ({ children }) => {
  const allVersionsValue = useAllVersions();

  return (
    <BenchmarkVersionsContext.Provider value={allVersionsValue}>
      {children}
    </BenchmarkVersionsContext.Provider>
  );
};
