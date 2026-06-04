import styles from "./SingleButtonSection.module.css";

const SingleButtonSection = (props) => {
  const { buttonTitle } = props;
  return (
    <section className={styles.singleButtonSection}>
      <button>{buttonTitle}</button>
    </section>
  );
};

export default SingleButtonSection;
