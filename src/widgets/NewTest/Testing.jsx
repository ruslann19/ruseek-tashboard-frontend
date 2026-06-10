import { useEffect, useState } from "react";

import Button from "@/shared/ui/Button";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./NewTest.module.css";
import { newTestEventEmitter, newTestEvents } from "./common";

const Testing = ({
  formData,
  isTestingStarted,
  setIsTestingStarted,
  setCurrentStep,
}) => {
  const [isTestingFinished, setIsTestingFinished] = useState(false);
  const [progress, setProgress] = useState(() => [
    { type: "judge", llmId: null, llmName: "LLM-as-a-Judge", progress: 0 },
    ...formData.selectedModels.map((model) => ({
      type: "llm",
      llmId: model.id,
      llmName: model.llm_name,
      progress: 0,
    })),
  ]);

  useEffect(() => {
    const updateSelectedModelsInProgress = async () => {
      setProgress(() => {
        return [
          {
            type: "judge",
            llmId: null,
            llmName: "LLM-as-a-Judge",
            progress: 0,
          },
          ...formData.selectedModels.map((model) => ({
            type: "llm",
            llmId: model.id,
            llmName: model.llm_name,
            progress: 0,
          })),
        ];
      });
    };

    updateSelectedModelsInProgress();
  }, [formData.selectedModels]);

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

    const ws = new WebSocket("ws://localhost:8000/ws/create-benchmark-version");

    const formDataForSending = {
      benchmark_version: formData.benchmarkVersion,
      selected_tasks: formData.selectedTasks,
      selected_llms: formData.selectedModels,
    };

    ws.onopen = () => {
      console.log("ws open");
      ws.send(JSON.stringify(formDataForSending));
    };

    ws.onmessage = (event) => {
      console.log("ws message");
      const message = JSON.parse(event.data);
      updateProgress(message);
    };

    ws.onclose = () => {
      console.log("ws close");
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
    newTestEventEmitter.emit(newTestEvents.testingDone);
  };

  return (
    <div>
      <div className={styles.flexRow}>
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
              <td>
                {totalAnswers === 0
                  ? 0
                  : Math.round(progress[0].progress / totalAnswers) * 100}
                %
              </td>
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
          <Button onClick={onClick} disabled={isTestingStarted}>
            Запустить тестирование
          </Button>
        </div>
        <div>
          <Button onClick={onClickDone} disabled={!isTestingFinished}>
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testing;
