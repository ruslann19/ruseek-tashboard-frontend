import { useContext, useState } from "react";

import LlmItem from "@/entities/llm";
import { LlmsContext, LlmsProvider } from "@/entities/llm";

import llmsApi from "@/shared/api/llms";
import Filter from "@/shared/ui/Filter";
import Input from "@/shared/ui/Input";
import List from "@/shared/ui/List";
import sortByField from "@/shared/utils/sortByField";

import styles from "./LlmsPage.module.css";

const AddLlm = (props) => {
  const { setLlms } = props;

  const [llmName, setLlmName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (llmName.trim().length === 0) {
      return;
    }

    const llm = {
      llm_name: llmName,
    };

    const response = await llmsApi.add(llm);

    if (response.status === 406) {
      const body = await response.json();
      const detail = body.detail;

      autoAlert(detail);
    } else if (response.status === 200) {
      const addedLlm = await response.json();
      setLlms((previousLlms) => [...previousLlms, addedLlm]);
      setLlmName("");
    }
  };

  return (
    <div className={styles.addLlmWrapper}>
      <Input
        type={"text"}
        value={llmName}
        setValue={setLlmName}
        label={"LLM name"}
      />
      <div>
        <button onClick={onSubmit}>Добавить</button>
      </div>
    </div>
  );
};

const sortingFields = [
  { value: "id", title: "id", type: "int" },
  { value: "llm_name", title: "имени LLM", type: "string" },
];

const Main = () => {
  const { llms, setLlms } = useContext(LlmsContext);

  const [filterParams, setFilterParams] = useState({
    order: "asc",
    field: sortingFields[0].value,
    search: "",
  });

  const searchedLlms = llms.filter((llm) =>
    llm.llm_name.toLowerCase().includes(filterParams.search.toLowerCase()),
  );
  const sortedLlms = [...searchedLlms].sort(
    sortByField(filterParams.field, filterParams.order),
  );

  return (
    <section>
      <AddLlm setLlms={setLlms} />
      <Filter
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        sortingFields={sortingFields}
      />
      <List>
        {sortedLlms.map((llm) => (
          <LlmItem key={llm.id} id={llm.id} name={llm.llm_name} />
        ))}
      </List>
    </section>
  );
};

const LlmsPage = () => {
  return (
    <LlmsProvider>
      <Main />
    </LlmsProvider>
  );
};

export default LlmsPage;
