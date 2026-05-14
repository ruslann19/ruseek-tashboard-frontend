import ModelItem from "../ModelItem";
import styles from "./ModelsList.module.css";

const ModelsList = (props) => {
  const { models } = props;
  return (
    <section className={styles.modelsList}>
      {models.map((model) => (
        <ModelItem id={model.id} name={model.name} />
      ))}
    </section>
  );
};

export default ModelsList;
