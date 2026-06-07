import { useEffect, useState } from "react";

import { apiHost } from "@/shared/api/common";

import styles from "./BalancePage.module.css";

const apiUrl = `${apiHost}/balance`;

const balanceApi = {
  getRouterAiBalance: async () => {
    const url = `${apiUrl}/router-ai`;
    const response = await fetch(url);
    const balance = await response.json();
    return balance;
  },

  getDeepSeekBalance: async () => {
    const url = `${apiUrl}/deepseek`;
    const response = await fetch(url);
    const balance = await response.json();
    return balance;
  },
};

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

  return (
    <section className={styles.balanceContainer}>
      <div>Страница для проверки баланса</div>
      <div>
        RouterAI:{" "}
        {isLoading
          ? "Loading..."
          : `${balance.routerAi.rubles.toFixed(2)} рублей`}
      </div>
      <div>
        DeepSeek:{" "}
        {isLoading
          ? "Loading..."
          : `${balance.deepseek.yuan.toFixed(2)} юаней (примерно ${balance.deepseek.rubles.toFixed(2)} рублей)`}
      </div>
    </section>
  );
};

export default BalancePage;
