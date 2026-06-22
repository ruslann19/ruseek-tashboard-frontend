import { useContext } from "react";

import { AnswersContext, AnswersProvider } from "@/entities/answer/";
import {
  BenchmarkVersionsContext,
  BenchmarkVersionsProvider,
} from "@/entities/benchmark-version";
import { LlmsContext, LlmsProvider } from "@/entities/llm";
import { TasksContext, TasksProvider } from "@/entities/task";

import Button from "@/shared/ui/Button";
import monthNumberToName from "@/shared/utils/monthNumberToName";
import navigate from "@/shared/utils/navigate";
import sortByField from "@/shared/utils/sortByField";

import styles from "./GuestAnswersPage.module.css";

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

const ChildComponent = ({ params }) => {
  const benchmarkVersionId = Number(params.benchmarkVersionId);
  const llmId = Number(params.llmId);

  const { allVersions, isLoading: isVersionsLoading } = useContext(
    BenchmarkVersionsContext,
  );
  const currentVersion = allVersions.find(
    (version) => version.id === benchmarkVersionId,
  );
  const { llms: allLlms, isLoading: isLlmsLoading } = useContext(LlmsContext);
  const currentLlm = allLlms.find((llm) => llm.id === llmId);

  const { allAnswers } = useContext(AnswersContext);
  const filteredAnswers = allAnswers.filter(
    (answer) =>
      answer.benchmark_version_id === benchmarkVersionId &&
      answer.llm_id === llmId,
  );
  const orderedAnswers = [...filteredAnswers].sort(
    sortByField("task_id", "asc"),
  );

  const taskIds = orderedAnswers.map((answer) => answer.task_id);

  const { tasks: allTasks } = useContext(TasksContext);
  const filteredTasks = allTasks.filter((task) => taskIds.includes(task.id));

  const extendedAnswersInfo = orderedAnswers.map((answer) => {
    const findedTask = filteredTasks.find((task) => task.id === answer.task_id);
    return {
      ...answer,
      question: findedTask?.question,
      correct_answer: findedTask?.correct_answer,
    };
  });

  return (
    <div className={styles.mainContainer}>
      <section className={styles.infoContainer}>
        <div>
          <div>
            Модель: {isLlmsLoading ? "Loading..." : currentLlm?.llm_name}
          </div>
          <div>
            Версия бенчмарка:{" "}
            {isVersionsLoading
              ? "Loading..."
              : `${monthNumberToName(currentVersion?.month)} ${currentVersion?.year}`}
          </div>
        </div>

        <div>
          <Button
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            Вернуться в лидерборд
          </Button>
        </div>
      </section>

      <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Вопрос</th>
            <th>Ответ модели</th>
            <th>Правильный ответ</th>
            <th>Вердикт судьи</th>
            <th>Объяснение вердикта</th>
          </tr>
        </thead>
        <tbody>
          {extendedAnswersInfo.map((answer, index) => (
            <tr key={answer.id}>
              <td>{index + 1}</td>
              <td>{answer.question}</td>
              <td>{answer.llm_answer}</td>
              <td>{answer.correct_answer}</td>
              <td>{isCorrectContent(answer.is_correct)}</td>
              <td>{answer.judge_explaination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GuestAnswersPage = ({ params }) => {
  return (
    <BenchmarkVersionsProvider>
      <AnswersProvider>
        <TasksProvider>
          <LlmsProvider>
            <ChildComponent params={params} />
          </LlmsProvider>
        </TasksProvider>
      </AnswersProvider>
    </BenchmarkVersionsProvider>
  );
};

export default GuestAnswersPage;
