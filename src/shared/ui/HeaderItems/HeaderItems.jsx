import styles from "./HeaderItems.module.css";

const HeaderItems = (props) => {
  const { activeItem, setActiveItem, items } = props;

  const onClickItem = (event) => {
    setActiveItem(event.target.innerHTML);
  };

  return (
    <div className={styles.header}>
      {items.map((item, index) => (
        <span
          key={index}
          onClick={onClickItem}
          className={
            item === activeItem
              ? `${styles.headerItem} ${styles.activeHeaderItem}`
              : styles.headerItem
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default HeaderItems;
