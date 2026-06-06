import { useState } from "react";

import AnswerItem from "@/entities/answer";

import Filter from "@/shared/ui/Filter";
import List from "@/shared/ui/List";
import sortByField from "@/shared/utils/sortByField";

const sortingFields = [
  { value: "id", title: "id", type: "int" },
  // { value: "llm_name", title: "имени LLM", type: "string" },
];

const AnswersPage = () => {
  const answers = [
    { id: 1, llmId: 1, questionId: 1, answer: "Москва" },
    { id: 2, llmId: 2, questionId: 1, answer: "Париж" },
    { id: 3, llmId: 3, questionId: 1, answer: "Лондон" },
  ];

  const [filterParams, setFilterParams] = useState({
    order: "asc",
    field: sortingFields[0].value,
    search: "",
  });

  const searchedAnswers = answers.filter((answer) =>
    answer.answer.toLowerCase().includes(filterParams.search.toLowerCase()),
  );
  const sortedAnswers = [...searchedAnswers].sort(
    sortByField(filterParams.field, filterParams.order),
  );

  return (
    <section>
      <Filter
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        sortingFields={sortingFields}
      />
      <List>
        {sortedAnswers.map((answer) => (
          <AnswerItem
            key={answer.id}
            id={answer.id}
            llmId={answer.llmId}
            questionId={answer.questionId}
            answer={answer.answer}
          />
        ))}
      </List>
    </section>
  );
};

export default AnswersPage;
