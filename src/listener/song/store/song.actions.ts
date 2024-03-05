import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetSongsStartActionType,
  GetSongsSuccessActionType,
  GetSongsFailedActionType,
  ClearSongsActionType
} from "./song.actions.types";
import {
  SongActionTypes,
  SongInfoResponseData,
  GetSongsRequestData,
  GetSongsResponseData
} from "./song.model";

export const getSongsStartAction = (request: GetSongsRequestData):
  GetSongsStartActionType => ({ type: SongActionTypes.GET_SONGS, payload: request });

export const getSongsSuccessAction = (response: GetSongsResponseData):
  GetSongsSuccessActionType => ({ type: SongActionTypes.GET_SONGS_SUCCESS, payload: response });

export const getSongsFailedAction = (error: ActionFailedError):
  GetSongsFailedActionType => ({ type: SongActionTypes.GET_SONGS_FAILED, payload: error });

export const clearSongs = ():
  ClearSongsActionType => ({ type: SongActionTypes.CLEAR_SONGS, payload: undefined });

export const songActions = {
  getSongs: (request: GetSongsRequestData) => getSongsStartAction(request),
  getSongsSuccess: (response: GetSongsResponseData) => getSongsSuccessAction(response),
  getSongsFailed: (error: ActionFailedError) => getSongsFailedAction(error),
  clearSongs: () => clearSongs(),
}

