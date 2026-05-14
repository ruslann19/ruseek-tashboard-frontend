import ListFilter from "../ListFilter";
import AddNewItemSection from "../AddNewItemSection";
import List from "../List";
import TaskItem from "../TaskItem";

const TasksPage = () => {
  const tasks = [
    {
      id: 1,
      question: "Кто придумал закон Ньютона?",
      answer: "Ньютон",
    },
    {
      id: 2,
      question: "2 + 2 * 2 = ?",
      answer: "6",
    },
  ];

  return (
    <div>
      <AddNewItemSection buttonTitle={"Добавить новую задачу"} />
      <ListFilter />
      <List>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            question={task.question}
            answer={task.answer}
          />
        ))}
      </List>
    </div>
  );
};

export default TasksPage;
