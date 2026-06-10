import { useEffect, useState } from "react";

import {
  answersApi,
  benchmarkVersionsApi,
  llmsApi,
  tasksApi,
} from "@/shared/api";
import Button from "@/shared/ui/Button";
import Filter from "@/shared/ui/Filter";
import List from "@/shared/ui/List";
import RouterLink from "@/shared/ui/RouterLink";
import sortByField from "@/shared/utils/sortByField";

import styles from "./BenchmarkVersionsPage.module.css";

const sortingFields = [
  { value: "id", title: "id", type: "int" },
  // { value: "llm_name", title: "имени LLM", type: "string" },
];

const BenchmarkVersionsPage = () => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchVersions = async () => {
      const result = await benchmarkVersionsApi.getAll();
      setVersions(result);
    };

    fetchVersions();
  }, []);

  const [filterParams, setFilterParams] = useState({
    order: "asc",
    field: sortingFields[0].value,
    search: "",
  });

  const searchedVersions = versions.filter((version) =>
    JSON.stringify(version)
      .toLowerCase()
      .includes(filterParams.search.toLowerCase()),
  );
  const sortedVersions = [...searchedVersions].sort(
    sortByField(filterParams.field, filterParams.order),
  );

  const deleteBenchmarkVersion = async (benchmarkVersionId) => {
    const isConfirmed = confirm(
      "Вы уверены, что хотите удалить версию бенчмарка?",
    );
    if (isConfirmed) {
      await benchmarkVersionsApi.delete(benchmarkVersionId);
      const updatedVersions = await benchmarkVersionsApi.getAll();
      setVersions(updatedVersions);
    }
  };

  const onDownloadAllResults = async () => {
    console.log("download");
    const allTasks = await tasksApi.getAll();
    const allLlms = await llmsApi.getAll();
    const allBenchmarkVersions = await benchmarkVersionsApi.getAll();
    const allAnswers = await answersApi.getAll();

    const data = {
      tasks: allTasks,
      llms: allLlms,
      benchmark_versions: allBenchmarkVersions,
      answers: allAnswers,
    };
    const content = JSON.stringify(data);

    const blob = new Blob([content], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ruseek_tashboard_results.json";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <Filter
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        sortingFields={sortingFields}
      />
      <div className={styles.centeringContainer}>
        <Button onClick={onDownloadAllResults}>Скачать все результаты</Button>
      </div>
      <List>
        {sortedVersions.map((version, index) => (
          <div key={index}>
            <RouterLink to={`/benchmark-versions/${version.id}`}>
              {JSON.stringify(version)}
            </RouterLink>
            <Button
              onClick={() => {
                deleteBenchmarkVersion(version.id);
              }}
            >
              Удалить
            </Button>
          </div>
        ))}
      </List>
    </section>
  );
};

export default BenchmarkVersionsPage;
