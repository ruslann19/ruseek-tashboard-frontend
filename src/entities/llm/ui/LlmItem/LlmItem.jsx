import { useContext } from "react";

import llmsApi from "@/shared/api/llms";
import Button from "@/shared/ui/Button";

import { LlmsContext } from "../../model/LlmsContext";
import styles from "./LlmItem.module.css";

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
      <Button onClick={onDelete}>Удалить</Button>
    </div>
  );
};

export default LlmItem;
