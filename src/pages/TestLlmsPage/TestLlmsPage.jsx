import { useState } from "react";

import NewTest from "@/widgets/NewTest/NewTest";

import HeaderItems from "@/shared/ui/HeaderItems";

const items = [
  "Создать новую версию бенчмарка",
  "Изменить старую версию бенчмарка",
];

const TestLlmsPage = () => {
  const [activeItem, setActiveItem] = useState(items[0]);

  let content = null;
  if (activeItem === items[0]) {
    content = <NewTest />;
  } else if (activeItem === items[1]) {
    content = <div>меняем старую версию</div>;
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
