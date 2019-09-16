import api from "../../../modules/api_wrapper";
import endpoints, { GET_CURRENT_USER, LOGIN } from "../../consts/endpoints";

export const checkUser = () => {
  return api.get(endpoints(GET_CURRENT_USER));
};

export const loginUser = ({ email, password }) => {
  return api.post(endpoints(LOGIN), { email, password });
};
