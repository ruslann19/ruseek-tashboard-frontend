const Navbar = () => {
  const navbarItems = [
    "Задачи",
    "Модели",
    "Ответы моделей",
    "Тестирование моделей",
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-items">
        {navbarItems.map(task => (
          <li key={task} className="navbar-item">
            {task}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
