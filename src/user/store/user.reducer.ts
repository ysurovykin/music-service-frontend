import { ProfileTypeEnum, UserActionTypes, userState } from './user.model';
import { UserState } from './user.model';
import { UserActions } from './user.actions.types';

export const userReducer = (state = userState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state,
        isAuthorizationLoading: true
      }
    }
    case UserActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthorizationLoading: false,
        country: action.payload.user.country,
        email: action.payload.user.email,
        name: action.payload.user.name,
        role: action.payload.user.role,
        userId: action.payload.user.userId,
        gender: action.payload.user.gender,
        birthDate: action.payload.user.birthDate,
        profileType: action.payload.user.profileType
      }
    }
    case UserActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        isAuthorizationLoading: false
      }
    }
    case UserActionTypes.REGISTRATION: {
      return {
        ...state,
        isAuthorizationLoading: true
      }
    }
    case UserActionTypes.REGISTRATION_SUCCESS: {
      return {
        ...state,
        isAuthorizationLoading: false,
        country: action.payload.user.country,
        email: action.payload.user.email,
        name: action.payload.user.name,
        role: action.payload.user.role,
        userId: action.payload.user.userId,
        gender: action.payload.user.gender,
        birthDate: action.payload.user.birthDate,
        profileType: action.payload.user.profileType
      }
    }
    case UserActionTypes.REGISTRATION_FAILED: {
      return {
        ...state,
        isAuthorizationLoading: false
      }
    }
    case UserActionTypes.REFRESH: {
      return {
        ...state,
        isAuthorizationLoading: true
      }
    }
    case UserActionTypes.REFRESH_SUCCESS: {
      return {
        ...state,
        isAuthorizationLoading: false,
        country: action.payload.user.country,
        email: action.payload.user.email,
        name: action.payload.user.name,
        role: action.payload.user.role,
        userId: action.payload.user.userId,
        gender: action.payload.user.gender,
        birthDate: action.payload.user.birthDate,
        profileType: action.payload.user.profileType
      }
    }
    case UserActionTypes.REFRESH_FAILED: {
      return {
        ...state,
        isAuthorizationLoading: false
      }
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthorizationLoading: true
      }
    }
    case UserActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthorizationLoading: false,
        country: undefined,
        email: undefined,
        name: undefined,
        role: undefined,
        userId: undefined,
        gender: undefined,
        birthDate: undefined
      }
    }
    case UserActionTypes.LOGOUT_FAILED: {
      return {
        ...state,
        isAuthorizationLoading: false
      }
    }
    case UserActionTypes.SET_AVATAR: {
      return {
        ...state,
        avatar: action.payload
      }
    }
    case UserActionTypes.SWITCH_USER_TO_ARTIST: {
      return {
        ...state,
        profileType: ProfileTypeEnum.artist
      }
    }
    case UserActionTypes.SWITCH_USER_TO_LISTENER: {
      return {
        ...state,
        profileType: ProfileTypeEnum.listener
      }
    }
    default: {
      return { ...state }
    }
  }
}