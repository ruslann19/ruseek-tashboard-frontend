import { useEffect, useState } from "react";

import llmsApi from "@/shared/api/llms";
import HiddableList from "@/shared/ui/HiddableList";

import styles from "./NewTest.module.css";
import { selectItem, unselectItem } from "./common";

const SelectLlmsForm = ({ updateFormData, isTestingStarted }) => {
  //   llms
  const llmsInitState = {
    selectedItems: [],
    notSelectedItems: [],
    showSelectedItems: true,
    showNotSelectedItems: true,
  };
  const [llmsState, setLlmsState] = useState(llmsInitState);

  //   useEffect
  useEffect(() => {
    const fetchData = async () => {
      const llms = await llmsApi.getAll();
      // TODO: вернуть этот код
      // setLlmsState((prev) => {
      //   return { ...prev, notSelectedItems: llms };
      // });

      // TODO: убрать этот код
      const firstLlm = llms[0];
      const otherLlms = llms.slice(1);
      setLlmsState((prev) => {
        return {
          ...prev,
          selectedItems: [firstLlm],
          notSelectedItems: otherLlms,
        };
      });
      updateFormData({ selectedModels: [firstLlm] });
    };

    fetchData();
  }, []);

  //   llms - functions
  const selectLlm = (llm) => {
    selectItem(llm, setLlmsState);

    updateFormData({ selectedModels: [...llmsState.selectedItems, llm] });
  };
  const unselectLlm = (llm) => {
    unselectItem(llm, setLlmsState);

    const filteredLlms = llmsState.selectedItems.filter(
      (currentLlm) => currentLlm.id !== llm.id,
    );
    updateFormData({ selectedModels: filteredLlms });
  };

  return (
    <form>
      <div className={styles.flexRow}>
        <div>Выберите модели, которые будут участвовать в тестировании</div>
      </div>

      <HiddableList
        title={"Выбранные модели"}
        areItemsHidden={!llmsState.showSelectedItems}
        setAreItemsHidden={(areItemsHidden) => {
          setLlmsState((prev) => {
            return { ...prev, showSelectedItems: !areItemsHidden };
          });
        }}
      >
        {llmsState.selectedItems.map((llm) => (
          <div key={llm.id}>
            <input
              type="checkbox"
              defaultChecked
              disabled={isTestingStarted}
              onInput={() => {
                unselectLlm(llm);
              }}
            />
            <span>{JSON.stringify(llm)}</span>
          </div>
        ))}
      </HiddableList>
      <HiddableList
        title={"Невыбранные модели"}
        areItemsHidden={!llmsState.showNotSelectedItems}
        setAreItemsHidden={(areItemsHidden) => {
          setLlmsState((prev) => {
            return { ...prev, showNotSelectedItems: !areItemsHidden };
          });
        }}
      >
        {llmsState.notSelectedItems.map((llm) => (
          <div key={llm.id}>
            <input
              type="checkbox"
              disabled={isTestingStarted}
              onInput={() => {
                selectLlm(llm);
              }}
            />
            <span>{JSON.stringify(llm)}</span>
          </div>
        ))}
      </HiddableList>
    </form>
  );
};

export default SelectLlmsForm;
