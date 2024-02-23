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
  EditPlaylistsFailedActionType,
  GetSongsStartActionType,
  GetSongsSuccessActionType,
  GetSongsFailedActionType,
  ClearSongsActionType
} from "./song.actions.types";
import { SongActionTypes, SongInfoResponseData, PlaySongData, EditPlaylistsRequest, OpenEditPlaylistsModal, GetSongsRequestData, GetSongsResponseData, EditPlaylistResult } from "./song.model";

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

export const openEditPlaylistsModalAction = (songInfo: OpenEditPlaylistsModal):
  OpenEditPlaylistsModalActionType => ({ type: SongActionTypes.OPEN_EDIT_PLAYLISTS_MODAL, payload: songInfo });

export const closeEditPlaylistsModalAction = ():
  CloseEditPlaylistsModalActionType => ({ type: SongActionTypes.CLOSE_EDIT_PLAYLISTS_MODAL, payload: undefined });

export const editPlaylistsStartAction = (request: EditPlaylistsRequest):
  EditPlaylistsStartActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS, payload: request });

export const editPlaylistsSuccessAction = (result: EditPlaylistResult):
  EditPlaylistsSuccessActionType => ({ type: SongActionTypes.EDIT_PLAYLISTS_SUCCESS, payload: result });

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
  getSongById: (songId: string) => getSongByIdStartAction(songId),
  getSongByIdSuccess: (response: SongInfoResponseData) => getSongByIdSuccessAction(response),
  getSongByIdFailed: (error: ActionFailedError) => getSongByIdFailedAction(error),
  playSong: (song: PlaySongData) => playSongAction(song),
  pauseSong: () => pauseSongAction(),
  unpauseSong: () => unpauseSongAction(),
  openEditPlaylistsModal: (songInfo: OpenEditPlaylistsModal) => openEditPlaylistsModalAction(songInfo),
  closeEditPlaylistsModal: () => closeEditPlaylistsModalAction(),
  editPlaylists: (request: EditPlaylistsRequest) => editPlaylistsStartAction(request),
  editPlaylistsSuccess: (result: EditPlaylistResult) => editPlaylistsSuccessAction(result),
  editPlaylistsFailed: (error: ActionFailedError) => editPlaylistsFailedAction(error),
  getSongs: (request: GetSongsRequestData) => getSongsStartAction(request),
  getSongsSuccess: (response: GetSongsResponseData) => getSongsSuccessAction(response),
  getSongsFailed: (error: ActionFailedError) => getSongsFailedAction(error),
  clearSongs: () => clearSongs(),
}

