import ListFilter from "@/features/filter-list";
import SingleButtonSection from "@/shared/ui/SingleButtonSection";
import List from "@/shared/ui/List";
import ModelItem from "@/entities/model";

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
      <ListFilter sortingFields={[]} />
      <List>
        {models.map((model) => (
          <ModelItem key={model.id} id={model.id} name={model.name} />
        ))}
      </List>
    </section>
  );
};

export default ModelsPage;
