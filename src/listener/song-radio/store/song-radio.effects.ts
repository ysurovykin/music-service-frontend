import { put, select, takeEvery } from 'redux-saga/effects'
import {
  CreateSongRadioResponseData,
  GetListenerSongRadiosResponseData,
  SongRadioActionTypes,
  SongRadioFullResponseData,
  SongRadioInfoResponseData
} from './song-radio.model';
import SongRadioService from './song-radio.service';
import { songRadioActions } from './song-radio.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
import {
  CreateSongRadioStartActionType,
  GetListenerSongRadiosStartActionType,
  GetSongRadioStartActionType,
  LoadMoreListenerSongRadiosStartActionType
} from './song-radio.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { songRadioSelectors } from './song-radio.selectors';
import { AxiosError } from 'axios';

export const songRadioEffects = [
  takeEvery(SongRadioActionTypes.GET_SONG_RADIO, getSongRadio),
  takeEvery(SongRadioActionTypes.GET_SONG_RADIO_FAILED, handleError),
  takeEvery(SongRadioActionTypes.GET_LISTENER_SONG_RADIOS, getListenerSongRadios),
  takeEvery(SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_FAILED, handleError),
  takeEvery(SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS, loadMoreListenerSongRadios),
  takeEvery(SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_FAILED, handleError),
  takeEvery(SongRadioActionTypes.CREATE_SONG_RADIO, createSongRadio),
  takeEvery(SongRadioActionTypes.CREATE_SONG_RADIO_FAILED, handleError),
];

function* getSongRadio(action: GetSongRadioStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const songRadio: SongRadioFullResponseData = yield SongRadioService.getSongRadio(listenerId, action.payload);
    yield put(songRadioActions.getSongRadioSuccess(songRadio));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songRadioActions.getSongRadioFailed({ error }));
  }
}

function* getListenerSongRadios(action: GetListenerSongRadiosStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const songRadios: GetListenerSongRadiosResponseData = yield SongRadioService.getListenerSongRadios(listenerId, action.payload);
    yield put(songRadioActions.getListenerSongRadiosSuccess(songRadios));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songRadioActions.getListenerSongRadiosFailed({ error }));
  }
}

function* loadMoreListenerSongRadios(action: LoadMoreListenerSongRadiosStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const songRadios: GetListenerSongRadiosResponseData = yield SongRadioService.getListenerSongRadios(listenerId, action.payload);
    const currentListenerSongRadios: Array<SongRadioInfoResponseData> = yield select(songRadioSelectors.listenerSongRadios);
    const listenerSongRadios: Array<SongRadioInfoResponseData> = (currentListenerSongRadios || []).concat(...songRadios.listenerSongRadios);
    yield put(songRadioActions.getListenerSongRadiosSuccess({
      listenerSongRadios: listenerSongRadios,
      isMoreListenerSongRadiosForLoading: songRadios.isMoreListenerSongRadiosForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(songRadioActions.getListenerSongRadiosFailed({ error }));
  }
}

function* createSongRadio(action: CreateSongRadioStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const songRadio: CreateSongRadioResponseData = yield SongRadioService.createSongRadio(listenerId, action.payload);
    if (songRadio?.status === 300) {
      yield put(songRadioActions.openRefreshSongRadioModalAction());
    } else if (songRadio?.status === 204) {
      yield put(songRadioActions.createSongRadioSuccess(songRadio));
    }
  } catch (e) {
    const error = e as AxiosError;
    yield put(songRadioActions.createSongRadioFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}