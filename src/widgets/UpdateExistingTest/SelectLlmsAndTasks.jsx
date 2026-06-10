import { useEffect, useState } from "react";

import { answersApi, llmsApi, tasksApi } from "@/shared/api";
import Button from "@/shared/ui/Button";
import HiddableList from "@/shared/ui/HiddableList";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./SelectLlmsAndTasks.module.css";

const SelectLlmsAndTasks = ({
  formData,
  setFormData,
  isTestingStarted,
  setCurrentStep,
}) => {
  let [initialSelectState, setInitialSelectState] = useState({
    llms: {
      selected: [],
      notSelected: [],
      selectedHidden: true,
      notSelectedHidden: true,
    },
    tasks: {
      selected: [],
      notSelected: [],
      selectedHidden: true,
      notSelectedHidden: true,
    },
    isReady: false,
  });
  const [selectState, setSelectState] = useState(initialSelectState);

  const updateSelectStateLlms = (newData) => {
    setSelectState((prev) => ({
      ...prev,
      llms: {
        ...prev.llms,
        ...newData,
      },
    }));
  };
  const updateSelectStateTasks = (newData) => {
    setSelectState((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        ...newData,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Скачать полный список моделей
      const allLlms = await llmsApi.getAll();

      // Скачать все задачи, у которых дата публикации в выбранном месяце (версия бенчмарка)
      const tasksByMonth = await tasksApi.getByMonth(
        formData.benchmarkVersion.year,
        formData.benchmarkVersion.month,
      );

      // Скачать ответы по выбранной версии бенчмарка
      const answersByBenchmarkVersion = await answersApi.getByBenchmarkVersion(
        formData.benchmarkVersion.id,
      );

      // По ответам определить, какие LLM участвовали в выбранной версии бенчмарка, а какие нет
      const llmIds = answersByBenchmarkVersion.map((version) => version.llm_id);
      const llmIdsUnique = [...new Set(llmIds)];
      // Участвовавших записать в selectState.llms.selected и в formData.oldLlms
      const participatedLlms = allLlms.filter((llm) =>
        llmIdsUnique.includes(llm.id),
      );

      // Не участвовавших записать только в selectState.llms.notSelected
      const notParticipatedLlms = allLlms.filter(
        (llm) => !llmIdsUnique.includes(llm.id),
      );

      // С задачами - аналогично
      const taskIds = answersByBenchmarkVersion.map(
        (version) => version.task_id,
      );
      const taskIdsUnique = [...new Set(taskIds)];
      const usedTasks = tasksByMonth.filter((task) =>
        taskIdsUnique.includes(task.id),
      );
      const notUsedTasks = tasksByMonth.filter(
        (task) => !taskIdsUnique.includes(task.id),
      );

      setInitialSelectState({
        llms: {
          selected: participatedLlms,
          notSelected: notParticipatedLlms,
          selectedHidden: true,
          notSelectedHidden: true,
        },
        tasks: {
          selected: usedTasks,
          notSelected: notUsedTasks,
          selectedHidden: true,
          notSelectedHidden: true,
        },
        isReady: false,
      });

      updateSelectStateLlms({
        selected: participatedLlms,
        notSelected: notParticipatedLlms,
      });
      updateSelectStateTasks({
        selected: usedTasks,
        notSelected: notUsedTasks,
      });
      setFormData((prev) => {
        return { ...prev, oldTasks: usedTasks, oldLlms: participatedLlms };
      });
    };

    fetchData();
  }, []);

  const setSelectedLlmsHidden = (value) => {
    updateSelectStateLlms({ selectedHidden: value });
  };
  const setNotSelectedLlmsHidden = (value) => {
    updateSelectStateLlms({ notSelectedHidden: value });
  };
  const setSelectedTasksHidden = (value) => {
    updateSelectStateTasks({ selectedHidden: value });
  };
  const setNotSelectedTasksHidden = (value) => {
    updateSelectStateTasks({ notSelectedHidden: value });
  };

  const selectLlm = (llm) => {
    setSelectState((prev) => {
      const llmsState = prev.llms;
      const newLlmsState = {
        ...llmsState,
        selected: [...llmsState.selected, llm],
        notSelected: llmsState.notSelected.filter(
          (currentLlm) => currentLlm.id !== llm.id,
        ),
      };
      return { ...prev, llms: newLlmsState };
    });

    if (!formData.oldLlms.includes(llm)) {
      setFormData((prev) => {
        return { ...prev, newLlms: [...prev.newLlms, llm] };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          deletedLlms: prev.deletedLlms.filter((item) => item.id !== llm.id),
        };
      });
    }
  };
  const unselectLlm = (llm) => {
    setSelectState((prev) => {
      const llmsState = prev.llms;
      const newLlmsState = {
        ...llmsState,
        notSelected: [...llmsState.notSelected, llm],
        selected: llmsState.selected.filter(
          (currentLlm) => currentLlm.id !== llm.id,
        ),
      };
      return { ...prev, llms: newLlmsState };
    });

    if (formData.oldLlms.includes(llm)) {
      setFormData((prev) => {
        return { ...prev, deletedLlms: [...prev.deletedLlms, llm] };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          newLlms: prev.newLlms.filter((item) => item.id !== llm.id),
        };
      });
    }
  };
  const selectTask = (task) => {
    setSelectState((prev) => {
      const tasksState = prev.tasks;
      const newTasksState = {
        ...tasksState,
        selected: [...tasksState.selected, task],
        notSelected: tasksState.notSelected.filter(
          (currentTask) => currentTask.id !== task.id,
        ),
      };
      return { ...prev, tasks: newTasksState };
    });

    if (!formData.oldTasks.includes(task)) {
      setFormData((prev) => {
        return { ...prev, newTasks: [...prev.newTasks, task] };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          deletedTasks: prev.deletedTasks.filter((item) => item.id !== task.id),
        };
      });
    }
  };
  const unselectTask = (task) => {
    setSelectState((prev) => {
      const tasksState = prev.tasks;
      const newTasksState = {
        ...tasksState,
        notSelected: [...tasksState.notSelected, task],
        selected: tasksState.selected.filter(
          (currentTask) => currentTask.id !== task.id,
        ),
      };
      return { ...prev, tasks: newTasksState };
    });

    if (formData.oldTasks.includes(task)) {
      setFormData((prev) => {
        return { ...prev, deletedTasks: [...prev.deletedTasks, task] };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          newTasks: prev.newTasks.filter((item) => item.id !== task.id),
        };
      });
    }
  };

  const onReady = () => {
    const totalChanges =
      formData.deletedLlms.length +
      formData.deletedTasks.length +
      formData.newLlms.length +
      formData.newTasks.length;

    if (totalChanges === 0) {
      autoAlert("Не внесено ни одного изменения");
      return;
    }

    setSelectState((prev) => {
      return { ...prev, isReady: true };
    });
    setCurrentStep((prev) => prev + 1);
  };
  const onCancel = () => {
    setSelectState(initialSelectState);
    setFormData((prev) => {
      return {
        ...prev,
        oldTasks: initialSelectState.tasks.selected,
        oldLlms: initialSelectState.llms.selected,
        deletedTasks: [],
        deletedLlms: [],
        newTasks: [],
        newLlms: [],
      };
    });
  };

  return (
    <div>
      {/* Выбор LLM */}
      <form>
        <div className={styles.flexRow}>
          <div>Выберите модели, которые будут участвовать в тестировании</div>
        </div>

        <HiddableList
          title={"Выбранные модели"}
          areItemsHidden={selectState.llms.selectedHidden}
          setAreItemsHidden={setSelectedLlmsHidden}
        >
          {selectState.llms.selected.map((llm) => (
            <div key={llm.id}>
              <input
                type="checkbox"
                defaultChecked
                disabled={selectState.isReady}
                onInput={() => {
                  unselectLlm(llm);
                }}
              />
              <span>{llm.llm_name}</span>
            </div>
          ))}
        </HiddableList>
        <HiddableList
          title={"Невыбранные модели"}
          areItemsHidden={selectState.llms.notSelectedHidden}
          setAreItemsHidden={setNotSelectedLlmsHidden}
        >
          {selectState.llms.notSelected.map((llm) => (
            <div key={llm.id}>
              <input
                type="checkbox"
                disabled={selectState.isReady}
                onInput={() => {
                  selectLlm(llm);
                }}
              />
              <span>{llm.llm_name}</span>
            </div>
          ))}
        </HiddableList>
      </form>

      {/* Выбор задач */}
      <form>
        <div className={styles.flexRow}>
          <div>Выберите задачи, которые будут участвовать в тестировании</div>
        </div>

        <HiddableList
          title={"Выбранные задачи"}
          areItemsHidden={selectState.tasks.selectedHidden}
          setAreItemsHidden={setSelectedTasksHidden}
        >
          {selectState.tasks.selected.map((task) => (
            <div key={task.id}>
              <input
                type="checkbox"
                defaultChecked
                disabled={selectState.isReady}
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
          areItemsHidden={selectState.tasks.notSelectedHidden}
          setAreItemsHidden={setNotSelectedTasksHidden}
        >
          {selectState.tasks.notSelected.map((task) => (
            <div key={task.id}>
              <input
                type="checkbox"
                disabled={selectState.isReady}
                onInput={() => {
                  selectTask(task);
                }}
              />
              <a href={`/tasks/${task.id}`}>{task.question}</a>
            </div>
          ))}
        </HiddableList>
      </form>

      <div className={styles.flexRow}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Добавлено</th>
              <th>Удалено</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Модели</td>
              <td>{formData.newLlms.length}</td>
              <td>{formData.deletedLlms.length}</td>
            </tr>
            <tr>
              <td>Задачи</td>
              <td>{formData.newTasks.length}</td>
              <td>{formData.deletedTasks.length}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <Button onClick={onReady} disabled={selectState.isReady}>
            Далее
          </Button>
        </div>
        <div>
          <Button onClick={onCancel} disabled={isTestingStarted}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectLlmsAndTasks;
