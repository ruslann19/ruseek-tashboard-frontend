import { useState, useEffect } from "react";
import tasksAPI from "@/shared/api/tasks";

function sortByField(key, order = "asc") {
  return (a, b) => {
    const valA = a[key];
    const valB = b[key];

    // 1. Обработка строк с учетом алфавита и регистра
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // 2. Универсальное сравнение для чисел, дат и boolean
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  };
}

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedField, setSortedField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const sortedTasks = [...tasks].sort(sortByField(sortedField, sortOrder));
  let displayedTasks = sortedTasks;
  if (clearSearchQuery.length > 0) {
    displayedTasks = displayedTasks.filter(({ question }) =>
      question.toLowerCase().includes(clearSearchQuery),
    );

    if (displayedTasks.length === 0) {
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
  };
};

export default useTasks;
