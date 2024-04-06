export const userState: UserState = {
  userId: undefined,
  isAuthorizationLoading: false,
  email: undefined,
  name: undefined,
  gender: undefined,
  country: undefined,
  role: undefined,
  birthDate: undefined,
  profileType: undefined
};

export type BirthDate = {
  day: number;
  month: number;
  year: number;
}

export interface UserState {
  userId?: string,
  isAuthorizationLoading: boolean
  email?: string,
  name?: string,
  gender?: string,
  country?: string,
  role?: string,
  birthDate?: BirthDate,
  profileType?: ProfileTypeEnum
}

export enum ProfileTypeEnum {
  'artist' = 'artist',
  'listener' = 'listener',
  'admin' = 'admin'
}

export type UserRegistrationData = {
  password: string;
  country: string;
  email: string;
  gender: string;
  name: string;
  profileType: ProfileTypeEnum;
  birthDate: BirthDate;
}

export type UserLoginData = {
  email: string;
  password: string;
}

export type UserData = {
  userId: string;
  email: string;
  name: string;
  gender: string;
  country: string;
  role: string;
  birthDate: BirthDate;
  profileType: ProfileTypeEnum;
}

export type UserDataWithTokens = {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

export enum UserActionTypes {
  LOGIN = "USER.LOGIN_START",
  LOGIN_SUCCESS = "USER.LOGIN_SUCCESS",
  LOGIN_FAILED = "USER.LOGIN_FAILED",
  REGISTRATION = "USER.REGISTRATION_START",
  REGISTRATION_SUCCESS = "USER.REGISTRATION_SUCCESS",
  REGISTRATION_FAILED = "USER.REGISTRATION_FAILED",
  LOGOUT = "USER.LOGOUT_START",
  LOGOUT_SUCCESS = "USER.LOGOUT_SUCCESS",
  LOGOUT_FAILED = "USER.LOGOUT_FAILED",
  REFRESH = "USER.REFRESH_START",
  REFRESH_SUCCESS = "USER.REFRESH_SUCCESS",
  REFRESH_FAILED = "USER.REFRESH_FAILED",

  SET_AVATAR = "USER.SET_AVATAR",

  SWITCH_USER_TO_ARTIST = "USER.SWITCH_USER_TO_ARTIST",
  SWITCH_USER_TO_LISTENER = "USER.SWITCH_USER_TO_LISTENER"
};