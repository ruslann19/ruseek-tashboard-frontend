import { useEffect, useState } from "react";
import tasksAPI from "@/shared/api/tasks";

const TaskPage = (props) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const loadedTask = await tasksAPI.getById(taskId);
        setTask(loadedTask);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Task not found!</div>;
  }

  return (
    <div>
      <div>id: {task.id}</div>
      <div>question: {task.question}</div>
      <div>correct_answer: {task.correct_answer}</div>
    </div>
  );
};

export default TaskPage;
