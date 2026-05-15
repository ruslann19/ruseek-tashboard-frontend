import NavbarItem from "../NavbarItem/NavbarItem";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  const { onClickNavbarItem } = props;

  const navbarItems = ["Tasks", "Models", "Answers", "Test models"];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarItems}>
        {navbarItems.map((item) => (
          <NavbarItem
            key={item}
            id={item}
            title={item}
            onClickNavbarItem={onClickNavbarItem}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
