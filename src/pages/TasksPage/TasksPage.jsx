import Tasks from "../../components/Tasks";
import { TasksProvider } from "../../context/TasksContext";

const TasksPage = () => {
  return (
    <TasksProvider>
      <Tasks />
    </TasksProvider>
  );
};

export default TasksPage;
