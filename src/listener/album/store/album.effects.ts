import { put, takeEvery } from 'redux-saga/effects'
import { AlbumActionTypes, AlbumInfoResponseData } from './album.model';
import AlbumService from './album.service';
import { albumActions } from './album.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import { GetAlbumByIdStartActionType, GetAlbumsByArtistIdStartActionType } from './album.actions.types';
import { Bounce, toast } from 'react-toastify';

export const albumEffects = [
  takeEvery(AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID, getAlbumsByArtistId),
  takeEvery(AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED, handleError),
  takeEvery(AlbumActionTypes.GET_ALBUM_BY_ID, getAlbumById),
  takeEvery(AlbumActionTypes.GET_ALBUM_BY_ID_FAILED, handleError)
];

function* getAlbumsByArtistId(action: GetAlbumsByArtistIdStartActionType) {
  try {
    const albums: Array<AlbumInfoResponseData> = yield AlbumService.getAlbumsByArtistId(action.payload);
    yield put(albumActions.getAlbumsByArtistIdSuccess(albums));
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.getAlbumsByArtistIdFailed({ error }));
  }
}

function* getAlbumById(action: GetAlbumByIdStartActionType) {
  try {
    const album: AlbumInfoResponseData = yield AlbumService.getAlbumById(action.payload);
    yield put(albumActions.getAlbumByIdSuccess(album));
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.getAlbumByIdFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}