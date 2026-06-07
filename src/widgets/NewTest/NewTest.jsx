import { useEffect, useState } from "react";

import llmsApi from "@/shared/api/llms";
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

const selectItem = (item, setState) => {
  setState((prev) => {
    return {
      ...prev,
      selectedItems: [...prev.selectedItems, item],
      notSelectedItems: prev.notSelectedItems.filter(
        (currentItem) => currentItem.id !== item.id,
      ),
    };
  });
};

const unselectItem = (item, setState) => {
  setState((prev) => {
    return {
      ...prev,
      notSelectedItems: [...prev.notSelectedItems, item],
      selectedItems: prev.selectedItems.filter(
        (currentItem) => currentItem.id !== item.id,
      ),
    };
  });
};

const makeStateReady = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      isReady: true,
      showSelectedItems: false,
      showNotSelectedItems: false,
    };
  });
};

const makeStateNotReady = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      isReady: false,
      showSelectedItems: true,
      showNotSelectedItems: true,
    };
  });
};

const NewTest = () => {
  // benchmark version
  const [benchmarkVersionState, setBenchmarkVersionState] = useState({
    benchmarkVersion: null,
    isReady: false,
    potentialBenchmarkVersions: [],
  });

  //   tasks
  const tasksInitState = {
    selectedItems: [],
    notSelectedItems: [],
    showSelectedItems: true,
    showNotSelectedItems: true,
    isReady: false,
  };
  const [tasksState, setTasksState] = useState(tasksInitState);

  //   llms
  const llmsInitState = {
    llms: [],
    selectedItems: [],
    notSelectedItems: [],
    showSelectedItems: true,
    showNotSelectedItems: true,
    isReady: false,
  };
  const [llmsState, setLlmsState] = useState(llmsInitState);

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

  //   benchmark version - functions
  const benchmarkVersionCallbacks = {
    onChange: async (event) => {
      const version = JSON.parse(event.target.value);
      setBenchmarkVersionState((prev) => {
        return { ...prev, version: version };
      });
    },
    onReady: async () => {
      // TODO: Вернуть это после тестирования
      // if (benchmarkVersion === null) {
      //   autoAlert("Версия бенчмарка не выбрана");
      //   return;
      // }

      // TODO: Убрать это после тестирования
      const select = document.getElementById("version-select");
      select.selectedIndex = 3;

      setBenchmarkVersionState((prev) => {
        return { ...prev, isReady: true };
      });

      // TODO: Вернуть это после тестирования
      // const loadedTasks = await tasksApi.getByMonth(
      //   benchmarkVersion.year,
      //   benchmarkVersion.month,
      // );
      const tmpBenchmarkVersion = { year: 2026, month: 5 };
      const loadedTasks = await tasksApi.getByMonth(
        tmpBenchmarkVersion.year,
        tmpBenchmarkVersion.month,
      );

      setTasksState((prev) => {
        return {
          ...prev,
          notSelectedItems: loadedTasks,
        };
      });
    },
    onCancel: () => {
      setBenchmarkVersionState((prev) => {
        return { ...prev, isReady: false };
      });
      initTasksState();
      initLlmsState();
    },
  };

  //   tasks - functions
  const initTasksState = () => {
    setTasksState(tasksInitState);
  };
  const selectTask = (task) => {
    selectItem(task, setTasksState);
  };
  const unselectTask = (task) => {
    unselectItem(task, setTasksState);
  };
  const tasksCallbacks = {
    onReady: async () => {
      if (tasksState.selectedItems.length === 0) {
        // TODO: вернуть это после тестирования
        //   autoAlert("Нужно выбрать хотя бы одну задачу");
        //   return;

        // TODO: убрать это после тестирования
        selectTask(tasksState.notSelectedItems[0]);
      }

      makeStateReady(setTasksState);

      const llms = await llmsApi.getAll();
      setLlmsState((prev) => {
        return { ...prev, llms: llms, notSelectedItems: llms };
      });
    },
    onCancel: () => {
      makeStateNotReady(setTasksState);
      initLlmsState();
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

  //   llms - functions
  const initLlmsState = () => {
    setLlmsState(llmsInitState);
  };
  const selectLlm = (llm) => {
    selectItem(llm, setLlmsState);
  };
  const unselectLlm = (llm) => {
    unselectItem(llm, setLlmsState);
  };
  const llmsCallbacks = {
    onReady: () => {
      if (llmsState.selectedItems.length === 0) {
        // TODO: вернуть это после тестирования
        //   autoAlert("Нужно выбрать хотя бы одну LLM");
        //   return;

        // TODO: убрать это после тестирования
        selectLlm(llmsState.notSelectedItems[0]);
      }

      makeStateReady(setLlmsState);
    },
    onCanceled: () => {
      makeStateNotReady(setLlmsState);
    },
    onHideSelectedItems: () => {
      setLlmsState((prev) => {
        return { ...prev, showSelectedItems: false };
      });
    },
    onShowSelectedItems: () => {
      setLlmsState((prev) => {
        return { ...prev, showSelectedItems: true };
      });
    },
    onHideNotSelectedItems: () => {
      setLlmsState((prev) => {
        return { ...prev, showNotSelectedItems: false };
      });
    },
    onShowNotSelectedItems: () => {
      setLlmsState((prev) => {
        return { ...prev, showNotSelectedItems: true };
      });
    },
  };

  return (
    <div>
      {/* Выбор версии бенчмарка */}
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
            <option
              value={JSON.stringify(version)}
              key={JSON.stringify(version)}
            >
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
        <Button onClick={benchmarkVersionCallbacks.onCancel}>Отмена</Button>
      </form>

      {/* Выбор задач, участвующих в тестировании */}
      {benchmarkVersionState.isReady && (
        <div>
          <div className={styles.flexRow}>
            <div>Выберите задачи, которые будут участвовать в тестировании</div>
            <Button
              onClick={tasksCallbacks.onReady}
              disabled={tasksState.isReady}
            >
              Далее
            </Button>
            <Button onClick={tasksCallbacks.onCancel}>Отмена</Button>
          </div>
          <div className={styles.flexRow}>
            <div>Выбранные задачи ({tasksState.selectedItems.length})</div>
            {tasksState.showSelectedItems ? (
              <Button onClick={tasksCallbacks.onHideSelectedItems}>
                Скрыть
              </Button>
            ) : (
              <Button onClick={tasksCallbacks.onShowSelectedItems}>
                Показать
              </Button>
            )}
          </div>
          {tasksState.showSelectedItems && (
            <div>
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
            </div>
          )}
          <div className={styles.flexRow}>
            <div>Невыбранные задачи ({tasksState.notSelectedItems.length})</div>
            {tasksState.showNotSelectedItems ? (
              <Button onClick={tasksCallbacks.onHideNotSelectedItems}>
                Скрыть
              </Button>
            ) : (
              <Button onClick={tasksCallbacks.onShowNotSelectedItems}>
                Показать
              </Button>
            )}
          </div>
          {tasksState.showNotSelectedItems && (
            <div>
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
            </div>
          )}
        </div>
      )}

      {/* Выбор моделей, участвующих в тестировании */}
      {tasksState.isReady && (
        <div>
          <div className={styles.flexRow}>
            <div>Выберите модели, которые будут участвовать в тестировании</div>
            <Button
              onClick={llmsCallbacks.onReady}
              disabled={llmsState.isReady}
            >
              Далее
            </Button>
            <Button onClick={llmsCallbacks.onCanceled}>Отмена</Button>
          </div>

          <div>
            <div className={styles.flexRow}>
              <div>Выбранные модели ({llmsState.selectedItems.length})</div>
              {llmsState.showSelectedItems ? (
                <Button onClick={llmsCallbacks.onHideSelectedItems}>
                  Скрыть
                </Button>
              ) : (
                <Button onClick={llmsCallbacks.onShowSelectedItems}>
                  Показать
                </Button>
              )}
            </div>
            {llmsState.showSelectedItems && (
              <div>
                {llmsState.selectedItems.map((llm) => (
                  <div key={llm.id}>
                    <input
                      type="checkbox"
                      defaultChecked
                      disabled={llmsState.isReady}
                      onInput={() => {
                        unselectLlm(llm);
                      }}
                    />
                    <span>{JSON.stringify(llm)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className={styles.flexRow}>
              <div>
                Невыбранные модели ({llmsState.notSelectedItems.length})
              </div>
              {llmsState.showNotSelectedItems ? (
                <Button onClick={llmsCallbacks.onHideNotSelectedItems}>
                  Скрыть
                </Button>
              ) : (
                <Button onClick={llmsCallbacks.onShowNotSelectedItems}>
                  Показать
                </Button>
              )}
            </div>
            {llmsState.showNotSelectedItems && (
              <div>
                {llmsState.notSelectedItems.map((llm) => (
                  <div key={llm.id}>
                    <input
                      type="checkbox"
                      disabled={llmsState.isReady}
                      onInput={() => {
                        selectLlm(llm);
                      }}
                    />
                    <span>{JSON.stringify(llm)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {llmsState.isReady && (
        <div className={styles.flexRow}>
          <Button
            onClick={() => {
              autoAlert("Запускаем тестирование");
            }}
          >
            Запустить тестирование
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewTest;
