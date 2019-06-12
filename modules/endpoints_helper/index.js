import CONSTS from "../../code/consts/endpoints/";

function endpoints(key, params = {}) {
  if (!key) {
    console.warn("key is not exist");
  }

  let routeAddress = CONSTS[key];

  if (params && Object.keys(params).length) {
    Object.keys(params).map(param => {
      routeAddress = routeAddress.replace(`:${param}`, params[param]);
      return param;
    });
  }

  return routeAddress;
}

export * from "../../code/consts/endpoints/";
export default endpoints;
