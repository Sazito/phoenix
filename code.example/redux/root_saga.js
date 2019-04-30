import { all } from "redux-saga/effects";
import usersSaga from "./users/sagas";
import postsSaga from "./posts/sagas";

export default function* rootSaga() {
  yield all([...usersSaga, ...postsSaga]);
}
