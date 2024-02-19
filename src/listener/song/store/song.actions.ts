import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetSongByIdStartActionType,
  GetSongByIdSuccessActionType,
  GetSongByIdFailedActionType,
  PlaySongActionType,
  PauseSongActionType,
  UnpauseSongActionType,
  OpenEditPlaylistsModalActionType,
  CloseEditPlaylistsModalActionType,
  EditPlaylistsStartActionType,
  EditPlaylistsSuccessActionType,
  EditPlaylistsFailedActionType
} from "./song.actions.types";
import { SongActionTypes, SongInfoResponseData, PlaySongData, EditPlaylistsRequest } from "./song.model";

export const getSongByIdStartAction = (songId: string):
  GetSongByIdStartActionType => ({ type: SongActionTypes.GET_SONG_BY_ID, payload: songId });

export const getSongByIdSuccessAction = (response: SongInfoResponseData):
  GetSongByIdSuccessActionType => ({ type: SongActionTypes.GET_SONG_BY_ID_SUCCESS, payload: response });

export const getSongByIdFailedAction = (error: ActionFailedError):
  GetSongByIdFailedActionType => ({ type: SongActionTypes.GET_SONG_BY_ID_FAILED, payload: error });

export const playSongAction = (song: PlaySongData):
  PlaySongActionType => ({ type: SongActionTypes.PLAY_SONG, payload: song });

export const pauseSongAction = ():
  PauseSongActionType => ({ type: SongActionTypes.PAUSE_SONG, payload: undefined });

export const unpauseSongAction = ():
  UnpauseSongActionType => ({ type: SongActionTypes.UNPAUSE_SONG, payload: undefined });

export const openEditPlaylistsModalAction = (songId: string):
  OpenEditPlaylistsModalActionType => ({ type: SongActionTypes.OPEN_EDIT_PLAYLISTS_MODAL, payload: songId });

export const closeEditPlaylistsModalAction = ():
  CloseEditPlaylistsModalActionType => ({ type: SongActionTypes.CLOSE_EDIT_PLAYLISTS_MODAL, payload: undefined });

export const editPlaylistsStartAction = (request: EditPlaylistsRequest):
  EditPlaylistsStartActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS, payload: request });

export const editPlaylistsSuccessAction = (playlistIds: Array<string>):
  EditPlaylistsSuccessActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS_SUCCESS, payload: playlistIds });

export const editPlaylistsFailedAction = (error: ActionFailedError):
  EditPlaylistsFailedActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS_FAILED, payload: error });

export const songActions = {
  getSongById: (songId: string) => getSongByIdStartAction(songId),
  getSongByIdSuccess: (response: SongInfoResponseData) => getSongByIdSuccessAction(response),
  getSongByIdFailed: (error: ActionFailedError) => getSongByIdFailedAction(error),
  playSong: (song: PlaySongData) => playSongAction(song),
  pauseSong: () => pauseSongAction(),
  unpauseSong: () => unpauseSongAction(),
  openEditPlaylistsModal: (songId: string) => openEditPlaylistsModalAction(songId),
  closeEditPlaylistsModal: () => closeEditPlaylistsModalAction(),
  editPlaylists: (request: EditPlaylistsRequest) => editPlaylistsStartAction(request),
  editPlaylistsSuccess: (playlistIds: Array<string>) => editPlaylistsSuccessAction(playlistIds),
  editPlaylistsFailed: (error: ActionFailedError) => editPlaylistsFailedAction(error),
}

