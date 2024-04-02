import { put, select, takeEvery } from 'redux-saga/effects'
import { LyricsActionTypes, LyricsInfoResponseData } from './lyrics.model';
import LyricsService from './lyrics.service';
import { lyricsActions } from './lyrics.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
import { GetLyricsStartActionType } from './lyrics.actions.types';
import { AxiosError } from 'axios';

export const lyricsEffects = [
  takeEvery(LyricsActionTypes.GET_SONG_LYRICS, getSongLyrics),
  takeEvery(LyricsActionTypes.GET_SONG_LYRICS_FAILED, handleError),
];

function* getSongLyrics(action: GetLyricsStartActionType) {
  try {
    const lyrics: LyricsInfoResponseData = yield LyricsService.getSongLyrics(action.payload);
    yield put(lyricsActions.getSongLyricsSuccess(lyrics));
  } catch (e) {
    const error = e as AxiosError;
    yield put(lyricsActions.getSongLyricsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}