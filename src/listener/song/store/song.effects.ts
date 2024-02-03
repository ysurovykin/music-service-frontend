import { put, takeEvery } from 'redux-saga/effects'
import { SongActionTypes, SongInfoResponseData } from './song.model';
import SongService from './song.service';
import { songActions } from './song.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { GetSongByIdStartActionType } from './song.actions.types';

export const songEffects = [
  takeEvery(SongActionTypes.GET_SONG_BY_ID, getSongById),
  takeEvery(SongActionTypes.GET_SONG_BY_ID_FAILED, handleError)
];

function* getSongById(action: GetSongByIdStartActionType) {
  try {
    const song: SongInfoResponseData = yield SongService.getSongById(action.payload);
    yield put(songActions.getSongByIdSuccess(song));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.getSongByIdFailed({error}));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}