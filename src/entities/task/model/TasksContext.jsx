import { createContext } from "react";
import useTasks from "./useTasks";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    setTasks,
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    displayedTasks,
    emptyListMessage,
    addNewTask,
    deleteTask,
  } = useTasks();

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        setSearchQuery,
        clearSearchQuery,
        displayedTasks,
        emptyListMessage,
        addNewTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
