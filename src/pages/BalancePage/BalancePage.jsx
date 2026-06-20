import { useEffect, useState } from "react";

import { balanceApi } from "@/shared/api";

import styles from "./BalancePage.module.css";

const BalancePage = () => {
  const [balance, setBalance] = useState({
    routerAi: null,
    deepseek: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const [deepseekBalance, routerAiBalance] = await Promise.all([
          balanceApi.getDeepSeekBalance(),
          balanceApi.getRouterAiBalance(),
        ]);

        setBalance({
          deepseek: deepseekBalance,
          routerAi: routerAiBalance,
        });
      } catch (error) {
        console.error("Ошибка при загрузке баланса:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBalance();
  }, []);

  const routerAiContent = balance.routerAi
    ? `${balance.routerAi.rubles.toFixed(2)} рублей`
    : "Ошибка при загрузке данных";

  const deepseekContent = balance.deepseek
    ? `${balance.deepseek.yuan.toFixed(2)} юаней (примерно ${balance.deepseek.rubles.toFixed(2)} рублей)`
    : "Ошибка при загрузке данных";

  return (
    <section className={styles.balanceContainer}>
      <div>Страница для проверки баланса</div>
      <div>RouterAI: {isLoading ? "Loading..." : routerAiContent}</div>
      <div>DeepSeek: {isLoading ? "Loading..." : deepseekContent}</div>
    </section>
  );
};

export default BalancePage;
