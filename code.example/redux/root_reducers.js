import { combineReducers } from "redux";
import usersReducer from "./users/reducers";
import postsReducer from "./posts/reducers";

export default combineReducers({
  users: usersReducer,
  posts: postsReducer
});
