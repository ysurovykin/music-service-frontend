import { AlbumFullResponseData } from "../../album/store/album.model";

export const artistState: ArtistState = {
  artists: undefined,
  isArtistQueueLoading: false,
  isArtistLoading: false,
  artistId: undefined,
  name: undefined,
  country: undefined,
  description: undefined,
  socialLinks: undefined,
  followers: undefined,
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
  albumsWhereAppearsCount: undefined
};

export interface ArtistState extends ArtistFullResponseData {
  isArtistQueueLoading: boolean,
  isArtistLoading: boolean,
  artists?: Array<ArtistInfoResponseData>
  isDiscoverArtistModalOpen: boolean,
  genres?: Array<ArtistGenres>,
  isGenresLoading: boolean,
  mostRecentRelease?: AlbumFullResponseData,
  isMostRecentReleaseLoading: boolean,
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

export enum ArtistActionTypes {
  GET_ARTISTS = "ARTIST.GET_ARTISTS_START",
  GET_ARTISTS_SUCCESS = "ARTIST.GET_ARTISTS_SUCCESS",
  GET_ARTISTS_FAILED = "ARTIST.GET_ARTISTS_FAILED",

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
  CLOSE_DISCOVER_ARTIST_MODAL = "ARTIST.CLOSE_DISCOVER_ARTIST_MODAL"
};