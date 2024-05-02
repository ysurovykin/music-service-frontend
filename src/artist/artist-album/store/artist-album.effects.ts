import { put, select, takeEvery } from 'redux-saga/effects'
import { AlbumActionTypes, AlbumInfoResponseData, GetAlbumsResponse } from './artist-album.model';
import ArtistAlbumService from './artist-album.service';
import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
import {
  CreateAlbumStartActionType,
  EditAlbumStartActionType,
  GetAlbumByIdStartActionType,
  GetAlbumsStartActionType,
} from './artist-album.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { AxiosError } from 'axios';
import { artistAlbumSelectors } from './artist-album.selectors';
import { artistAlbumActions } from './artist-album.actions';

export const artistAlbumEffects = [
  takeEvery(AlbumActionTypes.GET_ALBUM_BY_ID, getAlbumById),
  takeEvery(AlbumActionTypes.GET_ALBUM_BY_ID_FAILED, handleError),
  takeEvery(AlbumActionTypes.GET_ALBUMS, getAlbums),
  takeEvery(AlbumActionTypes.GET_ALBUMS_FAILED, handleError),
  takeEvery(AlbumActionTypes.LOAD_MORE_ALBUMS, loadMoreAlbums),
  takeEvery(AlbumActionTypes.LOAD_MORE_ALBUMS_FAILED, handleError),
  takeEvery(AlbumActionTypes.CREATE_ALBUM, createAlbum),
  takeEvery(AlbumActionTypes.CREATE_ALBUM_FAILED, handleError),
  takeEvery(AlbumActionTypes.EDIT_ALBUM, editAlbum),
  takeEvery(AlbumActionTypes.EDIT_ALBUM_FAILED, handleError),
];

function* getAlbumById(action: GetAlbumByIdStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const album: AlbumInfoResponseData = yield ArtistAlbumService.getAlbumById(artistId, action.payload);
    yield put(artistAlbumActions.getAlbumByIdSuccess(album));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistAlbumActions.getAlbumByIdFailed({ error }));
  }
}

function* getAlbums(action: GetAlbumsStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const response: GetAlbumsResponse = yield ArtistAlbumService.getAlbums(artistId, action.payload);
    yield put(artistAlbumActions.getAlbumsSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistAlbumActions.getAlbumsFailed({ error }));
  }
}

function* createAlbum(action: CreateAlbumStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    if (action.payload.coverImage) {
      formData.append('image', action.payload.coverImage);
    }
    formData.append('name', action.payload.name.trim());
    yield ArtistAlbumService.createAlbum(artistId, formData);
    yield put(artistAlbumActions.createAlbumSuccess());
    yield put(artistAlbumActions.getAlbums({ limit: 10, offset: 0 }));
    yield showNotification('success', 'Album successfully created');
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistAlbumActions.createAlbumFailed({ error }));
  }
}

function* editAlbum(action: EditAlbumStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    if (action.payload.coverImage) {
      formData.append('image', action.payload.coverImage);
    }
    formData.append('albumId', action.payload.albumId);
    formData.append('name', action.payload.name.trim());
    yield ArtistAlbumService.editAlbum(artistId, formData);
    yield put(artistAlbumActions.editAlbumSuccess());
    yield put(artistAlbumActions.getAlbumById(action.payload.albumId));
    yield put(artistAlbumActions.getAlbums({ limit: 10, offset: 0 }));
    yield showNotification('success', `Album "${action.payload.name.trim()}" successfully edited`);
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistAlbumActions.editAlbumFailed({ error }));
  }
}

function* loadMoreAlbums(action: GetAlbumsStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const response: GetAlbumsResponse = yield ArtistAlbumService.getAlbums(artistId, action.payload);
    const currentAlbums: Array<AlbumInfoResponseData> = yield select(artistAlbumSelectors.albums);
    const albums: Array<AlbumInfoResponseData> = (currentAlbums || []).concat(...response.albums);
    yield put(artistAlbumActions.loadMoreAlbumsSuccess({
      albums: albums,
      isMoreAlbumsForLoading: response.isMoreAlbumsForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistAlbumActions.loadMoreAlbumsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}