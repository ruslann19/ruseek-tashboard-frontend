import ListFilter from "../ListFilter";
import SingleButtonSection from "../SingleButtonSection";
import List from "../List";
import ModelItem from "../ModelItem";

const ModelsPage = () => {
  const models = [
    { id: 1, name: "ChatGPT" },
    { id: 2, name: "Qwen" },
    { id: 3, name: "DeepSeek" },
    { id: 4, name: "Gemini" },
  ];

  return (
    <section>
      <SingleButtonSection buttonTitle={"Добавить новую модель"} />
      <ListFilter />
      <List>
        {models.map((model) => (
          <ModelItem key={model.id} id={model.id} name={model.name} />
        ))}
      </List>
      {/* <ModelsList models={models} /> */}
    </section>
  );
};

export default ModelsPage;
