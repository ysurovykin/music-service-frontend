import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  OpenEditPlaylistsModalActionType,
  CloseEditPlaylistsModalActionType,
  EditPlaylistsStartActionType,
  EditPlaylistsSuccessActionType,
  EditPlaylistsFailedActionType,
  GetSongsStartActionType,
  GetSongsSuccessActionType,
  GetSongsFailedActionType,
  ClearSongsActionType
} from "./song.actions.types";
import {
  SongActionTypes,
  SongInfoResponseData,
  EditPlaylistsRequest,
  OpenEditPlaylistsModal,
  GetSongsRequestData,
  GetSongsResponseData
} from "./song.model";

export const openEditPlaylistsModalAction = (songInfo: OpenEditPlaylistsModal):
  OpenEditPlaylistsModalActionType => ({ type: SongActionTypes.OPEN_EDIT_PLAYLISTS_MODAL, payload: songInfo });

export const closeEditPlaylistsModalAction = ():
  CloseEditPlaylistsModalActionType => ({ type: SongActionTypes.CLOSE_EDIT_PLAYLISTS_MODAL, payload: undefined });

export const editPlaylistsStartAction = (request: EditPlaylistsRequest):
  EditPlaylistsStartActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS, payload: request });

export const editPlaylistsSuccessAction = (updatedSongs: Array<SongInfoResponseData>):
  EditPlaylistsSuccessActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS_SUCCESS, payload: updatedSongs });

export const editPlaylistsFailedAction = (error: ActionFailedError):
  EditPlaylistsFailedActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS_FAILED, payload: error });

export const getSongsStartAction = (request: GetSongsRequestData):
  GetSongsStartActionType => ({ type: SongActionTypes.GET_SONGS, payload: request });

export const getSongsSuccessAction = (response: GetSongsResponseData):
  GetSongsSuccessActionType => ({ type: SongActionTypes.GET_SONGS_SUCCESS, payload: response });

export const getSongsFailedAction = (error: ActionFailedError):
  GetSongsFailedActionType => ({ type: SongActionTypes.GET_SONGS_FAILED, payload: error });

export const clearSongs = ():
  ClearSongsActionType => ({ type: SongActionTypes.CLEAR_SONGS, payload: undefined });

export const songActions = {
  openEditPlaylistsModal: (songInfo: OpenEditPlaylistsModal) => openEditPlaylistsModalAction(songInfo),
  closeEditPlaylistsModal: () => closeEditPlaylistsModalAction(),
  editPlaylists: (request: EditPlaylistsRequest) => editPlaylistsStartAction(request),
  editPlaylistsSuccess: (updatedSongs: Array<SongInfoResponseData>) => editPlaylistsSuccessAction(updatedSongs),
  editPlaylistsFailed: (error: ActionFailedError) => editPlaylistsFailedAction(error),
  getSongs: (request: GetSongsRequestData) => getSongsStartAction(request),
  getSongsSuccess: (response: GetSongsResponseData) => getSongsSuccessAction(response),
  getSongsFailed: (error: ActionFailedError) => getSongsFailedAction(error),
  clearSongs: () => clearSongs(),
}

