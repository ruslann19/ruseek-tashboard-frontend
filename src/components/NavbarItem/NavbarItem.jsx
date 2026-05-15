import styles from "./NavbarItem.module.css";

const NavbarItem = (props) => {
  const { id, title, onClickNavbarItem } = props;

  const onClick = () => {
    onClickNavbarItem(title);
  };

  return (
    <li key={id} className={styles.navbarItem} onClick={onClick}>
      {title}
    </li>
  );
};

export default NavbarItem;
