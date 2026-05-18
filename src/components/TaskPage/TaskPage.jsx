import TaskItem from "../TaskItem";

const TaskPage = (props) => {
  const { id, question, answer } = props;
  return <TaskItem id={id} question={question} answer={answer} />;
};

export default TaskPage;
