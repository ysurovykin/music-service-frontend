import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  SongActionTypes,
  GetSongsRequestData,
  GetSongsResponseData
} from "./song.model";

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
  | GetSongsStartActionType
  | GetSongsSuccessActionType
  | GetSongsFailedActionType
  | ClearSongsActionType;
