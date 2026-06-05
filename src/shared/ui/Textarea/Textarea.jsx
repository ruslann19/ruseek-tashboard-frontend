import styles from "./Textarea.module.css";

const Textarea = (props) => {
  const { value, setValue, label } = props;

  const fixedLabel = label.toLowerCase().replaceAll(" ", "_");

  return (
    <div className={styles.textareaWrapper}>
      <label htmlFor={fixedLabel}>{label}</label>
      <textarea
        type="text"
        autoComplete="off"
        className={styles.textareaInput}
        name={fixedLabel}
        id={fixedLabel}
        placeholder={label}
        value={value}
        onInput={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
};

export default Textarea;
