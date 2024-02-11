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
        volume: action.payload.volume,
        shuffleEnabled: action.payload.shuffleEnabled,
        repeatSongState: action.payload.repeatSongState,
        songId: action.payload.songId,
        playTime: action.payload.playTime,
        songsQueue: action.payload.songsQueue,
        name: action.payload.name,
        songIndex: action.payload.songIndex
      }
    }
    case ListenerActionTypes.GET_LISTENER_BY_ID_FAILED: {
      return {
        ...state,
        isListenerLoading: false
      }
    }
    case ListenerActionTypes.UPDATE_SONG_PLAYER_DATA: {
      return {
        ...state,
        songsQueue: action.payload.songData.songsQueue,
        songId: action.payload.songData.songId,
        songIndex: action.payload.songData.songIndex
      }
    }
    case ListenerActionTypes.CHANGE_VOLUME: {
      return {
        ...state,
        volume: action.payload.volume
      }
    }
    
    case ListenerActionTypes.CHANGE_REPEAT_SONG_STATE: {
      return {
        ...state,
        repeatSongState: action.payload.repeatSongState
      }
    }
    case ListenerActionTypes.CHANGE_SHUFFLE_STATE: {
      return {
        ...state,
        shuffleEnabled: action.payload.shuffleEnabled
      }
    }
    default: {
      return { ...state }
    }
  }
}