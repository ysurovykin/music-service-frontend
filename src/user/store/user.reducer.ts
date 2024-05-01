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
        userId: action.payload.user.userId,
        gender: action.payload.user.gender,
        birthDate: action.payload.user.birthDate,
        hasArtistProfile: action.payload.user.hasArtistProfile,
        hasListenerProfile: action.payload.user.hasListenerProfile
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
        userId: action.payload.user.userId,
        gender: action.payload.user.gender,
        birthDate: action.payload.user.birthDate,
        profileType: action.payload.user.profileType,
        hasArtistProfile: action.payload.user.hasArtistProfile,
        hasListenerProfile: action.payload.user.hasListenerProfile
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
        userId: action.payload.user.userId,
        gender: action.payload.user.gender,
        birthDate: action.payload.user.birthDate,
        profileType: action.payload.user.profileType,
        hasArtistProfile: action.payload.user.hasArtistProfile,
        hasListenerProfile: action.payload.user.hasListenerProfile
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
    case UserActionTypes.SWITCH_PROFILE_TYPE: {
      return {
        ...state,
        isSwitchProfileTypeLoading: true
      }
    }
    case UserActionTypes.SWITCH_PROFILE_TYPE_SUCCESS: {
      return {
        ...state,
        isSwitchProfileTypeLoading: false,
        profileType: action.payload.user.profileType,
        hasArtistProfile: action.payload.user.hasArtistProfile,
        hasListenerProfile: action.payload.user.hasListenerProfile
      }
    }
    case UserActionTypes.SWITCH_PROFILE_TYPE_FAILED: {
      return {
        ...state,
        isSwitchProfileTypeLoading: false
      }
    }
    case UserActionTypes.GET_USER_CREDIT_CARDS: {
      return {
        ...state,
        isGetUserCreditCardsLoading: true
      }
    }
    case UserActionTypes.GET_USER_CREDIT_CARDS_SUCCESS: {
      return {
        ...state,
        isGetUserCreditCardsLoading: false,
        userCreditCards: action.payload
      }
    }
    case UserActionTypes.GET_USER_CREDIT_CARDS_FAILED: {
      return {
        ...state,
        isGetUserCreditCardsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}