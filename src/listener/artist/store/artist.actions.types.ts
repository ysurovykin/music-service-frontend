import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { AlbumFullResponseData } from "../../album/store/album.model";
import { ArtistActionTypes, ArtistFullResponseData, ArtistGenres, ArtistInfoResponseData, GetArtistsInListenerLibraryRequest, GetArtistsInListenerLibraryResponse } from "./artist.model";

export type GetArtistsStartActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS;
  payload: undefined;
};

export type GetArtistsSuccessActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_SUCCESS;
  payload: Array<ArtistInfoResponseData>;
};

export type GetArtistsFailedActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_FAILED;
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

export type ArtistActions =
  | GetArtistsStartActionType
  | GetArtistsSuccessActionType
  | GetArtistsFailedActionType
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
  | LoadMoreArtistsInListenerLibraryFailedActionType;
