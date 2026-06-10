import { useEffect, useState } from "react";

import { answersApi, benchmarkVersionsApi, llmsApi } from "@/shared/api";
import RouterLink from "@/shared/ui/RouterLink";

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

    const accuracy = correctAnswers.length / currentLlmAnswers.length;
    return accuracy;
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>Версия бенчмарка: {JSON.stringify(benchmarkVersion)}</div>
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
              <td>{calculateAccuracy(llm.id) * 100}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BenchmarkVersionPage;
