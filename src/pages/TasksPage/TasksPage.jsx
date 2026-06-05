import Tasks from "@/widgets/Tasks";
import AddTask from "@/features/add-task";
import ListFilter from "@/features/filter-list";
import { TasksProvider } from "@/entities/task";

const TasksPage = () => {
  const sortingFields = [
    { value: "id", title: "id", type: "int" },
    { value: "question", title: "вопроса", type: "string" },
    { value: "correct_answer", title: "правильного ответа", type: "string" },
  ];

  return (
    <TasksProvider>
      <AddTask />
      <ListFilter sortingFields={sortingFields} />
      <Tasks />
    </TasksProvider>
  );
};

export default TasksPage;
