import styles from "./Input.module.css";

const Input = (props) => {
  const { type, value, setValue, label } = props;

  const fixedLabel = label.toLowerCase().replaceAll(" ", "_");

  const inputClassName = type === "text" ? styles.input : "";

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={fixedLabel}>{label}</label>
      <input
        type={type}
        className={inputClassName}
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
