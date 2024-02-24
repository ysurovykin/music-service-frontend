import { SongActionTypes, songState } from './song.model';
import { SongState } from './song.model';
import { SongActions } from './song.actions.types';

export const songReducer = (state = songState, action: SongActions): SongState => {
  switch (action.type) {
    case SongActionTypes.GET_SONG_BY_ID: {
      return {
        ...state,
        isSongDataLoading: true
      }
    }
    case SongActionTypes.GET_SONG_BY_ID_SUCCESS: {
      return {
        ...state,
        isSongDataLoading: false,
        songId: action.payload.songId,
        name: action.payload.name,
        artists: action.payload.artists,
        album: action.payload.album,
        plays: action.payload.plays,
        date: action.payload.date,
        duration: action.payload.duration,
        coverImageUrl: action.payload.coverImageUrl,
        songUrl: action.payload.songUrl,
        backgroundColor: action.payload.backgroundColor,
        lyricsBackgroundShadow: action.payload.lyricsBackgroundShadow,
        playlistIds: action.payload.playlistIds
      }
    }
    case SongActionTypes.GET_SONG_BY_ID_FAILED: {
      return {
        ...state,
        isSongDataLoading: false
      }
    }
    case SongActionTypes.PLAY_SONG: {
      return {
        ...state,
        songId: action.payload.songId,
        artists: action.payload.artists,
        coverImageUrl: action.payload.coverImageUrl,
        duration: action.payload.duration,
        name: action.payload.name,
        songUrl: action.payload.songUrl,
        playlistIds: action.payload.playlistIds,
        backgroundColor: action.payload.backgroundColor,
        lyricsBackgroundShadow: action.payload.lyricsBackgroundShadow,
        isPlaying: true
      }
    }
    case SongActionTypes.PAUSE_SONG: {
      return {
        ...state,
        isPlaying: false
      }
    }
    case SongActionTypes.UNPAUSE_SONG: {
      return {
        ...state,
        isPlaying: true
      }
    }
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
        playlistIds: action.payload.playlistIds,
        songs: action.payload.songs,
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