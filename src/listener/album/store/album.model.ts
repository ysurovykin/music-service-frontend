import { ArtistShortDataType } from "../../artist/store/artist.model";
import { SongInfoResponseData } from "../../song/store/song.model";

export const albumState: AlbumState = {
  albums: undefined,
  isAlbumsLoading: false,
  isAlbumDataLoading: false,
  albumId: undefined,
  songs: undefined,
  name: undefined,
  date: undefined,
  downloadUrl: undefined,
  artist: undefined,
};

export interface AlbumState extends AlbumFullResponseData {
  isAlbumsLoading: boolean,
  isAlbumDataLoading: boolean,
  albums?: Array<AlbumInfoResponseData>
}

export type AlbumSongData = {
  songId: string,
  name: string,
  plays: number,
  coArtistIds: Array<string>,
  downloadUrl: string
}

export type AlbumShortDataType = {
  name: string;
  id: string;
}

export type AlbumInfoResponseData = {
  albumId?: string,
  name?: string,
  date?: Date,
  downloadUrl?: string,
  artist?: ArtistShortDataType
}

export type AlbumFullResponseData = AlbumInfoResponseData & {
  likes?: number,
  songs?: Array<SongInfoResponseData>
}

export enum AlbumActionTypes {
  GET_ALBUMS_BY_ARTIST_ID = "GET_ALBUMS_BY_ARTIST_ID_START",
  GET_ALBUMS_BY_ARTIST_ID_SUCCESS = "GET_ALBUMS_BY_ARTIST_ID_SUCCESS",
  GET_ALBUMS_BY_ARTIST_ID_FAILED = "GET_ALBUMS_BY_ARTIST_ID_FAILED",
  GET_ALBUM_BY_ID = "GET_ALBUM_BY_ID_START",
  GET_ALBUM_BY_ID_SUCCESS = "GET_ALBUM_BY_ID_SUCCESS",
  GET_ALBUM_BY_ID_FAILED = "GET_ALBUM_BY_ID_FAILED",
};