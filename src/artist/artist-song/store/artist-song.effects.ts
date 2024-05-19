// import { put, select, takeEvery } from 'redux-saga/effects'
// import { GetSongsResponseData, SongActionTypes, SongInfoResponseData } from './song.model';
// import SongService from './song.service';
// import { songActions } from './song.actions';
// import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
// import { GetSongByIdStartActionType, GetSongsStartActionType, LoadMoreSongsStartActionType, RecordSongPlayRowDataActionType } from './song.actions.types';
// import { userSelectors } from '../../../user/store/user.selectors';
// import { songSelectors } from './song.selectors';
// import { notification } from 'antd';
// import { AxiosError } from 'axios';

// export const songEffects = [
//   takeEvery(SongActionTypes.GET_SONG_BY_ID, getSongById),
//   takeEvery(SongActionTypes.GET_SONG_BY_ID_FAILED, handleError),
//   takeEvery(SongActionTypes.GET_SONGS, getSongs),
//   takeEvery(SongActionTypes.GET_SONGS_FAILED, handleError),
//   takeEvery(SongActionTypes.LOAD_MORE_SONGS, loadMoreSongs),
//   takeEvery(SongActionTypes.LOAD_MORE_SONGS_FAILED, handleError),
//   takeEvery(SongActionTypes.RECORD_SONG_PLAY_ROW_DATA, recordSongPlayRowData),
// ];

// function* getSongById(action: GetSongByIdStartActionType) {
//   try {
//     const listenerId: string = yield select(userSelectors.userId);
//     const response: SongInfoResponseData = yield SongService.getSongById(listenerId, action.payload.songId, action.payload.playlistId);
//     const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
//     const songs: Array<SongInfoResponseData> = [response].concat(currentSongs || []);
//     yield put(songActions.getSongByIdSuccess(songs));
//   } catch (e) {
//     const error = e as AxiosError;
//     yield put(songActions.getSongByIdFailed({ error }));
//   }
// }

// function* getSongs(action: GetSongsStartActionType) {
//   try {
//     const listenerId: string = yield select(userSelectors.userId);
//     const response: GetSongsResponseData = yield SongService.getSongs(listenerId, action.payload);
//     const callSourceId = localStorage.getItem('currentSourceId');
//     const mostRecentCall = callSourceId === action.payload.options?.albumId || callSourceId === action.payload.options?.listenerId ||
//       callSourceId === action.payload.options?.artistId || callSourceId === action.payload.options?.playlistId ||
//       callSourceId === action.payload.options?.songRadioBaseSongId || action.payload.search;
//     const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
//     const songs: Array<SongInfoResponseData> = mostRecentCall ? response.songs : currentSongs;
//     yield put(songActions.getSongsSuccess({ songs: songs, isMoreSongsForLoading: response.isMoreSongsForLoading }));
//   } catch (e) {
//     const error = e as AxiosError;
//     yield put(songActions.getSongsFailed({ error }));
//   }
// }

// function* loadMoreSongs(action: LoadMoreSongsStartActionType) {
//   try {
//     const listenerId: string = yield select(userSelectors.userId);
//     const response: GetSongsResponseData = yield SongService.getSongs(listenerId, action.payload);
//     const currentSongs: Array<SongInfoResponseData> = yield select(songSelectors.songs);
//     const songs: Array<SongInfoResponseData> = (currentSongs || []).concat(...response.songs);
//     yield put(songActions.loadMoreSongsSuccess({ songs: songs, isMoreSongsForLoading: response.isMoreSongsForLoading }));
//   } catch (e) {
//     const error = e as AxiosError;
//     yield put(songActions.loadMoreSongsFailed({ error }));
//   }
// }

// function* recordSongPlayRowData(action: RecordSongPlayRowDataActionType) {
//   try {
//     const listenerId: string = yield select(userSelectors.userId);
//     const lastCurrentSongAllPlayTime = localStorage.getItem('currentSongAllPlayTime') || '0';
//     const currentSongAllPlayTime = !isNaN(+lastCurrentSongAllPlayTime) ? +lastCurrentSongAllPlayTime : 0;
//     localStorage.setItem('currentSongAllPlayTime', '0');
//     if (currentSongAllPlayTime > 15 && action.payload.songId) {
//       yield SongService.recordSongPlayRowData(listenerId, currentSongAllPlayTime, action.payload.songId);
//     }
//   } catch (e) {

//   }
// }

// function* handleError(action: ErrorActionType) {
//   yield showNotification('error', (getErrorMessage(action.payload.error)));
// }
export {};