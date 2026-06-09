import { useEffect, useState } from "react";

import NewTest from "@/widgets/NewTest/NewTest";
import UpdateExistingTest from "@/widgets/UpdateExistingTest";

import HeaderItems from "@/shared/ui/HeaderItems";

const items = [
  "Создать новую версию бенчмарка",
  "Изменить старую версию бенчмарка",
];

const TestLlmsPage = () => {
  const ACTIVE_ITEM_KEY = "test-llms-active-item";
  const savedActiveItem = localStorage.getItem(ACTIVE_ITEM_KEY);
  const [activeItem, setActiveItem] = useState(
    savedActiveItem ? savedActiveItem : items[0],
  );

  useEffect(() => {
    localStorage.setItem(ACTIVE_ITEM_KEY, activeItem);
  }, [activeItem]);

  let content = null;
  if (activeItem === items[0]) {
    content = <NewTest />;
  } else if (activeItem === items[1]) {
    content = <UpdateExistingTest />;
  }

  return (
    <div>
      <HeaderItems
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      {content}
    </div>
  );
};

export default TestLlmsPage;
