import { useContext } from "react";
import styles from "./TaskItem.module.css";
import { TasksContext } from "../../context/TasksContext";

const TaskItem = (props) => {
  const { id, question, answer } = props;

  const { deleteTask } = useContext(TasksContext);

  return (
    <div key={id} className={styles.taskItem}>
      <div>id: {id}</div>
      <div>question: {question}</div>
      <div>answer: {answer}</div>
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
