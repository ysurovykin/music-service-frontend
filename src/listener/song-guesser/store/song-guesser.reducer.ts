import { SongGuesserActionTypes, songGuesserState } from './song-guesser.model';
import { SongGuesserState } from './song-guesser.model';
import { SongGuesserActions } from './song-guesser.actions.types';

export const songGuesserReducer = (state = songGuesserState, action: SongGuesserActions): SongGuesserState => {
  switch (action.type) {
    case SongGuesserActionTypes.COUNT_AVAILABLE_SONGS: {
      return {
        ...state,
        isCountAvailableSongsLoading: true
      }
    }
    case SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_SUCCESS: {
      return {
        ...state,
        isCountAvailableSongsLoading: false,
        availableSongsByFilter: action.payload
      }
    }
    case SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_FAILED: {
      return {
        ...state,
        isCountAvailableSongsLoading: false
      }
    }
    case SongGuesserActionTypes.START_SONG_GUESSER: {
      return {
        ...state,
        isSongGuesserLoading: true
      }
    }
    case SongGuesserActionTypes.START_SONG_GUESSER_SUCCESS: {
      return {
        ...state,
        isSongGuesserLoading: false,
        songGuesserId: action.payload.songGuesserId,
        songUrl: action.payload.songUrl,
        startTime: action.payload.startTime,
        mistakes: 0,
        formatedArtistNameGuess: undefined,
        formatedSongNameGuess: undefined,
        gameOver: false,
        gameOverInfo: undefined,
      }
    }
    case SongGuesserActionTypes.START_SONG_GUESSER_FAILED: {
      return {
        ...state,
        isSongGuesserLoading: false
      }
    }
    case SongGuesserActionTypes.CHECK_ANSWER: {
      return {
        ...state,
        isCheckAnswerLoading: true
      }
    }
    case SongGuesserActionTypes.CHECK_ANSWER_CORRECT_SUCCESS: {
      return {
        ...state,
        isCheckAnswerLoading: false,
        songUrl: action.payload.songUrl,
        startTime: action.payload.startTime,
        gameOver: action.payload.gameOver,
        gameOverInfo: action.payload.gameOverInfo,
        formatedArtistNameGuess: undefined,
        formatedSongNameGuess: undefined,
        isSongNameCorrect: undefined,
        isArtistNameCorrect: undefined,
      }
    }
    case SongGuesserActionTypes.CHECK_ANSWER_INCORRECT_SUCCESS: {
      return {
        ...state,
        isCheckAnswerLoading: false,
        formatedArtistNameGuess: action.payload.formatedArtistNameGuess,
        formatedSongNameGuess: action.payload.formatedSongNameGuess,
        isSongNameCorrect: action.payload.isSongNameCorrect,
        isArtistNameCorrect: action.payload.isArtistNameCorrect,
        gameOver: action.payload.gameOver,
        gameOverInfo: action.payload.gameOverInfo,
        mistakes: action.payload.mistakes,
      }
    }
    case SongGuesserActionTypes.CHECK_ANSWER_FAILED: {
      return {
        ...state,
        isCheckAnswerLoading: false
      }
    }
    case SongGuesserActionTypes.SKIP_SONG: {
      return {
        ...state,
        isSkipSongLoading: true
      }
    }
    case SongGuesserActionTypes.SKIP_SONG_SUCCESS: {
      return {
        ...state,
        isSkipSongLoading: false,
        songUrl: action.payload.songUrl,
        startTime: action.payload.startTime,
        mistakes: action.payload.mistakes,
        gameOver: action.payload.gameOver,
        gameOverInfo: action.payload.gameOverInfo,
        formatedArtistNameGuess: undefined,
        formatedSongNameGuess: undefined,
        isSongNameCorrect: undefined,
        isArtistNameCorrect: undefined,
      }
    }
    case SongGuesserActionTypes.SKIP_SONG_FAILED: {
      return {
        ...state,
        isSkipSongLoading: false
      }
    }
    case SongGuesserActionTypes.OPEN_GAME_OVER_MODAL: {
      return {
        ...state,
        isGameOverModalOpen: true
      }
    }
    case SongGuesserActionTypes.CLOSE_GAME_OVER_MODAL: {
      return {
        ...state,
        isGameOverModalOpen: false
      }
    }
    case SongGuesserActionTypes.OPEN_GUESSER_RULES_MODAL: {
      return {
        ...state,
        isGuesserRulesModalOpen: true
      }
    }
    case SongGuesserActionTypes.CLOSE_GUESSER_RULES_MODAL: {
      return {
        ...state,
        isGuesserRulesModalOpen: false
      }
    }
    case SongGuesserActionTypes.OPEN_GUESSER_GAME_MODAL: {
      return {
        ...state,
        isGuesserGameModalOpen: true,
        guesserBaseAlbum: action.payload.album,
        guesserBaseArtist: action.payload.artist
      }
    }
    case SongGuesserActionTypes.CLOSE_GUESSER_GAME_MODAL: {
      return {
        ...state,
        isGuesserGameModalOpen: false
      }
    }
    case SongGuesserActionTypes.OPEN_GUESSER_STATS_MODAL: {
      return {
        ...state,
        isGuesserStatsModalOpen: true
      }
    }
    case SongGuesserActionTypes.CLOSE_GUESSER_STATS_MODAL: {
      return {
        ...state,
        isGuesserStatsModalOpen: false
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS: {
      return {
        ...state,
        isSongGuesserStatsLoading: true
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_SUCCESS: {
      return {
        ...state,
        songGuesserStats: action.payload,
        isSongGuesserStatsLoading: false
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_FAILED: {
      return {
        ...state,
        isSongGuesserStatsLoading: false
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS: {
      return {
        ...state,
        isFinishedSongGuessersLoading: true
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_SUCCESS: {
      return {
        ...state,
        finishedSongGuessers: action.payload.finishedSongGuessers,
        isMoreFinishedSongGuessersForLoading: action.payload.isMoreFinishedSongGuessersForLoading,
        isFinishedSongGuessersLoading: false
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_FAILED: {
      return {
        ...state,
        isFinishedSongGuessersLoading: false
      }
    }
    case SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS: {
      return {
        ...state,
        isFinishedSongGuessersLoading: true
      }
    }
    case SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_SUCCESS: {
      return {
        ...state,
        finishedSongGuessers: action.payload.finishedSongGuessers,
        isMoreFinishedSongGuessersForLoading: action.payload.isMoreFinishedSongGuessersForLoading,
        isFinishedSongGuessersLoading: false
      }
    }
    case SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_FAILED: {
      return {
        ...state,
        isFinishedSongGuessersLoading: false
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID: {
      return {
        ...state,
        isFinishedSongGuesserDataLoading: true
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_SUCCESS: {
      return {
        ...state,
        finishedSongGuesserData: action.payload,
        isFinishedSongGuesserDataLoading: false
      }
    }
    case SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_FAILED: {
      return {
        ...state,
        isFinishedSongGuesserDataLoading: false
      }
    }

    default: {
      return { ...state }
    }
  }
}