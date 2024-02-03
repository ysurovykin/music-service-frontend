import { put, takeEvery } from 'redux-saga/effects'
import { UserActionTypes, UserDataWithTokens } from './user.model';
import { LoginStartActionType, RegistrationStartActionType } from './user.actions.types';
import AuthService from './user.service';
import { userActions } from './user.actions';
import { ErrorActionType } from '../../helpers/react/redux.helper';

export const userEffects = [
  takeEvery(UserActionTypes.LOGIN, login),
  takeEvery(UserActionTypes.LOGIN_FAILED, handleError),
  takeEvery(UserActionTypes.LOGOUT, logout),
  takeEvery(UserActionTypes.LOGOUT_FAILED, handleError),
  takeEvery(UserActionTypes.REGISTRATION, registration),
  takeEvery(UserActionTypes.REGISTRATION_FAILED, handleError),
  takeEvery(UserActionTypes.REFRESH, refresh),
  takeEvery(UserActionTypes.REFRESH_FAILED, handleError)
];

function* login(action: LoginStartActionType) {
  try {
    const loginResponse: UserDataWithTokens = yield AuthService.login({...action.payload});
    localStorage.setItem('token', loginResponse.accessToken);
    yield put(userActions.loginSuccess(loginResponse));
  } catch (e) {
    const error = e as Error;
    yield put(userActions.loginFailed({error}));
  }
}

function* logout() {
  try {
    yield AuthService.logout();
    yield put(userActions.logoutSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(userActions.logoutFailed({error}));
  }
}

function* registration(action: RegistrationStartActionType) {
  try {
    const registrationResponse: UserDataWithTokens = yield AuthService.registration({...action.payload});
    localStorage.setItem('token', registrationResponse.accessToken);
    yield put(userActions.registrationSuccess(registrationResponse));
  } catch (e) {
    const error = e as Error;
    yield put(userActions.registrationFailed({error}));
  }
}

function* refresh() {
  try {
    const refreshResponse: UserDataWithTokens = yield AuthService.refresh();
    localStorage.setItem('token', refreshResponse.accessToken);
    yield put(userActions.refreshSuccess(refreshResponse));
  } catch (e) {
    const error = e as Error;
    yield put(userActions.registrationFailed({error}));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}