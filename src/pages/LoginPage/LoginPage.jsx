import { useContext, useState } from "react";

import { authApi } from "@/shared/api";
import { AuthContext } from "@/shared/contexts/auth";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import autoAlert from "@/shared/utils/autoAlert";
import navigate from "@/shared/utils/navigate";

import styles from "./LoginPage.module.css";

const toLeaderBoard = () => {
  navigate("/leaderboard");
};

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    const response = await authApi.login(password);

    if (response.status === 200) {
      setIsAuthenticated(true);
      navigate("/tasks");
      return;
    }

    const body = await response.json();
    autoAlert(JSON.stringify(body.detail));
  };

  return (
    <div className={styles.main}>
      <form
        action="post"
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h2>Вход в панель администратора</h2>

        <div className={styles.flexContainer}>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            setValue={setPassword}
            label={"Пароль"}
          />
          <Button onClick={toggleShowPassword}>
            {showPassword ? "Скрыть" : "Показать"}
          </Button>
        </div>

        <div className={styles.flexContainer}>
          <Button onClick={login}>Войти</Button>
          <Button onClick={toLeaderBoard}>Вернуться в лидерборд</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
