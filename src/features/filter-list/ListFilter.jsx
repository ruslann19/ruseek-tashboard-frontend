import { useContext } from "react";
import styles from "./ListFilter.module.css";
import { TasksContext } from "@/entities/task";

const ListFilter = (props) => {
  const { sortingFields } = props;

  const { setSortedField, setSortOrder, searchQuery, setSearchQuery } =
    useContext(TasksContext);

  const onChangeSortedField = (event) => {
    setSortedField(event.target.value);
  };

  const onChangeSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <form
      className={styles.filterWrapper}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <span>Сортировать по:</span>
      <select name="direction" id="direction" onChange={onChangeSortOrder}>
        <option value="asc">возрастанию</option>
        <option value="desc">убыванию</option>
      </select>
      <select
        onChange={onChangeSortedField}
        name="sorting_fields"
        id="sorting_fields"
      >
        {sortingFields.map((field) => (
          <option value={field.value} key={field.value}>
            {field.title}
          </option>
        ))}
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
