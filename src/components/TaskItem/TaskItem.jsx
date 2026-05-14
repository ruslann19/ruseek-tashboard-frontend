import styles from "./TaskItem.module.css";

const TaskItem = (props) => {
  const { id, question, answer } = props;
  return (
    <div key={id} className={styles.taskItem}>
      <div>id: {id}</div>
      <div>question: {question}</div>
      <div>answer: {answer}</div>
    </div>
  );
};

export default TaskItem;
