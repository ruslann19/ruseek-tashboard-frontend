import { useContext, useEffect, useState } from "react";

import { AnswersContext, AnswersProvider } from "@/entities/answer/";
import {
  BenchmarkVersionsContext,
  BenchmarkVersionsProvider,
} from "@/entities/benchmark-version";
import { LlmsContext, LlmsProvider } from "@/entities/llm";
import { TasksContext, TasksProvider } from "@/entities/task";

import Button from "@/shared/ui/Button";
import Paginator from "@/shared/ui/Paginator";
import sortByField from "@/shared/utils/sortByField";

import styles from "./LeaderboardPage.module.css";

const LlmsRating = ({ benchmarkVersion }) => {
  const { allAnswers } = useContext(AnswersContext);
  const filteredAnswers = benchmarkVersion
    ? allAnswers.filter(
        (answer) => answer.benchmark_version_id === benchmarkVersion.id,
      )
    : [];

  const { llms: allLlms } = useContext(LlmsContext);

  const usedLlmsIds = [
    ...new Set(filteredAnswers.map((answer) => answer.llm_id)),
  ];

  const calculateAccuracy = (llmId) => {
    const llmAnswers = filteredAnswers.filter(
      (answer) => answer.llm_id === llmId,
    );
    const correctAnswers = llmAnswers.filter(
      (answer) => answer.is_correct === true,
    );
    return correctAnswers.length;
  };

  const usedLlms = allLlms.filter((llm) => usedLlmsIds.includes(llm.id));

  const rating = usedLlms.map((llm) => {
    return { ...llm, accuracy: calculateAccuracy(llm.id) };
  });

  const orderedRating = [...rating].sort(sortByField("accuracy", "desc"));

  return (
    <table>
      <thead>
        <tr>
          <th>Место</th>
          <th>Модель</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        {orderedRating.map((llm, index) => (
          <tr key={llm.id}>
            <td>{index + 1}</td>
            <td>{llm.llm_name}</td>
            <td>{llm.accuracy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TasksRating = ({ benchmarkVersion }) => {
  const { allAnswers } = useContext(AnswersContext);

  const filteredAnswers = benchmarkVersion
    ? allAnswers.filter(
        (answer) => answer.benchmark_version_id === benchmarkVersion.id,
      )
    : [];

  const { tasks: allTasks } = useContext(TasksContext);

  const usedTasksIds = [
    ...new Set(filteredAnswers.map((task) => task.task_id)),
  ];

  const calculateRating = (taskId) => {
    const llmAnswers = filteredAnswers.filter(
      (answer) => answer.task_id === taskId,
    );
    const correctAnswers = llmAnswers.filter(
      (answer) => answer.is_correct === true,
    );
    return correctAnswers.length;
  };

  const usedTasks = allTasks.filter((task) => usedTasksIds.includes(task.id));

  const rating = usedTasks.map((task) => {
    return { ...task, rating: calculateRating(task.id) };
  });

  const orderedRating = [...rating].sort(sortByField("rating", "asc"));

  return (
    <table>
      <thead>
        <tr>
          <th>Место</th>
          <th>Вопрос</th>
          <th>Количество правильных ответов</th>
        </tr>
      </thead>
      <tbody>
        {orderedRating.map((task, index) => (
          <tr key={task.id}>
            <td>{index + 1}</td>
            <td>{task.question}</td>
            <td>{task.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ChildComponent = () => {
  const { allVersions, isVersionsLoading } = useContext(
    BenchmarkVersionsContext,
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState({});

  useEffect(() => {
    const loadVersion = () => {
      if (isVersionsLoading) {
        setSelectedVersion(null);
      } else {
        const savedVersion = JSON.parse(
          localStorage.getItem("selected-version"),
        );

        let currentVersion = savedVersion
          ? savedVersion
          : allVersions[currentPageNumber];

        let versionIndex = allVersions.findIndex(
          (version) => version.id === currentVersion.id,
        );

        if (versionIndex === -1) {
          versionIndex = 0;
          currentVersion = allVersions[versionIndex];
        }

        setSelectedVersion(currentVersion);
        localStorage.setItem(
          "selected-version",
          JSON.stringify(currentVersion),
        );
        setCurrentPageNumber(versionIndex);
      }
    };
    loadVersion();
  }, [isVersionsLoading]);

  const onUpdatePageNumber = (newPageNumber) => {
    const newVersion = allVersions[newPageNumber];
    setSelectedVersion(newVersion);
    localStorage.setItem("selected-version", JSON.stringify(newVersion));
  };

  const savedRatingType = localStorage.getItem("rating-type");
  const [ratingType, setRatingType] = useState(
    savedRatingType ? savedRatingType : "models",
  );

  const toggleLeaderboardType = () => {
    if (ratingType === "models") {
      setRatingType("tasks");
      localStorage.setItem("rating-type", "tasks");
    } else if (ratingType === "tasks") {
      setRatingType("models");
      localStorage.setItem("rating-type", "models");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <section className={styles.header}>
        <span>Лидерборд</span>
        <div className={styles.flexRowSpaceBetween}>
          <div className={styles.flexRow}>
            <div>Версия бенчмарка</div>
            <Paginator
              pages={allVersions}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              onUpdatePageNumber={onUpdatePageNumber}
            />
          </div>

          <div className={styles.flexRow}>
            <Button
              onClick={toggleLeaderboardType}
              disabled={ratingType === "models"}
            >
              Модели
            </Button>
            <div>|</div>
            <Button
              onClick={toggleLeaderboardType}
              disabled={ratingType === "tasks"}
            >
              Задачи
            </Button>
          </div>
        </div>
      </section>

      <section>
        {selectedVersion && ratingType === "models" ? (
          <LlmsRating benchmarkVersion={selectedVersion} />
        ) : (
          <TasksRating benchmarkVersion={selectedVersion} />
        )}
      </section>
    </div>
  );
};

const LeaderboardPage = () => {
  return (
    <BenchmarkVersionsProvider>
      <AnswersProvider>
        <TasksProvider>
          <LlmsProvider>
            <ChildComponent />
          </LlmsProvider>
        </TasksProvider>
      </AnswersProvider>
    </BenchmarkVersionsProvider>
  );
};

export default LeaderboardPage;
