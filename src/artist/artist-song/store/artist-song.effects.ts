import { put, select, takeEvery } from 'redux-saga/effects'
import { GetArtistAlbumSongsResponseData, ArtistSongActionTypes, ArtistSongInfoResponseData } from './artist-song.model';
import ArtistSongService from './artist-song.service';
import { artistSongActions } from './artist-song.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
import { GetArtistAlbumSongsStartActionType, HideSongStartActionType, UnhideSongStartActionType, UploadSongStartActionType } from './artist-song.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { AxiosError } from 'axios';
import { artistAlbumActions } from '../../artist-album/store/artist-album.actions';

export const artistSongEffects = [
  takeEvery(ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS, getArtistAlbumSongs),
  takeEvery(ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_FAILED, handleError),
  takeEvery(ArtistSongActionTypes.UPLOAD_SONG, uploadSong),
  takeEvery(ArtistSongActionTypes.UPLOAD_SONG_FAILED, handleError),
  takeEvery(ArtistSongActionTypes.HIDE_SONG, hideSong),
  takeEvery(ArtistSongActionTypes.HIDE_SONG_FAILED, handleError),
  takeEvery(ArtistSongActionTypes.UNHIDE_SONG, unhideSong),
  takeEvery(ArtistSongActionTypes.UNHIDE_SONG_FAILED, handleError),
];

function* getArtistAlbumSongs(action: GetArtistAlbumSongsStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const response: GetArtistAlbumSongsResponseData = yield ArtistSongService.getArtistAlbumSongs(artistId, action.payload);
    yield put(artistSongActions.getArtistAlbumSongsSuccess({ songs: response.songs }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistSongActions.getArtistAlbumSongsFailed({ error }));
  }
}

function* uploadSong(action: UploadSongStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    formData.append('artistId', artistId);
    if (action.payload.song) {
      formData.append('song', action.payload.song);
    }
    formData.append('albumId', action.payload.albumId);
    formData.append('name', action.payload.name.trim());
    formData.append('explicit', JSON.stringify(action.payload.explicit));
    formData.append('genres', JSON.stringify(action.payload.genres));
    formData.append('language', action.payload.language);
    formData.append('coArtistIds', JSON.stringify(action.payload.coArtistIds));
    yield ArtistSongService.uploadSong(formData);
    yield put(artistSongActions.uploadSongSuccess());
    const currentArtistAlbumId = localStorage.getItem('currentArtistAlbumId');
    yield put(artistSongActions.getArtistAlbumSongs(currentArtistAlbumId!));
    yield put(artistAlbumActions.getAlbumById(currentArtistAlbumId!));
    yield showNotification('success', `The song ${action.payload.name.trim()} was successfully added`);
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistSongActions.uploadSongFailed({ error }));
  }
}


function* hideSong(action: HideSongStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    yield ArtistSongService.hideSong(artistId, action.payload);
    yield put(artistSongActions.hideSongSuccess());
    const currentArtistAlbumId = localStorage.getItem('currentArtistAlbumId');
    yield put(artistSongActions.getArtistAlbumSongs(currentArtistAlbumId!));
    yield showNotification('success', 'The song was hidden');
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistSongActions.hideSongFailed({ error }));
  }
}

function* unhideSong(action: UnhideSongStartActionType) {
  try {
    const artistId: string = yield select(userSelectors.userId);
    yield ArtistSongService.unhideSong(artistId, action.payload);
    yield put(artistSongActions.unhideSongSuccess());
    const currentArtistAlbumId = localStorage.getItem('currentArtistAlbumId');
    yield put(artistSongActions.getArtistAlbumSongs(currentArtistAlbumId!));
    yield showNotification('success', 'The song is visible now');
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistSongActions.unhideSongFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}