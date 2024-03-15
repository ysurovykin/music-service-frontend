import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetAlbumsByArtistIdFailedActionType,
  GetAlbumsByArtistIdStartActionType,
  GetAlbumsByArtistIdSuccessActionType,
  GetAlbumsWhereArtistAppearsStartActionType,
  GetAlbumsWhereArtistAppearsSuccessActionType,
  GetAlbumsWhereArtistAppearsFailedActionType,
  GetAlbumByIdStartActionType,
  GetAlbumByIdSuccessActionType,
  GetAlbumByIdFailedActionType,
  AddAlbumToLibraryStartActionType,
  AddAlbumToLibrarySuccessActionType,
  AddAlbumToLibraryFailedActionType,
  RemoveAlbumFromLibraryStartActionType,
  RemoveAlbumFromLibrarySuccessActionType,
  RemoveAlbumFromLibraryFailedActionType,
  UpdateAlbumsInfoActionType,
  GetAlbumsInListenerLibraryStartActionType,
  GetAlbumsInListenerLibrarySuccessActionType,
  GetAlbumsInListenerLibraryFailedActionType,
  LoadMoreAlbumsInListenerLibraryStartActionType,
  LoadMoreAlbumsInListenerLibrarySuccessActionType,
  LoadMoreAlbumsInListenerLibraryFailedActionType
} from "./album.actions.types";
import { AlbumActionTypes, AlbumFullResponseData, AlbumInfoResponseData, GetAlbumsInListenerLibraryRequest, GetAlbumsInListenerLibraryResponse } from "./album.model";

export const getAlbumsByArtistIdStartAction = (artistId: string):
  GetAlbumsByArtistIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID, payload: artistId });

export const getAlbumsByArtistIdSuccessAction = (response: Array<AlbumInfoResponseData>):
  GetAlbumsByArtistIdSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_SUCCESS, payload: response });

export const getAlbumsByArtistIdFailedAction = (error: ActionFailedError):
  GetAlbumsByArtistIdFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED, payload: error });

export const getAlbumsWhereArtistAppearsStartAction = (artistId: string):
  GetAlbumsWhereArtistAppearsStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS, payload: artistId });

export const getAlbumsWhereArtistAppearsSuccessAction = (response: Array<AlbumInfoResponseData>):
  GetAlbumsWhereArtistAppearsSuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_SUCCESS, payload: response });

export const getAlbumsWhereArtistAppearsFailedAction = (error: ActionFailedError):
  GetAlbumsWhereArtistAppearsFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_FAILED, payload: error });

export const getAlbumByIdStartAction = (albumId: string):
  GetAlbumByIdStartActionType => ({ type: AlbumActionTypes.GET_ALBUM_BY_ID, payload: albumId });

export const getAlbumByIdSuccessAction = (response: AlbumFullResponseData):
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

export const updateAlbumsInfoAction = (albums: Array<AlbumInfoResponseData>):
  UpdateAlbumsInfoActionType => ({ type: AlbumActionTypes.UPDATE_ALBUMS_INFO, payload: albums });

export const getAlbumsInListenerLibraryStartAction = (request: GetAlbumsInListenerLibraryRequest):
  GetAlbumsInListenerLibraryStartActionType => ({ type: AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY, payload: request });

export const getAlbumsInListenerLibrarySuccessAction = (response: GetAlbumsInListenerLibraryResponse):
  GetAlbumsInListenerLibrarySuccessActionType => ({ type: AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS, payload: response });

export const getAlbumsInListenerLibraryFailedAction = (error: ActionFailedError):
  GetAlbumsInListenerLibraryFailedActionType => ({ type: AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY_FAILED, payload: error });

export const loadMoreAlbumsInListenerLibraryStartAction = (request: GetAlbumsInListenerLibraryRequest):
  LoadMoreAlbumsInListenerLibraryStartActionType => ({ type: AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY, payload: request });

export const loadMoreAlbumsInListenerLibrarySuccessAction = (response: GetAlbumsInListenerLibraryResponse):
  LoadMoreAlbumsInListenerLibrarySuccessActionType => ({ type: AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS, payload: response });

export const loadMoreAlbumsInListenerLibraryFailedAction = (error: ActionFailedError):
  LoadMoreAlbumsInListenerLibraryFailedActionType => ({ type: AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_FAILED, payload: error });

export const albumActions = {
  getAlbumsByArtistId: (artistId: string) => getAlbumsByArtistIdStartAction(artistId),
  getAlbumsByArtistIdSuccess: (response: Array<AlbumInfoResponseData>) => getAlbumsByArtistIdSuccessAction(response),
  getAlbumsByArtistIdFailed: (error: ActionFailedError) => getAlbumsByArtistIdFailedAction(error),
  getAlbumsWhereArtistAppears: (artistId: string) => getAlbumsWhereArtistAppearsStartAction(artistId),
  getAlbumsWhereArtistAppearsSuccess: (response: Array<AlbumInfoResponseData>) => getAlbumsWhereArtistAppearsSuccessAction(response),
  getAlbumsWhereArtistAppearsFailed: (error: ActionFailedError) => getAlbumsWhereArtistAppearsFailedAction(error),
  getAlbumById: (albumId: string) => getAlbumByIdStartAction(albumId),
  getAlbumByIdSuccess: (response: AlbumFullResponseData) => getAlbumByIdSuccessAction(response),
  getAlbumByIdFailed: (error: ActionFailedError) => getAlbumByIdFailedAction(error),
  addAlbumToLibrary: (albumId: string) => addAlbumToLibraryStartAction(albumId),
  addAlbumToLibrarySuccess: () => addAlbumToLibrarySuccessAction(),
  addAlbumToLibraryFailed: (error: ActionFailedError) => addAlbumToLibraryFailedAction(error),
  removeAlbumFromLibrary: (albumId: string) => removeAlbumFromLibraryStartAction(albumId),
  removeAlbumFromLibrarySuccess: () => removeAlbumFromLibrarySuccessAction(),
  removeAlbumFromLibraryFailed: (error: ActionFailedError) => removeAlbumFromLibraryFailedAction(error),
  updateAlbumsInfo: (albums: Array<AlbumInfoResponseData>) => updateAlbumsInfoAction(albums),
  getAlbumsInListenerLibrary: (request: GetAlbumsInListenerLibraryRequest) => getAlbumsInListenerLibraryStartAction(request),
  getAlbumsInListenerLibrarySuccess: (response: GetAlbumsInListenerLibraryResponse) => getAlbumsInListenerLibrarySuccessAction(response),
  getAlbumsInListenerLibraryFailed: (error: ActionFailedError) => getAlbumsInListenerLibraryFailedAction(error),
  loadMoreAlbumsInListenerLibrary: (request: GetAlbumsInListenerLibraryRequest) => loadMoreAlbumsInListenerLibraryStartAction(request),
  loadMoreAlbumsInListenerLibrarySuccess: (response: GetAlbumsInListenerLibraryResponse) => loadMoreAlbumsInListenerLibrarySuccessAction(response),
  loadMoreAlbumsInListenerLibraryFailed: (error: ActionFailedError) => loadMoreAlbumsInListenerLibraryFailedAction(error),
}

