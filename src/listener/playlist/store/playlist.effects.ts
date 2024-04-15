import { put, select, takeEvery } from 'redux-saga/effects'
import { EditedPlaylistShortInfo, PlaylistActionTypes, PlaylistFullResponseData, PlaylistInfoResponseData } from './playlist.model';
import PlaylistService from './playlist.service';
import { playlistActions } from './playlist.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
import {
  CreatePlaylistStartActionType,
  EditSongPlaylistsStartActionType,
  GetPlaylistByIdStartActionType,
  GetPlaylistsByListenerIdStartActionType,
  EditPlaylistStartActionType,
  PinPlaylistStartActionType,
  UnpinPlaylistStartActionType,
  GetPlaylistsInListenerLibraryStartActionType
} from './playlist.actions.types';
import { notification } from 'antd';
import { userSelectors } from '../../../user/store/user.selectors';
import { songSelectors } from '../../song/store/song.selectors';
import { SongInfoResponseData } from '../../song/store/song.model';
import { QueueSongInfoResponseData } from '../../queue/store/queue.model';
import { queueSelectors } from '../../queue/store/queue.selectors';
import { queueActions } from '../../queue/store/queue.actions';
import { songActions } from '../../song/store/song.actions';
import { artistActions } from '../../artist/store/artist.actions';
import { artistSelectors } from '../../artist/store/artist.selectors';
import { AxiosError } from 'axios';
import { playlistSelectors } from './playlist.selectors';

export const playlistEffects = [
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID, getPlaylistsByListenerId),
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED, handleError),
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY, getPlaylistsInListenerLibrary),
  takeEvery(PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY_FAILED, handleError),
  takeEvery(PlaylistActionTypes.GET_PLAYLIST_BY_ID, getPlaylistById),
  takeEvery(PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED, handleError),
  takeEvery(PlaylistActionTypes.EDIT_SONG_PLAYLISTS, editSongPlaylists),
  takeEvery(PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED, handleError),
  takeEvery(PlaylistActionTypes.CREATE_PLAYLIST, createPlaylist),
  takeEvery(PlaylistActionTypes.CREATE_PLAYLIST_FAILED, handleError),
  takeEvery(PlaylistActionTypes.EDIT_PLAYLIST, editPlaylist),
  takeEvery(PlaylistActionTypes.EDIT_PLAYLIST_FAILED, handleError),
  takeEvery(PlaylistActionTypes.PIN_PLAYLIST, pinPlaylist),
  takeEvery(PlaylistActionTypes.PIN_PLAYLIST_FAILED, handleError),
  takeEvery(PlaylistActionTypes.UNPIN_PLAYLIST, unpinPlaylist),
  takeEvery(PlaylistActionTypes.UNPIN_PLAYLIST_FAILED, handleError),
];

function* getPlaylistsByListenerId(action: GetPlaylistsByListenerIdStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const playlists: Array<PlaylistInfoResponseData> = yield PlaylistService.getPlaylistsByListenerId(listenerId, action.payload);
    yield put(playlistActions.getPlaylistsByListenerIdSuccess(playlists));
  } catch (e) {
    const error = e as AxiosError;
    yield put(playlistActions.getPlaylistsByListenerIdFailed({ error }));
  }
}

function* getPlaylistsInListenerLibrary(action: GetPlaylistsInListenerLibraryStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const playlists: Array<PlaylistInfoResponseData> = yield PlaylistService.getPlaylistsByListenerId(listenerId, action.payload);
    yield put(playlistActions.getPlaylistsInListenerLibrarySuccess(playlists));
  } catch (e) {
    const error = e as AxiosError;
    yield put(playlistActions.getPlaylistsInListenerLibraryFailed({ error }));
  }
}

function* getPlaylistById(action: GetPlaylistByIdStartActionType) {
  try {
    const playlist: PlaylistFullResponseData = yield PlaylistService.getPlaylistById(action.payload);
    yield put(playlistActions.getPlaylistByIdSuccess(playlist));
  } catch (e) {
    const error = e as AxiosError;
    yield put(playlistActions.getPlaylistByIdFailed({ error }));
  }
}

function* editSongPlaylists(action: EditSongPlaylistsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const editedPlaylists: Array<EditedPlaylistShortInfo> = action.payload.editedPlaylists
      .map(editedPlaylist => ({ added: editedPlaylist.added, playlistId: editedPlaylist.playlist?.playlistId! }));
    const editedPlaylistIds: Array<string> = yield PlaylistService.editSongPlaylists(listenerId, {
      songId: action.payload.songId,
      editedPlaylists: editedPlaylists
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
      .find(editedPlaylist => editedPlaylist.playlist.playlistId === action.payload.playlistIdToUpdate);

    if (editedPlaylist) {
      if (editedPlaylist.added) {
        yield put(songActions.getSongById({ songId: action.payload.songId, playlistId: editedPlaylist.playlist?.playlistId }));
      } else {
        songsToEdit = songsToEdit.filter(song => song.songId !== action.payload.songId);
      }
      yield put(playlistActions.getPlaylistById(editedPlaylist.playlist?.playlistId!));
    };

    if (action.payload.updateArtistLikedSongCount) {
      const likedSongsPlaylist = action.payload.editedPlaylists.find(editedPlaylist => editedPlaylist.playlist.tag === 'liked');
      if (likedSongsPlaylist) {
        let likedSongsCount: number = yield select(artistSelectors.likedSongsCount);
        const updatedLikedSongsCount = likedSongsPlaylist.added ? ++likedSongsCount : --likedSongsCount;
        yield put(artistActions.updateArtistLikedSongsCount(updatedLikedSongsCount));
      }
    }

    yield put(queueActions.updateQueueLikes(songsQueueToEdit));
    yield put(songActions.editSongPlaylists(songsToEdit));
    yield put(playlistActions.editSongPlaylistsSuccess());
    yield showNotification('success', `Song "${songsToEdit[songIndex].name}" playlists successfully changed`);
  } catch (e) {
    const error = e as AxiosError;
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
    yield put(playlistActions.getPlaylistsByListenerId({}));
    yield showNotification('success', 'Playlist successfully created');
  } catch (e) {
    const error = e as AxiosError;
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
    yield put(playlistActions.getPlaylistsByListenerId({}));
    yield put(playlistActions.getPlaylistById(action.payload.playlistId));
    yield showNotification('success', `Playlist "${action.payload.name.trim()}" successfully edited`);
  } catch (e) {
    const error = e as AxiosError;
    yield put(playlistActions.editPlaylistFailed({ error }));
  }
}

function* pinPlaylist(action: PinPlaylistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield PlaylistService.pinPlaylist(listenerId, action.payload.playlistId);
    yield put(playlistActions.getPlaylistsByListenerId({}));
    yield put(playlistActions.pinPlaylistSuccess());
    yield showNotification('success', `Playlist "${action.payload.playlistName}" pinned`);
  } catch (e) {
    const error = e as AxiosError;
    yield put(playlistActions.pinPlaylistFailed({ error }));
  }
}

function* unpinPlaylist(action: UnpinPlaylistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield PlaylistService.unpinPlaylist(listenerId, action.payload.playlistId);
    yield put(playlistActions.getPlaylistsByListenerId({}));
    yield put(playlistActions.unpinPlaylistSuccess());
    yield showNotification('success', `Playlist "${action.payload.playlistName}" unpinned`);
  } catch (e) {
    const error = e as AxiosError;
    yield put(playlistActions.unpinPlaylistFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}