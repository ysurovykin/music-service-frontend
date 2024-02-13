import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  UserLoginData,
  UserDataWithTokens,
  UserRegistrationData,
  UserActionTypes
} from "./user.model";

export type LoginStartActionType = {
  type: typeof UserActionTypes.LOGIN;
  payload: UserLoginData;
};

export type LoginSuccessActionType = {
  type: typeof UserActionTypes.LOGIN_SUCCESS;
  payload: UserDataWithTokens;
};

export type LoginFailedActionType = {
  type: typeof UserActionTypes.LOGIN_FAILED;
  payload: ActionFailedError;
};

export type RegistrationStartActionType = {
  type: typeof UserActionTypes.REGISTRATION;
  payload: UserRegistrationData;
};

export type RegistrationSuccessActionType = {
  type: typeof UserActionTypes.REGISTRATION_SUCCESS;
  payload: UserDataWithTokens;
};

export type RegistrationFailedActionType = {
  type: typeof UserActionTypes.REGISTRATION_FAILED;
  payload: ActionFailedError;
};

export type LogoutStartActionType = {
  type: typeof UserActionTypes.LOGOUT;
  payload: undefined;
};

export type LogoutSuccessActionType = {
  type: typeof UserActionTypes.LOGOUT_SUCCESS;
  payload: undefined;
};

export type LogoutFailedActionType = {
  type: typeof UserActionTypes.LOGOUT_FAILED;
  payload: ActionFailedError;
};

export type RefreshStartActionType = {
  type: typeof UserActionTypes.REFRESH;
  payload: undefined;
};

export type RefreshSuccessActionType = {
  type: typeof UserActionTypes.REFRESH_SUCCESS;
  payload: UserDataWithTokens;
};

export type RefreshFailedActionType = {
  type: typeof UserActionTypes.REFRESH_FAILED;
  payload: ActionFailedError;
};

export type SetAvatarActionType = {
  type: typeof UserActionTypes.SET_AVATAR;
  payload: string;
};

export type SwitchUserToArtistActionType = {
  type: typeof UserActionTypes.SWITCH_USER_TO_ARTIST;
  payload: undefined;
};

export type SwitchUserToListenerActionType = {
  type: typeof UserActionTypes.SWITCH_USER_TO_LISTENER;
  payload: undefined;
};

export type UserActions =
  | LoginStartActionType
  | LoginSuccessActionType
  | LoginFailedActionType
  | RegistrationStartActionType
  | RegistrationSuccessActionType
  | RegistrationFailedActionType
  | LogoutStartActionType
  | LogoutSuccessActionType
  | LogoutFailedActionType
  | RefreshStartActionType
  | RefreshSuccessActionType
  | RefreshFailedActionType
  | SetAvatarActionType
  | SwitchUserToArtistActionType
  | SwitchUserToListenerActionType;
