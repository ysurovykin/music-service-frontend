import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { AlbumFullResponseData } from "../../album/store/album.model";
import { ArtistActionTypes, ArtistFullResponseData, ArtistGenres, ArtistInfoResponseData, GetArtistsInListenerLibraryRequest, GetArtistsInListenerLibraryResponse, GetArtistsRequest, GetArtistsResponse, GetListenerTopArtistsThisMonthRequest, GetListenerTopArtistsThisMonthResponse } from "./artist.model";

export type GetArtistsStartActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS;
  payload: GetArtistsRequest;
};

export type GetArtistsSuccessActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_SUCCESS;
  payload: GetArtistsResponse;
};

export type GetArtistsFailedActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreArtistsStartActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_ARTISTS;
  payload: GetArtistsRequest;
};

export type LoadMoreArtistsSuccessActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_ARTISTS_SUCCESS;
  payload: GetArtistsResponse;
};

export type LoadMoreArtistsFailedActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_ARTISTS_FAILED;
  payload: ActionFailedError;
};

export type GetArtistByIdStartActionType = {
  type: typeof ArtistActionTypes.GET_ARTIST_BY_ID;
  payload: string;
};

export type GetArtistByIdSuccessActionType = {
  type: typeof ArtistActionTypes.GET_ARTIST_BY_ID_SUCCESS;
  payload: ArtistFullResponseData;
};

export type GetArtistByIdFailedActionType = {
  type: typeof ArtistActionTypes.GET_ARTIST_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type FollowArtistStartActionType = {
  type: typeof ArtistActionTypes.FOLLOW_ARTIST;
  payload: string;
};

export type FollowArtistSuccessActionType = {
  type: typeof ArtistActionTypes.FOLLOW_ARTIST_SUCCESS;
  payload: void;
};

export type FollowArtistFailedActionType = {
  type: typeof ArtistActionTypes.FOLLOW_ARTIST_FAILED;
  payload: ActionFailedError;
};

export type UnfollowArtistStartActionType = {
  type: typeof ArtistActionTypes.UNFOLLOW_ARTIST;
  payload: string;
};

export type UnfollowArtistSuccessActionType = {
  type: typeof ArtistActionTypes.UNFOLLOW_ARTIST_SUCCESS;
  payload: void;
};

export type UnfollowArtistFailedActionType = {
  type: typeof ArtistActionTypes.UNFOLLOW_ARTIST_FAILED;
  payload: ActionFailedError;
};

export type GetGenresStartActionType = {
  type: typeof ArtistActionTypes.GET_GENRES;
  payload: string;
};

export type GetGenresSuccessActionType = {
  type: typeof ArtistActionTypes.GET_GENRES_SUCCESS;
  payload: Array<ArtistGenres>;
};

export type GetGenresFailedActionType = {
  type: typeof ArtistActionTypes.GET_GENRES_FAILED;
  payload: ActionFailedError;
};

export type GetMostRecentReleaseStartActionType = {
  type: typeof ArtistActionTypes.GET_MOST_RECENT_RELEASE;
  payload: string;
};

export type GetMostRecentReleaseSuccessActionType = {
  type: typeof ArtistActionTypes.GET_MOST_RECENT_RELEASE_SUCCESS;
  payload: AlbumFullResponseData;
};

export type GetMostRecentReleaseFailedActionType = {
  type: typeof ArtistActionTypes.GET_MOST_RECENT_RELEASE_FAILED;
  payload: ActionFailedError;
};

export type OpenDiscoverArtistModalActionType = {
  type: typeof ArtistActionTypes.OPEN_DISCOVER_ARTIST_MODAL;
  payload: undefined;
};

export type CloseDiscoverArtistModalActionType = {
  type: typeof ArtistActionTypes.CLOSE_DISCOVER_ARTIST_MODAL;
  payload: undefined;
};

export type GetArtistsInListenerLibraryStartActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY;
  payload: GetArtistsInListenerLibraryRequest;
};

export type GetArtistsInListenerLibrarySuccessActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS;
  payload: GetArtistsInListenerLibraryResponse;
};

export type GetArtistsInListenerLibraryFailedActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreArtistsInListenerLibraryStartActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY;
  payload: GetArtistsInListenerLibraryRequest;
};

export type LoadMoreArtistsInListenerLibrarySuccessActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS;
  payload: GetArtistsInListenerLibraryResponse;
};

export type LoadMoreArtistsInListenerLibraryFailedActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type GetListenerTopArtistsThisMonthStartActionType = {
  type: typeof ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH;
  payload: GetListenerTopArtistsThisMonthRequest;
};

export type GetListenerTopArtistsThisMonthSuccessActionType = {
  type: typeof ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS;
  payload: GetListenerTopArtistsThisMonthResponse;
};

export type GetListenerTopArtistsThisMonthFailedActionType = {
  type: typeof ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreListenerTopArtistsThisMonthStartActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH;
  payload: GetListenerTopArtistsThisMonthRequest;
};

export type LoadMoreListenerTopArtistsThisMonthSuccessActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS;
  payload: GetListenerTopArtistsThisMonthResponse;
};

export type LoadMoreListenerTopArtistsThisMonthFailedActionType = {
  type: typeof ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED;
  payload: ActionFailedError;
};

export type UpdateArtistLikedSongsCountActionType = {
  type: typeof ArtistActionTypes.UPDATE_ARTIST_LIKED_SONGS_COUNT;
  payload: number;
};

export type GetFansAlsoLikeArtistsStartActionType = {
  type: typeof ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS;
  payload: string;
};

export type GetFansAlsoLikeArtistsSuccessActionType = {
  type: typeof ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS_SUCCESS;
  payload: Array<ArtistInfoResponseData>;
};

export type GetFansAlsoLikeArtistsFailedActionType = {
  type: typeof ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS_FAILED;
  payload: ActionFailedError;
};

export type ArtistActions =
  | GetArtistsStartActionType
  | GetArtistsSuccessActionType
  | GetArtistsFailedActionType
  | LoadMoreArtistsStartActionType
  | LoadMoreArtistsSuccessActionType
  | LoadMoreArtistsFailedActionType
  | GetArtistByIdStartActionType
  | GetArtistByIdSuccessActionType
  | GetArtistByIdFailedActionType
  | FollowArtistStartActionType
  | FollowArtistSuccessActionType
  | FollowArtistFailedActionType
  | UnfollowArtistStartActionType
  | UnfollowArtistSuccessActionType
  | UnfollowArtistFailedActionType
  | OpenDiscoverArtistModalActionType
  | CloseDiscoverArtistModalActionType
  | GetGenresStartActionType
  | GetGenresSuccessActionType
  | GetGenresFailedActionType
  | GetMostRecentReleaseStartActionType
  | GetMostRecentReleaseSuccessActionType
  | GetMostRecentReleaseFailedActionType
  | GetArtistsInListenerLibraryStartActionType
  | GetArtistsInListenerLibrarySuccessActionType
  | GetArtistsInListenerLibraryFailedActionType
  | LoadMoreArtistsInListenerLibraryStartActionType
  | LoadMoreArtistsInListenerLibrarySuccessActionType
  | LoadMoreArtistsInListenerLibraryFailedActionType
  | GetListenerTopArtistsThisMonthStartActionType
  | GetListenerTopArtistsThisMonthSuccessActionType
  | GetListenerTopArtistsThisMonthFailedActionType
  | LoadMoreListenerTopArtistsThisMonthStartActionType
  | LoadMoreListenerTopArtistsThisMonthSuccessActionType
  | LoadMoreListenerTopArtistsThisMonthFailedActionType
  | UpdateArtistLikedSongsCountActionType
  | GetFansAlsoLikeArtistsStartActionType
  | GetFansAlsoLikeArtistsSuccessActionType
  | GetFansAlsoLikeArtistsFailedActionType;
