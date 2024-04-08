import { AlbumFullResponseData } from "../../album/store/album.model";

export const artistState: ArtistState = {
  artists: undefined,
  isArtistQueueLoading: false,
  isArtistsLoading: false,
  artistId: undefined,
  isMoreArtistsForLoading: undefined,
  name: undefined,
  country: undefined,
  description: undefined,
  socialLinks: undefined,
  followers: undefined,
  monthlyListeners: undefined,
  isFollowed: undefined,
  profileImageUrl: undefined,
  backgroundColor: undefined,
  songsCount: undefined,
  songsTimeDuration: undefined,
  likedSongsTimeDuration: undefined,
  likedSongsCount: undefined,
  isDiscoverArtistModalOpen: false,
  genres: undefined,
  mostRecentRelease: undefined,
  isGenresLoading: false,
  isMostRecentReleaseLoading: false,
  albumsCount: undefined,
  albumsWhereAppearsCount: undefined,
  followedArtists: undefined,
  isFollowedArtistsLoading: false,
  isMoreFollowedArtistsForLoading: undefined,
  fansAlsoLikeArtists: undefined,
  isFansAlsoLikeArtistsLoading: false,
  topArtistsThisMonth: undefined,
  isMoreTopArtistsThisMonthForLoading: false,
  isTopArtistsThisMonthLoading: false
};

export interface ArtistState extends ArtistFullResponseData {
  isArtistQueueLoading: boolean,
  isArtistsLoading: boolean,
  artists?: Array<ArtistInfoResponseData>,
  isMoreArtistsForLoading?: boolean,
  isDiscoverArtistModalOpen: boolean,
  genres?: Array<ArtistGenres>,
  isGenresLoading: boolean,
  mostRecentRelease?: AlbumFullResponseData,
  isMostRecentReleaseLoading: boolean,
  followedArtists?: Array<ArtistInfoResponseData>,
  isFollowedArtistsLoading: boolean,
  isMoreFollowedArtistsForLoading?: boolean,
  fansAlsoLikeArtists?: Array<ArtistInfoResponseData>,
  isFansAlsoLikeArtistsLoading: boolean,
  topArtistsThisMonth?: Array<ArtistInfoResponseData>,
  isMoreTopArtistsThisMonthForLoading: boolean,
  isTopArtistsThisMonthLoading: boolean
}

export type ArtistSocialLinks = {
  name: string;
  link: string;
}

export type ArtistShortData = {
  name: string;
  id: string;
}

export type ArtistInfoResponseData = {
  artistId?: string;
  name?: string;
  country?: string;
  description?: string;
  socialLinks?: Array<ArtistSocialLinks>;
  followers?: number;
  monthlyListeners?: number;
  profileImageUrl?: string;
  backgroundColor?: string;
}

export type ArtistFullResponseData = ArtistInfoResponseData & {
  isFollowed?: boolean;
  songsCount?: number;
  songsTimeDuration?: number;
  likedSongsCount?: number;
  likedSongsTimeDuration?: number;
  albumsCount?: number;
  albumsWhereAppearsCount?: number;
}

export type ArtistGenres = {
  name: string;
  percentage: number;
}

export type GetArtistsInListenerLibraryRequest = {
  offset: number;
  limit: number;
  search?: string;
}

export type GetListenerTopArtistsThisMonthRequest = {
  offset: number;
  limit: number;
  search?: string;
}

export type GetArtistsResponse = {
  artists: Array<ArtistInfoResponseData>;
  isMoreArtistsForLoading: boolean;
}

export type GetArtistsInListenerLibraryResponse = {
  followedArtists: Array<ArtistInfoResponseData>;
  isMoreFollowedArtistsForLoading: boolean;
}

export type GetListenerTopArtistsThisMonthResponse = {
  topArtistsThisMonth: Array<ArtistInfoResponseData>;
  isMoreTopArtistsThisMonthForLoading: boolean;
}

export type GetArtistsRequest = {
  search?: string;
  offset: number;
  limit: number;
}

