import fetch from "isomorphic-fetch";
import { env } from "../../code/configs";

const methods = ["post", "get", "put", "delete", "update"];
const api = {};

const APICreator = method => {
  return (endpoint, body) => {
    return fetch(`${env.APP_API_BASE}${endpoint}`, {
      method: method.toUpperCase(),
      body: JSON.stringify(body)
    });
  };
};

const createAPI = () => {
  for (let index in methods) {
    const method = methods[index];
    api[method] = APICreator(method);
  }
  console.log("createApi");
};

// create API wrapper in app init
createAPI();

// we might need to recreate API after user has logged in
// or after setting custom header or some other changes in API structure
export { createAPI as recreateAPI };

export default api;
