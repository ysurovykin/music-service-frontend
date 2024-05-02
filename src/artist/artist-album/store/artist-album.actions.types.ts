import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { AlbumActionTypes, AlbumFullResponseData, CreateAlbumRequestData, EditAlbumRequestData, GetAlbumsRequest, GetAlbumsResponse } from "./artist-album.model";

export type GetAlbumByIdStartActionType = {
  type: typeof AlbumActionTypes.GET_ALBUM_BY_ID;
  payload: string;
};

export type GetAlbumByIdSuccessActionType = {
  type: typeof AlbumActionTypes.GET_ALBUM_BY_ID_SUCCESS;
  payload: AlbumFullResponseData;
};

export type GetAlbumByIdFailedActionType = {
  type: typeof AlbumActionTypes.GET_ALBUM_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type GetAlbumsStartActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS;
  payload: GetAlbumsRequest;
};

export type GetAlbumsSuccessActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_SUCCESS;
  payload: GetAlbumsResponse;
};

export type GetAlbumsFailedActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreAlbumsStartActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_ALBUMS;
  payload: GetAlbumsRequest;
};

export type LoadMoreAlbumsSuccessActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_ALBUMS_SUCCESS;
  payload: GetAlbumsResponse;
};

export type LoadMoreAlbumsFailedActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_ALBUMS_FAILED;
  payload: ActionFailedError;
};

export type OpenCreateAlbumModalActionType = {
  type: typeof AlbumActionTypes.OPEN_CREATE_ALBUM_MODAL;
  payload: undefined;
};

export type CloseCreateAlbumModalActionType = {
  type: typeof AlbumActionTypes.CLOSE_CREATE_ALBUM_MODAL;
  payload: undefined;
};

export type CreateAlbumStartActionType = {
  type: typeof AlbumActionTypes.CREATE_ALBUM;
  payload: CreateAlbumRequestData;
};

export type CreateAlbumSuccessActionType = {
  type: typeof AlbumActionTypes.CREATE_ALBUM_SUCCESS;
  payload: undefined;
};

export type CreateAlbumFailedActionType = {
  type: typeof AlbumActionTypes.CREATE_ALBUM_FAILED;
  payload: ActionFailedError;
};

export type OpenEditAlbumModalActionType = {
  type: typeof AlbumActionTypes.OPEN_EDIT_ALBUM_MODAL;
  payload: undefined;
};

export type CloseEditAlbumModalActionType = {
  type: typeof AlbumActionTypes.CLOSE_EDIT_ALBUM_MODAL;
  payload: undefined;
};

export type EditAlbumStartActionType = {
  type: typeof AlbumActionTypes.EDIT_ALBUM;
  payload: EditAlbumRequestData;
};

export type EditAlbumSuccessActionType = {
  type: typeof AlbumActionTypes.EDIT_ALBUM_SUCCESS;
  payload: undefined;
};

export type EditAlbumFailedActionType = {
  type: typeof AlbumActionTypes.EDIT_ALBUM_FAILED;
  payload: ActionFailedError;
};

export type HideAlbumStartActionType = {
  type: typeof AlbumActionTypes.HIDE_ALBUM;
  payload: string;
};

export type HideAlbumSuccessActionType = {
  type: typeof AlbumActionTypes.HIDE_ALBUM_SUCCESS;
  payload: undefined;
};

export type HideAlbumFailedActionType = {
  type: typeof AlbumActionTypes.HIDE_ALBUM_FAILED;
  payload: ActionFailedError;
};

export type UnhideAlbumStartActionType = {
  type: typeof AlbumActionTypes.UNHIDE_ALBUM;
  payload: string;
};

export type UnhideAlbumSuccessActionType = {
  type: typeof AlbumActionTypes.UNHIDE_ALBUM_SUCCESS;
  payload: undefined;
};

export type UnhideAlbumFailedActionType = {
  type: typeof AlbumActionTypes.UNHIDE_ALBUM_FAILED;
  payload: ActionFailedError;
};

export type ArtistAlbumActions =
  | GetAlbumByIdStartActionType
  | GetAlbumByIdSuccessActionType
  | GetAlbumByIdFailedActionType
  | GetAlbumsStartActionType
  | GetAlbumsSuccessActionType
  | GetAlbumsFailedActionType
  | LoadMoreAlbumsStartActionType
  | LoadMoreAlbumsSuccessActionType
  | LoadMoreAlbumsFailedActionType
  | OpenCreateAlbumModalActionType
  | CloseCreateAlbumModalActionType
  | OpenEditAlbumModalActionType
  | CloseEditAlbumModalActionType
  | CreateAlbumStartActionType
  | CreateAlbumSuccessActionType
  | CreateAlbumFailedActionType
  | EditAlbumStartActionType
  | EditAlbumSuccessActionType
  | EditAlbumFailedActionType
  | HideAlbumStartActionType
  | HideAlbumSuccessActionType
  | HideAlbumFailedActionType
  | UnhideAlbumStartActionType
  | UnhideAlbumSuccessActionType
  | UnhideAlbumFailedActionType;
