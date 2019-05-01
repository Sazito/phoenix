import * as actionTypes from "./action_types";
import { put, takeLatest } from "redux-saga/effects";
import { endpoints, POST } from "../../configs";
import api from "../../../modules/api_wrapper";

function* getPostAction() {
  const id = Math.floor(Math.random() * 10) + 1;
  console.log('api import in posts', api);
  const data = yield api
    .get(endpoints(POST, { id }))
    .then(response => response.json());
  yield put({
    type: [actionTypes.ACTION_POSTS_GET_POST_RESULT],
    response: data
  });
}

const postsSaga = [
  takeLatest([actionTypes.ACTION_POSTS_GET_POST], getPostAction)
];

export default postsSaga;
