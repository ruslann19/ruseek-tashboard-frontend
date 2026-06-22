import Button from "@/shared/ui/Button";

import styles from "./Paginator.module.css";

const Paginator = ({
  pages,
  currentPageNumber,
  setCurrentPageNumber,
  onUpdatePageNumber,
}) => {
  const toNextPage = () => {
    setCurrentPageNumber((prev) => {
      const newPageNumber = prev + 1;
      onUpdatePageNumber(newPageNumber);
      return newPageNumber;
    });
  };

  const toPreviousPage = () => {
    setCurrentPageNumber((prev) => {
      const newPageNumber = prev - 1;
      onUpdatePageNumber(newPageNumber);
      return newPageNumber;
    });
  };

  return pages.length > 0 ? (
    <div className={styles.main}>
      <Button onClick={toPreviousPage} disabled={currentPageNumber <= 0}>
        Назад
      </Button>
      <div>{pages[currentPageNumber].title}</div>
      <Button
        onClick={toNextPage}
        disabled={currentPageNumber >= pages.length - 1}
      >
        Вперёд
      </Button>
    </div>
  ) : (
    <div>Список пустой</div>
  );
};

export default Paginator;
