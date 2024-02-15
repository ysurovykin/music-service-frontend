import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongActionTypes, SongInfoResponseData, PlaySongtData } from "./song.model";

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
  payload: PlaySongtData;
};

export type PauseSongActionType = {
  type: typeof SongActionTypes.PAUSE_SONG;
  payload: undefined;
};

export type UnpauseSongActionType = {
  type: typeof SongActionTypes.UNPAUSE_SONG;
  payload: undefined;
};

export type SongActions =
  | GetSongByIdStartActionType
  | GetSongByIdSuccessActionType
  | GetSongByIdFailedActionType
  | PlaySongActionType
  | PauseSongActionType
  | UnpauseSongActionType;
