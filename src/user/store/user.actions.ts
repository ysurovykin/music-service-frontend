import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  LoginFailedActionType,
  LoginStartActionType,
  LoginSuccessActionType,
  RegistrationStartActionType,
  RegistrationSuccessActionType,
  RegistrationFailedActionType,
  LogoutStartActionType,
  LogoutSuccessActionType,
  LogoutFailedActionType,
  SetAvatarActionType,
  SwitchUserToArtistActionType,
  SwitchUserToListenerActionType,
  SwitchProfileTypeStartActionType,
  SwitchProfileTypeSuccessActionType,
  SwitchProfileTypeFailedActionType,
  RefreshStartActionType,
  RefreshSuccessActionType,
  RefreshFailedActionType,
  GetUserCreditCardsStartActionType,
  GetUserCreditCardsSuccessActionType,
  GetUserCreditCardsFailedActionType,
  DeleteUserCreditCardStartActionType,
  DeleteUserCreditCardSuccessActionType,
  DeleteUserCreditCardFailedActionType,
} from "./user.actions.types";
import {
  UserDataWithTokens,
  UserLoginData,
  UserRegistrationData,
  UserActionTypes,
  SwitchProfileTypeRequestData,
  UserCreditCardInfo
} from "./user.model"

export const loginStartAction = (loginData: UserLoginData):
  LoginStartActionType => ({ type: UserActionTypes.LOGIN, payload: loginData });

export const loginSuccessAction = (response: UserDataWithTokens):
  LoginSuccessActionType => ({ type: UserActionTypes.LOGIN_SUCCESS, payload: response });

export const loginFailedAction = (error: ActionFailedError):
  LoginFailedActionType => ({ type: UserActionTypes.LOGIN_FAILED, payload: error });

export const registrationStartAction = (registrationData: UserRegistrationData):
  RegistrationStartActionType => ({ type: UserActionTypes.REGISTRATION, payload: registrationData });

export const registrationSuccessAction = (response: UserDataWithTokens):
  RegistrationSuccessActionType => ({ type: UserActionTypes.REGISTRATION_SUCCESS, payload: response });

export const registrationFailedAction = (error: ActionFailedError):
  RegistrationFailedActionType => ({ type: UserActionTypes.REGISTRATION_FAILED, payload: error });

export const refreshStartAction = ():
  RefreshStartActionType => ({ type: UserActionTypes.REFRESH, payload: undefined });

export const refreshSuccessAction = (response: UserDataWithTokens):
  RefreshSuccessActionType => ({ type: UserActionTypes.REFRESH_SUCCESS, payload: response });

export const refreshFailedAction = (error: ActionFailedError):
  RefreshFailedActionType => ({ type: UserActionTypes.REFRESH_FAILED, payload: error });

export const logoutStartAction = ():
  LogoutStartActionType => ({ type: UserActionTypes.LOGOUT, payload: undefined });

export const logoutSuccessAction = ():
  LogoutSuccessActionType => ({ type: UserActionTypes.LOGOUT_SUCCESS, payload: undefined });

export const logoutFailedAction = (error: ActionFailedError):
  LogoutFailedActionType => ({ type: UserActionTypes.LOGOUT_FAILED, payload: error });

export const switchUserToArtistAction = ():
  SwitchUserToArtistActionType => ({ type: UserActionTypes.SWITCH_USER_TO_ARTIST, payload: undefined });

export const switchUserToListenerAction = ():
  SwitchUserToListenerActionType => ({ type: UserActionTypes.SWITCH_USER_TO_LISTENER, payload: undefined });

export const switchProfileTypeStartAction = (request: SwitchProfileTypeRequestData):
  SwitchProfileTypeStartActionType => ({ type: UserActionTypes.SWITCH_PROFILE_TYPE, payload: request });

export const switchProfileTypeSuccessAction = (response: UserDataWithTokens):
  SwitchProfileTypeSuccessActionType => ({ type: UserActionTypes.SWITCH_PROFILE_TYPE_SUCCESS, payload: response });

export const switchProfileTypeFailedAction = (error: ActionFailedError):
  SwitchProfileTypeFailedActionType => ({ type: UserActionTypes.SWITCH_PROFILE_TYPE_FAILED, payload: error });

export const getUserCreditCardsStartAction = ():
  GetUserCreditCardsStartActionType => ({ type: UserActionTypes.GET_USER_CREDIT_CARDS, payload: undefined });

export const getUserCreditCardsSuccessAction = (response: Array<UserCreditCardInfo>):
  GetUserCreditCardsSuccessActionType => ({ type: UserActionTypes.GET_USER_CREDIT_CARDS_SUCCESS, payload: response });

export const getUserCreditCardsFailedAction = (error: ActionFailedError):
  GetUserCreditCardsFailedActionType => ({ type: UserActionTypes.GET_USER_CREDIT_CARDS_FAILED, payload: error });

export const deleteUserCreditCardStartAction = (cardId: string):
  DeleteUserCreditCardStartActionType => ({ type: UserActionTypes.DELETE_USER_CREDIT_CARD, payload: cardId });

export const deleteUserCreditCardSuccessAction = ():
  DeleteUserCreditCardSuccessActionType => ({ type: UserActionTypes.DELETE_USER_CREDIT_CARD_SUCCESS, payload: undefined });

export const deleteUserCreditCardFailedAction = (error: ActionFailedError):
  DeleteUserCreditCardFailedActionType => ({ type: UserActionTypes.DELETE_USER_CREDIT_CARD_FAILED, payload: error });

export const userActions = {
  login: (loginData: UserLoginData) => loginStartAction(loginData),
  loginSuccess: (response: UserDataWithTokens) => loginSuccessAction(response),
  loginFailed: (error: ActionFailedError) => loginFailedAction(error),
  registration: (registrationData: UserRegistrationData) => registrationStartAction(registrationData),
  registrationSuccess: (response: UserDataWithTokens) => registrationSuccessAction(response),
  registrationFailed: (error: ActionFailedError) => registrationFailedAction(error),
  refresh: () => refreshStartAction(),
  refreshSuccess: (response: UserDataWithTokens) => refreshSuccessAction(response),
  refreshFailed: (error: ActionFailedError) => refreshFailedAction(error),
  logout: () => logoutStartAction(),
  logoutSuccess: () => logoutSuccessAction(),
  logoutFailed: (error: ActionFailedError) => logoutFailedAction(error),
  switchUserToArtist: () => switchUserToArtistAction(),
  switchUserToListener: () => switchUserToListenerAction(),
  switchProfileType: (request: SwitchProfileTypeRequestData) => switchProfileTypeStartAction(request),
  switchProfileTypeSuccess: (response: UserDataWithTokens) => switchProfileTypeSuccessAction(response),
  switchProfileTypeFailed: (error: ActionFailedError) => switchProfileTypeFailedAction(error),
  getUserCreditCards: () => getUserCreditCardsStartAction(),
  getUserCreditCardsSuccess: (response: Array<UserCreditCardInfo>) => getUserCreditCardsSuccessAction(response),
  getUserCreditCardsFailed: (error: ActionFailedError) => getUserCreditCardsFailedAction(error),
  deleteUserCreditCard: (cardId: string) => deleteUserCreditCardStartAction(cardId),
  deleteUserCreditCardSuccess: () => deleteUserCreditCardSuccessAction(),
  deleteUserCreditCardFailed: (error: ActionFailedError) => deleteUserCreditCardFailedAction(error),
}

