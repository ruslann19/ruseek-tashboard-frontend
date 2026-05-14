import styles from "./NavbarItem.module.css";

const NavbarItem = (props) => {
  const { id, title } = props;

  return (
    <li key={id} className={styles.navbarItem}>
      {title}
    </li>
  );
};

export default NavbarItem;
