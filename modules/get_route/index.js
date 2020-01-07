import { ROUTES } from "../../code/consts/routes/";
import { env } from "../../code/configs";

function removeTrailingSlashes(route) {
  //Removes one or more trailing slashes from route
  return route.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
}

function getRoutes(key, params = {}, basePath = "", localeCode) {
  if (!key) {
    console.warn("key is not exist");
  }

  let routeAddress = ROUTES[key];

  if (params && Object.keys(params).length) {
    Object.keys(params).map(param => {
      routeAddress = routeAddress.replace(`:${param}`, params[param]);
      return param;
    });
  }

  const { BASEPATH } = env;

  const route = removeTrailingSlashes(
    `/${localeCode ? `${localeCode}/` : ``}${basePath ||
      BASEPATH}${routeAddress}`
  );
  return route;
}

export default getRoutes;
