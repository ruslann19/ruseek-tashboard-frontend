import styles from "./AnswerItem.module.css";

const AnswerItem = (props) => {
  const { id, llmId, questionId, answer } = props;

  return (
    <div className={styles.answerItem}>
      <div>id: {id}</div>
      <div>llmId: {llmId}</div>
      <div>questionId: {questionId}</div>
      <div>answer: {answer}</div>
    </div>
  );
};

export default AnswerItem;
