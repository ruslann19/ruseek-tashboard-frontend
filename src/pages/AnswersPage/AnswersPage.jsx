import { useEffect, useState } from "react";

import {
  answersApi,
  benchmarkVersionsApi,
  llmsApi,
  tasksApi,
} from "@/shared/api";
import List from "@/shared/ui/List";

import styles from "./AnswersPage.module.css";

const AnswersPage = ({ params }) => {
  const benchmarkVersionId = Number(params.benchmarkVersionId);
  const llmId = Number(params.llmId);

  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [benchmarkVersion, setBenchmarkVersion] = useState({});
  const [llmInfo, setLlmInfo] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const loadedAnswers =
        await answersApi.getByBenchmarkVersion(benchmarkVersionId);
      const filteredAnswers = loadedAnswers.filter(
        (answer) => answer.llm_id === llmId,
      );
      setAnswers(filteredAnswers);

      const loadedVersion =
        await benchmarkVersionsApi.getById(benchmarkVersionId);
      setBenchmarkVersion(loadedVersion);

      const loadedLlmInfo = await llmsApi.getById(llmId);
      setLlmInfo(loadedLlmInfo);

      const loadedTasks = await tasksApi.getByMonth(
        loadedVersion.year,
        loadedVersion.month,
      );
      const tasksIds = filteredAnswers.map((answer) => answer.task_id);
      const filteredTasks = loadedTasks.filter((task) =>
        tasksIds.includes(task.id),
      );
      setTasks(filteredTasks);

      setIsLoading(false);
    };

    fetchAnswers();
  }, []);

  const questionContent = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    return task.question;
  };
  const correctAnswerContent = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    return task.correct_answer;
  };

  const isCorrectContent = (isCorrect) => {
    if (isCorrect === true) {
      return "Правильно";
    }
    if (isCorrect === false) {
      return "Неправильно";
    }
    if (isCorrect === null) {
      return "Не определено";
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>Версия бенчмарка: {JSON.stringify(benchmarkVersion)}</div>
      <div>Модель: {llmInfo.llm_name}</div>
      <div>Ответы модели:</div>
      <List>
        {answers.map((answer) => (
          <div key={answer.id} className={styles.answer}>
            <div>Вопрос: {questionContent(answer.task_id)}</div>
            <div>Ответ модели: {answer.llm_answer}</div>
            <div>Правильный ответ: {correctAnswerContent(answer.task_id)}</div>
            <div>Вердикт судьи: {isCorrectContent(answer.is_correct)}</div>
            <div>Объяснение от судьи: {answer.judge_explaination}</div>
          </div>
        ))}
      </List>
    </div>
  );
};

export default AnswersPage;
