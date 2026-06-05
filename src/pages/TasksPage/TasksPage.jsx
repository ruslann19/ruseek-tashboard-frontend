import Tasks from "@/widgets/Tasks";
import AddNewTask from "@/features/add-task";
import ListFilter from "@/features/filter-list";
import { TasksProvider } from "@/entities/task";

const TasksPage = () => {
  return (
    <TasksProvider>
      <AddNewTask />
      <ListFilter />
      <Tasks />
    </TasksProvider>
  );
};

export default TasksPage;
