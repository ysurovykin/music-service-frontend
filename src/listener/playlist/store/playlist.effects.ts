import { put, select, takeEvery } from 'redux-saga/effects'
import { PlaylistActionTypes, PlaylistFullResponseData, PlaylistInfoResponseData } from './playlist.model';
import PlaylistService from './playlist.service';
import { playlistActions } from './playlist.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import {
  CreatePlaylistStartActionType,
  EditSongPlaylistsStartActionType,
  GetPlaylistByIdStartActionType,
  GetPlaylistsByListenerIdStartActionType,
  EditPlaylistStartActionType
} from './playlist.actions.types';
import { notification } from 'antd';
import { userSelectors } from '../../../user/store/user.selectors';
import { songSelectors } from '../../song/store/song.selectors';
import { SongInfoResponseData } from '../../song/store/song.model';
import { QueueSongInfoResponseData } from '../../queue/store/queue.model';
import { queueSelectors } from '../../queue/store/queue.selectors';
import { queueActions } from '../../queue/store/queue.actions';
import { songActions } from '../../song/store/song.actions';

export const playlistEffects = [
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID, getPlaylistsByListenerId),
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED, handleError),
  takeEvery(PlaylistActionTypes.GET_PLAYLIST_BY_ID, getPlaylistById),
  takeEvery(PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED, handleError),
  takeEvery(PlaylistActionTypes.EDIT_SONG_PLAYLISTS, editSongPlaylists),
  takeEvery(PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED, handleError),
  takeEvery(PlaylistActionTypes.CREATE_PLAYLIST, createPlaylist),
  takeEvery(PlaylistActionTypes.CREATE_PLAYLIST_FAILED, handleError),
  takeEvery(PlaylistActionTypes.EDIT_PLAYLIST, editPlaylist),
  takeEvery(PlaylistActionTypes.EDIT_PLAYLIST_FAILED, handleError),
];

function* getPlaylistsByListenerId() {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const playlists: Array<PlaylistInfoResponseData> = yield PlaylistService.getPlaylistsByListenerId(listenerId);
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

function* editSongPlaylists(action: EditSongPlaylistsStartActionType) {//TODO add update for artist liked songs
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const editedPlaylistIds: Array<string> = yield PlaylistService.editSongPlaylists(listenerId, {
      songId: action.payload.songId,
      editedPlaylists: action.payload.editedPlaylists
    });

    const songs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
    let songsToEdit: Array<SongInfoResponseData> = songs?.length ? structuredClone(songs) : [];
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
    const editedPlaylist = action.payload.editedPlaylists
      .find(editedPlaylist => editedPlaylist.playlistId === action.payload.playlistIdToUpdate);

    if (editedPlaylist) {
      if (editedPlaylist.added) {
        yield put(songActions.getSongById({ songId: action.payload.songId, playlistId: editedPlaylist.playlistId }));
      } else {
        songsToEdit = songsToEdit.filter(song => song.songId !== action.payload.songId);
      }
      yield put(playlistActions.getPlaylistById(editedPlaylist.playlistId));
    };

    yield put(queueActions.updateQueueLikes(songsQueueToEdit));
    yield put(songActions.editSongPlaylists(songsToEdit));
    yield put(playlistActions.editSongPlaylistsSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(playlistActions.editSongPlaylistsFailed({ error }));
  }
}

function* createPlaylist(action: CreatePlaylistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    if (action.payload.coverImage) {
      formData.append('image', action.payload.coverImage);
    } else if (action.payload.backgroundColor) {
      formData.append('backgroundColor', action.payload.backgroundColor);
    }
    if (action.payload.description) {
      formData.append('description', action.payload.description.trim());
    }
    formData.append('name', action.payload.name.trim());
    yield PlaylistService.createPlaylist(listenerId, formData);

    yield put(playlistActions.createPlaylistSuccess());
    yield put(playlistActions.getPlaylistsByListenerId());
  } catch (e) {
    const error = e as Error;
    yield put(playlistActions.createPlaylistFailed({ error }));
  }
}

function* editPlaylist(action: EditPlaylistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    if (action.payload.coverImage) {
      formData.append('image', action.payload.coverImage);
    } else if (action.payload.backgroundColor) {
      formData.append('backgroundColor', action.payload.backgroundColor);
    }
    if (action.payload.description) {
      formData.append('description', action.payload.description.trim());
    }
    formData.append('name', action.payload.name.trim());
    formData.append('playlistId', action.payload.playlistId)
    yield PlaylistService.editPlaylist(listenerId, formData);

    yield put(playlistActions.editPlaylistSuccess());
    yield put(playlistActions.getPlaylistsByListenerId());
    yield put(playlistActions.getPlaylistById(action.payload.playlistId));
  } catch (e) {
    const error = e as Error;
    yield put(playlistActions.editPlaylistFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}