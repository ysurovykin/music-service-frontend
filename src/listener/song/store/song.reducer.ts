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
        name: action.payload.name,
        artists: action.payload.artists,
        album: action.payload.album,
        plays: action.payload.plays,
        date: action.payload.date,
        duration: action.payload.duration,
        coverImageUrl: action.payload.coverImageUrl,
        songUrl: action.payload.songUrl
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
        songIndex: action.payload.songIndex,
        songsQueue: action.payload.songsQueue,
        songId: action.payload.songId,
        artists: action.payload.artists,
        coverImageUrl: action.payload.coverImageUrl,
        duration: action.payload.duration,
        name: action.payload.name,
        songUrl: action.payload.songUrl,
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
    default: {
      return { ...state }
    }
  }
}