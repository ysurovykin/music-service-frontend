import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  SongActionTypes,
  GetSongsRequestData,
  GetSongsResponseData,
  SongInfoResponseData,
  GetSongByIdRequestData
} from "./song.model";

export type GetSongByIdStartActionType = {
  type: typeof SongActionTypes.GET_SONG_BY_ID;
  payload: GetSongByIdRequestData;
};

export type GetSongByIdSuccessActionType = {
  type: typeof SongActionTypes.GET_SONG_BY_ID_SUCCESS;
  payload: Array<SongInfoResponseData>;
};

export type GetSongByIdFailedActionType = {
  type: typeof SongActionTypes.GET_SONG_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type GetSongsStartActionType = {
  type: typeof SongActionTypes.GET_SONGS;
  payload: GetSongsRequestData;
};

export type GetSongsSuccessActionType = {
  type: typeof SongActionTypes.GET_SONGS_SUCCESS;
  payload: GetSongsResponseData;
};

export type GetSongsFailedActionType = {
  type: typeof SongActionTypes.GET_SONGS_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreSongsStartActionType = {
  type: typeof SongActionTypes.LOAD_MORE_SONGS;
  payload: GetSongsRequestData;
};

export type LoadMoreSongsSuccessActionType = {
  type: typeof SongActionTypes.LOAD_MORE_SONGS_SUCCESS;
  payload: GetSongsResponseData;
};

export type LoadMoreSongsFailedActionType = {
  type: typeof SongActionTypes.LOAD_MORE_SONGS_FAILED;
  payload: ActionFailedError;
};

export type ClearSongsActionType = {
  type: typeof SongActionTypes.CLEAR_SONGS;
  payload: undefined;
};

export type EditSongPlaylistsActionType = {
  type: typeof SongActionTypes.EDIT_SONG_PLAYLISTS;
  payload: Array<SongInfoResponseData>;
};

export type SongActions =
  | GetSongByIdStartActionType
  | GetSongByIdSuccessActionType
  | GetSongByIdFailedActionType
  | GetSongsStartActionType
  | GetSongsSuccessActionType
  | GetSongsFailedActionType
  | ClearSongsActionType
  | EditSongPlaylistsActionType
  | LoadMoreSongsStartActionType
  | LoadMoreSongsSuccessActionType
  | LoadMoreSongsFailedActionType;
