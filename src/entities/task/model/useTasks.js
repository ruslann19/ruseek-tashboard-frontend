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
    try {
      const addedTask = await tasksAPI.add(task);
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.log("Ошибка при добавлении задачи:", error);
    }
  };

  const deleteTask = async (taskId) => {
    // const isConfirmed = confirm(
    //   `Вы уверены, что хотите удалить задачу (id: ${taskId})?`,
    // );
    const isConfirmed = true;

    if (isConfirmed) {
      await tasksAPI.delete(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
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
  };
};

export default useTasks;
