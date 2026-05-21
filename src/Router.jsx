import { useEffect, useState } from "react";

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
          window.history.replaceState(null, "", target);
          window.dispatchEvent(new PopStateEvent("popstate"));

          currentPath = target;

          // Выходим из цикла for, чтобы начать поиск заново в цикле while
          break;
        }

        // Если это компонент, рендерим его как обычно
        const Page = target;

        return <Page params={params} />;
      }
    }
  }

  const NotFound = routes["*"];
  return <NotFound />;
};

export default Router;
