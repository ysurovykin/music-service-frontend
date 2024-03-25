import { put, select, takeEvery } from 'redux-saga/effects'
import { LyricsActionTypes, LyricsInfoResponseData } from './lyrics.model';
import LyricsService from './lyrics.service';
import { lyricsActions } from './lyrics.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import { GetLyricsStartActionType } from './lyrics.actions.types';

export const lyricsEffects = [
  takeEvery(LyricsActionTypes.GET_SONG_LYRICS, getSongLyrics),
  takeEvery(LyricsActionTypes.GET_SONG_LYRICS_FAILED, handleError),
];

function* getSongLyrics(action: GetLyricsStartActionType) {
  try {
    const lyrics: LyricsInfoResponseData = yield LyricsService.getSongLyrics(action.payload);
    yield put(lyricsActions.getSongLyricsSuccess(lyrics));
  } catch (e) {
    const error = e as Error;
    yield put(lyricsActions.getSongLyricsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}