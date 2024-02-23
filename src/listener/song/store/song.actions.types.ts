import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongActionTypes, SongInfoResponseData, PlaySongData, EditPlaylistsRequest, OpenEditPlaylistsModal, GetSongsRequestData, GetSongsResponseData, EditPlaylistResult } from "./song.model";

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
  payload: EditPlaylistResult;
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
  | EditPlaylistsFailedActionType
  | GetSongsStartActionType
  | GetSongsSuccessActionType
  | GetSongsFailedActionType
  | ClearSongsActionType;
