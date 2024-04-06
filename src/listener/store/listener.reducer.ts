import { ListenerActionTypes, listenerState } from './listener.model';
import { ListenerState } from './listener.model';
import { ListenerActions } from './listener.actions.types';

export const listenerReducer = (state = listenerState, action: ListenerActions): ListenerState => {
  switch (action.type) {
    case ListenerActionTypes.GET_LISTENER_BY_ID: {
      return {
        ...state,
        isListenerLoading: true
      }
    }
    case ListenerActionTypes.GET_LISTENER_BY_ID_SUCCESS: {
      return {
        ...state,
        isListenerLoading: false,
        name: action.payload.name,
        profileImageUrl: action.payload.profileImageUrl,
        backgroundColor: action.payload.backgroundColor,
        subscription: action.payload.subscription,
      }
    }
    case ListenerActionTypes.GET_LISTENER_BY_ID_FAILED: {
      return {
        ...state,
        isListenerLoading: false
      }
    }
    case ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT: {
      return {
        ...state,
        isMostVisitedContentLoading: true
      }
    }
    case ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_SUCCESS: {
      return {
        ...state,
        isMostVisitedContentLoading: false,
        mostVisitedContent: action.payload
      }
    }
    case ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED: {
      return {
        ...state,
        isMostVisitedContentLoading: false
      }
    }
    case ListenerActionTypes.GET_HOME_PAGE_CONTENT: {
      return {
        ...state,
        isHomePageContentLoading: true
      }
    }
    case ListenerActionTypes.GET_HOME_PAGE_CONTENT_SUCCESS: {
      return {
        ...state,
        isHomePageContentLoading: false,
        homePageContent: action.payload
      }
    }
    case ListenerActionTypes.GET_HOME_PAGE_CONTENT_FAILED: {
      return {
        ...state,
        isHomePageContentLoading: false
      }
    }
    case ListenerActionTypes.EDIT_PROFILE: {
      return {
        ...state,
        isEditProfileLoading: true
      }
    }
    case ListenerActionTypes.EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        isEditProfileLoading: false,
        isEditProfileModalOpen: false
      }
    }
    case ListenerActionTypes.EDIT_PROFILE_FAILED: {
      return {
        ...state,
        isEditProfileLoading: false
      }
    }
    case ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT: {
      return {
        ...state,
        isAccountContentCountLoading: true
      }
    }
    case ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_SUCCESS: {
      return {
        ...state,
        isAccountContentCountLoading: false,
        playlistCount: action.payload.playlistCount,
        followedArtistsCount: action.payload.followedArtistsCount,
        likedAlbumsCount: action.payload.likedAlbumsCount,
      }
    }
    case ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_FAILED: {
      return {
        ...state,
        isAccountContentCountLoading: false
      }
    }
    case ListenerActionTypes.OPEN_EDIT_PROFILE_MODAL: {
      return {
        ...state,
        isEditProfileModalOpen: true
      }
    }
    case ListenerActionTypes.CLOSE_EDIT_PROFILE_MODAL: {
      return {
        ...state,
        isEditProfileModalOpen: false
      }
    }
    default: {
      return { ...state }
    }
  }
}