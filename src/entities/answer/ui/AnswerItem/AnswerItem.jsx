import styles from "./AnswerItem.module.css";

const AnswerItem = (props) => {
  const { id, modelId, questionId, answer } = props;

  return (
    <div className={styles.answerItem}>
      <div>id: {id}</div>
      <div>modelId: {modelId}</div>
      <div>questionId: {questionId}</div>
      <div>answer: {answer}</div>
    </div>
  );
};

export default AnswerItem;
