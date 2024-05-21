import { ArtistSongActionTypes, artistSongState } from './artist-song.model';
import { ArtistSongState } from './artist-song.model';
import { SongActions } from './artist-song.actions.types';

export const artistSongReducer = (state = artistSongState, action: SongActions): ArtistSongState => {
  switch (action.type) {
    case ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS: {
      return {
        ...state,
        isSongsLoading: true
      }
    }
    case ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_SUCCESS: {
      return {
        ...state,
        songs: action.payload.songs,
        isSongsLoading: false
      }
    }
    case ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_FAILED: {
      return {
        ...state,
        isSongsLoading: false
      }
    }
    case ArtistSongActionTypes.UPLOAD_SONG: {
      return {
        ...state,
        isUploadSongLoading: true
      }
    }
    case ArtistSongActionTypes.UPLOAD_SONG_SUCCESS: {
      return {
        ...state,
        isUploadSongLoading: false,
        isUploadSongModalOpen: false,
      }
    }
    case ArtistSongActionTypes.UPLOAD_SONG_FAILED: {
      return {
        ...state,
        isUploadSongLoading: false
      }
    }
    case ArtistSongActionTypes.HIDE_SONG: {
      return {
        ...state,
        isHideSongLoading: true
      }
    }
    case ArtistSongActionTypes.HIDE_SONG_SUCCESS: {
      return {
        ...state,
        isHideSongLoading: false
      }
    }
    case ArtistSongActionTypes.HIDE_SONG_FAILED: {
      return {
        ...state,
        isHideSongLoading: false
      }
    }
    case ArtistSongActionTypes.UNHIDE_SONG: {
      return {
        ...state,
        isUnhideSongLoading: true
      }
    }
    case ArtistSongActionTypes.UNHIDE_SONG_SUCCESS: {
      return {
        ...state,
        isUnhideSongLoading: false
      }
    }
    case ArtistSongActionTypes.UNHIDE_SONG_FAILED: {
      return {
        ...state,
        isUnhideSongLoading: false
      }
    }
    case ArtistSongActionTypes.OPEN_UPLOAD_SONG_MODAL: {
      return {
        ...state,
        isUploadSongModalOpen: true
      }
    }
    case ArtistSongActionTypes.CLOSE_UPLOAD_SONG_MODAL: {
      return {
        ...state,
        isUploadSongModalOpen: false
      }
    }
    default: {
      return { ...state }
    }
  }
}