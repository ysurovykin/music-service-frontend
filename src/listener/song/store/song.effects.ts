import { put, select, takeEvery } from 'redux-saga/effects'
import { GetSongsResponseData, SongActionTypes, SongInfoResponseData } from './song.model';
import SongService from './song.service';
import { songActions } from './song.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { EditPlaylistsStartActionType, GetSongsStartActionType } from './song.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { songSelectors } from './song.selectors';
import { queueSelectors } from '../../queue/store/queue.selectors';
import { queueActions } from '../../queue/store/queue.actions';
import { QueueSongInfoResponseData } from '../../queue/store/queue.model';

export const songEffects = [
  takeEvery(SongActionTypes.GET_SONGS, getSongs),
  takeEvery(SongActionTypes.GET_SONGS_FAILED, handleError),
  takeEvery(SongActionTypes.EDIT_PLAYLISTS, editPlaylists),
  takeEvery(SongActionTypes.EDIT_PLAYLISTS_FAILED, handleError),
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

function* editPlaylists(action: EditPlaylistsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const editedPlaylistIds: Array<string> = yield SongService.editPlaylists(listenerId, {
      songId: action.payload.songId,
      editedPlaylists: action.payload.editedPlaylists
    });

    const songs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
    const songsToEdit: Array<SongInfoResponseData> = songs?.length ? structuredClone(songs) : [];
    const songIndex = songsToEdit.findIndex(song => song.songId === action.payload.songId);
    if (songIndex !== -1) {
      songsToEdit[songIndex].playlistIds = editedPlaylistIds;
    }

    const songsQueue: Array<QueueSongInfoResponseData> = yield select(queueSelectors.queue);
    const songsQueueToEdit: Array<QueueSongInfoResponseData> = songsQueue?.length ? structuredClone(songsQueue) : [];
    const songInQueueIndex = songsQueueToEdit.findIndex(songInQueue => songInQueue.songId === action.payload.songId);
    if (songInQueueIndex !== -1) {
      songsQueueToEdit[songInQueueIndex].playlistIds = editedPlaylistIds;
    }
    yield put(queueActions.updateQueueLikes(songsQueueToEdit));
    yield put(songActions.editPlaylistsSuccess(songsToEdit));
  } catch (e) {
    const error = e as Error;
    yield put(songActions.editPlaylistsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}