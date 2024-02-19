import { put, takeEvery } from 'redux-saga/effects'
import { SongActionTypes, SongInfoResponseData } from './song.model';
import SongService from './song.service';
import { songActions } from './song.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { EditPlaylistsStartActionType, GetSongByIdStartActionType } from './song.actions.types';
import { playlistActions } from '../../playlist/store/playlist.actions';

export const songEffects = [
  takeEvery(SongActionTypes.GET_SONG_BY_ID, getSongById),
  takeEvery(SongActionTypes.GET_SONG_BY_ID_FAILED, handleError),
  takeEvery(SongActionTypes.EDIT_PLAYLISTS, editPlaylists),
  takeEvery(SongActionTypes.EDIT_PLAYLISTS_FAILED, handleError),
];

function* getSongById(action: GetSongByIdStartActionType) {
  try {
    const song: SongInfoResponseData = yield SongService.getSongById(action.payload);
    yield put(songActions.getSongByIdSuccess(song));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.getSongByIdFailed({ error }));
  }
}

function* editPlaylists(action: EditPlaylistsStartActionType) {
  try {
    const editedPlaylistIds: Array<string> = yield SongService.editPlaylists({
      songId: action.payload.songId,
      editedPlaylists: action.payload.editedPlaylists
    });
    if (action.payload.playlistIdToUpdate) {
      yield put(playlistActions.getPlaylistById(action.payload.playlistIdToUpdate));
    }
    yield put(songActions.editPlaylistsSuccess(editedPlaylistIds));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.editPlaylistsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}