import { AlbumWithoutArtistType } from "../../album/store/album.model";

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
  albums: undefined,
  profileImageUrl: undefined,
  backgroundColor: undefined
};

export interface ArtistState extends ArtistFullResponseDataType {
  isArtistQueueLoading: boolean,
  isArtistLoading: boolean,
  artists?: Array<ArtistInfoResponseDataType>
}

export type ArtistSocialLinks = {
  name: string;
  link: string;
}

export type ArtistShortData = {
  name: string;
  id: string;
}

export type ArtistInfoResponseDataType = {
  artistId?: string;
  name?: string;
  country?: string;
  description?: string;
  socialLinks?: Array<ArtistSocialLinks>;
  followers?: number;
  profileImageUrl?: string;
  backgroundColor?: string;
}

export type ArtistFullResponseDataType = ArtistInfoResponseDataType & {
  albums?: Array<AlbumWithoutArtistType>;
}

export enum ArtistActionTypes {
  GET_ARTISTS = "GET_ARTISTS_START",
  GET_ARTISTS_SUCCESS = "GET_ARTISTS_SUCCESS",
  GET_ARTISTS_FAILED = "GET_ARTISTS_FAILED",
  GET_ARTIST_BY_ID = "GET_ARTIST_BY_ID_START",
  GET_ARTIST_BY_ID_SUCCESS = "GET_ARTIST_BY_ID_SUCCESS",
  GET_ARTIST_BY_ID_FAILED = "GET_ARTIST_BY_ID_FAILED",
};