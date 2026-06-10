import { useEffect, useState } from "react";

import { benchmarkVersionsApi } from "@/shared/api";
import Button from "@/shared/ui/Button";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./SelectBenchmarkVersion.module.css";

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

const availableVersionCategories = {
  existing: "existing",
  potential: "potential",
};

const getNeededVersions = async (versionsCategory) => {
  if (versionsCategory === availableVersionCategories.existing) {
    return await benchmarkVersionsApi.getAll();
  }
  if (versionsCategory === availableVersionCategories.potential) {
    return await benchmarkVersionsApi.getAllPotential();
  }
};

const SelectBenchmarkVersion = ({
  updateFormData,
  setCurrentStep,
  isTestingStarted,
  versionsCategory,
  eventEmitter,
  events,
}) => {
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const [benchmarkVersionState, setBenchmarkVersionState] = useState({
    benchmarkVersion: null,
    isReady: false,
    loadedBenchmarkVersions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const neededVersions = await getNeededVersions(versionsCategory);

      setBenchmarkVersionState((prev) => {
        return { ...prev, loadedBenchmarkVersions: neededVersions };
      });
    };

    fetchData();

    eventEmitter.on(events.testingDone, async () => {
      const neededVersions = await getNeededVersions(versionsCategory);

      setBenchmarkVersionState({
        benchmarkVersion: null,
        isReady: false,
        loadedBenchmarkVersions: neededVersions,
      });

      const select = document.getElementById("version-select");
      select.selectedIndex = 0;
    });
  }, []);

  const benchmarkVersionCallbacks = {
    onChange: async (event) => {
      const version = JSON.parse(event.target.value);
      setBenchmarkVersionState((prev) => {
        return { ...prev, benchmarkVersion: version };
      });
    },
    onReady: () => {
      if (benchmarkVersionState.benchmarkVersion === null) {
        autoAlert("Версия бенчмарка не выбрана");
        return;
      }

      setBenchmarkVersionState((prev) => {
        return { ...prev, isReady: true };
      });

      updateFormData({
        benchmarkVersion: benchmarkVersionState.benchmarkVersion,
      });

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

  const isVersionCategoryCorrect = Object.values(
    availableVersionCategories,
  ).includes(versionsCategory);
  if (!isVersionCategoryCorrect) {
    console.error(
      "Указана недопустимая категория версий бенчмарка:",
      versionsCategory,
    );
    return;
  }

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
        {benchmarkVersionState.loadedBenchmarkVersions.map((version) => (
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

export default SelectBenchmarkVersion;
