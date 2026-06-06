import { useContext, useState } from "react";

import { TasksProvider } from "@/entities/task";
import TaskItem, { TasksContext } from "@/entities/task";

import Filter from "@/shared/ui/Filter";
import List from "@/shared/ui/List";
import sortByField from "@/shared/utils/sortByField";

const sortingFields = [
  { value: "id", title: "id", type: "int" },
  { value: "question", title: "вопроса", type: "string" },
  { value: "correct_answer", title: "правильного ответа", type: "string" },
];

const Main = () => {
  let { tasks, emptyListMessage } = useContext(TasksContext);

  const [filterParams, setFilterParams] = useState({
    order: "asc",
    field: sortingFields[0].value,
    search: "",
  });

  const searchedTasks = tasks.filter((task) =>
    task.question.toLowerCase().includes(filterParams.search.toLowerCase()),
  );
  const sortedTasks = [...searchedTasks].sort(
    sortByField(filterParams.field, filterParams.order),
  );

  if (sortedTasks.length === 0) {
    emptyListMessage = "Подходящие задачи не найдены";
  }

  return (
    <>
      <Filter
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        sortingFields={sortingFields}
      />
      <List emptyListMessage={emptyListMessage}>
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            question={task.question}
            correct_answer={task.correct_answer}
          />
        ))}
      </List>
    </>
  );
};

const TasksPage = () => {
  return (
    <TasksProvider>
      <Main />
    </TasksProvider>
  );
};

export default TasksPage;
