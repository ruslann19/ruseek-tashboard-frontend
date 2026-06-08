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
