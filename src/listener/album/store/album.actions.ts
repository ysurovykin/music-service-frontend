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
  LoadMoreAlbumsInListenerLibraryFailedActionType,
  GetListenerTopAlbumsThisMonthStartActionType,
  GetListenerTopAlbumsThisMonthSuccessActionType,
  GetListenerTopAlbumsThisMonthFailedActionType,
  LoadMoreListenerTopAlbumsThisMonthStartActionType,
  LoadMoreListenerTopAlbumsThisMonthSuccessActionType,
  LoadMoreListenerTopAlbumsThisMonthFailedActionType,
  GetAlbumsStartActionType,
  GetAlbumsSuccessActionType,
  GetAlbumsFailedActionType,
  LoadMoreAlbumsStartActionType,
  LoadMoreAlbumsSuccessActionType,
  LoadMoreAlbumsFailedActionType,
  MarkHiddenAlbumActionType,
  GetNextAlbumReleaseStartActionType,
  GetNextAlbumReleaseSuccessActionType,
  GetNextAlbumReleaseFailedActionType,
} from "./album.actions.types";
import { AlbumActionTypes, AlbumFullResponseData, AlbumInfoResponseData, GetAlbumsInListenerLibraryRequest, GetAlbumsInListenerLibraryResponse, GetAlbumsRequest, GetAlbumsResponse, GetListenerTopAlbumsThisMonthRequest, GetListenerTopAlbumsThisMonthResponse, NextAlbumReleaseType } from "./album.model";

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

export const getListenerTopAlbumsThisMonthStartAction = (request: GetListenerTopAlbumsThisMonthRequest):
  GetListenerTopAlbumsThisMonthStartActionType => ({ type: AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH, payload: request });

export const getListenerTopAlbumsThisMonthSuccessAction = (response: GetListenerTopAlbumsThisMonthResponse):
  GetListenerTopAlbumsThisMonthSuccessActionType => ({ type: AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH_SUCCESS, payload: response });

export const getListenerTopAlbumsThisMonthFailedAction = (error: ActionFailedError):
  GetListenerTopAlbumsThisMonthFailedActionType => ({ type: AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH_FAILED, payload: error });

export const loadMoreListenerTopAlbumsThisMonthStartAction = (request: GetListenerTopAlbumsThisMonthRequest):
  LoadMoreListenerTopAlbumsThisMonthStartActionType => ({ type: AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH, payload: request });

export const loadMoreListenerTopAlbumsThisMonthSuccessAction = (response: GetListenerTopAlbumsThisMonthResponse):
  LoadMoreListenerTopAlbumsThisMonthSuccessActionType => ({ type: AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH_SUCCESS, payload: response });

export const loadMoreListenerTopAlbumsThisMonthFailedAction = (error: ActionFailedError):
  LoadMoreListenerTopAlbumsThisMonthFailedActionType => ({ type: AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH_FAILED, payload: error });

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

export const markHiddenAlbumAction = (albumId: string):
  MarkHiddenAlbumActionType => ({ type: AlbumActionTypes.MARK_HIDDEN_ALBUM, payload: albumId });

export const getNextAlbumReleaseStartAction = (artistId: string):
  GetNextAlbumReleaseStartActionType => ({ type: AlbumActionTypes.GET_NEXT_ALBUM_RELEASE, payload: artistId });

export const getNextAlbumReleaseSuccessAction = (nextAlbumRelease: NextAlbumReleaseType):
  GetNextAlbumReleaseSuccessActionType => ({ type: AlbumActionTypes.GET_NEXT_ALBUM_RELEASE_SUCCESS, payload: nextAlbumRelease });

export const getNextAlbumReleaseFailedAction = (error: ActionFailedError):
  GetNextAlbumReleaseFailedActionType => ({ type: AlbumActionTypes.GET_NEXT_ALBUM_RELEASE_FAILED, payload: error });

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
  getListenerTopAlbumsThisMonth: (request: GetListenerTopAlbumsThisMonthRequest) => getListenerTopAlbumsThisMonthStartAction(request),
  getListenerTopAlbumsThisMonthSuccess: (response: GetListenerTopAlbumsThisMonthResponse) => getListenerTopAlbumsThisMonthSuccessAction(response),
  getListenerTopAlbumsThisMonthFailed: (error: ActionFailedError) => getListenerTopAlbumsThisMonthFailedAction(error),
  loadMoreListenerTopAlbumsThisMonth: (request: GetListenerTopAlbumsThisMonthRequest) => loadMoreListenerTopAlbumsThisMonthStartAction(request),
  loadMoreListenerTopAlbumsThisMonthSuccess: (response: GetListenerTopAlbumsThisMonthResponse) => loadMoreListenerTopAlbumsThisMonthSuccessAction(response),
  loadMoreListenerTopAlbumsThisMonthFailed: (error: ActionFailedError) => loadMoreListenerTopAlbumsThisMonthFailedAction(error),
  getAlbums: (request: GetAlbumsRequest) => getAlbumsStartAction(request),
  getAlbumsSuccess: (response: GetAlbumsResponse) => getAlbumsSuccessAction(response),
  getAlbumsFailed: (error: ActionFailedError) => getAlbumsFailedAction(error),
  loadMoreAlbums: (request: GetAlbumsRequest) => loadMoreAlbumsStartAction(request),
  loadMoreAlbumsSuccess: (response: GetAlbumsResponse) => loadMoreAlbumsSuccessAction(response),
  loadMoreAlbumsFailed: (error: ActionFailedError) => loadMoreAlbumsFailedAction(error),
  markHiddenAlbumAction: (albumId: string) => markHiddenAlbumAction(albumId),
  getNextAlbumRelease: (artistId: string) => getNextAlbumReleaseStartAction(artistId),
  getNextAlbumReleaseSuccess: (nextAlbumRelease: NextAlbumReleaseType) => getNextAlbumReleaseSuccessAction(nextAlbumRelease),
  getNextAlbumReleaseFailed: (error: ActionFailedError) => getNextAlbumReleaseFailedAction(error),
}

