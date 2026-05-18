import styles from "./List.module.css";

const List = (props) => {
  const { children, emptyListMessage } = props;

  let content;
  if (emptyListMessage !== null) {
    content = <div>{emptyListMessage}</div>;
  } else {
    content = children;
  }

  return <section className={styles.list}>{content}</section>;
};

export default List;
