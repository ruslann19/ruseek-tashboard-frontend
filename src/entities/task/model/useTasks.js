import { useEffect, useState } from "react";

import tasksApi from "@/shared/api/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedTasks = await tasksApi.getAll();
        setTasks(loadedTasks || []);
        setIsLoading(false);
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

  const addTask = async (task) => {
    const addedTask = await tasksApi.add(task);
    setTasks([...tasks, addedTask]);
  };

  const deleteTask = async (taskId) => {
    await tasksApi.delete(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = async (updatedTask) => {
    await tasksApi.put(updatedTask);

    const updatedTasks = tasks.map((item) =>
      item.id === updatedTask.id ? updatedTask : item,
    );

    setTasks(updatedTasks);
  };

  return {
    tasks,
    setTasks,
    isLoading,
    emptyListMessage,
    addTask,
    deleteTask,
    updateTask,
  };
};

export default useTasks;
