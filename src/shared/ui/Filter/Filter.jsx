import styles from "./Filter.module.css";

const Filter = (props) => {
  const { sortingFields, filterParams, setFilterParams } = props;

  const onChangeSortedField = (event) => {
    setFilterParams({ ...filterParams, field: event.target.value });
  };

  const onChangeSortOrder = (event) => {
    setFilterParams({ ...filterParams, order: event.target.value });
  };

  const onSearchInput = (event) => {
    setFilterParams({ ...filterParams, search: event.target.value });
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
        value={filterParams.search}
        onInput={onSearchInput}
      />
    </form>
  );
};

export default Filter;
