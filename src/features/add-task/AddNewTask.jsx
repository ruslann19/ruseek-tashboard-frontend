import { useContext, useState } from "react";
import { TasksContext } from "@/entities/task";
import Textarea from "@/shared/ui/Textarea";
import styles from "./AddNewTask.module.css";

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
      <Textarea
        value={newQuestion}
        setValue={setNewQuestion}
        label={"Question"}
      />
      <Textarea
        value={newCorrectAnswer}
        setValue={setNewCorrectAnswer}
        label={"Correct answer"}
      />
      <div>
        <button onClick={onAdd}>Добавить новую задачу</button>
      </div>
    </form>
  );
};

export default AddNewTask;
