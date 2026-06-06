import { createContext } from "react";

import useTasks from "./useTasks";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const value = useTasks();

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
