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

import styles from "./GuestTaskPage.module.css";

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
  const taskId = Number(params.taskId);

  const { allVersions, isLoading: isVersionsLoading } = useContext(
    BenchmarkVersionsContext,
  );
  const currentVersion = allVersions.find(
    (version) => version.id === benchmarkVersionId,
  );

  const { tasks: allTasks, isLoading: isTasksLoading } =
    useContext(TasksContext);
  const currentTask = allTasks.find((task) => task.id === taskId);

  const { allAnswers } = useContext(AnswersContext);
  const filteredAnswers = allAnswers.filter(
    (answer) =>
      answer.benchmark_version_id === benchmarkVersionId &&
      answer.task_id === taskId,
  );
  const orderedAnswers = [...filteredAnswers].sort(
    sortByField("llm_id", "asc"),
  );
  const llmIds = orderedAnswers.map((answer) => answer.llm_id);

  const { llms: allLlms } = useContext(LlmsContext);
  const filteredLlms = allLlms.filter((llm) => llmIds.includes(llm.id));

  const extendedAnswersInfo = orderedAnswers.map((answer) => {
    const findedLlm = filteredLlms.find((llm) => llm.id === answer.llm_id);
    return {
      ...answer,
      llm_name: findedLlm.llm_name,
    };
  });

  return (
    <div className={styles.mainContainer}>
      <section className={styles.infoContainer}>
        <div>
          <div>
            Версия бенчмарка:{" "}
            {isVersionsLoading
              ? "Loading..."
              : `${monthNumberToName(currentVersion?.month)} ${currentVersion?.year}`}
          </div>
          <div>
            Вопрос: {isTasksLoading ? "Loading..." : currentTask?.question}
          </div>
          <div>
            Правильный ответ:{" "}
            {isTasksLoading ? "Loading..." : currentTask?.correct_answer}
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
            <th>Модель</th>
            <th>Ответ модели</th>
            <th>Вердикт судьи</th>
            <th>Объяснение вердикта</th>
          </tr>
        </thead>
        <tbody>
          {extendedAnswersInfo.map((answer, index) => (
            <tr key={answer.id}>
              <td>{index + 1}</td>
              <td>{answer.llm_name}</td>
              <td>{answer.llm_answer}</td>
              <td>{isCorrectContent(answer.is_correct)}</td>
              <td>{answer.judge_explaination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GuestTaskPage = ({ params }) => {
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

export default GuestTaskPage;
