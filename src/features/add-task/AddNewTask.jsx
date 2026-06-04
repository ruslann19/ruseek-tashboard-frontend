import { useContext, useState } from "react";
import styles from "./AddNewTask.module.css";
import { TasksContext } from "@/entities/task";

const AddNewTask = () => {
  const { addNewTask } = useContext(TasksContext);

  const [newQuestion, setNewQuestion] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  const onAdd = async () => {
    if (
      newQuestion.trim().length === 0 ||
      newCorrectAnswer.trim().length === 0
    ) {
      return;
    }

    const newTask = {
      question: newQuestion,
      correct_answer: newCorrectAnswer,
    };

    await addNewTask(newTask);

    setNewQuestion("");
    setNewCorrectAnswer("");
  };

  return (
    <form
      action="post"
      className={styles.addTaskForm}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.inputWrapper}>
        <label htmlFor="question">Question</label>
        <textarea
          type="text"
          autoComplete="off"
          name="question"
          id="question"
          placeholder="Question"
          value={newQuestion}
          onInput={(event) => {
            setNewQuestion(event.target.value);
          }}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="correct_answer">Correct answer</label>
        <textarea
          type="text"
          autoComplete="off"
          name="correct_answer"
          id="correct_answer"
          placeholder="Correct answer"
          value={newCorrectAnswer}
          onInput={(event) => {
            setNewCorrectAnswer(event.target.value);
          }}
        />
      </div>

      <div>
        <button onClick={onAdd}>Добавить новую задачу</button>
      </div>
    </form>
  );
};

export default AddNewTask;
