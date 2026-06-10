import { useEffect, useState } from "react";

import { answersApi, benchmarkVersionsApi, llmsApi } from "@/shared/api";
import RouterLink from "@/shared/ui/RouterLink";

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

const BenchmarkVersionPage = ({ params }) => {
  const benchmarkVersionId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [benchmarkVersion, setBenchmarkVersion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [llms, setLlms] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const loadedVersion =
        await benchmarkVersionsApi.getById(benchmarkVersionId);
      setBenchmarkVersion(loadedVersion);

      const loadedAnswers =
        await answersApi.getByBenchmarkVersion(benchmarkVersionId);
      setAnswers(loadedAnswers);

      const llmIds = loadedAnswers.map((answer) => answer.llm_id);
      const llmIdsUnique = [...new Set(llmIds)];

      const allLlms = await llmsApi.getAll();
      const usedLlms = allLlms.filter((llm) => llmIdsUnique.includes(llm.id));
      setLlms(usedLlms);

      setIsLoading(false);
    };
    fetchAnswers();
  }, []);

  const calculateAccuracy = (llmId) => {
    const currentLlmAnswers = answers.filter(
      (answer) => answer.llm_id === llmId,
    );

    const correctAnswers = currentLlmAnswers.filter(
      (answer) => answer.is_correct === true,
    );

    const accuracy = (100 * correctAnswers.length) / currentLlmAnswers.length;
    return accuracy;
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>
        Версия бенчмарка: {monthNumberToName(benchmarkVersion.month)}{" "}
        {benchmarkVersion.year}
      </div>
      <div>Количество вопросов: {totalTasks}</div>
      <table>
        <thead>
          <tr>
            <th>Модель</th>
            <th>Средняя точность</th>
          </tr>
        </thead>
        <tbody>
          {llms.map((llm) => (
            <tr key={llm.id}>
              <td>
                <RouterLink
                  to={`/benchmark-versions/${benchmarkVersionId}/${llm.id}`}
                >
                  {llm.llm_name}
                </RouterLink>
              </td>
              <td>{calculateAccuracy(llm.id)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BenchmarkVersionPage;
