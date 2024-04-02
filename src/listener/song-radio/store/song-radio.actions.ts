import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import {
  GetSongRadioStartActionType,
  GetSongRadioSuccessActionType,
  GetSongRadioFailedActionType,
  GetListenerSongRadiosStartActionType,
  GetListenerSongRadiosSuccessActionType,
  GetListenerSongRadiosFailedActionType,
  LoadMoreListenerSongRadiosStartActionType,
  LoadMoreListenerSongRadiosSuccessActionType,
  LoadMoreListenerSongRadiosFailedActionType,
  CreateSongRadioStartActionType,
  CreateSongRadioSuccessActionType,
  CreateSongRadioFailedActionType,
  OpenRefreshSongRadioModalActionType,
  CloseRefreshSongRadioModalActionType,
} from "./song-radio.actions.types";
import { CreateSongRadioRequestData, GetListenerSongRadiosRequestData, GetListenerSongRadiosResponseData, SongRadioActionTypes, SongRadioFullResponseData, SongRadioInfoResponseData } from "./song-radio.model";

export const getSongRadioStartAction = (songId: string):
  GetSongRadioStartActionType => ({ type: SongRadioActionTypes.GET_SONG_RADIO, payload: songId });

export const getSongRadioSuccessAction = (response: SongRadioFullResponseData):
  GetSongRadioSuccessActionType => ({ type: SongRadioActionTypes.GET_SONG_RADIO_SUCCESS, payload: response });

export const getSongRadioFailedAction = (error: ActionFailedError):
  GetSongRadioFailedActionType => ({ type: SongRadioActionTypes.GET_SONG_RADIO_FAILED, payload: error });

export const getListenerSongRadiosStartAction = (request: GetListenerSongRadiosRequestData):
  GetListenerSongRadiosStartActionType => ({ type: SongRadioActionTypes.GET_LISTENER_SONG_RADIOS, payload: request });

export const getListenerSongRadiosSuccessAction = (response: GetListenerSongRadiosResponseData):
  GetListenerSongRadiosSuccessActionType => ({ type: SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_SUCCESS, payload: response });

export const getListenerSongRadiosFailedAction = (error: ActionFailedError):
  GetListenerSongRadiosFailedActionType => ({ type: SongRadioActionTypes.GET_LISTENER_SONG_RADIOS_FAILED, payload: error });

export const loadMoreListenerSongRadiosStartAction = (request: GetListenerSongRadiosRequestData):
  LoadMoreListenerSongRadiosStartActionType => ({ type: SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS, payload: request });

export const loadMoreListenerSongRadiosSuccessAction = (response: GetListenerSongRadiosResponseData):
  LoadMoreListenerSongRadiosSuccessActionType => ({ type: SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_SUCCESS, payload: response });

export const loadMoreListenerSongRadiosFailedAction = (error: ActionFailedError):
  LoadMoreListenerSongRadiosFailedActionType => ({ type: SongRadioActionTypes.LOAD_MORE_LISTENER_SONG_RADIOS_FAILED, payload: error });

export const createSongRadioStartAction = (request: CreateSongRadioRequestData):
  CreateSongRadioStartActionType => ({ type: SongRadioActionTypes.CREATE_SONG_RADIO, payload: request });

export const createSongRadioSuccessAction = (response: SongRadioFullResponseData):
  CreateSongRadioSuccessActionType => ({ type: SongRadioActionTypes.CREATE_SONG_RADIO_SUCCESS, payload: response });

export const createSongRadioFailedAction = (error: ActionFailedError):
  CreateSongRadioFailedActionType => ({ type: SongRadioActionTypes.CREATE_SONG_RADIO_FAILED, payload: error });

export const openRefreshSongRadioModalAction = ():
  OpenRefreshSongRadioModalActionType => ({ type: SongRadioActionTypes.OPEN_REFRESH_SONG_RADIO_MODAL, payload: undefined });

export const closeRefreshSongRadioModalAction = ():
  CloseRefreshSongRadioModalActionType => ({ type: SongRadioActionTypes.CLOSE_REFRESH_SONG_RADIO_MODAL, payload: undefined });

export const songRadioActions = {
  getSongRadio: (songId: string) => getSongRadioStartAction(songId),
  getSongRadioSuccess: (response: SongRadioFullResponseData) => getSongRadioSuccessAction(response),
  getSongRadioFailed: (error: ActionFailedError) => getSongRadioFailedAction(error),
  getListenerSongRadios: (request: GetListenerSongRadiosRequestData) => getListenerSongRadiosStartAction(request),
  getListenerSongRadiosSuccess: (response: GetListenerSongRadiosResponseData) => getListenerSongRadiosSuccessAction(response),
  getListenerSongRadiosFailed: (error: ActionFailedError) => getListenerSongRadiosFailedAction(error),
  loadMoreListenerSongRadios: (request: GetListenerSongRadiosRequestData) => loadMoreListenerSongRadiosStartAction(request),
  loadMoreListenerSongRadiosSuccess: (response: GetListenerSongRadiosResponseData) => loadMoreListenerSongRadiosSuccessAction(response),
  loadMoreListenerSongRadiosFailed: (error: ActionFailedError) => loadMoreListenerSongRadiosFailedAction(error),
  createSongRadio: (songId: CreateSongRadioRequestData) => createSongRadioStartAction(songId),
  createSongRadioSuccess: (response: SongRadioFullResponseData) => createSongRadioSuccessAction(response),
  createSongRadioFailed: (error: ActionFailedError) => createSongRadioFailedAction(error),
  openRefreshSongRadioModalAction: () => openRefreshSongRadioModalAction(),
  closeRefreshSongRadioModalAction: () => closeRefreshSongRadioModalAction(),
}

