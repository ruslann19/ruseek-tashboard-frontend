import EventEmitter from "@/shared/utils/EventEmitter";

export const newTestEventEmitter = new EventEmitter();
export const newTestEvents = {
  testingDone: "testing done",
  selectedLlmsChanged: "selected llms changed",
};

export const selectItem = (item, setState) => {
  setState((prev) => {
    return {
      ...prev,
      selectedItems: [...prev.selectedItems, item],
      notSelectedItems: prev.notSelectedItems.filter(
        (currentItem) => currentItem.id !== item.id,
      ),
    };
  });
};

export const unselectItem = (item, setState) => {
  setState((prev) => {
    return {
      ...prev,
      notSelectedItems: [...prev.notSelectedItems, item],
      selectedItems: prev.selectedItems.filter(
        (currentItem) => currentItem.id !== item.id,
      ),
    };
  });
};

export const makeStateReady = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      isReady: true,
      showSelectedItems: false,
      showNotSelectedItems: false,
    };
  });
};

export const makeStateNotReady = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      isReady: false,
      showSelectedItems: true,
      showNotSelectedItems: true,
    };
  });
};
