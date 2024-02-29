import { SongActionTypes, songState } from './song.model';
import { SongState } from './song.model';
import { SongActions } from './song.actions.types';

export const songReducer = (state = songState, action: SongActions): SongState => {
  switch (action.type) {
    case SongActionTypes.OPEN_EDIT_PLAYLISTS_MODAL: {
      return {
        ...state,
        isEditPlaylistModalOpen: true,
        editPlaylistsSongId: action.payload.editPlaylistsSongId,
        editPlaylistsSongPlaylistIds: action.payload.editPlaylistsSongPlaylistIds
      }
    }
    case SongActionTypes.CLOSE_EDIT_PLAYLISTS_MODAL: {
      return {
        ...state,
        isEditPlaylistModalOpen: false
      }
    }
    case SongActionTypes.EDIT_PLAYLISTS: {
      return {
        ...state,
        isPlaylistIdsLoading: true
      }
    }
    case SongActionTypes.EDIT_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        songs: action.payload,
        isPlaylistIdsLoading: false
      }
    }
    case SongActionTypes.EDIT_PLAYLISTS_FAILED: {
      return {
        ...state,
        isPlaylistIdsLoading: false
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
    case SongActionTypes.CLEAR_SONGS: {
      return {
        ...state,
        songs: [],
        isMoreSongsForLoading: true,
        isSongsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}