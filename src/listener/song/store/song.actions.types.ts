import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  SongActionTypes,
  EditPlaylistsRequest,
  OpenEditPlaylistsModal,
  GetSongsRequestData,
  GetSongsResponseData,
  SongInfoResponseData
} from "./song.model";

export type OpenEditPlaylistsModalActionType = {
  type: typeof SongActionTypes.OPEN_EDIT_PLAYLISTS_MODAL;
  payload: OpenEditPlaylistsModal;
};

export type CloseEditPlaylistsModalActionType = {
  type: typeof SongActionTypes.CLOSE_EDIT_PLAYLISTS_MODAL;
  payload: undefined;
};

export type EditPlaylistsStartActionType = {
  type: typeof SongActionTypes.EDIT_PLAYLISTS;
  payload: EditPlaylistsRequest;
};

export type EditPlaylistsSuccessActionType = {
  type: typeof SongActionTypes.EDIT_PLAYLISTS_SUCCESS;
  payload: Array<SongInfoResponseData>;
};

export type EditPlaylistsFailedActionType = {
  type: typeof SongActionTypes.EDIT_PLAYLISTS_FAILED;
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

export type ClearSongsActionType = {
  type: typeof SongActionTypes.CLEAR_SONGS;
  payload: undefined;
};

export type SongActions =
  | OpenEditPlaylistsModalActionType
  | CloseEditPlaylistsModalActionType
  | EditPlaylistsStartActionType
  | EditPlaylistsSuccessActionType
  | EditPlaylistsFailedActionType
  | GetSongsStartActionType
  | GetSongsSuccessActionType
  | GetSongsFailedActionType
  | ClearSongsActionType;
