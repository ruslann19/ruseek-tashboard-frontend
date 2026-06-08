import { useContext, useState } from "react";

import { TasksContext } from "@/entities/task";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Textarea from "@/shared/ui/Textarea";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./AddTask.module.css";

const AddTask = () => {
  const { addTask } = useContext(TasksContext);

  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [publishedDate, setPublishedDate] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const onAdd = async () => {
    if (question.trim().length === 0) {
      autoAlert("Не введён вопрос");
      return;
    }
    if (correctAnswer.trim().length === 0) {
      autoAlert("Не указан правильный ответ");
      return;
    }
    if (publishedDate.trim().length === 0) {
      autoAlert("Не указана дата публикации");
      return;
    }
    if (sourceUrl.trim().length === 0) {
      autoAlert("Не указан URL (источник)");
      return;
    }

    const task = {
      question: question.trim(),
      correct_answer: correctAnswer.trim(),
      published_date: publishedDate.trim(),
      source_url: sourceUrl.trim(),
    };

    await addTask(task);

    setQuestion("");
    setCorrectAnswer("");
    setPublishedDate("");
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
        <Button onClick={onAdd}>Добавить новую задачу</Button>
      </div>
    </form>
  );
};

export default AddTask;
