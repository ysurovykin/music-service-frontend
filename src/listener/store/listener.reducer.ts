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
        getStartedCompleted: action.payload.getStartedCompleted,
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
    case ListenerActionTypes.OPEN_GET_STARTED_MODAL: {
      return {
        ...state,
        isGetStartedModalOpen: true
      }
    }
    case ListenerActionTypes.CLOSE_GET_STARTED_MODAL: {
      return {
        ...state,
        isGetStartedModalOpen: false
      }
    }
    case ListenerActionTypes.GET_EXISTING_GENRES: {
      return {
        ...state,
        isExistingGenresLoading: true
      }
    }
    case ListenerActionTypes.GET_EXISTING_GENRES_SUCCESS: {
      return {
        ...state,
        isExistingGenresLoading: false,
        recommendedGenres: action.payload.recommendedGenres,
        otherGenres: action.payload.otherGenres,
      }
    }
    case ListenerActionTypes.GET_EXISTING_GENRES_FAILED: {
      return {
        ...state,
        isExistingGenresLoading: false
      }
    }
    case ListenerActionTypes.GET_RECOMMENDED_ARTISTS: {
      return {
        ...state,
        isRecommendedArtistsLoading: true
      }
    }
    case ListenerActionTypes.GET_RECOMMENDED_ARTISTS_SUCCESS: {
      return {
        ...state,
        isRecommendedArtistsLoading: false,
        recommendedArtists: action.payload.recommendedArtists,
        isMoreRecommendedArtistsForLoading: action.payload.isMoreRecommendedArtistsForLoading
      }
    }
    case ListenerActionTypes.GET_RECOMMENDED_ARTISTS_FAILED: {
      return {
        ...state,
        isRecommendedArtistsLoading: false
      }
    }    
    case ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS: {
      return {
        ...state,
        isRecommendedArtistsLoading: true
      }
    }
    case ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_SUCCESS: {
      return {
        ...state,
        isRecommendedArtistsLoading: false,
        recommendedArtists: action.payload.recommendedArtists,
        isMoreRecommendedArtistsForLoading: action.payload.isMoreRecommendedArtistsForLoading
      }
    }
    case ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_FAILED: {
      return {
        ...state,
        isRecommendedArtistsLoading: false
      }
    }
    case ListenerActionTypes.SAVE_GET_STARTED_RESULTS: {
      return {
        ...state,
        isSaveGetStartedResultsLoading: true
      }
    }
    case ListenerActionTypes.SAVE_GET_STARTED_RESULTS_SUCCESS: {
      return {
        ...state,
        isSaveGetStartedResultsLoading: false,
        isGetStartedModalOpen: false,
        getStartedCompleted: true
      }
    }
    case ListenerActionTypes.SAVE_GET_STARTED_RESULTS_FAILED: {
      return {
        ...state,
        isSaveGetStartedResultsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}