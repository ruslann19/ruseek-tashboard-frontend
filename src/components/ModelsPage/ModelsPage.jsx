import ListFilter from "../ListFilter";
import ModelsList from "../ModelsList";
import styles from "./ModelsPage.module.css";

const ModelsPage = () => {
  const models = [
    { id: 1, name: "ChatGPT" },
    { id: 2, name: "Qwen" },
    { id: 3, name: "DeepSeek" },
    { id: 4, name: "Gemini" },
  ];

  return (
    <section>
      <section className={styles.addNewModelSection}>
        <button>Добавить новую модель</button>
      </section>
      <ListFilter />
      <ModelsList models={models} />
    </section>
  );
};

export default ModelsPage;
