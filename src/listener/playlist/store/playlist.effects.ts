import { put, takeEvery } from 'redux-saga/effects'
import { PlaylistActionTypes, PlaylistFullResponseData, PlaylistInfoResponseData } from './playlist.model';
import PlaylistService from './playlist.service';
import { playlistActions } from './playlist.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { GetPlaylistByIdStartActionType, GetPlaylistsByListenerIdStartActionType } from './playlist.actions.types';

export const playlistEffects = [
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID, getPlaylistsByListenerId),
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED, handleError),
  takeEvery(PlaylistActionTypes.GET_PLAYLIST_BY_ID, getPlaylistById),
  takeEvery(PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED, handleError)
];

function* getPlaylistsByListenerId(action: GetPlaylistsByListenerIdStartActionType) {
  try {
    const playlists: Array<PlaylistInfoResponseData> = yield PlaylistService.getPlaylistsByListenerId(action.payload);
    yield put(playlistActions.getPlaylistsByListenerIdSuccess(playlists));
  } catch (e) {
    const error = e as Error;
    yield put(playlistActions.getPlaylistsByListenerIdFailed({ error }));
  }
}

function* getPlaylistById(action: GetPlaylistByIdStartActionType) {
  try {
    const playlist: PlaylistFullResponseData = yield PlaylistService.getPlaylistById(action.payload);
    yield put(playlistActions.getPlaylistByIdSuccess(playlist));
  } catch (e) {
    const error = e as Error;
    yield put(playlistActions.getPlaylistByIdFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}