import { useContext } from "react";
import styles from "./TaskItem.module.css";
import { TasksContext } from "../../context/TasksContext";
import RouterLink from "../RouterLink/RouterLink";

const TaskItem = (props) => {
  const { id, question, correct_answer } = props;

  const { deleteTask } = useContext(TasksContext);

  return (
    <div key={id} className={styles.taskItem}>
      <RouterLink to={`/tasks/${id}`} aria-label="Task detail page">
        {question}
      </RouterLink>
      <button
        onClick={(event) => {
          event.preventDefault();
          deleteTask(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
