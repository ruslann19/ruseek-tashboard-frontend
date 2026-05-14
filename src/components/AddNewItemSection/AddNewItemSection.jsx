import styles from "./AddNewItemSection.module.css";

const AddNewItemSection = (props) => {
  const { buttonTitle } = props;
  return (
    <section className={styles.addNewItemSection}>
      <button>{buttonTitle}</button>
    </section>
  );
};

export default AddNewItemSection;
