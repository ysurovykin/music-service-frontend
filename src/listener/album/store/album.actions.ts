import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetAlbumsByArtistIdFailedActionType,
  GetAlbumsByArtistIdStartActionType,
  GetAlbumsByArtistIdSuccessActionType,
  GetAlbumByIdStartActionType,
  GetAlbumByIdSuccessActionType,
  GetAlbumByIdFailedActionType,
  AddAlbumToLibraryStartActionType,
  AddAlbumToLibrarySuccessActionType,
  AddAlbumToLibraryFailedActionType,
  RemoveAlbumFromLibraryStartActionType,
  RemoveAlbumFromLibrarySuccessActionType,
  RemoveAlbumFromLibraryFailedActionType,
} from "./album.actions.types";
import { AlbumActionTypes, AlbumInfoResponseData } from "./album.model";

export const getAlbumsByArtistIdStartAction = (artistId: string):
  GetAlbumsByArtistIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID, payload: artistId });

export const getAlbumsByArtistIdSuccessAction = (response: Array<AlbumInfoResponseData>):
  GetAlbumsByArtistIdSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_SUCCESS, payload: response });

export const getAlbumsByArtistIdFailedAction = (error: ActionFailedError):
  GetAlbumsByArtistIdFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED, payload: error });

export const getAlbumByIdStartAction = (albumId: string):
  GetAlbumByIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID, payload: albumId });

export const getAlbumByIdSuccessAction = (response: AlbumInfoResponseData):
  GetAlbumByIdSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID_SUCCESS, payload: response });

export const getAlbumByIdFailedAction = (error: ActionFailedError):
  GetAlbumByIdFailedActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID_FAILED, payload: error });

export const addAlbumToLibraryStartAction = (albumId: string):
  AddAlbumToLibraryStartActionType => ({ type: AlbumActionTypes.ADD_ALBUM_TO_LIBRARY, payload: albumId });

export const addAlbumToLibrarySuccessAction = ():
  AddAlbumToLibrarySuccessActionType => ({ type: AlbumActionTypes.ADD_ALBUM_TO_LIBRARY_SUCCESS, payload: undefined });

export const addAlbumToLibraryFailedAction = (error: ActionFailedError):
  AddAlbumToLibraryFailedActionType => ({ type: AlbumActionTypes.ADD_ALBUM_TO_LIBRARY_FAILED, payload: error });

export const removeAlbumFromLibraryStartAction = (albumId: string):
  RemoveAlbumFromLibraryStartActionType => ({ type: AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY, payload: albumId });

export const removeAlbumFromLibrarySuccessAction = ():
  RemoveAlbumFromLibrarySuccessActionType => ({ type: AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY_SUCCESS, payload: undefined });

export const removeAlbumFromLibraryFailedAction = (error: ActionFailedError):
  RemoveAlbumFromLibraryFailedActionType => ({ type: AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY_FAILED, payload: error });

export const albumActions = {
  getAlbumsByArtistId: (artistId: string) => getAlbumsByArtistIdStartAction(artistId),
  getAlbumsByArtistIdSuccess: (response: Array<AlbumInfoResponseData>) => getAlbumsByArtistIdSuccessAction(response),
  getAlbumsByArtistIdFailed: (error: ActionFailedError) => getAlbumsByArtistIdFailedAction(error),
  getAlbumById: (albumId: string) => getAlbumByIdStartAction(albumId),
  getAlbumByIdSuccess: (response: AlbumInfoResponseData) => getAlbumByIdSuccessAction(response),
  getAlbumByIdFailed: (error: ActionFailedError) => getAlbumByIdFailedAction(error),
  addAlbumToLibrary: (albumId: string) => addAlbumToLibraryStartAction(albumId),
  addAlbumToLibrarySuccess: () => addAlbumToLibrarySuccessAction(),
  addAlbumToLibraryFailed: (error: ActionFailedError) => addAlbumToLibraryFailedAction(error),
  removeAlbumFromLibrary: (albumId: string) => removeAlbumFromLibraryStartAction(albumId),
  removeAlbumFromLibrarySuccess: () => removeAlbumFromLibrarySuccessAction(),
  removeAlbumFromLibraryFailed: (error: ActionFailedError) => removeAlbumFromLibraryFailedAction(error),
}

