import { useEffect, useState } from "react";

import tasksApi from "@/shared/api/tasks";
import Button from "@/shared/ui/Button";
import HiddableList from "@/shared/ui/HiddableList";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./NewTest.module.css";
import {
  makeStateNotReady,
  makeStateReady,
  selectItem,
  unselectItem,
} from "./common";

const SelectTasksForm = ({
  updateFormData,
  setCurrentStep,
  benchmarkVersion,
  isTestingStarted,
}) => {
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const tasksInitState = {
    selectedItems: [],
    notSelectedItems: [],
    showSelectedItems: false,
    showNotSelectedItems: true,
    isReady: false,
  };
  const [tasksState, setTasksState] = useState(tasksInitState);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await tasksApi.getByMonth(
        benchmarkVersion.year,
        benchmarkVersion.month,
      );
      setTasksState((prev) => {
        return { ...prev, notSelectedItems: tasks };
      });
    };

    fetchData();
  }, []);

  const selectTask = (task) => {
    selectItem(task, setTasksState);
  };
  const unselectTask = (task) => {
    unselectItem(task, setTasksState);
  };
  const tasksCallbacks = {
    onReady: async () => {
      const selectedTasks = [...tasksState.selectedItems];

      if (tasksState.selectedItems.length === 0) {
        autoAlert("Нужно выбрать хотя бы одну задачу");
        return;
      }

      makeStateReady(setTasksState);
      updateFormData({ selectedTasks: selectedTasks });
      nextStep();
    },
    onCancel: () => {
      makeStateNotReady(setTasksState);
      updateFormData({ selectedTasks: [] });
      setCurrentStep(2);
    },
    onHideSelectedItems: () => {
      setTasksState((prev) => {
        return {
          ...prev,
          showSelectedItems: false,
        };
      });
    },
    onShowSelectedItems: () => {
      setTasksState((prev) => {
        return {
          ...prev,
          showSelectedItems: true,
        };
      });
    },
    onHideNotSelectedItems: () => {
      setTasksState((prev) => {
        return {
          ...prev,
          showNotSelectedItems: false,
        };
      });
    },
    onShowNotSelectedItems: () => {
      setTasksState((prev) => {
        return {
          ...prev,
          showNotSelectedItems: true,
        };
      });
    },
  };

  return (
    <form>
      <div className={styles.flexRow}>
        <div>Выберите задачи, которые будут участвовать в тестировании</div>
        <Button onClick={tasksCallbacks.onReady} disabled={tasksState.isReady}>
          Далее
        </Button>
        <Button onClick={tasksCallbacks.onCancel} disabled={isTestingStarted}>
          Отмена
        </Button>
      </div>
      <HiddableList
        title={"Выбранные задачи"}
        areItemsHidden={!tasksState.showSelectedItems}
        setAreItemsHidden={(areItemsHidden) => {
          setTasksState((prev) => {
            return { ...prev, showSelectedItems: !areItemsHidden };
          });
        }}
      >
        {tasksState.selectedItems.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              defaultChecked
              disabled={tasksState.isReady}
              onInput={() => {
                unselectTask(task);
              }}
            />
            <a href={`/tasks/${task.id}`}>{task.question}</a>
          </div>
        ))}
      </HiddableList>
      <HiddableList
        title={"Невыбранные задачи"}
        areItemsHidden={!tasksState.showNotSelectedItems}
        setAreItemsHidden={(areItemsHidden) => {
          setTasksState((prev) => {
            return { ...prev, showNotSelectedItems: !areItemsHidden };
          });
        }}
      >
        {tasksState.notSelectedItems.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              disabled={tasksState.isReady}
              onInput={() => {
                selectTask(task);
              }}
            />
            <a href={`/tasks/${task.id}`}>{task.question}</a>
          </div>
        ))}
      </HiddableList>
    </form>
  );
};

export default SelectTasksForm;
