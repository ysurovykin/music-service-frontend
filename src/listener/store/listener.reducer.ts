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
        backgroundColor: action.payload.backgroundColor
      }
    }
    case ListenerActionTypes.GET_LISTENER_BY_ID_FAILED: {
      return {
        ...state,
        isListenerLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}