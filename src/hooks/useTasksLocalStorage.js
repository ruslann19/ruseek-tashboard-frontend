import { useCallback } from "react";

const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");

  const saveTasks = useCallback((tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, []);

  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks,
  };
};

export default useTasksLocalStorage;
