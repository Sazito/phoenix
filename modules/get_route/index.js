import { ROUTES } from "../../code/consts/routes/";

function getRoutes(key, params = {}, basePath = "") {
  if (!key) {
    console.warn("key is not exist");
  }

  let routeAddress = ROUTES[key];

  if (params && Object.keys(params).length) {
    Object.keys(params).map(param => {
      routeAddress = routeAddress.replace(`:${param}`, params[param]);
      return param;
    });
  } else {
    return routeAddress;
  }

  return `${basePath}${routeAddress}`;
}

export default getRoutes;
