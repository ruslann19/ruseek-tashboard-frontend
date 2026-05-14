import styles from "./TasksFilter.module.css";

const TasksFilter = () => {
  return (
    <section className={styles.filterWrapper}>
      <span>Сортировать по:</span>
      <select name="direction" id="direction">
        <option value="increase">убыванию</option>
        <option value="decrease">возрастанию</option>
      </select>
      <select name="field" id="field">
        <option value="id">id</option>
        <option value="rating">рейтинга</option>
      </select>

      <button>Добавить новую задачу</button>
    </section>
  );
};

export default TasksFilter;
