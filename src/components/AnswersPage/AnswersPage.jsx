import AddNewItemSection from "../AddNewItemSection/AddNewItemSection";
import ListFilter from "../ListFilter";
import List from "../List/List";
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersPage = () => {
  const answers = [
    { id: 1, modelId: 1, questionId: 1, answer: "Москва" },
    { id: 2, modelId: 2, questionId: 1, answer: "Париж" },
    { id: 3, modelId: 3, questionId: 1, answer: "Лондон" },
  ];

  return (
    <section>
      <AddNewItemSection buttonTitle={"Добавить новый ответ"} />
      <ListFilter />
      <List>
        {answers.map((answer) => (
          <AnswerItem
            key={answer.id}
            id={answer.id}
            modelId={answer.modelId}
            questionId={answer.questionId}
            answer={answer.answer}
          />
        ))}
      </List>
    </section>
  );
};

export default AnswersPage;
