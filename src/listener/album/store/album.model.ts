import { ArtistShortData } from "../../artist/store/artist.model";
import { SongInfoResponseData } from "../../song/store/song.model";

export const albumState: AlbumState = {
  albums: undefined,
  isAlbumsLoading: false,
  isAlbumDataLoading: false,
  albumId: undefined,
  name: undefined,
  date: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined,
  lyricsBackgroundShadow: undefined,
  artist: undefined,
  isAddedToLibrary: undefined,
};

export interface AlbumState extends AlbumInfoResponseData {
  isAlbumsLoading: boolean,
  isAlbumDataLoading: boolean,
  albums?: Array<AlbumInfoResponseData>
}

export type AlbumSongData = {
  songId: string;
  name: string;
  plays: number;
  coArtistIds: Array<string>;
  backgroundColor?: string;
  lyricsBackgroundShadow?: string;
  coverImageUrl: string;
}

export type AlbumShortDataType = {
  name: string;
  id: string;
}

export type AlbumWithoutArtistType = {
  albumId?: string;
  name?: string;
  date?: Date;
  coverImageUrl?: string;
  backgroundColor?: string;
  lyricsBackgroundShadow?: string;
}

export type AlbumInfoResponseData = AlbumWithoutArtistType & {
  artist?: ArtistShortData;
  isAddedToLibrary?: boolean;
}

export enum AlbumActionTypes {
  GET_ALBUMS_BY_ARTIST_ID = "ALBUM.GET_ALBUMS_BY_ARTIST_ID_START",
  GET_ALBUMS_BY_ARTIST_ID_SUCCESS = "ALBUM.GET_ALBUMS_BY_ARTIST_ID_SUCCESS",
  GET_ALBUMS_BY_ARTIST_ID_FAILED = "ALBUM.GET_ALBUMS_BY_ARTIST_ID_FAILED",

  GET_ALBUM_BY_ID = "ALBUM.GET_ALBUM_BY_ID_START",
  GET_ALBUM_BY_ID_SUCCESS = "ALBUM.GET_ALBUM_BY_ID_SUCCESS",
  GET_ALBUM_BY_ID_FAILED = "ALBUM.GET_ALBUM_BY_ID_FAILED",
  
  ADD_ALBUM_TO_LIBRARY = "ALBUM.ADD_ALBUM_TO_LIBRARY_START",
  ADD_ALBUM_TO_LIBRARY_SUCCESS = "ALBUM.ADD_ALBUM_TO_LIBRARY_SUCCESS",
  ADD_ALBUM_TO_LIBRARY_FAILED = "ALBUM.ADD_ALBUM_TO_LIBRARY_FAILED",
  
  REMOVE_ALBUM_FROM_LIBRARY = "ALBUM.REMOVE_ALBUM_FROM_LIBRARY_START",
  REMOVE_ALBUM_FROM_LIBRARY_SUCCESS = "ALBUM.REMOVE_ALBUM_FROM_LIBRARY_SUCCESS",
  REMOVE_ALBUM_FROM_LIBRARY_FAILED = "ALBUM.REMOVE_ALBUM_FROM_LIBRARY_FAILED",
};