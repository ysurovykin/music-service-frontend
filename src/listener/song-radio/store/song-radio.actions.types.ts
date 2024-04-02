import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import { CreateSongRadioRequestData, GetListenerSongRadiosRequestData, GetListenerSongRadiosResponseData, SongRadioActionTypes, SongRadioFullResponseData, SongRadioInfoResponseData } from "./song-radio.model";

export type GetSongRadioStartActionType = {
  type: typeof SongRadioActionTypes.GET_SONG_RADIO;
  payload: string;
};

export type GetSongRadioSuccessActionType = {
  type: typeof SongRadioActionTypes.GET_SONG_RADIO_SUCCESS;
  payload: SongRadioFullResponseData;
};

export type GetSongRadioFailedActionType = {
  type: typeof SongRadioActionTypes.GET_SONG_RADIO_FAILED;
  payload: ActionFailedError;
};

export type GetListenerSongRadiosStartActionType = {
  type: typeof SongRadioActionTypes.GET_LISTENER_SONG_RADIOS;
  payload: GetListenerSongRadiosRequestData;
};

export type GetListenerSongRadiosSuccessActionType = {
  type: typeof SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_SUCCESS;
  payload: GetListenerSongRadiosResponseData;
};

export type GetListenerSongRadiosFailedActionType = {
  type: typeof SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreListenerSongRadiosStartActionType = {
  type: typeof SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS;
  payload: GetListenerSongRadiosRequestData;
};

export type LoadMoreListenerSongRadiosSuccessActionType = {
  type: typeof SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_SUCCESS;
  payload: GetListenerSongRadiosResponseData;
};

export type LoadMoreListenerSongRadiosFailedActionType = {
  type: typeof SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_FAILED;
  payload: ActionFailedError;
};

export type CreateSongRadioStartActionType = {
  type: typeof SongRadioActionTypes.CREATE_SONG_RADIO;
  payload: CreateSongRadioRequestData;
};

export type CreateSongRadioSuccessActionType = {
  type: typeof SongRadioActionTypes.CREATE_SONG_RADIO_SUCCESS;
  payload: SongRadioFullResponseData;
};

export type CreateSongRadioFailedActionType = {
  type: typeof SongRadioActionTypes.CREATE_SONG_RADIO_FAILED;
  payload: ActionFailedError;
};

export type OpenRefreshSongRadioModalActionType = {
  type: typeof SongRadioActionTypes.OPEN_REFRESH_SONG_RADIO_MODAL;
  payload: undefined;
};

export type CloseRefreshSongRadioModalActionType = {
  type: typeof SongRadioActionTypes.CLOSE_REFRESH_SONG_RADIO_MODAL;
  payload: undefined;
};

export type SongRadioActions =
  | GetSongRadioStartActionType
  | GetSongRadioSuccessActionType
  | GetSongRadioFailedActionType
  | GetListenerSongRadiosStartActionType
  | GetListenerSongRadiosSuccessActionType
  | GetListenerSongRadiosFailedActionType
  | LoadMoreListenerSongRadiosStartActionType
  | LoadMoreListenerSongRadiosSuccessActionType
  | LoadMoreListenerSongRadiosFailedActionType
  | CreateSongRadioStartActionType
  | CreateSongRadioSuccessActionType
  | CreateSongRadioFailedActionType
  | OpenRefreshSongRadioModalActionType
  | CloseRefreshSongRadioModalActionType;
