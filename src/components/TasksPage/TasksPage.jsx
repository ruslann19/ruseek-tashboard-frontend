import ListFilter from "../ListFilter";
import List from "../List";
import TaskItem from "../TaskItem";
import AddNewTask from "../AddNewTask";
import { TasksContext } from "../../context/TasksContext";
import { useContext } from "react";

const TasksPage = () => {
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

export default TasksPage;
