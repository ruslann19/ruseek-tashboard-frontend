import { useState } from "react";

import Button from "@/shared/ui/Button";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./SelectLlmsAndTasks.module.css";
import { localEventEmitter, localEvents } from "./common";

const Testing = ({
  formData,
  isTestingStarted,
  setIsTestingStarted,
  setCurrentStep,
}) => {
  const [isTestingFinished, setIsTestingFinished] = useState(false);

  const haveNewTasks = formData.newTasks.length > 0;
  const filteredOldLlms = formData.oldLlms.filter(
    (llm) => !formData.deletedLlms.includes(llm),
  );
  const testingLlms = haveNewTasks
    ? [...filteredOldLlms, ...formData.newLlms]
    : [...formData.newLlms];

  const [progress, setProgress] = useState(() => [
    {
      type: "judge",
      llmId: "judge",
      llmName: "LLM-as-a-Judge",
      solvedTasks: 0,
    },
    ...testingLlms.map((model) => ({
      type: "llm",
      llmId: model.id,
      llmName: model.llm_name,
      solvedTasks: 0,
    })),
  ]);

  const tasksToSolve = testingLlms.map((llm) => {
    const isOldLlm = formData.oldLlms.includes(llm);
    const totalTasks = isOldLlm
      ? formData.newTasks.length
      : formData.oldTasks.length + formData.newTasks.length;
    return { llmId: llm.id, totalTasks: totalTasks };
  });
  let totalAnswers = tasksToSolve.reduce(
    (sum, item) => sum + item.totalTasks,
    0,
  );
  const getTotalTasks = (llmId) => {
    const llmInfo = tasksToSolve.find((llm) => llm.llmId === llmId);
    return llmInfo.totalTasks;
  };

  const updateProgress = (message) => {
    setProgress((previousProgress) => {
      let progressCopy = [...previousProgress];

      if (message.progress_type === "verification") {
        progressCopy = progressCopy.map((item) =>
          item.type === "judge"
            ? { ...item, solvedTasks: item.solvedTasks + 1 }
            : item,
        );
      } else {
        progressCopy = progressCopy.map((item) =>
          item.llmId === message.tested_llm_id
            ? { ...item, solvedTasks: item.solvedTasks + 1 }
            : item,
        );
      }

      return progressCopy;
    });
  };

  const onClick = () => {
    autoAlert("Запускаем тестирование");
    setIsTestingStarted(true);

    const ws = new WebSocket("ws://localhost:8000/ws/update-benchmark-version");

    const formDataForSending = {
      benchmark_version: formData.benchmarkVersion,
      old_tasks: formData.oldTasks,
      old_llms: formData.oldLlms,
      deleted_tasks: formData.deletedTasks,
      deleted_llms: formData.deletedLlms,
      new_tasks: formData.newTasks,
      new_llms: formData.newLlms,
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
    localEventEmitter.emit(localEvents.testingDone);
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
              <td>{progress[0].solvedTasks}</td>
              <td>
                {Math.round((progress[0].solvedTasks / totalAnswers) * 100)}%
              </td>
            </tr>
            {progress.slice(1).map((item, index) => (
              <tr key={index}>
                <td>{item.llmName}</td>
                <td>{item.solvedTasks}</td>
                <td>
                  {Math.round(
                    (item.solvedTasks / getTotalTasks(item.llmId)) * 100,
                  )}
                  %
                </td>
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
