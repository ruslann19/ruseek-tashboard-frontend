import NavbarItem from "../NavbarItem/NavbarItem";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navbarItems = ["Tasks", "Models", "Answers", "Test models"];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarItems}>
        {navbarItems.map((item) => (
          <NavbarItem key={item} id={item} title={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
