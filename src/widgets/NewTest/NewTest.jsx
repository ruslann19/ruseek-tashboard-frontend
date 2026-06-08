import { useState } from "react";

import BenchmarkVersionForm from "./BenchmarkVersionForm";
import styles from "./NewTest.module.css";
import SelectLlmsForm from "./SelectLlmsForm";
import SelectTasksForm from "./SelectTasksForm";
import Testing from "./Testing";

const NewTest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTestingStarted, setIsTestingStarted] = useState(false);
  const [formData, setFormData] = useState({
    benchmarkVersion: {},
    selectedTasks: [],
    selectedModels: [],
  });
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div>
      <SelectLlmsForm
        updateFormData={updateFormData}
        setCurrentStep={setCurrentStep}
        isTestingStarted={isTestingStarted}
      />

      <BenchmarkVersionForm
        updateFormData={updateFormData}
        setCurrentStep={setCurrentStep}
        isTestingStarted={isTestingStarted}
      />

      {currentStep >= 2 && (
        <SelectTasksForm
          updateFormData={updateFormData}
          setCurrentStep={setCurrentStep}
          benchmarkVersion={formData.benchmarkVersion}
          isTestingStarted={isTestingStarted}
        />
      )}

      {currentStep >= 3 && (
        <div className={styles.flexRow}>
          <Testing
            formData={formData}
            isTestingStarted={isTestingStarted}
            setIsTestingStarted={setIsTestingStarted}
            setCurrentStep={setCurrentStep}
          />
        </div>
      )}
    </div>
  );
};

export default NewTest;
