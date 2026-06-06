import { useState } from "react";
import NavbarItem from "@/shared/ui/NavbarItem";
import styles from "./Navbar.module.css";

const navbarItems = [
  {
    title: "Tasks",
    redirectTo: "/tasks",
  },
  {
    title: "Add tasks",
    redirectTo: "/add-tasks",
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

const Navbar = () => {
  let currentItem = null;
  const pathname = window.location.pathname;

  for (const item of navbarItems) {
    if (pathname.startsWith(item.redirectTo)) {
      currentItem = item.title;
      break;
    }
  }

  const [activeNavbarItem, setActiveNavbarItem] = useState(currentItem);

  const onClickNavbarItem = (navbarItem) => {
    setActiveNavbarItem(navbarItem);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarItems}>
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.redirectTo}
            id={item.redirectTo}
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
