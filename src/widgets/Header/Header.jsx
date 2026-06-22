import { useContext } from "react";

import { authApi } from "@/shared/api";
import { AuthContext } from "@/shared/contexts/auth";
import Button from "@/shared/ui/Button";
import navigate from "@/shared/utils/navigate";

import styles from "./Header.module.css";

const toLeaderBoard = () => {
  navigate("/leaderboard");
};

const toAdmin = () => {
  navigate("/tasks");
};

const toLogin = () => {
  navigate("/login");
};

const Header = ({ isAdmin }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const logout = async () => {
    await authApi.logout();
    setIsAuthenticated(false);
    navigate("/leaderboard");
  };

  const guestContent = isAuthenticated ? (
    <Button onClick={toAdmin}>Панель администратора</Button>
  ) : (
    <Button onClick={toLogin}>Войти в панель администратора</Button>
  );

  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.textBlue}>Ru</span>Seek{" "}
        <span className={styles.textBlue}>Tash</span>Board {isAdmin && "Admin"}
      </h1>

      <div className={styles.buttonsContainer}>
        {isAdmin ? (
          <>
            <Button onClick={toLeaderBoard}>Лидерборд</Button>
            <Button onClick={logout}>Выйти</Button>
          </>
        ) : (
          guestContent
        )}
      </div>
    </header>
  );
};

export default Header;
