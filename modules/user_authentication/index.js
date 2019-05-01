import Cookies from "js-cookie";
import { env } from "../../code/configs";
import api from "../api_wrapper";
import { userApiToAppUserTransformer } from "../../code/transformers/app_user_transformers/user_api_to_app_user_transformer";

const getUser = () => {
  console.log(">>", api);
  return userApiToAppUserTransformer();
};

const setToken = ({ token }) => {
  Cookies.get(env.APP_TOKEN, token, { expires: 7 });
};

const getToken = ({ token }) => {
  return token || Cookies.get(env.APP_TOKEN);
};

const createUser = ({ token } = {}) => {
  return {
    getToken: () => getToken({ token }),
    setToken,
    getUser: () => getUser()
  };
};

export default createUser;
