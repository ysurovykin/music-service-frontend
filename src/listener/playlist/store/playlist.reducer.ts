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
        description: action.payload.description,
        editable: action.payload.editable,
        coverImageUrl: action.payload.coverImageUrl,
        tag: action.payload.tag,
        backgroundColor: action.payload.backgroundColor,
        songsTimeDuration: action.payload.songsTimeDuration,
        songsCount: action.payload.songsCount,
      }
    }
    case PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED: {
      return {
        ...state,
        isPlaylistDataLoading: false
      }
    }
    case PlaylistActionTypes.OPEN_CREATE_PLAYLIST_MODAL: {
      return {
        ...state,
        isEditSongPlaylistsModalOpen: false,
        isCreatePlaylistModalOpen: true
      }
    }
    case PlaylistActionTypes.CLOSE_CREATE_PLAYLIST_MODAL: {
      return {
        ...state,
        isEditSongPlaylistsModalOpen: true,
        isCreatePlaylistModalOpen: false
      }
    }
    case PlaylistActionTypes.CREATE_PLAYLIST: {
      return {
        ...state,
        isCreatePlaylistLoading: true
      }
    }
    case PlaylistActionTypes.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isCreatePlaylistLoading: false,
        isCreatePlaylistModalOpen: false,
        isEditSongPlaylistsModalOpen: true
      }
    }
    case PlaylistActionTypes.CREATE_PLAYLIST_FAILED: {
      return {
        ...state,
        isCreatePlaylistLoading: false
      }
    }
    case PlaylistActionTypes.OPEN_EDIT_PLAYLIST_MODAL: {
      return {
        ...state,
        isEditPlaylistModalOpen: true
      }
    }
    case PlaylistActionTypes.CLOSE_EDIT_PLAYLIST_MODAL: {
      return {
        ...state,
        isEditPlaylistModalOpen: false
      }
    }
    case PlaylistActionTypes.EDIT_PLAYLIST: {
      return {
        ...state,
        isEditPlaylistLoading: true
      }
    }
    case PlaylistActionTypes.EDIT_PLAYLIST_SUCCESS: {
      return {
        ...state,
        isEditPlaylistLoading: false,
        isEditPlaylistModalOpen: false
      }
    }
    case PlaylistActionTypes.EDIT_PLAYLIST_FAILED: {
      return {
        ...state,
        isEditPlaylistLoading: false
      }
    }
    case PlaylistActionTypes.OPEN_EDIT_SONG_PLAYLISTS_MODAL: {
      return {
        ...state,
        isEditSongPlaylistsModalOpen: true,
        editPlaylistsSongId: action.payload.editPlaylistsSongId,
        editPlaylistsSongPlaylistIds: action.payload.editPlaylistsSongPlaylistIds
      }
    }
    case PlaylistActionTypes.CLOSE_EDIT_SONG_PLAYLISTS_MODAL: {
      return {
        ...state,
        isEditSongPlaylistsModalOpen: false
      }
    }
    case PlaylistActionTypes.EDIT_SONG_PLAYLISTS: {
      return {
        ...state,
        isEditSongPlaylistsLoading: true
      }
    }
    case PlaylistActionTypes.EDIT_SONG_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        isEditSongPlaylistsLoading: false,
        isEditSongPlaylistsModalOpen: false,
      }
    }
    case PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED: {
      return {
        ...state,
        isEditSongPlaylistsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}