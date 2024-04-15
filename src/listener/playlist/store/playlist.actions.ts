import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import {
  GetPlaylistsByListenerIdFailedActionType,
  GetPlaylistsByListenerIdStartActionType,
  GetPlaylistsByListenerIdSuccessActionType,
  GetPlaylistsInListenerLibraryStartActionType,
  GetPlaylistsInListenerLibrarySuccessActionType,
  GetPlaylistsInListenerLibraryFailedActionType,
  GetPlaylistByIdStartActionType,
  GetPlaylistByIdSuccessActionType,
  GetPlaylistByIdFailedActionType,
  OpenCreatePlaylistModalActionType,
  CloseCreatePlaylistModalActionType,
  OpenEditPlaylistsModalActionType,
  CloseEditPlaylistsModalActionType,
  EditSongPlaylistsStartActionType,
  EditSongPlaylistsSuccessActionType,
  EditSongPlaylistsFailedActionType,
  CreatePlaylistStartActionType,
  CreatePlaylistSuccessActionType,
  CreatePlaylistFailedActionType,
  EditPlaylistStartActionType,
  EditPlaylistSuccessActionType,
  EditPlaylistFailedActionType,
  OpenEditPlaylistModalActionType,
  CloseEditPlaylistModalActionType,
  PinPlaylistStartActionType,
  PinPlaylistSuccessActionType,
  PinPlaylistFailedActionType,
  UnpinPlaylistStartActionType,
  UnpinPlaylistSuccessActionType,
  UnpinPlaylistFailedActionType
} from "./playlist.actions.types";
import {
  PlaylistActionTypes,
  PlaylistInfoResponseData,
  EditedPlaylistDataForRequest,
  OpenEditSongPlaylistsModal,
  CreatePlaylistRequestData,
  EditPlaylistRequestData,
  PlaylistFullResponseData,
  GetPlaylistsRequest,
  ChangePlaylistPinRequestData,
} from "./playlist.model";
export const getPlaylistsByListenerIdStartAction = (request: GetPlaylistsRequest):
  GetPlaylistsByListenerIdStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID, payload: request });

export const getPlaylistsByListenerIdSuccessAction = (response: Array<PlaylistInfoResponseData>):
  GetPlaylistsByListenerIdSuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS, payload: response });

export const getPlaylistsByListenerIdFailedAction = (error: ActionFailedError):
  GetPlaylistsByListenerIdFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED, payload: error });

export const getPlaylistsInListenerLibraryStartAction = (request: GetPlaylistsRequest):
  GetPlaylistsInListenerLibraryStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY, payload: request });

export const getPlaylistsInListenerLibrarySuccessAction = (response: Array<PlaylistInfoResponseData>):
  GetPlaylistsInListenerLibrarySuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY_SUCCESS, payload: response });

export const getPlaylistsInListenerLibraryFailedAction = (error: ActionFailedError):
  GetPlaylistsInListenerLibraryFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY_FAILED, payload: error });

export const getPlaylistByIdStartAction = (playlistId: string):
  GetPlaylistByIdStartActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID, payload: playlistId });

export const getPlaylistByIdSuccessAction = (response: PlaylistFullResponseData):
  GetPlaylistByIdSuccessActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID_SUCCESS, payload: response });

export const getPlaylistByIdFailedAction = (error: ActionFailedError):
  GetPlaylistByIdFailedActionType => ({ type: PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED, payload: error });

export const openEditPlaylistsModalAction = (songInfo: OpenEditSongPlaylistsModal):
  OpenEditPlaylistsModalActionType => ({ type: PlaylistActionTypes.OPEN_EDIT_SONG_PLAYLISTS_MODAL, payload: songInfo });

export const closeEditPlaylistsModalAction = ():
  CloseEditPlaylistsModalActionType => ({ type: PlaylistActionTypes.CLOSE_EDIT_SONG_PLAYLISTS_MODAL, payload: undefined });

export const editSongPlaylistsStartAction = (request: EditedPlaylistDataForRequest):
  EditSongPlaylistsStartActionType => ({ type: PlaylistActionTypes.EDIT_SONG_PLAYLISTS, payload: request });

export const editSongPlaylistsSuccessAction = ():
  EditSongPlaylistsSuccessActionType => ({ type: PlaylistActionTypes.EDIT_SONG_PLAYLISTS_SUCCESS, payload: undefined });

export const editSongPlaylistsFailedAction = (error: ActionFailedError):
  EditSongPlaylistsFailedActionType => ({ type: PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED, payload: error });

export const openCreatePlaylistModalAction = ():
  OpenCreatePlaylistModalActionType => ({ type: PlaylistActionTypes.OPEN_CREATE_PLAYLIST_MODAL, payload: undefined });

export const closeCreatePlaylistModalAction = ():
  CloseCreatePlaylistModalActionType => ({ type: PlaylistActionTypes.CLOSE_CREATE_PLAYLIST_MODAL, payload: undefined });

export const createPlaylistStartAction = (request: CreatePlaylistRequestData):
  CreatePlaylistStartActionType => ({ type: PlaylistActionTypes.CREATE_PLAYLIST, payload: request });

export const createPlaylistSuccessAction = ():
  CreatePlaylistSuccessActionType => ({ type: PlaylistActionTypes.CREATE_PLAYLIST_SUCCESS, payload: undefined });

export const createPlaylistFailedAction = (error: ActionFailedError):
  CreatePlaylistFailedActionType => ({ type: PlaylistActionTypes.CREATE_PLAYLIST_FAILED, payload: error });