export enum ArtistActionTypes {
  GET_ARTISTS = "ARTIST.GET_ARTISTS_START",
  GET_ARTISTS_SUCCESS = "ARTIST.GET_ARTISTS_SUCCESS",
  GET_ARTISTS_FAILED = "ARTIST.GET_ARTISTS_FAILED",

  LOAD_MORE_ARTISTS = "ARTIST.LOAD_MORE_ARTISTS",
  LOAD_MORE_ARTISTS_SUCCESS = "ARTIST.LOAD_MORE_ARTISTS_SUCCESS",
  LOAD_MORE_ARTISTS_FAILED = "ARTIST.LOAD_MORE_ARTISTS_FAILED",

  GET_ARTIST_BY_ID = "ARTIST.GET_ARTIST_BY_ID_START",
  GET_ARTIST_BY_ID_SUCCESS = "ARTIST.GET_ARTIST_BY_ID_SUCCESS",
  GET_ARTIST_BY_ID_FAILED = "ARTIST.GET_ARTIST_BY_ID_FAILED",

  FOLLOW_ARTIST = "ARTIST.FOLLOW_ARTIST_START",
  FOLLOW_ARTIST_SUCCESS = "ARTIST.FOLLOW_ARTIST_SUCCESS",
  FOLLOW_ARTIST_FAILED = "ARTIST.FOLLOW_ARTIST_FAILED",

  UNFOLLOW_ARTIST = "ARTIST.UNFOLLOW_ARTIST_START",
  UNFOLLOW_ARTIST_SUCCESS = "ARTIST.UNFOLLOW_ARTIST_SUCCESS",
  UNFOLLOW_ARTIST_FAILED = "ARTIST.UNFOLLOW_ARTIST_FAILED",

  GET_GENRES = "ARTIST.GET_GENRES_START",
  GET_GENRES_SUCCESS = "ARTIST.GET_GENRES_SUCCESS",
  GET_GENRES_FAILED = "ARTIST.GET_GENRES_FAILED",

  GET_MOST_RECENT_RELEASE = "ARTIST.GET_MOST_RECENT_RELEASE_START",
  GET_MOST_RECENT_RELEASE_SUCCESS = "ARTIST.GET_MOST_RECENT_RELEASE_SUCCESS",
  GET_MOST_RECENT_RELEASE_FAILED = "ARTIST.GET_MOST_RECENT_RELEASE_FAILED",

  OPEN_DISCOVER_ARTIST_MODAL = "ARTIST.OPEN_DISCOVER_ARTIST_MODAL",
  CLOSE_DISCOVER_ARTIST_MODAL = "ARTIST.CLOSE_DISCOVER_ARTIST_MODAL",

  GET_ARTISTS_IN_LISTENER_LIBRARY = "ARTIST.GET_ARTISTS_IN_LISTENER_LIBRARY_START",
  GET_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS = "ARTIST.GET_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS",
  GET_ARTISTS_IN_LISTENER_LIBRARY_FAILED = "ARTIST.GET_ARTISTS_IN_LISTENER_LIBRARY_FAILED",

  LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY = "ARTIST.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_START",
  LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS = "ARTIST.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS",
  LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_FAILED = "ARTIST.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_FAILED",

  GET_LISTENER_TOP_ARTISTS_THIS_MONTH = "ARTIST.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_START",
  GET_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS = "ARTIST.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS",
  GET_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED = "ARTIST.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED",

  LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH = "ARTIST.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_START",
  LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS = "ARTIST.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS",
  LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED = "ARTIST.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED",

  UPDATE_ARTIST_LIKED_SONGS_COUNT = "ARTIST.UPDATE_ARTIST_LIKED_SONGS_COUNT",

  GET_FANS_ALSO_LIKE_ARTISTS = "ARTIST.GET_FANS_ALSO_LIKE_ARTISTS_START",
  GET_FANS_ALSO_LIKE_ARTISTS_SUCCESS = "ARTIST.GET_FANS_ALSO_LIKE_ARTISTS_SUCCESS",
  GET_FANS_ALSO_LIKE_ARTISTS_FAILED = "ARTIST.GET_FANS_ALSO_LIKE_ARTISTS_FAILED",
};