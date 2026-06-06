import { useContext, useState } from "react";
import { TasksContext } from "@/entities/task";
import Textarea from "@/shared/ui/Textarea";
import Input from "@/shared/ui/Input";
import styles from "./AddTask.module.css";

const AddTask = () => {
  const { addTask } = useContext(TasksContext);

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

  const onAdd = async () => {
    if (
      question.trim().length === 0 ||
      correctAnswer.trim().length === 0 ||
      publishedDate.trim().length === 0 ||
      sourceUrl.trim().length === 0
    ) {
      return;
    }

    const task = {
      question: question,
      correct_answer: correctAnswer,
      published_date: publishedDate,
      source_url: sourceUrl,
    };

    await addTask(task);

    setQuestion("");
    setCorrectAnswer("");
    setPublishedDate(todayInMoscow);
    setSourceUrl("");
  };

  return (
    <form
      action="post"
      className={styles.addTaskForm}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Textarea value={question} setValue={setQuestion} label={"Question"} />
      <Textarea
        value={correctAnswer}
        setValue={setCorrectAnswer}
        label={"Correct answer"}
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

      <div>
        <button onClick={onAdd}>Добавить новую задачу</button>
      </div>
    </form>
  );
};

export default AddTask;
