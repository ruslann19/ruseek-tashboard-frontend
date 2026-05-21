import styles from "./List.module.css";

const List = (props) => {
  const { children, emptyListMessage } = props;

  let content;
  if (emptyListMessage !== null && emptyListMessage !== undefined) {
    content = <div>{emptyListMessage}</div>;
  } else {
    content = children;
  }

  console.log("list content:", content);

  return <section className={styles.list}>{content}</section>;
};

export default List;
