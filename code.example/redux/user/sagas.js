import * as actionTypes from "./action_types";
import { put, takeLatest } from 'redux-saga/effects';
import { endpoints, USER } from '../../configs';
import api from '../../../modules/api_wrapper';

function* getUserAction() {
  const id = Math.floor(Math.random() * 10) + 1;
  const data = yield api.get(endpoints(USER, {id}))
    .then(response => response.json() );
  yield put({ type: [actionTypes.ACTION_USER_GET_USER_RESULT], response: data });
}

const userSaga = [
  takeLatest([actionTypes.ACTION_USER_GET_USER], getUserAction)
];

export default userSaga;