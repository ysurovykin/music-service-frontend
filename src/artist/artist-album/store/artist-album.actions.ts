import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetAlbumByIdStartActionType,
  GetAlbumByIdSuccessActionType,
  GetAlbumByIdFailedActionType,
  GetAlbumsStartActionType,
  GetAlbumsSuccessActionType,
  GetAlbumsFailedActionType,
  LoadMoreAlbumsStartActionType,
  LoadMoreAlbumsSuccessActionType,
  LoadMoreAlbumsFailedActionType,
  OpenCreateAlbumModalActionType,
  CloseCreateAlbumModalActionType,
  OpenEditAlbumModalActionType,
  CloseEditAlbumModalActionType,
  CreateAlbumStartActionType,
  CreateAlbumSuccessActionType,
  CreateAlbumFailedActionType,
  EditAlbumStartActionType,
  EditAlbumSuccessActionType,
  EditAlbumFailedActionType,
  HideAlbumStartActionType,
  HideAlbumSuccessActionType,
  HideAlbumFailedActionType,
  UnhideAlbumStartActionType,
  UnhideAlbumSuccessActionType,
  UnhideAlbumFailedActionType,
  GetAlbumStatsStartActionType,
  GetAlbumStatsSuccessActionType,
  GetAlbumStatsFailedActionType,
} from "./artist-album.actions.types";
import {
  AlbumActionTypes,
  AlbumFullResponseData,
  AlbumStatsResponseData,
  CreateAlbumRequestData,
  EditAlbumRequestData,
  GetAlbumsRequest,
  GetAlbumsResponse
} from "./artist-album.model";

export const getAlbumByIdStartAction = (albumId: string):
  GetAlbumByIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID, payload: albumId });

export const getAlbumByIdSuccessAction = (response: AlbumFullResponseData):
  GetAlbumByIdSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID_SUCCESS, payload: response });

export const getAlbumByIdFailedAction = (error: ActionFailedError):
  GetAlbumByIdFailedActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID_FAILED, payload: error });

export const getAlbumsStartAction = (request: GetAlbumsRequest):
  GetAlbumsStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS, payload: request });

export const getAlbumsSuccessAction = (response: GetAlbumsResponse):
  GetAlbumsSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_SUCCESS, payload: response });

export const getAlbumsFailedAction = (error: ActionFailedError):
  GetAlbumsFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_FAILED, payload: error });

export const loadMoreAlbumsStartAction = (request: GetAlbumsRequest):
  LoadMoreAlbumsStartActionType => ({ type: AlbumActionTypes.LOAD_MORE_ALBUMS, payload: request });

export const loadMoreAlbumsSuccessAction = (response: GetAlbumsResponse):
  LoadMoreAlbumsSuccessActionType => ({ type: AlbumActionTypes.LOAD_MORE_ALBUMS_SUCCESS, payload: response });

export const loadMoreAlbumsFailedAction = (error: ActionFailedError):
  LoadMoreAlbumsFailedActionType => ({ type: AlbumActionTypes.LOAD_MORE_ALBUMS_FAILED, payload: error });

export const openCreateAlbumModalAction = ():
  OpenCreateAlbumModalActionType => ({ type: AlbumActionTypes.OPEN_CREATE_ALBUM_MODAL, payload: undefined });

export const closeCreateAlbumModalAction = ():
  CloseCreateAlbumModalActionType => ({ type: AlbumActionTypes.CLOSE_CREATE_ALBUM_MODAL, payload: undefined });

export const createAlbumStartAction = (request: CreateAlbumRequestData):
  CreateAlbumStartActionType => ({ type: AlbumActionTypes.CREATE_ALBUM, payload: request });

export const createAlbumSuccessAction = ():
  CreateAlbumSuccessActionType => ({ type: AlbumActionTypes.CREATE_ALBUM_SUCCESS, payload: undefined });

export const createAlbumFailedAction = (error: ActionFailedError):
  CreateAlbumFailedActionType => ({ type: AlbumActionTypes.CREATE_ALBUM_FAILED, payload: error });

export const openEditAlbumModalAction = ():
  OpenEditAlbumModalActionType => ({ type: AlbumActionTypes.OPEN_EDIT_ALBUM_MODAL, payload: undefined });

export const closeEditAlbumModalAction = ():
  CloseEditAlbumModalActionType => ({ type: AlbumActionTypes.CLOSE_EDIT_ALBUM_MODAL, payload: undefined });

export const editAlbumStartAction = (request: EditAlbumRequestData):
  EditAlbumStartActionType => ({ type: AlbumActionTypes.EDIT_ALBUM, payload: request });

