import styles from "./NavbarItem.module.css";
import navigate from "@/shared/hooks/navigate";

const NavbarItem = (props) => {
  const { id, title, redirectTo, onClickNavbarItem, isActive } = props;

  const handleClick = () => {
    onClickNavbarItem(title);
    navigate(redirectTo);
  };

  return (
    <li
      key={id}
      className={`${styles.navbarItem} ${isActive ? styles.isActive : ""}`}
      onClick={handleClick}
    >
      {title}
    </li>
  );
};

export default NavbarItem;
