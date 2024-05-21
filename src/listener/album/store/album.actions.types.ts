import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  AlbumActionTypes,
  AlbumFullResponseData,
  AlbumInfoResponseData,
  GetAlbumsInListenerLibraryRequest,
  GetAlbumsInListenerLibraryResponse,
  GetAlbumsRequest,
  GetAlbumsResponse,
  GetListenerTopAlbumsThisMonthRequest,
  GetListenerTopAlbumsThisMonthResponse,
  NextAlbumReleaseType
} from "./album.model";

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

export type GetAlbumsWhereArtistAppearsStartActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS;
  payload: string;
};

export type GetAlbumsWhereArtistAppearsSuccessActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_SUCCESS;
  payload: Array<AlbumInfoResponseData>;
};

export type GetAlbumsWhereArtistAppearsFailedActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_FAILED;
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

export type AddAlbumToLibraryStartActionType = {
  type: typeof AlbumActionTypes.ADD_ALBUM_TO_LIBRARY;
  payload: string;
};

export type AddAlbumToLibrarySuccessActionType = {
  type: typeof AlbumActionTypes.ADD_ALBUM_TO_LIBRARY_SUCCESS;
  payload: undefined;
};

export type AddAlbumToLibraryFailedActionType = {
  type: typeof AlbumActionTypes.ADD_ALBUM_TO_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type RemoveAlbumFromLibraryStartActionType = {
  type: typeof AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY;
  payload: string;
};

export type RemoveAlbumFromLibrarySuccessActionType = {
  type: typeof AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY_SUCCESS;
  payload: undefined;
};

export type RemoveAlbumFromLibraryFailedActionType = {
  type: typeof AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type UpdateAlbumsInfoActionType = {
  type: typeof AlbumActionTypes.UPDATE_ALBUMS_INFO;
  payload: Array<AlbumInfoResponseData>;
};

export type GetAlbumsInListenerLibraryStartActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY;
  payload: GetAlbumsInListenerLibraryRequest;
};

export type GetAlbumsInListenerLibrarySuccessActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS;
  payload: GetAlbumsInListenerLibraryResponse;
};

export type GetAlbumsInListenerLibraryFailedActionType = {
  type: typeof AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreAlbumsInListenerLibraryStartActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY;
  payload: GetAlbumsInListenerLibraryRequest;
};

export type LoadMoreAlbumsInListenerLibrarySuccessActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS;
  payload: GetAlbumsInListenerLibraryResponse;
};

export type LoadMoreAlbumsInListenerLibraryFailedActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type GetListenerTopAlbumsThisMonthStartActionType = {
  type: typeof AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH;
  payload: GetListenerTopAlbumsThisMonthRequest;
};

export type GetListenerTopAlbumsThisMonthSuccessActionType = {
  type: typeof AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH_SUCCESS;
  payload: GetListenerTopAlbumsThisMonthResponse;
};

export type GetListenerTopAlbumsThisMonthFailedActionType = {
  type: typeof AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreListenerTopAlbumsThisMonthStartActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH;
  payload: GetListenerTopAlbumsThisMonthRequest;
};

export type LoadMoreListenerTopAlbumsThisMonthSuccessActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH_SUCCESS;
  payload: GetListenerTopAlbumsThisMonthResponse;
};

export type LoadMoreListenerTopAlbumsThisMonthFailedActionType = {
  type: typeof AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH_FAILED;
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

export type MarkHiddenAlbumActionType = {
  type: typeof AlbumActionTypes.MARK_HIDDEN_ALBUM;
  payload: string;
};

export type GetNextAlbumReleaseStartActionType = {
  type: typeof AlbumActionTypes.GET_NEXT_ALBUM_RELEASE;
  payload: string;
};

export type GetNextAlbumReleaseSuccessActionType = {
  type: typeof AlbumActionTypes.GET_NEXT_ALBUM_RELEASE_SUCCESS;
  payload: NextAlbumReleaseType;
};

export type GetNextAlbumReleaseFailedActionType = {
  type: typeof AlbumActionTypes.GET_NEXT_ALBUM_RELEASE_FAILED;
  payload: ActionFailedError;
};

export type AlbumActions =
  | GetAlbumsByArtistIdStartActionType
  | GetAlbumsByArtistIdSuccessActionType
  | GetAlbumsByArtistIdFailedActionType
  | GetAlbumsWhereArtistAppearsStartActionType
  | GetAlbumsWhereArtistAppearsSuccessActionType
  | GetAlbumsWhereArtistAppearsFailedActionType
  | GetAlbumByIdStartActionType
  | GetAlbumByIdSuccessActionType
  | GetAlbumByIdFailedActionType
  | AddAlbumToLibraryStartActionType
  | AddAlbumToLibrarySuccessActionType
  | AddAlbumToLibraryFailedActionType
  | RemoveAlbumFromLibraryStartActionType
  | RemoveAlbumFromLibrarySuccessActionType
  | RemoveAlbumFromLibraryFailedActionType
  | UpdateAlbumsInfoActionType
  | GetAlbumsInListenerLibraryStartActionType
  | GetAlbumsInListenerLibrarySuccessActionType
  | GetAlbumsInListenerLibraryFailedActionType
  | LoadMoreAlbumsInListenerLibraryStartActionType
  | LoadMoreAlbumsInListenerLibrarySuccessActionType
  | LoadMoreAlbumsInListenerLibraryFailedActionType
  | GetListenerTopAlbumsThisMonthStartActionType
  | GetListenerTopAlbumsThisMonthSuccessActionType
  | GetListenerTopAlbumsThisMonthFailedActionType
  | LoadMoreListenerTopAlbumsThisMonthStartActionType
  | LoadMoreListenerTopAlbumsThisMonthSuccessActionType
  | LoadMoreListenerTopAlbumsThisMonthFailedActionType
  | GetAlbumsStartActionType
  | GetAlbumsSuccessActionType
  | GetAlbumsFailedActionType
  | LoadMoreAlbumsStartActionType
  | LoadMoreAlbumsSuccessActionType
  | LoadMoreAlbumsFailedActionType
  | MarkHiddenAlbumActionType
  | GetNextAlbumReleaseStartActionType
  | GetNextAlbumReleaseSuccessActionType
  | GetNextAlbumReleaseFailedActionType;
