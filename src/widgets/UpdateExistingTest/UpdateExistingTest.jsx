import { useState } from "react";

import SelectBenchmarkVersion from "@/features/select-benchmark-version";

import EventEmitter from "@/shared/utils/EventEmitter";

const localEventEmitter = new EventEmitter();
const localEvents = {};

const UpdateExistingTest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTestingStarted, setIsTestingStarted] = useState(false);
  const [formData, setFormData] = useState({
    benchmarkVersion: {},
    oldTasks: [],
    oldModels: [],
    newTasks: [],
    newModels: [],
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
    </div>
  );
};

export default UpdateExistingTest;
