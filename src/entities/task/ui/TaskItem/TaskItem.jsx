import styles from "./TaskItem.module.css";
import RouterLink from "@/shared/ui/RouterLink";

const TaskItem = (props) => {
  const { id, question } = props;
  return (
    <div key={id} className={styles.taskItem}>
      <RouterLink to={`/tasks/${id}`} aria-label="Task detail page">
        {question}
      </RouterLink>
    </div>
  );
};

export default TaskItem;
