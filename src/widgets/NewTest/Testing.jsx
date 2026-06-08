import Button from "@/shared/ui/Button";
import autoAlert from "@/shared/utils/autoAlert";

import styles from "./NewTest.module.css";

const Testing = ({ formData, setIsTestingStarted }) => {
  const onClick = () => {
    if (JSON.stringify(formData.benchmarkVersion) === "{}") {
      autoAlert("Не выбрана версия бенчмарка");
      return;
    }
    if (formData.selectedTasks.length === 0) {
      autoAlert("Не выбраны задачи для тестирования");
      return;
    }
    if (formData.selectedModels.length === 0) {
      autoAlert("Не выбраны модели для тестирования");
      return;
    }

    autoAlert("Запускаем тестирование");
    setIsTestingStarted(true);
  };

  return (
    <div className={styles.flexRow}>
      <div>
        <Button onClick={onClick}>Запустить тестирование</Button>
      </div>
      <div>
        <div>Form data</div>
        <div>benchmarkVersion: {JSON.stringify(formData.benchmarkVersion)}</div>
        <div>selected tasks: {formData.selectedTasks.length}</div>
        <div>selected models: {formData.selectedModels.length}</div>
      </div>
    </div>
  );
};

export default Testing;
