import styles from "./NavbarItem.module.css";

const NavbarItem = (props) => {
  const { id, title, onClickNavbarItem, isActive } = props;

  const onClick = () => {
    onClickNavbarItem(title);
  };

  return (
    <li
      key={id}
      className={`${styles.navbarItem} ${isActive ? styles.isActive : ""}`}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default NavbarItem;
