import { useContext } from "react";
import styles from "./TaskItem.module.css";
import { TasksContext } from "@/entities/task";
import RouterLink from "@/shared/ui/RouterLink";

const TaskItem = (props) => {
  const { id, question } = props;

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
