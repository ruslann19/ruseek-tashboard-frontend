import { useContext } from "react";
import styles from "./ListFilter.module.css";
import { TasksContext } from "@/entities/task";

const ListFilter = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form
      className={styles.filterWrapper}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <span>Сортировать по:</span>
      <select name="direction" id="direction">
        <option value="increase">убыванию</option>
        <option value="decrease">возрастанию</option>
      </select>
      <select name="field" id="field">
        <option value="id">id</option>
        <option value="rating">рейтинга</option>
      </select>
      <input
        type="text"
        autoComplete="off"
        name="search"
        id="search"
        placeholder="Search"
        value={searchQuery}
        onInput={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
    </form>
  );
};

export default ListFilter;
