import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetSongByIdStartActionType,
  GetSongByIdSuccessActionType,
  GetSongByIdFailedActionType,
  PlaySongActionType,
  PauseSongActionType,
  UnpauseSongActionType
} from "./song.actions.types";
import { SongActionTypes, SongInfoResponseData, PlaySongtData } from "./song.model";

export const getSongByIdStartAction = (songId: string):
  GetSongByIdStartActionType => ({ type: SongActionTypes.GET_SONG_BY_ID, payload: songId });

export const getSongByIdSuccessAction = (response: SongInfoResponseData):
  GetSongByIdSuccessActionType => ({ type: SongActionTypes.GET_SONG_BY_ID_SUCCESS, payload: response });

export const getSongByIdFailedAction = (error: ActionFailedError):
  GetSongByIdFailedActionType => ({ type: SongActionTypes.GET_SONG_BY_ID_FAILED, payload: error });

export const playSongAction = (song: PlaySongtData):
  PlaySongActionType => ({ type: SongActionTypes.PLAY_SONG, payload: song });

export const pauseSongAction = ():
  PauseSongActionType => ({ type: SongActionTypes.PAUSE_SONG, payload: undefined });

export const unpauseSongAction = ():
  UnpauseSongActionType => ({ type: SongActionTypes.UNPAUSE_SONG, payload: undefined });

export const songActions = {
  getSongById: (songId: string) => getSongByIdStartAction(songId),
  getSongByIdSuccess: (response: SongInfoResponseData) => getSongByIdSuccessAction(response),
  getSongByIdFailed: (error: ActionFailedError) => getSongByIdFailedAction(error),
  playSong: (song: PlaySongtData) => playSongAction(song),
  pauseSong: () => pauseSongAction(),
  unpauseSong: () => unpauseSongAction(),
}

