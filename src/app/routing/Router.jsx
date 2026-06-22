import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/shared/contexts/auth";
import navigate from "@/shared/utils/navigate";

const matchPath = (path, route) => {
  const pathParts = path.split("/");
  const routeParts = route.split("/");

  if (pathParts.length !== routeParts.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

// Функция для парсинга query-параметров в обычный объект
const parseQueryParams = (search) => {
  const params = {};
  const searchParams = new URLSearchParams(search);

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

export const useRoute = () => {
  // Храним весь путь без домена: и pathname, и search
  const [url, setUrl] = useState(
    window.location.pathname + window.location.search,
  );

  useEffect(() => {
    const onLocationChange = () => {
      setUrl(window.location.pathname + window.location.search);
    };

    // Слушаем стандартный назад/вперед в браузере
    window.addEventListener("popstate", onLocationChange);

    // Слушаем кастомные события, если ваша функция navigate генерирует их
    window.addEventListener("pushstate", onLocationChange);
    window.addEventListener("replacestate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("pushstate", onLocationChange);
      window.removeEventListener("replacestate", onLocationChange);
    };
  }, []);

  return url;
};

const Router = (props) => {
  const { routes } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const currentUrl = useRoute();

  // Разделяем путь и query-строку
  const [currentPath, currentSearch] = currentUrl.split("?");
  let activePath = currentPath;

  const searchedRoutes = [];

  while (true) {
    if (searchedRoutes.includes(activePath)) {
      break;
    }

    searchedRoutes.push(activePath);

    for (const route in routes) {
      // Сопоставляем только чистый путь (pathname) без query
      const params = matchPath(activePath, route);

      if (params) {
        const target = routes[route];

        if (typeof target === "string") {
          // При редиректе сохраняем или отбрасываем query по логике вашего приложения
          // Здесь просто перенаправляем на чистый target
          navigate(target);
          activePath = target;
          break;
        }

        const {
          component: Page,
          layout: Layout,
          isProtected: isProtected,
        } = target;

        if (isProtected && !isAuthenticated) {
          const loginRoute = "/login";
          navigate(loginRoute);
          activePath = loginRoute;
          break;
        }

        // Парсим query-параметры в объект
        const queryParams = parseQueryParams(currentSearch || "");

        // Передаем query в компонент отдельным пропсом
        return (
          <Layout>
            <Page params={params} query={queryParams} />
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
