import styles from "./ModelItem.module.css";

const ModelItem = (props) => {
  const { id, name } = props;
  return (
    <div className={styles.modelItem}>
      <div>id: {id}</div>
      <div>name: {name}</div>
    </div>
  );
};

export default ModelItem;
