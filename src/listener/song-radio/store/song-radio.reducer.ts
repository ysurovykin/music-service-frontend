import { SongRadioActionTypes, songRadioState } from './song-radio.model';
import { SongRadioState } from './song-radio.model';
import { SongRadioActions } from './song-radio.actions.types';

export const songRadioReducer = (state = songRadioState, action: SongRadioActions): SongRadioState => {
  switch (action.type) {
    case SongRadioActionTypes.GET_SONG_RADIO: {
      return {
        ...state,
        isSongRadioLoading: true
      }
    }
    case SongRadioActionTypes.GET_SONG_RADIO_SUCCESS: {
      return {
        ...state,
        isSongRadioLoading: false,
        name: action.payload.name,
        lastUpdatedAt: action.payload.lastUpdatedAt,
        coverImageUrl: action.payload.coverImageUrl,
        songName: action.payload.songName,
        backgroundColor: action.payload.backgroundColor,
        baseSongId: action.payload.baseSongId,
        songsTimeDuration: action.payload.songsTimeDuration,
        songsCount: action.payload.songsCount
      }
    }
    case SongRadioActionTypes.GET_SONG_RADIO_FAILED: {
      return {
        ...state,
        isSongRadioLoading: false
      }
    }
    case SongRadioActionTypes.GET_LISTENER_SONG_RADIOS: {
      return {
        ...state,
        isListenerSongRadiosLoading: true
      }
    }
    case SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_SUCCESS: {
      return {
        ...state,
        isListenerSongRadiosLoading: false,
        listenerSongRadios: action.payload.listenerSongRadios,
        isMoreListenerSongRadiosForLoading: action.payload.isMoreListenerSongRadiosForLoading
      }
    }
    case SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_FAILED: {
      return {
        ...state,
        isListenerSongRadiosLoading: false
      }
    }
    case SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS: {
      return {
        ...state,
        isListenerSongRadiosLoading: true
      }
    }
    case SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_SUCCESS: {
      return {
        ...state,
        isListenerSongRadiosLoading: false,
        listenerSongRadios: action.payload.listenerSongRadios,
        isMoreListenerSongRadiosForLoading: action.payload.isMoreListenerSongRadiosForLoading
      }
    }
    case SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_FAILED: {
      return {
        ...state,
        isListenerSongRadiosLoading: false
      }
    }
    case SongRadioActionTypes.CREATE_SONG_RADIO: {
      return {
        ...state,
        isSongRadioLoading: true
      }
    }
    case SongRadioActionTypes.CREATE_SONG_RADIO_SUCCESS: {
      return {
        ...state,
        isSongRadioLoading: false,
        name: action.payload.name,
        lastUpdatedAt: action.payload.lastUpdatedAt,
        coverImageUrl: action.payload.coverImageUrl,
        songName: action.payload.songName,
        backgroundColor: action.payload.backgroundColor,
        songsTimeDuration: action.payload.songsTimeDuration,
        songsCount: action.payload.songsCount,
        isRefreshSongRadioModalOpen: false
      }
    }
    case SongRadioActionTypes.CREATE_SONG_RADIO_FAILED: {
      return {
        ...state,
        isSongRadioLoading: false
      }
    }
    case SongRadioActionTypes.OPEN_REFRESH_SONG_RADIO_MODAL: {
      return {
        ...state,
        isRefreshSongRadioModalOpen: true
      }
    }
    case SongRadioActionTypes.CLOSE_REFRESH_SONG_RADIO_MODAL: {
      return {
        ...state,
        isRefreshSongRadioModalOpen: false
      }
    }
    default: {
      return { ...state }
    }
  }
}