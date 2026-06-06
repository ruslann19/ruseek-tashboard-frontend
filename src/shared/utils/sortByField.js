const sortByField = (key, order = "asc") => {
  return (a, b) => {
    const valA = a[key];
    const valB = b[key];

    // 1. Обработка строк с учетом алфавита и регистра
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // 2. Универсальное сравнение для чисел, дат и boolean
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  };
};

export default sortByField;
