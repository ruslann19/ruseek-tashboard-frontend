import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/shared/contexts/auth";
import navigate from "@/shared/utils/navigate";

const matchPath = (path, route) => {
  const pathParts = path.split("/"); // "/tasks/123" => ["", "tasks", "123"]
  const routeParts = route.split("/"); // "/tasks/:id" => ["", "tasks", ":id"]

  if (pathParts.length !== routeParts.length) {
    // Маршруты не совпали
    return null;
  }

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      // Кусок шаблона - параметр
      const paramName = routeParts[i].slice(1);
      // Добавляем значение из динамического пути
      params[paramName] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      // Маршруты не совпали
      return null;
    }
  }

  return params;
};

export const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

const Router = (props) => {
  const { routes } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const path = useRoute();

  let currentPath = path;

  // Для избежания циклов в редиректе будем сверяться с просмотренными маршрутами
  const searchedRoutes = [];

  while (true) {
    if (searchedRoutes.includes(currentPath)) {
      // Редирект зациклился
      break;
    }

    searchedRoutes.push(currentPath);

    for (const route in routes) {
      const params = matchPath(currentPath, route);

      if (params) {
        const target = routes[route];

        // Если значение маршрута - это строка, выполняем редирект
        if (typeof target === "string") {
          navigate(target);

          currentPath = target;

          // Выходим из цикла for, чтобы начать поиск заново в цикле while
          break;
        }

        // Если это компонент, рендерим его как обычно
        const {
          component: Page,
          layout: Layout,
          isProtected: isProtected,
        } = target;

        if (isProtected && !isAuthenticated) {
          const loginRoute = "/login";
          navigate(loginRoute);
          currentPath = loginRoute;
          break;
        }

        return (
          <Layout>
            <Page params={params} />
          </Layout>
        );
      }
    }
  }

  const { component: NotFound, layout: Layout } = routes["*"];
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};

export default Router;
