import styles from "./List.module.css";

const List = (props) => {
  const { children } = props;

  return <section className={styles.list}>{children}</section>;
};

export default List;
