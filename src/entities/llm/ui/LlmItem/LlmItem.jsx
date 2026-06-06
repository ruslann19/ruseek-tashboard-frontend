import llmsApi from "@/shared/api/llms";
import styles from "./LlmItem.module.css";
import { LlmsContext } from "../../model/LlmsContext";
import { useContext } from "react";

const LlmItem = (props) => {
  const { id, name } = props;

  const { llms, setLlms } = useContext(LlmsContext);

  const onDelete = async () => {
    const isConfirmed = confirm(
      `Вы уверены, что хотите удалить LLM (id: ${id})?`,
    );
    if (isConfirmed) {
      await llmsApi.delete(id);
      setLlms(llms.filter((llm) => llm.id !== id));
    }
  };

  return (
    <div className={styles.llmItem}>
      <div>id: {id}</div>
      <div>name: {name}</div>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
};

export default LlmItem;
