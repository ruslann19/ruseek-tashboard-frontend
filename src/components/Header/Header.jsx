import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1>
        <span className={styles.textBlue}>Ru</span>Seek{" "}
        <span className={styles.textBlue}>Tash</span>Board Admin
      </h1>
    </header>
  );
};

export default Header;
