import { put, select, takeEvery } from 'redux-saga/effects'
import {
  CheckAnswerResponseData,
  FinishedSongGuesserFullResponseData,
  FinishedSongGuesserInfoResponseData,
  GetFinishedSongGuessersResponseData,
  SkipSongResponseData,
  SongGuesserActionTypes,
  SongGuesserInfoResponseData,
  SongGuesserStatsData
} from './song-guesser.model';
import SongGuesserService from './song-guesser.service';
import { songGuesserActions } from './song-guesser.actions';
import { ErrorActionType, getErrorMessage, showNotification, updateNotification } from '../../../helpers/react/redux.helper';
import {
  CountAvailableSongsStartActionType,
  StartSongGuesserStartActionType,
  CheckAnswerStartActionType,
  SkipSongStartActionType,
  GetFinishedSongGuesserStatsStartActionType,
  GetFinishedSongGuessersStartActionType,
  LoadMoreFinishedSongGuessersStartActionType,
  GetFinishedSongGuesserByIdStartActionType,
} from './song-guesser.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { AxiosError } from 'axios';
import { queueActions } from '../../queue/store/queue.actions';
import { songGuesserSelectors } from './song-guesser.selectors';

export const songGuesserEffects = [
  takeEvery(SongGuesserActionTypes.COUNT_AVAILABLE_SONGS, countAvailableSongs),
  takeEvery(SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.START_SONG_GUESSER, startSongGuesser),
  takeEvery(SongGuesserActionTypes.START_SONG_GUESSER_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.CHECK_ANSWER, checkAnswer),
  takeEvery(SongGuesserActionTypes.CHECK_ANSWER_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.SKIP_SONG, skipSong),
  takeEvery(SongGuesserActionTypes.SKIP_SONG_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS, getFinishedSongGuesserStats),
  takeEvery(SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS, getFinishedSongGuessers),
  takeEvery(SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS, loadMoreFinishedSongGuessers),
  takeEvery(SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_FAILED, handleError),
  takeEvery(SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID, getFinishedSongGuesserById),
  takeEvery(SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_FAILED, handleError),
];

function* countAvailableSongs(action: CountAvailableSongsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const count: number = yield SongGuesserService.countAvailableSongs(listenerId, action.payload);
    yield put(songGuesserActions.countAvailableSongsSuccess(count));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.countAvailableSongsFailed({ error }));
  }
}

function* startSongGuesser(action: StartSongGuesserStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const songGuessers: SongGuesserInfoResponseData = yield SongGuesserService.startSongGuesser(listenerId, action.payload);
    yield put(songGuesserActions.startSongGuesserSuccess(songGuessers));
    yield put(queueActions.pauseSong());
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.startSongGuesserFailed({ error }));
  }
}

function* checkAnswer(action: CheckAnswerStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: CheckAnswerResponseData = yield SongGuesserService.checkAnswer(listenerId, action.payload);
    const checkAnswerLoadingNotificationId = localStorage.getItem('checkAnswerLoadingNotificationId');
    if (response.isCorrect) {
      yield put(songGuesserActions.checkAnswerCorrectSuccess({
        isCorrect: true,
        gameOver: response.gameOver,
        gameOverInfo: response.gameOverInfo,
        songUrl: response.songUrl,
        startTime: response.startTime
      }));
      if (response.gameOver) {
        if (checkAnswerLoadingNotificationId) {
          yield updateNotification(checkAnswerLoadingNotificationId,
            'You guessed all songs!', 'success', 3000);
        } else {
          yield showNotification('success', 'You guessed all songs!', 3000);
        }
        yield put(songGuesserActions.closeGuesserGameModal());
        yield put(songGuesserActions.openGameOverModal());
        return;
      }
      if (checkAnswerLoadingNotificationId) {
        updateNotification(checkAnswerLoadingNotificationId, 'Congratulations, you guessed correctly!', 'success', 3000);
        localStorage.removeItem('checkAnswerLoadingNotificationId');
      } else {
        yield showNotification('success', 'Congratulations, you guessed correctly!', 3000);
      }
    } else {
      yield put(songGuesserActions.checkAnswerWrongSuccess({
        isCorrect: false,
        formatedArtistNameGuess: response.formatedArtistNameGuess,
        formatedSongNameGuess: response.formatedSongNameGuess,
        isSongNameCorrect: response.isSongNameCorrect,
        isArtistNameCorrect: response.isArtistNameCorrect,
        gameOver: response.gameOver,
        gameOverInfo: response.gameOverInfo,
        isClose: response.isClose,
        mistakes: response.mistakes,
      }));
      if (response.gameOver) {
        if (checkAnswerLoadingNotificationId) {
          yield updateNotification(checkAnswerLoadingNotificationId,
            `You reached mistakes limit. The last song was: ${response.artistName} - ${response.songName}`, 'error', 10000);
        } else {
          yield showNotification('error', `You reached mistakes limit. The last song was: ${response.artistName} - ${response.songName}`, 10000);
        }
        yield put(songGuesserActions.closeGuesserGameModal());
        yield put(songGuesserActions.openGameOverModal());
        return;
      }
      if (response.isClose) {
        if (checkAnswerLoadingNotificationId) {
          updateNotification(checkAnswerLoadingNotificationId, 'Your guess is close, but not the exact answer', 'warning', 3000);
          localStorage.removeItem('checkAnswerLoadingNotificationId');
        } else {
          yield showNotification('warning', 'Your guess is close, but not the exact answer', 3000);
        }
      } else {
        if (checkAnswerLoadingNotificationId) {
          updateNotification(checkAnswerLoadingNotificationId, 'Unfortunately this is the wrong guess', 'error', 3000);
          localStorage.removeItem('checkAnswerLoadingNotificationId');
        } else {
          yield showNotification('error', 'Unfortunately this is the wrong guess', 3000);
        }
      }
    }
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.checkAnswerFailed({ error }));
  }
}

