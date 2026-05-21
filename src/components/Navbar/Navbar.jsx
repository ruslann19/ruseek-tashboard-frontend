import NavbarItem from "../NavbarItem/NavbarItem";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  const { activeNavbarItem, onClickNavbarItem } = props;

  const navbarItems = [
    {
      title: "Tasks",
      redirectTo: "/tasks",
    },
    {
      title: "Models",
      redirectTo: "/models",
    },
    {
      title: "Answers",
      redirectTo: "/answers",
    },
    {
      title: "Test models",
      redirectTo: "/test-models",
    },
  ];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarItems}>
        {navbarItems.map((item) => (
          <NavbarItem
            key={item}
            id={item}
            title={item.title}
            redirectTo={item.redirectTo}
            onClickNavbarItem={onClickNavbarItem}
            isActive={item.title === activeNavbarItem}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
