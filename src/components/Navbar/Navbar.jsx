import NavbarItem from "../NavbarItem/NavbarItem";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  const { activeNavbarItem, onClickNavbarItem } = props;

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
            isActive={item === activeNavbarItem}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
