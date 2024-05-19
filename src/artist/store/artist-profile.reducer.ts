import { ArtistProfileActionTypes, artistProfileState } from './artist-profile.model';
import { ArtistProfileState } from './artist-profile.model';
import { ArtistProfileActions } from './artist-profile.actions.types';

export const artistProfileReducer = (state = artistProfileState, action: ArtistProfileActions): ArtistProfileState => {
  switch (action.type) {
    case ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID: {
      return {
        ...state,
        isArtistProfileLoading: true
      }
    }
    case ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_SUCCESS: {
      return {
        ...state,
        isArtistProfileLoading: false,
        name: action.payload.name,
        profileImageUrl: action.payload.profileImageUrl,
        backgroundColor: action.payload.backgroundColor,
        subscription: action.payload.subscription,
        subscriptionCanceledAtDate: action.payload.subscriptionCanceledAtDate
      }
    }
    case ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_FAILED: {
      return {
        ...state,
        isArtistProfileLoading: false
      }
    }
    case ArtistProfileActionTypes.OPEN_EDIT_PROFILE_MODAL: {
      return {
        ...state,
        isEditProfileModalOpen: true
      }
    }
    case ArtistProfileActionTypes.CLOSE_EDIT_PROFILE_MODAL: {
      return {
        ...state,
        isEditProfileModalOpen: false
      }
    }
    case ArtistProfileActionTypes.EDIT_PROFILE: {
      return {
        ...state,
        isEditProfileLoading: true
      }
    }
    case ArtistProfileActionTypes.EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        isEditProfileLoading: false,
        isEditProfileModalOpen: false
      }
    }
    case ArtistProfileActionTypes.EDIT_PROFILE_FAILED: {
      return {
        ...state,
        isEditProfileLoading: false
      }
    }
    case ArtistProfileActionTypes.OPEN_CHANGE_SUBSCRIPTION_MODAL: {
      return {
        ...state,
        isChangeSubscriptionModalOpen: true
      }
    }
    case ArtistProfileActionTypes.CLOSE_CHANGE_SUBSCRIPTION_MODAL: {
      return {
        ...state,
        isChangeSubscriptionModalOpen: false
      }
    }
    case ArtistProfileActionTypes.CHANGE_SUBSCRIPTION: {
      return {
        ...state,
        isSubscriptionChangingLoading: true
      }
    }
    case ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        isSubscriptionChangingLoading: false,
        isChangeSubscriptionModalOpen: false
      }
    }
    case ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_FAILED: {
      return {
        ...state,
        isSubscriptionChangingLoading: false
      }
    }
    case ArtistProfileActionTypes.GET_ARTIS_STATS: {
      return {
        ...state,
        isArtistStatsLoading: true
      }
    }
    case ArtistProfileActionTypes.GET_ARTIS_STATS_SUCCESS: {
      return {
        ...state,
        isArtistStatsLoading: false,
        generalStats: action.payload.generalStats,
        advancedStats: action.payload.advancedStats
      }
    }
    case ArtistProfileActionTypes.GET_ARTIS_STATS_FAILED: {
      return {
        ...state,
        isArtistStatsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}