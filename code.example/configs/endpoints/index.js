export const LOGIN = "LOGIN";
export const VALIDATE_USER = "VALIDATE_USER";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const USERS = "USERS";
export const USER = "USER";
export const POSTS = "POSTS";
export const POST = "POST";

const CONSTS = {
  [LOGIN]: "auth/login",
  [VALIDATE_USER]: "auth/validate_account",
  [GET_CURRENT_USER]: "auth/user",
  [USERS]: "users",
  [USER]: "users/:id",
  [POSTS]: "posts",
  [POST]: "posts/:id"
};

export default CONSTS;
