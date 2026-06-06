import { createContext } from "react";
import useLlms from "./useLlms";

export const LlmsContext = createContext({});

export const LlmsProvider = (props) => {
  const { children } = props;

  const value = useLlms();

  return <LlmsContext.Provider value={value}>{children}</LlmsContext.Provider>;
};
