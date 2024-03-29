import { SongActionTypes, songState } from './song.model';
import { SongState } from './song.model';
import { SongActions } from './song.actions.types';

export const songReducer = (state = songState, action: SongActions): SongState => {
  switch (action.type) {
    case SongActionTypes.GET_SONG_BY_ID_SUCCESS: {
      return {
        ...state,
        songs: action.payload
      }
    }
    case SongActionTypes.GET_SONGS: {
      return {
        ...state,
        isSongsLoading: true
      }
    }
    case SongActionTypes.GET_SONGS_SUCCESS: {
      return {
        ...state,
        songs: action.payload.songs,
        isMoreSongsForLoading: action.payload.isMoreSongsForLoading,
        isSongsLoading: false
      }
    }
    case SongActionTypes.GET_SONGS_FAILED: {
      return {
        ...state,
        isSongsLoading: false
      }
    }
    case SongActionTypes.LOAD_MORE_SONGS: {
      return {
        ...state,
        isSongsLoading: true
      }
    }
    case SongActionTypes.LOAD_MORE_SONGS_SUCCESS: {
      return {
        ...state,
        songs: action.payload.songs,
        isMoreSongsForLoading: action.payload.isMoreSongsForLoading,
        isSongsLoading: false
      }
    }
    case SongActionTypes.LOAD_MORE_SONGS_FAILED: {
      return {
        ...state,
        isSongsLoading: false
      }
    }
    case SongActionTypes.CLEAR_SONGS: {
      return {
        ...state,
        songs: [],
        isMoreSongsForLoading: true,
        isSongsLoading: false
      }
    }
    case SongActionTypes.EDIT_SONG_PLAYLISTS: {
      return {
        ...state,
        songs: action.payload
      }
    }
    default: {
      return { ...state }
    }
  }
}