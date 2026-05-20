import { useState, useEffect } from "react";
import { createContext } from "react";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  let emptyListMessage = null;
  if (tasks.length === 0) {
    emptyListMessage = "Список задач пустой";
  }

  const [searchQuery, setSearchQuery] = useState("");
  const clearSearchQuery = searchQuery.trim().toLowerCase();

  let displayedTasks = tasks;
  if (clearSearchQuery.length > 0) {
    const filteredTasks = tasks.filter(({ question }) =>
      question.toLowerCase().includes(clearSearchQuery),
    );

    displayedTasks = filteredTasks;
    if (filteredTasks.length === 0) {
      emptyListMessage = "Подходящие задачи не найдены";
    }
  }

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    const isConfirmed = confirm(
      `Вы уверены, что хотите удалить задачу (id: ${taskId})?`,
    );

    if (isConfirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

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
