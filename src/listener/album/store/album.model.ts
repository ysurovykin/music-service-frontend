import { ArtistShortData } from "../../artist/store/artist.model";
import { SongInfoResponseData } from "../../song/store/song.model";

export const albumState: AlbumState = {
  albums: undefined,
  isAlbumsLoading: false,
  albumsArtistAppearsIn: undefined,
  isAlbumsArtistAppearsInLoading: false,
  isAlbumDataLoading: false,
  isMoreAlbumsForLoading: undefined,
  albumId: undefined,
  name: undefined,
  date: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined,
  lyricsBackgroundShadow: undefined,
  artist: undefined,
  isAddedToLibrary: undefined,
  songsCount: undefined,
  songsTimeDuration: undefined,
  likedAlbums: undefined,
  isLikedAlbumsLoading: false,
  isMoreLikedAlbumsForLoading: undefined,
};

export interface AlbumState extends AlbumFullResponseData {
  isAlbumsLoading: boolean,
  isAlbumDataLoading: boolean,
  isMoreAlbumsForLoading?: boolean,
  albums?: Array<AlbumInfoResponseData>
  albumsArtistAppearsIn?: Array<AlbumInfoResponseData>
  isAlbumsArtistAppearsInLoading: boolean,
  likedAlbums?: Array<AlbumInfoResponseData>,
  isLikedAlbumsLoading: boolean,
  isMoreLikedAlbumsForLoading?: boolean;
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

export type GetAlbumsInListenerLibraryRequest = {
  offset: number;
  limit: number;
}

export type GetAlbumsRequest = {
  search?: string;
  offset: number;
  limit: number;
}

export type GetAlbumsResponse = {
  albums: Array<AlbumInfoResponseData>;
  isMoreAlbumsForLoading: boolean;
}

export type GetAlbumsInListenerLibraryResponse = {
  likedAlbums: Array<AlbumInfoResponseData>;
  isMoreLikedAlbumsForLoading: boolean;
}

export type AlbumFullResponseData = AlbumInfoResponseData & {
  songsCount?: number;
  songsTimeDuration?: number;
}

export enum AlbumActionTypes {
  GET_ALBUMS_BY_ARTIST_ID = "ALBUM.GET_ALBUMS_BY_ARTIST_ID_START",
  GET_ALBUMS_BY_ARTIST_ID_SUCCESS = "ALBUM.GET_ALBUMS_BY_ARTIST_ID_SUCCESS",
  GET_ALBUMS_BY_ARTIST_ID_FAILED = "ALBUM.GET_ALBUMS_BY_ARTIST_ID_FAILED",

  GET_ALBUMS_WHERE_ARTIST_APPEARS = "ALBUM.GET_ALBUMS_WHERE_ARTIST_APPEARS_START",
  GET_ALBUMS_WHERE_ARTIST_APPEARS_SUCCESS = "ALBUM.GET_ALBUMS_WHERE_ARTIST_APPEARS_SUCCESS",
  GET_ALBUMS_WHERE_ARTIST_APPEARS_FAILED = "ALBUM.GET_ALBUMS_WHERE_ARTIST_APPEARS_FAILED",

  GET_ALBUM_BY_ID = "ALBUM.GET_ALBUM_BY_ID_START",
  GET_ALBUM_BY_ID_SUCCESS = "ALBUM.GET_ALBUM_BY_ID_SUCCESS",
  GET_ALBUM_BY_ID_FAILED = "ALBUM.GET_ALBUM_BY_ID_FAILED",

  ADD_ALBUM_TO_LIBRARY = "ALBUM.ADD_ALBUM_TO_LIBRARY_START",
  ADD_ALBUM_TO_LIBRARY_SUCCESS = "ALBUM.ADD_ALBUM_TO_LIBRARY_SUCCESS",
  ADD_ALBUM_TO_LIBRARY_FAILED = "ALBUM.ADD_ALBUM_TO_LIBRARY_FAILED",

  REMOVE_ALBUM_FROM_LIBRARY = "ALBUM.REMOVE_ALBUM_FROM_LIBRARY_START",
  REMOVE_ALBUM_FROM_LIBRARY_SUCCESS = "ALBUM.REMOVE_ALBUM_FROM_LIBRARY_SUCCESS",
  REMOVE_ALBUM_FROM_LIBRARY_FAILED = "ALBUM.REMOVE_ALBUM_FROM_LIBRARY_FAILED",

  UPDATE_ALBUMS_INFO = "ALBUM.UPDATE_ALBUMS_INFO",

  GET_ALBUMS_IN_LISTENER_LIBRARY = "ALBUM.GET_ALBUMS_IN_LISTENER_LIBRARY_START",
  GET_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS = "ALBUM.GET_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS",
  GET_ALBUMS_IN_LISTENER_LIBRARY_FAILED = "ALBUM.GET_ALBUMS_IN_LISTENER_LIBRARY_FAILED",

  LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY = "ALBUM.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_START",
  LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS = "ALBUM.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS",
  LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_FAILED = "ALBUM.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_FAILED",

  GET_ALBUMS = "ALBUM.GET_ALBUMS_START",
  GET_ALBUMS_SUCCESS = "ALBUM.GET_ALBUMS_SUCCESS",
  GET_ALBUMS_FAILED = "ALBUM.GET_ALBUMS_FAILED",

  LOAD_MORE_ALBUMS = "ALBUM.LOAD_MORE_ALBUMS_START",
  LOAD_MORE_ALBUMS_SUCCESS = "ALBUM.LOAD_MORE_ALBUMS_SUCCESS",
  LOAD_MORE_ALBUMS_FAILED = "ALBUM.LOAD_MORE_ALBUMS_FAILED",
};