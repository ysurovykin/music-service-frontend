import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongActionTypes, SongInfoResponseData, PlaySongData, EditPlaylistsRequest } from "./song.model";

export type GetSongByIdStartActionType = {
  type: typeof SongActionTypes.GET_SONG_BY_ID;
  payload: string;
};

export type GetSongByIdSuccessActionType = {
  type: typeof SongActionTypes.GET_SONG_BY_ID_SUCCESS;
  payload: SongInfoResponseData;
};

export type GetSongByIdFailedActionType = {
  type: typeof SongActionTypes.GET_SONG_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type PlaySongActionType = {
  type: typeof SongActionTypes.PLAY_SONG;
  payload: PlaySongData;
};

export type PauseSongActionType = {
  type: typeof SongActionTypes.PAUSE_SONG;
  payload: undefined;
};

export type UnpauseSongActionType = {
  type: typeof SongActionTypes.UNPAUSE_SONG;
  payload: undefined;
};

export type OpenEditPlaylistsModalActionType = {
  type: typeof SongActionTypes.OPEN_EDIT_PLAYLISTS_MODAL;
  payload: string;
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
  payload: Array<string>;
};

export type EditPlaylistsFailedActionType = {
  type: typeof SongActionTypes.EDIT_PLAYLISTS_FAILED;
  payload: ActionFailedError;
};

export type SongActions =
  | GetSongByIdStartActionType
  | GetSongByIdSuccessActionType
  | GetSongByIdFailedActionType
  | PlaySongActionType
  | PauseSongActionType
  | UnpauseSongActionType
  | OpenEditPlaylistsModalActionType
  | CloseEditPlaylistsModalActionType
  | EditPlaylistsStartActionType
  | EditPlaylistsSuccessActionType
  | EditPlaylistsFailedActionType;
