import TasksFiler from "../TasksFilter";
import TasksList from "../TasksList/TasksList";

const TasksPage = () => {
  const tasks = [
    {
      id: 1,
      question: "Кто придумал закон Ньютона?",
      answer: "Ньютон",
    },
    {
      id: 2,
      question: "2 + 2 * 2 = ?",
      answer: "6",
    },
  ];

  return (
    <div>
      <TasksFiler />
      <TasksList tasks={tasks} />
    </div>
  );
};

export default TasksPage;
