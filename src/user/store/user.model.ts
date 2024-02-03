export const userState: UserState = {
  userId: undefined,
  isAuthorizationLoading: false,
  email: undefined,
  name: undefined,
  gender: undefined,
  country: undefined,
  role: undefined,
  birthDate: undefined,
  avatar: undefined,
  profileType: undefined
};

export interface BirthDate {
  day: Number,
  month: Number,
  year: Number
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
  avatar?: string,
  profileType?: ProfileTypeEnum
}

export enum ProfileTypeEnum {
  'artist' = 'artist',
  'listener' = 'listener',
  'admin' = 'admin'
}

export interface UserRegistrationData {
  password: string,
  country: string,
  email: string,
  gender: string,
  name: string,
  profileType: ProfileTypeEnum,
  birthDate: BirthDate
}

export interface UserLoginData {
  email: string,
  password: string
}

export interface UserData {
  userId: string;
  email: string;
  name: string;
  gender: string;
  country: string;
  role: string;
  birthDate: BirthDate;
  profileType: ProfileTypeEnum;
}

export interface UserDataWithTokens {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

export enum UserActionTypes {
  LOGIN = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  REGISTRATION = "REGISTRATION_START",
  REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS",
  REGISTRATION_FAILED = "REGISTRATION_FAILED",
  LOGOUT = "LOGOUT_START",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILED = "LOGOUT_FAILED",
  REFRESH = "REFRESH_START",
  REFRESH_SUCCESS = "REFRESH_SUCCESS",
  REFRESH_FAILED = "REFRESH_FAILED",

  SET_AVATAR = "SET_AVATAR",

  SWITCH_USER_TO_ARTIST = "SWITCH_USER_TO_ARTIST",
  SWITCH_USER_TO_LISTENER = "SWITCH_USER_TO_LISTENER"
};