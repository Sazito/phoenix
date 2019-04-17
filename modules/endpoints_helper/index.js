import CONSTS from "../../src/configs/endpoints/";

function endpoints(key, params = {}) {
  if (!key) {
    console.warn('key is not exist');
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

export * from '../../src/configs/endpoints/';
export default endpoints;
