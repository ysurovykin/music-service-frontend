// import { ActionFailedError } from "../../../helpers/react/redux.helper";
// import {
//   GetSongByIdStartActionType,
//   GetSongByIdSuccessActionType,
//   GetSongByIdFailedActionType,
//   GetSongsStartActionType,
//   GetSongsSuccessActionType,
//   GetSongsFailedActionType,
//   ClearSongsActionType,
//   EditSongPlaylistsActionType,
//   LoadMoreSongsStartActionType,
//   LoadMoreSongsSuccessActionType,
//   LoadMoreSongsFailedActionType,
//   RecordSongPlayRowDataActionType
// } from "./song.actions.types";
// import {
//   SongActionTypes,
//   SongInfoResponseData,
//   GetSongsRequestData,
//   GetSongsResponseData,
//   GetSongByIdRequestData,
//   RecordSongPlayRowDataRequestData
// } from "./song.model";

// export const getSongByIdStartAction = (request: GetSongByIdRequestData):
//   GetSongByIdStartActionType => ({ type: SongActionTypes.GET_SONG_BY_ID, payload: request });

// export const getSongByIdSuccessAction = (updatedSongs: Array<SongInfoResponseData>):
//   GetSongByIdSuccessActionType => ({ type: SongActionTypes.GET_SONG_BY_ID_SUCCESS, payload: updatedSongs });

// export const getSongByIdFailedAction = (error: ActionFailedError):
//   GetSongByIdFailedActionType => ({ type: SongActionTypes.GET_SONG_BY_ID_FAILED, payload: error });

// export const getSongsStartAction = (request: GetSongsRequestData):
//   GetSongsStartActionType => ({ type: SongActionTypes.GET_SONGS, payload: request });

// export const getSongsSuccessAction = (response: GetSongsResponseData):
//   GetSongsSuccessActionType => ({ type: SongActionTypes.GET_SONGS_SUCCESS, payload: response });

// export const getSongsFailedAction = (error: ActionFailedError):
//   GetSongsFailedActionType => ({ type: SongActionTypes.GET_SONGS_FAILED, payload: error });

// export const loadMoreSongsStartAction = (request: GetSongsRequestData):
//   LoadMoreSongsStartActionType => ({ type: SongActionTypes.LOAD_MORE_SONGS, payload: request });

// export const loadMoreSongsSuccessAction = (updatedSongs: GetSongsResponseData):
//   LoadMoreSongsSuccessActionType => ({ type: SongActionTypes.LOAD_MORE_SONGS_SUCCESS, payload: updatedSongs });

// export const loadMoreSongsFailedAction = (error: ActionFailedError):
//   LoadMoreSongsFailedActionType => ({ type: SongActionTypes.LOAD_MORE_SONGS_FAILED, payload: error });

// export const clearSongsAction = ():
//   ClearSongsActionType => ({ type: SongActionTypes.CLEAR_SONGS, payload: undefined });

// export const editSongPlaylistsAction = (updatedSongs: Array<SongInfoResponseData>):
//   EditSongPlaylistsActionType => ({ type: SongActionTypes.EDIT_SONG_PLAYLISTS, payload: updatedSongs });

// export const recordSongPlayRowDataAction = (request: RecordSongPlayRowDataRequestData):
//   RecordSongPlayRowDataActionType => ({ type: SongActionTypes.RECORD_SONG_PLAY_ROW_DATA, payload: request });

// export const songActions = {
//   getSongById: (request: GetSongByIdRequestData) => getSongByIdStartAction(request),
//   getSongByIdSuccess: (updatedSongs: Array<SongInfoResponseData>) => getSongByIdSuccessAction(updatedSongs),
//   getSongByIdFailed: (error: ActionFailedError) => getSongByIdFailedAction(error),
//   getSongs: (request: GetSongsRequestData) => getSongsStartAction(request),
//   getSongsSuccess: (response: GetSongsResponseData) => getSongsSuccessAction(response),
//   getSongsFailed: (error: ActionFailedError) => getSongsFailedAction(error),
//   loadMoreSongs: (request: GetSongsRequestData) => loadMoreSongsStartAction(request),
//   loadMoreSongsSuccess: (response: GetSongsResponseData) => loadMoreSongsSuccessAction(response),
//   loadMoreSongsFailed: (error: ActionFailedError) => loadMoreSongsFailedAction(error),
//   editSongPlaylists: (updatedSongs: Array<SongInfoResponseData>) => editSongPlaylistsAction(updatedSongs),
//   recordSongPlayRowData: (request: RecordSongPlayRowDataRequestData) => recordSongPlayRowDataAction(request),
//   clearSongs: () => clearSongsAction(),
// }

export {};