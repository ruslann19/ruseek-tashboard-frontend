import { createContext } from "react";

import useAllAnswers from "./useAllAnswers";

export const AnswersContext = createContext({});

export const AnswersProvider = ({ children }) => {
  const allAnswersValue = useAllAnswers();

  return (
    <AnswersContext.Provider value={allAnswersValue}>
      {children}
    </AnswersContext.Provider>
  );
};
