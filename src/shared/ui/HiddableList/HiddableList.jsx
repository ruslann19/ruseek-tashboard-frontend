import Button from "@/shared/ui/Button";

import styles from "./HiddableList.module.css";

const HiddableList = (props) => {
  const { title, areItemsHidden, setAreItemsHidden, children } = props;

  //   console.log("HiddableList children:", children);

  const hideItems = () => {
    console.log("hide");
    setAreItemsHidden(true);
  };
  const showItems = () => {
    console.log("show");
    setAreItemsHidden(false);
  };

  return (
    <div>
      <div className={styles.flexRow}>
        <div>
          {title} ({children.length})
        </div>
        {areItemsHidden ? (
          <Button onClick={showItems}>Показать</Button>
        ) : (
          <Button onClick={hideItems}>Скрыть</Button>
        )}
      </div>
      {!areItemsHidden && <div>{children}</div>}
    </div>
  );
};

export default HiddableList;