export const editAlbumSuccessAction = ():
  EditAlbumSuccessActionType => ({ type: AlbumActionTypes.EDIT_ALBUM_SUCCESS, payload: undefined });

export const editAlbumFailedAction = (error: ActionFailedError):
  EditAlbumFailedActionType => ({ type: AlbumActionTypes.EDIT_ALBUM_FAILED, payload: error });

export const hideAlbumStartAction = (albumId: string):
  HideAlbumStartActionType => ({ type: AlbumActionTypes.HIDE_ALBUM, payload: albumId });

export const hideAlbumSuccessAction = ():
  HideAlbumSuccessActionType => ({ type: AlbumActionTypes.HIDE_ALBUM_SUCCESS, payload: undefined });

export const hideAlbumFailedAction = (error: ActionFailedError):
  HideAlbumFailedActionType => ({ type: AlbumActionTypes.HIDE_ALBUM_FAILED, payload: error });

export const unhideAlbumStartAction = (albumId: string):
  UnhideAlbumStartActionType => ({ type: AlbumActionTypes.UNHIDE_ALBUM, payload: albumId });

export const unhideAlbumSuccessAction = ():
  UnhideAlbumSuccessActionType => ({ type: AlbumActionTypes.UNHIDE_ALBUM_SUCCESS, payload: undefined });

export const unhideAlbumFailedAction = (error: ActionFailedError):
  UnhideAlbumFailedActionType => ({ type: AlbumActionTypes.UNHIDE_ALBUM_FAILED, payload: error });

export const getAlbumsStatsStartAction = (artistId: string):
  GetAlbumStatsStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS_STATS, payload: artistId });

export const getAlbumsStatsSuccessAction = (response: Array<AlbumStatsResponseData>):
  GetAlbumStatsSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_STATS_SUCCESS, payload: response });

export const getAlbumsStatsFailedAction = (error: ActionFailedError):
  GetAlbumStatsFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_STATS_FAILED, payload: error });

export const artistAlbumActions = {
  getAlbumById: (albumId: string) => getAlbumByIdStartAction(albumId),
  getAlbumByIdSuccess: (response: AlbumFullResponseData) => getAlbumByIdSuccessAction(response),
  getAlbumByIdFailed: (error: ActionFailedError) => getAlbumByIdFailedAction(error),
  getAlbums: (request: GetAlbumsRequest) => getAlbumsStartAction(request),
  getAlbumsSuccess: (response: GetAlbumsResponse) => getAlbumsSuccessAction(response),
  getAlbumsFailed: (error: ActionFailedError) => getAlbumsFailedAction(error),
  loadMoreAlbums: (request: GetAlbumsRequest) => loadMoreAlbumsStartAction(request),
  loadMoreAlbumsSuccess: (response: GetAlbumsResponse) => loadMoreAlbumsSuccessAction(response),
  loadMoreAlbumsFailed: (error: ActionFailedError) => loadMoreAlbumsFailedAction(error),
  openCreateAlbumModal: () => openCreateAlbumModalAction(),
  closeCreateAlbumModal: () => closeCreateAlbumModalAction(),
  createAlbum: (request: CreateAlbumRequestData) => createAlbumStartAction(request),
  createAlbumSuccess: () => createAlbumSuccessAction(),
  createAlbumFailed: (error: ActionFailedError) => createAlbumFailedAction(error),
  openEditAlbumModal: () => openEditAlbumModalAction(),
  closeEditAlbumModal: () => closeEditAlbumModalAction(),
  editAlbum: (request: EditAlbumRequestData) => editAlbumStartAction(request),
  editAlbumSuccess: () => editAlbumSuccessAction(),
  editAlbumFailed: (error: ActionFailedError) => editAlbumFailedAction(error),
  hideAlbum: (albumId: string) => hideAlbumStartAction(albumId),
  hideAlbumSuccess: () => hideAlbumSuccessAction(),
  hideAlbumFailed: (error: ActionFailedError) => hideAlbumFailedAction(error),
  unhideAlbum: (albumId: string) => unhideAlbumStartAction(albumId),
  unhideAlbumSuccess: () => unhideAlbumSuccessAction(),
  unhideAlbumFailed: (error: ActionFailedError) => unhideAlbumFailedAction(error),
  getAlbumsStats: (artistId: string) => getAlbumsStatsStartAction(artistId),
  getAlbumsStatsSuccess: (response: Array<AlbumStatsResponseData>) => getAlbumsStatsSuccessAction(response),
  getAlbumsStatsFailed: (error: ActionFailedError) => getAlbumsStatsFailedAction(error),
}

