import ListFilter from "../ListFilter";
import List from "../List";
import TaskItem from "../TaskItem";
import { useEffect, useState } from "react";
import AddNewTask from "../AddNewTask/AddNewTask";

const TasksPage = (props) => {
  const { setActivePage } = props;

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

  const onClickTask = (task) => {
    return () => {
      console.log("task:", task);
      setActivePage("Task");
    };
  };

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
    <div>
      <AddNewTask addNewTask={addNewTask} />
      <ListFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <List emptyListMessage={emptyListMessage}>
        {displayedTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            question={task.question}
            answer={task.answer}
            // onClick={onClickTask(task)}
            deleteTask={deleteTask}
          />
        ))}
      </List>
    </div>
  );
};

export default TasksPage;
