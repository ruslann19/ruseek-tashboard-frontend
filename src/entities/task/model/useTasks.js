import { useState, useEffect } from "react";
import tasksAPI from "@/shared/api/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedTasks = await tasksAPI.getAll();
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      }
    };

    fetchData();
  }, []);

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

  const addNewTask = async (task) => {
    const addedTask = await tasksAPI.add(task);
    setTasks([...tasks, addedTask]);
  };

  const deleteTask = async (taskId) => {
    await tasksAPI.delete(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = async (updatedTask) => {
    await tasksAPI.put(updatedTask);

    const updatedTasks = tasks.map((item) =>
      item.id === updatedTask.id ? updatedTask : item,
    );

    setTasks(updatedTasks);
  };

  return {
    tasks,
    setTasks,
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
    displayedTasks,
    emptyListMessage,
    addNewTask,
    deleteTask,
    updateTask,
  };
};

export default useTasks;
