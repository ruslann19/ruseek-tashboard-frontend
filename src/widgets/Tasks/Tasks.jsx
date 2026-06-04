import { useContext } from "react";
import { TasksContext } from "@/entities/task";
import AddNewTask from "@/features/add-task";
import ListFilter from "@/features/filter-list";
import List from "@/shared/ui/List";
import TaskItem from "@/entities/task";

const Tasks = () => {
  const { emptyListMessage, displayedTasks } = useContext(TasksContext);

  return (
    <div>
      <AddNewTask />
      <ListFilter />
      <List emptyListMessage={emptyListMessage}>
        {displayedTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            question={task.question}
            correct_answer={task.correct_answer}
          />
        ))}
      </List>
    </div>
  );
};

export default Tasks;
