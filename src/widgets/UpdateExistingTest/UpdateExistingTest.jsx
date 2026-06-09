import { useState } from "react";

import SelectBenchmarkVersion from "@/features/select-benchmark-version";

import SelectLlmsAndTasks from "./SelectLlmsAndTasks";
import Testing from "./Testing";
import { localEventEmitter, localEvents } from "./common";

const UpdateExistingTest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTestingStarted, setIsTestingStarted] = useState(false);
  const [formData, setFormData] = useState({
    benchmarkVersion: {},
    oldTasks: [],
    oldLlms: [],
    deletedTasks: [],
    deletedLlms: [],
    newTasks: [],
    newLlms: [],
  });
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div>
      <SelectBenchmarkVersion
        updateFormData={updateFormData}
        setCurrentStep={setCurrentStep}
        isTestingStarted={isTestingStarted}
        versionsCategory={"existing"}
        eventEmitter={localEventEmitter}
        events={localEvents}
      />

      {currentStep >= 2 && (
        <SelectLlmsAndTasks
          formData={formData}
          setFormData={setFormData}
          isTestingStarted={isTestingStarted}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep >= 3 && (
        <Testing
          formData={formData}
          isTestingStarted={isTestingStarted}
          setIsTestingStarted={setIsTestingStarted}
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  );
};

export default UpdateExistingTest;