export const openEditPlaylistModalAction = ():
  OpenEditPlaylistModalActionType => ({ type: PlaylistActionTypes.OPEN_EDIT_PLAYLIST_MODAL, payload: undefined });

export const closeEditPlaylistModalAction = ():
  CloseEditPlaylistModalActionType => ({ type: PlaylistActionTypes.CLOSE_EDIT_PLAYLIST_MODAL, payload: undefined });

export const editPlaylistStartAction = (request: EditPlaylistRequestData):
  EditPlaylistStartActionType => ({ type: PlaylistActionTypes.EDIT_PLAYLIST, payload: request });

export const editPlaylistSuccessAction = ():
  EditPlaylistSuccessActionType => ({ type: PlaylistActionTypes.EDIT_PLAYLIST_SUCCESS, payload: undefined });

export const editPlaylistFailedAction = (error: ActionFailedError):
  EditPlaylistFailedActionType => ({ type: PlaylistActionTypes.EDIT_PLAYLIST_FAILED, payload: error });

export const pinPlaylistStartAction = (request: ChangePlaylistPinRequestData):
  PinPlaylistStartActionType => ({ type: PlaylistActionTypes.PIN_PLAYLIST, payload: request });

export const pinPlaylistSuccessAction = ():
  PinPlaylistSuccessActionType => ({ type: PlaylistActionTypes.PIN_PLAYLIST_SUCCESS, payload: undefined });

export const pinPlaylistFailedAction = (error: ActionFailedError):
  PinPlaylistFailedActionType => ({ type: PlaylistActionTypes.PIN_PLAYLIST_FAILED, payload: error });

export const unpinPlaylistStartAction = (request: ChangePlaylistPinRequestData):
  UnpinPlaylistStartActionType => ({ type: PlaylistActionTypes.UNPIN_PLAYLIST, payload: request });

export const unpinPlaylistSuccessAction = ():
  UnpinPlaylistSuccessActionType => ({ type: PlaylistActionTypes.UNPIN_PLAYLIST_SUCCESS, payload: undefined });

export const unpinPlaylistFailedAction = (error: ActionFailedError):
  UnpinPlaylistFailedActionType => ({ type: PlaylistActionTypes.UNPIN_PLAYLIST_FAILED, payload: error });

export const playlistActions = {
  getPlaylistsByListenerId: (request: GetPlaylistsRequest) => getPlaylistsByListenerIdStartAction(request),
  getPlaylistsByListenerIdSuccess: (response: Array<PlaylistInfoResponseData>) => getPlaylistsByListenerIdSuccessAction(response),
  getPlaylistsByListenerIdFailed: (error: ActionFailedError) => getPlaylistsByListenerIdFailedAction(error),
  getPlaylistsInListenerLibrary: (request: GetPlaylistsRequest) => getPlaylistsInListenerLibraryStartAction(request),
  getPlaylistsInListenerLibrarySuccess: (response: Array<PlaylistInfoResponseData>) => getPlaylistsInListenerLibrarySuccessAction(response),
  getPlaylistsInListenerLibraryFailed: (error: ActionFailedError) => getPlaylistsInListenerLibraryFailedAction(error),
  getPlaylistById: (playlistId: string) => getPlaylistByIdStartAction(playlistId),
  getPlaylistByIdSuccess: (response: PlaylistFullResponseData) => getPlaylistByIdSuccessAction(response),
  getPlaylistByIdFailed: (error: ActionFailedError) => getPlaylistByIdFailedAction(error),
  openEditSongPlaylistsModal: (songInfo: OpenEditSongPlaylistsModal) => openEditPlaylistsModalAction(songInfo),
  closeEditSongPlaylistsModal: () => closeEditPlaylistsModalAction(),
  editSongPlaylists: (request: EditedPlaylistDataForRequest) => editSongPlaylistsStartAction(request),
  editSongPlaylistsSuccess: () => editSongPlaylistsSuccessAction(),
  editSongPlaylistsFailed: (error: ActionFailedError) => editSongPlaylistsFailedAction(error),
  openCreatePlaylistModal: () => openCreatePlaylistModalAction(),
  closeCreatePlaylistModal: () => closeCreatePlaylistModalAction(),
  createPlaylist: (request: CreatePlaylistRequestData) => createPlaylistStartAction(request),
  createPlaylistSuccess: () => createPlaylistSuccessAction(),
  createPlaylistFailed: (error: ActionFailedError) => createPlaylistFailedAction(error),
  openEditPlaylistModal: () => openEditPlaylistModalAction(),
  closeEditPlaylistModal: () => closeEditPlaylistModalAction(),
  editPlaylist: (request: EditPlaylistRequestData) => editPlaylistStartAction(request),
  editPlaylistSuccess: () => editPlaylistSuccessAction(),
  editPlaylistFailed: (error: ActionFailedError) => editPlaylistFailedAction(error),
  pinPlaylist: (request: ChangePlaylistPinRequestData) => pinPlaylistStartAction(request),
  pinPlaylistSuccess: () => pinPlaylistSuccessAction(),
  pinPlaylistFailed: (error: ActionFailedError) => pinPlaylistFailedAction(error),
  unpinPlaylist: (request: ChangePlaylistPinRequestData) => unpinPlaylistStartAction(request),
  unpinPlaylistSuccess: () => unpinPlaylistSuccessAction(),
  unpinPlaylistFailed: (error: ActionFailedError) => unpinPlaylistFailedAction(error),
}

