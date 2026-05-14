import styles from "./AnswerItem.module.css";

const AnswerItem = (props) => {
  const { id, modelId, answerId, answer } = props;

  return (
    <div className={styles.answerItem}>
      <div>id: {id}</div>
      <div>modelId: {modelId}</div>
      <div>answerId: {answerId}</div>
      <div>answer: {answer}</div>
    </div>
  );
};

export default AnswerItem;
