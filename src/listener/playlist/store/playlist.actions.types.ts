import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { PlaylistActionTypes, PlaylistFullResponseData, PlaylistInfoResponseData } from "./playlist.model";

export type GetPlaylistsByListenerIdStartActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID;
  payload: string;
};

export type GetPlaylistsByListenerIdSuccessActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS;
  payload: Array<PlaylistInfoResponseData>;
};

export type GetPlaylistsByListenerIdFailedActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED;
  payload: ActionFailedError;
};

export type GetPlaylistByIdStartActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLIST_BY_ID;
  payload: string;
};

export type GetPlaylistByIdSuccessActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLIST_BY_ID_SUCCESS;
  payload: PlaylistFullResponseData;
};

export type GetPlaylistByIdFailedActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type PlaylistActions =
  | GetPlaylistsByListenerIdStartActionType
  | GetPlaylistsByListenerIdSuccessActionType
  | GetPlaylistsByListenerIdFailedActionType
  | GetPlaylistByIdStartActionType
  | GetPlaylistByIdSuccessActionType
  | GetPlaylistByIdFailedActionType;