function* skipSong(action: SkipSongStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: SkipSongResponseData = yield SongGuesserService.skipSong(listenerId, action.payload);
    yield put(songGuesserActions.skipSongSuccess(response));
    const skipSongGuesserSongLoadingNotificationId = localStorage.getItem('skipSongGuesserSongLoadingNotificationId');
    if (skipSongGuesserSongLoadingNotificationId) {
      yield updateNotification(skipSongGuesserSongLoadingNotificationId,
        `Guesser skipped successfully. The song was: ${response.artistName} - ${response.songName}`, 'info', 10000);
    } else {
      yield showNotification('info', `Guesser skipped successfully. The song was: ${response.artistName} - ${response.songName}`, 10000);
    }
    if (response.gameOver) {
      yield put(songGuesserActions.closeGuesserGameModal());
      yield put(songGuesserActions.openGameOverModal());
      return;
    }
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.skipSongFailed({ error }));
  }
}

function* getFinishedSongGuesserStats(action: GetFinishedSongGuesserStatsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const stats: SongGuesserStatsData = yield SongGuesserService.getFinishedSongGuesserStats(listenerId);
    yield put(songGuesserActions.getFinishedSongGuesserStatsSuccess(stats));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.getFinishedSongGuesserStatsFailed({ error }));
  }
}

function* getFinishedSongGuessers(action: GetFinishedSongGuessersStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const songGuessers: GetFinishedSongGuessersResponseData = yield SongGuesserService.getFinishedSongGuessers(listenerId, action.payload);
    yield put(songGuesserActions.getFinishedSongGuessersSuccess(songGuessers));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.getFinishedSongGuessersFailed({ error }));
  }
}

function* loadMoreFinishedSongGuessers(action: LoadMoreFinishedSongGuessersStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetFinishedSongGuessersResponseData = yield SongGuesserService.getFinishedSongGuessers(listenerId, action.payload);
    const currentFinishedSongGuessers: Array<FinishedSongGuesserInfoResponseData> = yield select(songGuesserSelectors.finishedSongGuessers);
    const finishedSongGuessers: Array<FinishedSongGuesserInfoResponseData> = (currentFinishedSongGuessers || []).concat(...response.finishedSongGuessers);
    yield put(songGuesserActions.loadMoreFinishedSongGuessersSuccess({
      finishedSongGuessers: finishedSongGuessers,
      isMoreFinishedSongGuessersForLoading: response.isMoreFinishedSongGuessersForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.loadMoreFinishedSongGuessersFailed({ error }));
  }
}

function* getFinishedSongGuesserById(action: GetFinishedSongGuesserByIdStartActionType) {
  try {
    const songGuesser: FinishedSongGuesserFullResponseData = yield SongGuesserService.getFinishedSongGuesserById(action.payload);
    yield put(songGuesserActions.getFinishedSongGuesserByIdSuccess(songGuesser));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songGuesserActions.getFinishedSongGuesserByIdFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}