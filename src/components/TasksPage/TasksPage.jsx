import ListFilter from "../ListFilter";
import TasksList from "../TasksList/TasksList";
import styles from "./TasksPage.module.css";

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
      <section className={styles.addNewTaskSection}>
        <button>Добавить новую задачу</button>
      </section>
      <ListFilter />
      <TasksList tasks={tasks} />
    </div>
  );
};

export default TasksPage;
