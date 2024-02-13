import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetAlbumsByArtistIdFailedActionType,
  GetAlbumsByArtistIdStartActionType,
  GetAlbumsByArtistIdSuccessActionType,
  GetAlbumByIdStartActionType,
  GetAlbumByIdSuccessActionType,
  GetAlbumByIdFailedActionType
} from "./album.actions.types";
import { AlbumActionTypes, AlbumFullResponseData, AlbumInfoResponseData } from "./album.model";

export const getAlbumsByArtistIdStartAction = (artistId: string):
  GetAlbumsByArtistIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID, payload: artistId });

export const getAlbumsByArtistIdSuccessAction = (response: Array<AlbumInfoResponseData>):
  GetAlbumsByArtistIdSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_SUCCESS, payload: response });

export const getAlbumsByArtistIdFailedAction = (error: ActionFailedError):
  GetAlbumsByArtistIdFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED, payload: error });

export const getAlbumByIdStartAction = (albumId: string):
  GetAlbumByIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID, payload: albumId });

export const getAlbumByIdSuccessAction = (response: AlbumFullResponseData):
  GetAlbumByIdSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID_SUCCESS, payload: response });

export const getAlbumByIdFailedAction = (error: ActionFailedError):
  GetAlbumByIdFailedActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID_FAILED, payload: error });

export const albumActions = {
  getAlbumsByArtistId: (artistId: string) => getAlbumsByArtistIdStartAction(artistId),
  getAlbumsByArtistIdSuccess: (response: Array<AlbumInfoResponseData>) => getAlbumsByArtistIdSuccessAction(response),
  getAlbumsByArtistIdFailed: (error: ActionFailedError) => getAlbumsByArtistIdFailedAction(error),
  getAlbumById: (albumId: string) => getAlbumByIdStartAction(albumId),
  getAlbumByIdSuccess: (response: AlbumFullResponseData) => getAlbumByIdSuccessAction(response),
  getAlbumByIdFailed: (error: ActionFailedError) => getAlbumByIdFailedAction(error),
}

