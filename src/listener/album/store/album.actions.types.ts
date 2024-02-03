import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { AlbumActionTypes, AlbumFullResponseData, AlbumInfoResponseData } from "./album.model";

export type GetAlbumsByArtistIdStartActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID;
  payload: string;
};

export type GetAlbumsByArtistIdSuccessActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_SUCCESS;
  payload: Array<AlbumInfoResponseData>;
};

export type GetAlbumsByArtistIdFailedActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED;
  payload: ActionFailedError;
};

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

export type AlbumActions =
  | GetAlbumsByArtistIdStartActionType
  | GetAlbumsByArtistIdSuccessActionType
  | GetAlbumsByArtistIdFailedActionType
  | GetAlbumByIdStartActionType
  | GetAlbumByIdSuccessActionType
  | GetAlbumByIdFailedActionType;
