import ListFilter from "../../components/ListFilter";
import SingleButtonSection from "../../components/SingleButtonSection";
import List from "../../components/List";
import ModelItem from "../../components/ModelItem";

const ModelsPage = () => {
  const models = [
    { id: 1, name: "ChatGPT" },
    { id: 2, name: "Qwen" },
    { id: 3, name: "DeepSeek" },
    { id: 4, name: "Gemini" },
  ];

  console.log("models:", models);

  return (
    <section>
      <SingleButtonSection buttonTitle={"Добавить новую модель"} />
      <ListFilter />
      <List>
        {models.map((model) => (
          <ModelItem key={model.id} id={model.id} name={model.name} />
        ))}
      </List>
    </section>
  );
};

export default ModelsPage;
