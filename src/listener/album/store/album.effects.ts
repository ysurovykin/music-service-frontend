import { put, takeEvery } from 'redux-saga/effects'
import { AlbumActionTypes, AlbumFullResponseData, AlbumInfoResponseData } from './album.model';
import AlbumService from './album.service';
import { albumActions } from './album.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { GetAlbumByIdStartActionType, GetAlbumsByArtistIdStartActionType } from './album.actions.types';

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
    const album: AlbumFullResponseData = yield AlbumService.getAlbumById(action.payload);
    yield put(albumActions.getAlbumByIdSuccess(album));
  } catch (e) {
    const error = e as Error;
    yield put(albumActions.getAlbumByIdFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}