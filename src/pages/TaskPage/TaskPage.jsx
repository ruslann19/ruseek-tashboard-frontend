import { useEffect, useState } from "react";
import { useContext } from "react";

import { TasksContext, TasksProvider } from "@/entities/task";

import tasksApi from "@/shared/api/tasks";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input/Input";
import Textarea from "@/shared/ui/Textarea/Textarea";
import navigate from "@/shared/utils/navigate";

import styles from "./TaskPage.module.css";

const states = [
  { value: "on validation", title: "На проверке" },
  { value: "queue", title: "В очереди" },
  { value: "benchmark", title: "В тестировании" },
  { value: "archive", title: "В архиве" },
];

const ChildComponent = (props) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const options = {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const ruDate = new Date().toLocaleString("ru-RU", options);
  const todayInMoscow = ruDate.split(".").reverse().join("-");

  const [publishedDate, setPublishedDate] = useState(todayInMoscow);
  const [sourceUrl, setSourceUrl] = useState("");

  const { deleteTask, updateTask } = useContext(TasksContext);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const loadedTask = await tasksApi.getById(taskId);

        setTask(loadedTask);
        setQuestion(loadedTask.question);
        setCorrectAnswer(loadedTask.correct_answer);
        setPublishedDate(loadedTask.published_date);
        setSourceUrl(loadedTask.source_url);

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

  const onSave = async () => {
    const updatedTask = {
      ...task,
      question: question.trim(),
      correct_answer: correctAnswer.trim(),
      published_date: publishedDate,
      source_url: sourceUrl.trim(),
    };

    updateTask(updatedTask);

    setTask(updatedTask);
    setQuestion(updatedTask.question);
    setCorrectAnswer(updatedTask.correct_answer);
    setPublishedDate(updatedTask.published_date);
    setSourceUrl(updatedTask.source_url);
  };

  const onCancel = () => {
    setQuestion(task.question);
    setCorrectAnswer(task.correct_answer);
    setPublishedDate(task.published_date);
    setSourceUrl(task.source_url);
  };

  const onDelete = () => {
    const isConfirmed = confirm(
      `Вы уверены, что хотите удалить задачу (id: ${taskId})?`,
    );
    if (isConfirmed) {
      deleteTask(task.id);
      navigate("/tasks");
    }
  };

  return (
    <div className={styles.taskPageContainer}>
      <div>id: {task.id}</div>
      <Textarea value={question} setValue={setQuestion} label="Question" />
      <Textarea
        value={correctAnswer}
        setValue={setCorrectAnswer}
        label="Correct answer"
      />
      <Input
        type={"date"}
        value={publishedDate}
        setValue={setPublishedDate}
        label={"Published date"}
      />
      <Input
        type={"text"}
        value={sourceUrl}
        setValue={setSourceUrl}
        label={"Source URL"}
      />

      <div className={styles.selectWrapper}>
        <span>Статус задачи</span>
        <select
          name="state"
          id="state"
          value={task.state}
          onChange={(event) => setTask({ ...task, state: event.target.value })}
        >
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button onClick={onSave}>Сохранить</Button>
        <Button onClick={onCancel}>Отмена</Button>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button onClick={onDelete}>Удалить</Button>
      </div>
    </div>
  );
};

const TaskPage = (props) => {
  return (
    <TasksProvider>
      <ChildComponent {...props} />
    </TasksProvider>
  );
};

export default TaskPage;
