import { useEffect, useState } from "react";

import { TasksProvider } from "@/entities/task";

import AddTask from "@/features/add-task";

import HeaderItems from "@/shared/ui/HeaderItems";
import Input from "@/shared/ui/Input";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./AddTasksPage.module.css";

const items = ["Добавить задачу вручную", 'Распарсить выпуск из "Своей игры"'];

const ParseGame = () => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const [parsedTasks, setParsedTasks] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (sourceUrl.trim().length === 0) {
      autoAlert("Не указан URL");
      return;
    }
    if (publishedDate.trim().length === 0) {
      autoAlert("Не указана дата публикации");
      return;
    }

    const button = document.getElementById("parse-game-submit");
    button.disabled = true;

    const gameMetadata = {
      source_url: sourceUrl,
      published_date: publishedDate,
    };

    const ws = new WebSocket("ws://localhost:8000/ws/");

    ws.onopen = () => {
      ws.send(JSON.stringify(gameMetadata));
    };

    ws.onmessage = (event) => {
      const wsMessage = JSON.parse(event.data);

      if (wsMessage.type === "error") {
        autoAlert(wsMessage.content);
      } else if (wsMessage.type === "task") {
        const task = JSON.parse(wsMessage.content);
        setParsedTasks((prevTasks) => [...prevTasks, task]);
      }
    };

    ws.onclose = () => {
      button.disabled = false;
    };

    ws.onerror = (error) => {
      console.error("Ошибка вебсокета:", error);
    };
  };

  return (
    <>
      <form className={styles.parseGameForm}>
        <Input
          type={"text"}
          value={sourceUrl}
          setValue={setSourceUrl}
          label={"Source URL"}
        />
        <Input
          type={"date"}
          value={publishedDate}
          setValue={setPublishedDate}
          label={"Published date"}
        />
        <button id="parse-game-submit" onClick={onSubmit}>
          Распарсить
        </button>
      </form>
      <div>
        <span>Распаршено задач: {parsedTasks.length}</span>
        {parsedTasks.map((task, index) => (
          <div key={index}>
            <a href={`/tasks/${task.id}`} target={"_blank"}>
              {task.question}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

const AddTasksPage = () => {
  const ACTIVE_ITEM_KEY = "add-tasks-active-item";

  const savedActiveItem = localStorage.getItem(ACTIVE_ITEM_KEY);

  const [activeItem, setActiveItem] = useState(
    savedActiveItem ? savedActiveItem : items[0],
  );

  useEffect(() => {
    localStorage.setItem(ACTIVE_ITEM_KEY, activeItem);
  }, [activeItem]);

  let content = null;
  if (activeItem === items[0]) {
    content = <AddTask />;
  } else if (activeItem === items[1]) {
    content = <ParseGame />;
  }

  return (
    <TasksProvider>
      <HeaderItems
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      {content}
    </TasksProvider>
  );
};

export default AddTasksPage;
