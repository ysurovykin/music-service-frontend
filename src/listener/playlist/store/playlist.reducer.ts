import { PlaylistActionTypes, playlistState } from './playlist.model';
import { PlaylistState } from './playlist.model';
import { PlaylistActions } from './playlist.actions.types';

export const playlistReducer = (state = playlistState, action: PlaylistActions): PlaylistState => {
  switch (action.type) {
    case PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID: {
      return {
        ...state,
        isPlaylistsLoading: true
      }
    }
    case PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS: {
      return {
        ...state,
        isPlaylistsLoading: false,
        playlists: action.payload
      }
    }
    case PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED: {
      return {
        ...state,
        isPlaylistsLoading: false
      }
    }
    case PlaylistActionTypes.GET_PLAYLIST_BY_ID: {
      return {
        ...state,
        isPlaylistDataLoading: true
      }
    }
    case PlaylistActionTypes.GET_PLAYLIST_BY_ID_SUCCESS: {
      return {
        ...state,
        isPlaylistDataLoading: false,
        name: action.payload.name,
        date: action.payload.date,
        coverImageUrl: action.payload.coverImageUrl,
        tag: action.payload.tag,
        songs: action.payload.songs,
      }
    }
    case PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED: {
      return {
        ...state,
        isPlaylistDataLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}