import { createContext } from "react";
import useTasks from "./useTasks";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    setTasks,
    sortedField,
    setSortedField,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    displayedTasks,
    emptyListMessage,
    addNewTask,
    deleteTask,
    updateTask,
  } = useTasks();

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        sortedField,
        setSortedField,
        sortOrder,
        setSortOrder,
        searchQuery,
        setSearchQuery,
        clearSearchQuery,
        displayedTasks,
        emptyListMessage,
        addNewTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
