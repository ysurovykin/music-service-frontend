import { LyricsActionTypes, lyricsState } from './lyrics.model';
import { LyricsState } from './lyrics.model';
import { LyricsActions } from './lyrics.actions.types';

export const lyricsReducer = (state = lyricsState, action: LyricsActions): LyricsState => {
  switch (action.type) {
    case LyricsActionTypes.GET_SONG_LYRICS: {
      return {
        ...state,
        isLyricsLoading: true
      }
    }
    case LyricsActionTypes.GET_SONG_LYRICS_SUCCESS: {
      return {
        ...state,
        isLyricsLoading: false,
        lyrics: action.payload.lyrics,
        synchronized: action.payload.synchronized,
      }
    }
    case LyricsActionTypes.GET_SONG_LYRICS_FAILED: {
      return {
        ...state,
        isLyricsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}