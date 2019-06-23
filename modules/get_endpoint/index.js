import { ENDPOINTS } from "../../code/consts/endpoints/";

function getEndpoint(key, params = {}) {
  if (!key) {
    console.warn("key is not exist");
  }

  let routeAddress = ENDPOINTS[key];

  if (params && Object.keys(params).length) {
    Object.keys(params).map(param => {
      routeAddress = routeAddress.replace(`:${param}`, params[param]);
      return param;
    });
  }

  return routeAddress;
}

export default getEndpoint;
