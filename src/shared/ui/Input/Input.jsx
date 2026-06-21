import styles from "./Input.module.css";

const Input = (props) => {
  const { type, value, setValue, label } = props;

  const fixedLabel = label.toLowerCase().replaceAll(" ", "_");

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={fixedLabel}>{label}</label>
      <input
        type={type}
        autoComplete="off"
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

export default Input;
