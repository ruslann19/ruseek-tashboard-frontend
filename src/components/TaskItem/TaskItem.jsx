import styles from "./TaskItem.module.css";

const TaskItem = (props) => {
  const { id, question, answer, onClick } = props;
  return (
    <div key={id} className={styles.taskItem} onClick={onClick}>
      <div>id: {id}</div>
      <div>question: {question}</div>
      <div>answer: {answer}</div>
    </div>
  );
};

export default TaskItem;
