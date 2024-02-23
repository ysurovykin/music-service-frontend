import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetPlaylistsByListenerIdFailedActionType,
  GetPlaylistsByListenerIdStartActionType,
  GetPlaylistsByListenerIdSuccessActionType,
  GetPlaylistByIdStartActionType,
  GetPlaylistByIdSuccessActionType,
  GetPlaylistByIdFailedActionType
} from "./playlist.actions.types";
import { PlaylistActionTypes, PlaylistInfoResponseData } from "./playlist.model";

export const getPlaylistsByListenerIdStartAction = (listenerId: string):
  GetPlaylistsByListenerIdStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID, payload: listenerId });

export const getPlaylistsByListenerIdSuccessAction = (response: Array<PlaylistInfoResponseData>):
  GetPlaylistsByListenerIdSuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS, payload: response });

export const getPlaylistsByListenerIdFailedAction = (error: ActionFailedError):
  GetPlaylistsByListenerIdFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED, payload: error });

export const getPlaylistByIdStartAction = (playlistId: string):
  GetPlaylistByIdStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID, payload: playlistId });

export const getPlaylistByIdSuccessAction = (response: PlaylistInfoResponseData):
  GetPlaylistByIdSuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID_SUCCESS, payload: response });

export const getPlaylistByIdFailedAction = (error: ActionFailedError):
  GetPlaylistByIdFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED, payload: error });

export const playlistActions = {
  getPlaylistsByListenerId: (listenerId: string) => getPlaylistsByListenerIdStartAction(listenerId),
  getPlaylistsByListenerIdSuccess: (response: Array<PlaylistInfoResponseData>) => getPlaylistsByListenerIdSuccessAction(response),
  getPlaylistsByListenerIdFailed: (error: ActionFailedError) => getPlaylistsByListenerIdFailedAction(error),
  getPlaylistById: (playlistId: string) => getPlaylistByIdStartAction(playlistId),
  getPlaylistByIdSuccess: (response: PlaylistInfoResponseData) => getPlaylistByIdSuccessAction(response),
  getPlaylistByIdFailed: (error: ActionFailedError) => getPlaylistByIdFailedAction(error),
}

