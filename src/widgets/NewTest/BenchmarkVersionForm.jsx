import { useEffect, useState } from "react";

import tasksApi from "@/shared/api/tasks";
import Button from "@/shared/ui/Button";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./NewTest.module.css";

const monthNumberToName = (monthNumber) => {
  const mapper = {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь",
  };

  return mapper[monthNumber];
};

const BenchmarkVersionForm = ({
  updateFormData,
  setCurrentStep,
  isTestingStarted,
}) => {
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // benchmark version
  const [benchmarkVersionState, setBenchmarkVersionState] = useState({
    benchmarkVersion: null,
    isReady: false,
    potentialBenchmarkVersions: [],
  });

  //   useEffect
  useEffect(() => {
    const fetchData = async () => {
      const result = await tasksApi.getBenchmarkVersions();
      setBenchmarkVersionState((prev) => {
        return { ...prev, potentialBenchmarkVersions: result.potential };
      });
    };

    fetchData();
  }, []);

  const benchmarkVersionCallbacks = {
    onChange: async (event) => {
      const version = JSON.parse(event.target.value);
      setBenchmarkVersionState((prev) => {
        return { ...prev, benchmarkVersion: version };
      });
    },
    onReady: () => {
      // TODO: Вернуть это после тестирования
      // if (benchmarkVersionState.benchmarkVersion === null) {
      //   autoAlert("Версия бенчмарка не выбрана");
      //   return;
      // }

      // TODO: Убрать это после тестирования
      const select = document.getElementById("version-select");
      select.selectedIndex = 3;

      setBenchmarkVersionState((prev) => {
        return { ...prev, isReady: true };
      });

      const tmpBenchmarkVersion = { year: 2026, month: 5 };
      updateFormData({ benchmarkVersion: tmpBenchmarkVersion });

      nextStep();
    },
    onCancel: () => {
      setBenchmarkVersionState((prev) => {
        return { ...prev, isReady: false };
      });

      updateFormData({ benchmarkVersion: {} });
      setCurrentStep(1);
    },
  };

  return (
    <form className={styles.flexRow}>
      <div>Выберите версию бенчмарка:</div>
      <select
        name="version-select"
        id="version-select"
        onChange={benchmarkVersionCallbacks.onChange}
        disabled={benchmarkVersionState.isReady}
      >
        <option value="null" key={"Версия бенчмарка"}>
          Версия бенчмарка
        </option>
        {benchmarkVersionState.potentialBenchmarkVersions.map((version) => (
          <option value={JSON.stringify(version)} key={JSON.stringify(version)}>
            {`${monthNumberToName(version.month)} ${version.year}`}
          </option>
        ))}
      </select>
      <Button
        onClick={benchmarkVersionCallbacks.onReady}
        disabled={benchmarkVersionState.isReady}
      >
        Далее
      </Button>
      <Button
        onClick={benchmarkVersionCallbacks.onCancel}
        disabled={isTestingStarted}
      >
        Отмена
      </Button>
    </form>
  );
};

export default BenchmarkVersionForm;
