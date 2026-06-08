import { useState } from "react";

import Button from "@/shared/ui/Button";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./NewTest.module.css";
import { newTestEventEmitter } from "./common";

const Testing = ({
  formData,
  isTestingStarted,
  setIsTestingStarted,
  setCurrentStep,
}) => {
  const [progress, setProgress] = useState(() => [
    { type: "judge", llmId: null, llmName: "LLM-as-a-Judge", progress: 0 },
    ...formData.selectedModels.map((model) => ({
      type: "llm",
      llmId: model.id,
      llmName: model.llm_name,
      progress: 0,
    })),
  ]);
  const [isTestingFinished, setIsTestingFinished] = useState(false);

  const totalTasks = formData.selectedTasks.length;
  const totalModels = formData.selectedModels.length;
  const totalAnswers = totalTasks * totalModels;

  const updateProgress = (message) => {
    setProgress((previousProgress) => {
      let progressCopy = [...previousProgress];

      if (message.progress_type === "verification") {
        progressCopy = progressCopy.map((item) =>
          item.type === "judge"
            ? { ...item, progress: item.progress + 1 }
            : item,
        );
      } else {
        progressCopy = progressCopy.map((item) =>
          item.llmId === message.tested_llm_id
            ? { ...item, progress: item.progress + 1 }
            : item,
        );
      }

      return progressCopy;
    });
  };

  const onClick = () => {
    if (JSON.stringify(formData.benchmarkVersion) === "{}") {
      autoAlert("Не выбрана версия бенчмарка");
      return;
    }
    if (formData.selectedTasks.length === 0) {
      autoAlert("Не выбраны задачи для тестирования");
      return;
    }
    if (formData.selectedModels.length === 0) {
      autoAlert("Не выбраны модели для тестирования");
      return;
    }

    autoAlert("Запускаем тестирование");
    setIsTestingStarted(true);

    const ws = new WebSocket("ws://localhost:8000/ws/test-llms");

    const formDataForSending = {
      benchmark_version: formData.benchmarkVersion,
      selected_tasks: formData.selectedTasks,
      selected_llms: formData.selectedModels,
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(formDataForSending));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      updateProgress(message);
    };

    ws.onclose = () => {
      setIsTestingFinished(true);
    };

    ws.onerror = (error) => {
      console.error("Ошибка вебсокета:", error);
    };
  };

  const onClickDone = () => {
    setCurrentStep(1);
    setIsTestingStarted(false);
    setIsTestingFinished(false);
    newTestEventEmitter.emit("testing done");
  };

  return (
    <div>
      <div className={styles.flexRow}>
        <div>
          <div>
            benchmarkVersion: {JSON.stringify(formData.benchmarkVersion)}
          </div>
          <div>selected tasks: {formData.selectedTasks.length}</div>
          <div>selected models: {formData.selectedModels.length}</div>
        </div>
        <div>
          <Button onClick={onClick} disabled={isTestingStarted}>
            Запустить тестирование
          </Button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>LLM</th>
            <th>Решено задач</th>
            <th>Процент выполнения</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{progress[0].llmName}</td>
            <td>{progress[0].progress}</td>
            <td>{Math.round(progress[0].progress / totalAnswers) * 100}%</td>
          </tr>
          {progress.slice(1).map((item, index) => (
            <tr key={index}>
              <td>{item.llmName}</td>
              <td>{item.progress}</td>
              <td>{Math.round((item.progress / totalTasks) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Button onClick={onClickDone} disabled={!isTestingFinished}>
          Готово
        </Button>
      </div>
    </div>
  );
};

export default Testing;
