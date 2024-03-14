import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { AlbumFullResponseData } from "../../album/store/album.model";
import {
  GetArtistsFailedActionType,
  GetArtistsStartActionType,
  GetArtistsSuccessActionType,
  GetArtistByIdStartActionType,
  GetArtistByIdSuccessActionType,
  GetArtistByIdFailedActionType,
  FollowArtistStartActionType,
  FollowArtistSuccessActionType,
  FollowArtistFailedActionType,
  UnfollowArtistStartActionType,
  UnfollowArtistSuccessActionType,
  UnfollowArtistFailedActionType,
  OpenDiscoverArtistModalActionType,
  CloseDiscoverArtistModalActionType,
  GetGenresStartActionType,
  GetGenresSuccessActionType,
  GetGenresFailedActionType,
  GetMostRecentReleaseStartActionType,
  GetMostRecentReleaseSuccessActionType,
  GetMostRecentReleaseFailedActionType,
} from "./artist.actions.types";
import { ArtistActionTypes, ArtistFullResponseData, ArtistGenres, ArtistInfoResponseData } from "./artist.model";

export const getArtistsStartAction = ():
  GetArtistsStartActionType => ({ type: ArtistActionTypes.GET_ARTISTS, payload: undefined });

export const getArtistsSuccessAction = (response: Array<ArtistInfoResponseData>):
  GetArtistsSuccessActionType => ({ type: ArtistActionTypes.GET_ARTISTS_SUCCESS, payload: response });

export const getArtistsFailedAction = (error: ActionFailedError):
  GetArtistsFailedActionType => ({ type: ArtistActionTypes.GET_ARTISTS_FAILED, payload: error });

export const getArtistByIdStartAction = (artistId: string):
  GetArtistByIdStartActionType => ({ type: ArtistActionTypes.GET_ARTIST_BY_ID, payload: artistId });

export const getArtistByIdSuccessAction = (response: ArtistFullResponseData):
  GetArtistByIdSuccessActionType => ({ type: ArtistActionTypes.GET_ARTIST_BY_ID_SUCCESS, payload: response });

export const getArtistByIdFailedAction = (error: ActionFailedError):
  GetArtistByIdFailedActionType => ({ type: ArtistActionTypes.GET_ARTIST_BY_ID_FAILED, payload: error });

export const followArtistStartAction = (artistId: string):
  FollowArtistStartActionType => ({ type: ArtistActionTypes.FOLLOW_ARTIST, payload: artistId });

export const followArtistSuccessAction = ():
  FollowArtistSuccessActionType => ({ type: ArtistActionTypes.FOLLOW_ARTIST_SUCCESS, payload: undefined });

export const followArtistFailedAction = (error: ActionFailedError):
  FollowArtistFailedActionType => ({ type: ArtistActionTypes.FOLLOW_ARTIST_FAILED, payload: error });

export const unfollowArtistStartAction = (artistId: string):
  UnfollowArtistStartActionType => ({ type: ArtistActionTypes.UNFOLLOW_ARTIST, payload: artistId });

export const unfollowArtistSuccessAction = ():
  UnfollowArtistSuccessActionType => ({ type: ArtistActionTypes.UNFOLLOW_ARTIST_SUCCESS, payload: undefined });

export const unfollowArtistFailedAction = (error: ActionFailedError):
  UnfollowArtistFailedActionType => ({ type: ArtistActionTypes.UNFOLLOW_ARTIST_FAILED, payload: error });

export const getGenresStartAction = (artistId: string):
  GetGenresStartActionType => ({ type: ArtistActionTypes.GET_GENRES, payload: artistId });

export const getGenresSuccessAction = (genres: Array<ArtistGenres>):
  GetGenresSuccessActionType => ({ type: ArtistActionTypes.GET_GENRES_SUCCESS, payload: genres });

export const getGenresFailedAction = (error: ActionFailedError):
  GetGenresFailedActionType => ({ type: ArtistActionTypes.GET_GENRES_FAILED, payload: error });

export const getMostRecentReleaseStartAction = (artistId: string):
  GetMostRecentReleaseStartActionType => ({ type: ArtistActionTypes.GET_MOST_RECENT_RELEASE, payload: artistId });

export const getMostRecentReleaseSuccessAction = (mostRecentRelease: AlbumFullResponseData):
  GetMostRecentReleaseSuccessActionType => ({ type: ArtistActionTypes.GET_MOST_RECENT_RELEASE_SUCCESS, payload: mostRecentRelease });

export const getMostRecentReleaseFailedAction = (error: ActionFailedError):
  GetMostRecentReleaseFailedActionType => ({ type: ArtistActionTypes.GET_MOST_RECENT_RELEASE_FAILED, payload: error });

export const openDiscoverArtistModalAction = ():
  OpenDiscoverArtistModalActionType => ({ type: ArtistActionTypes.OPEN_DISCOVER_ARTIST_MODAL, payload: undefined });

export const closeDiscoverArtistModalAction = ():
  CloseDiscoverArtistModalActionType => ({ type: ArtistActionTypes.CLOSE_DISCOVER_ARTIST_MODAL, payload: undefined });

export const artistActions = {
  getArtists: () => getArtistsStartAction(),
  getArtistsSuccess: (response: Array<ArtistInfoResponseData>) => getArtistsSuccessAction(response),
  getArtistsFailed: (error: ActionFailedError) => getArtistsFailedAction(error),
  getArtistById: (artistId: string) => getArtistByIdStartAction(artistId),
  getArtistByIdSuccess: (response: ArtistFullResponseData) => getArtistByIdSuccessAction(response),
  getArtistByIdFailed: (error: ActionFailedError) => getArtistByIdFailedAction(error),
  followArtist: (artistId: string) => followArtistStartAction(artistId),
  followArtistSuccess: () => followArtistSuccessAction(),
  followArtistFailed: (error: ActionFailedError) => followArtistFailedAction(error),
  unfollowArtist: (artistId: string) => unfollowArtistStartAction(artistId),
  unfollowArtistSuccess: () => unfollowArtistSuccessAction(),
  unfollowArtistFailed: (error: ActionFailedError) => unfollowArtistFailedAction(error),
  getGenres: (artistId: string) => getGenresStartAction(artistId),
  getGenresSuccess: (genres: Array<ArtistGenres>) => getGenresSuccessAction(genres),
  getGenresFailed: (error: ActionFailedError) => getGenresFailedAction(error),
  getMostRecentRelease: (artistId: string) => getMostRecentReleaseStartAction(artistId),
  getMostRecentReleaseSuccess: (mostRecentRelease: AlbumFullResponseData) => getMostRecentReleaseSuccessAction(mostRecentRelease),
  getMostRecentReleaseFailed: (error: ActionFailedError) => getMostRecentReleaseFailedAction(error),
  openDiscoverArtistModal: () => openDiscoverArtistModalAction(),
  closeDiscoverArtistModal: () => closeDiscoverArtistModalAction(),
}

