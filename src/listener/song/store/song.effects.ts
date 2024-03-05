import { put, select, takeEvery } from 'redux-saga/effects'
import { GetSongsResponseData, SongActionTypes, SongInfoResponseData } from './song.model';
import SongService from './song.service';
import { songActions } from './song.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import { GetSongsStartActionType } from './song.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { songSelectors } from './song.selectors';
import { notification } from 'antd';

export const songEffects = [
  takeEvery(SongActionTypes.GET_SONGS, getSongs),
  takeEvery(SongActionTypes.GET_SONGS_FAILED, handleError)
];

function* getSongs(action: GetSongsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetSongsResponseData = yield SongService.getSongs(listenerId, action.payload);
    const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
    const songs: Array<SongInfoResponseData> = (currentSongs || []).concat(...response.songs);
    yield put(songActions.getSongsSuccess({songs: songs, isMoreSongsForLoading: response.isMoreSongsForLoading}));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.getSongsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}