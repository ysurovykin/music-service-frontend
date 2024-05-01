import { put, select, takeEvery } from 'redux-saga/effects'
import { UserActionTypes, UserCreditCardInfo, UserDataWithTokens } from './user.model';
import { DeleteUserCreditCardStartActionType, GetUserCreditCardsStartActionType, LoginStartActionType, RegistrationStartActionType, SwitchProfileTypeStartActionType } from './user.actions.types';
import UserService from './user.service';
import { userActions } from './user.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../helpers/react/redux.helper';
import { AxiosError } from 'axios';
import { userSelectors } from './user.selectors';

export const userEffects = [
  takeEvery(UserActionTypes.LOGIN, login),
  takeEvery(UserActionTypes.LOGIN_FAILED, handleError),
  takeEvery(UserActionTypes.LOGOUT, logout),
  takeEvery(UserActionTypes.LOGOUT_FAILED, handleError),
  takeEvery(UserActionTypes.REGISTRATION, registration),
  takeEvery(UserActionTypes.REGISTRATION_FAILED, handleError),
  takeEvery(UserActionTypes.REFRESH, refresh),
  takeEvery(UserActionTypes.REFRESH_FAILED, handleError),
  takeEvery(UserActionTypes.SWITCH_PROFILE_TYPE, switchProfileType),
  takeEvery(UserActionTypes.SWITCH_PROFILE_TYPE_FAILED, handleError),
  takeEvery(UserActionTypes.GET_USER_CREDIT_CARDS, getUserCreditCards),
  takeEvery(UserActionTypes.GET_USER_CREDIT_CARDS_FAILED, handleError),
  takeEvery(UserActionTypes.DELETE_USER_CREDIT_CARD, deleteUserCreditCard),
  takeEvery(UserActionTypes.DELETE_USER_CREDIT_CARD_FAILED, handleError),
];

function* login(action: LoginStartActionType) {
  try {
    const loginResponse: UserDataWithTokens = yield UserService.login({ ...action.payload });
    localStorage.setItem('token', loginResponse.accessToken);
    localStorage.setItem('profileType', loginResponse.user.profileType);
    yield put(userActions.loginSuccess(loginResponse));
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.loginFailed({ error }));
  }
}

function* logout() {
  try {
    yield UserService.logout();
    yield put(userActions.logoutSuccess());
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.logoutFailed({ error }));
  }
}

function* registration(action: RegistrationStartActionType) {
  try {
    const registrationResponse: UserDataWithTokens = yield UserService.registration({ ...action.payload });
    localStorage.setItem('token', registrationResponse.accessToken);
    localStorage.setItem('profileType', registrationResponse.user.profileType);
    yield put(userActions.registrationSuccess(registrationResponse));
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.registrationFailed({ error }));
  }
}

function* refresh() {
  try {
    const refreshResponse: UserDataWithTokens = yield UserService.refresh();
    localStorage.setItem('token', refreshResponse.accessToken);
    localStorage.setItem('profileType', refreshResponse.user.profileType);
    yield put(userActions.refreshSuccess(refreshResponse));
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.refreshFailed({ error }));
  }
}

function* switchProfileType(action: SwitchProfileTypeStartActionType) {
  try {
    const response: UserDataWithTokens = yield UserService.switchProfileType({ ...action.payload });
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('profileType', response.user.profileType);
    yield put(userActions.switchProfileTypeSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.switchProfileTypeFailed({ error }));
  }
}

function* getUserCreditCards(action: GetUserCreditCardsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: Array<UserCreditCardInfo> = yield UserService.getUserCreditCards(listenerId);
    yield put(userActions.getUserCreditCardsSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.getUserCreditCardsFailed({ error }));
  }
}

function* deleteUserCreditCard(action: DeleteUserCreditCardStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield UserService.deleteUserCreditCard(listenerId, action.payload);
    yield put(userActions.deleteUserCreditCardSuccess());
  } catch (e) {
    const error = e as AxiosError;
    yield put(userActions.deleteUserCreditCardFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}