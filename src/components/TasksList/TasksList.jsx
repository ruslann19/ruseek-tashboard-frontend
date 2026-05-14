import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.css";

const TasksList = (props) => {
  const { tasks } = props;

  return (
    <section className={styles.tasksList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          question={task.question}
          answer={task.answer}
        />
      ))}
    </section>
  );
};

export default TasksList;
