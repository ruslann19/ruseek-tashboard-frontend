const navigate = (to) => {
  // Изменяем URL в адресной строке без перезагрузки страницы
  window.history.pushState(null, "", to);

  // Вручную триггерим событие popstate, чтобы хук useRoute перерендерил компоненты
  window.dispatchEvent(new PopStateEvent("popstate"));
};

export default navigate;
