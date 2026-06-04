import Tasks from "@/widgets/Tasks";
import { TasksProvider } from "@/entities/task";

const TasksPage = () => {
  return (
    <TasksProvider>
      <Tasks />
    </TasksProvider>
  );
};

export default TasksPage;
