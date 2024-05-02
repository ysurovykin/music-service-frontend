export const artistAlbumState: ArtistAlbumState = {
  albums: undefined,
  isAlbumsLoading: false,
  isAlbumDataLoading: false,
  isMoreAlbumsForLoading: undefined,
  albumId: undefined,
  name: undefined,
  date: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined,
  songsCount: undefined,
  songsTimeDuration: undefined,
  isCreateAlbumModalOpen: undefined,
  isCreateAlbumLoading: undefined,
  isEditAlbumLoading: undefined,
  isEditAlbumModalOpen: undefined
};

export interface ArtistAlbumState extends AlbumFullResponseData {
  isAlbumsLoading: boolean,
  isAlbumDataLoading: boolean,
  isMoreAlbumsForLoading?: boolean,
  albums?: Array<AlbumInfoResponseData>,
  isCreateAlbumLoading?: boolean,
  isCreateAlbumModalOpen?: boolean,
  isEditAlbumLoading?: boolean,
  isEditAlbumModalOpen?: boolean
}

export type AlbumInfoResponseData = {
  albumId?: string;
  name?: string;
  date?: Date;
  hiden?: boolean;
  coverImageUrl?: string;
  backgroundColor?: string;
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

export type AlbumFullResponseData = AlbumInfoResponseData & {
  songsCount?: number;
  songsTimeDuration?: number;
}

export type CreateAlbumRequestData = {
  name: string;
  coverImage: Blob;
}

export type EditAlbumRequestData = {
  albumId: string;
  name: string;
  coverImage: Blob;
}

export enum AlbumActionTypes {
  GET_ALBUM_BY_ID = "ARTIST_ALBUM.GET_ALBUM_BY_ID_START",
  GET_ALBUM_BY_ID_SUCCESS = "ARTIST_ALBUM.GET_ALBUM_BY_ID_SUCCESS",
  GET_ALBUM_BY_ID_FAILED = "ARTIST_ALBUM.GET_ALBUM_BY_ID_FAILED",

  GET_ALBUMS = "ARTIST_ALBUM.GET_ALBUMS_START",
  GET_ALBUMS_SUCCESS = "ARTIST_ALBUM.GET_ALBUMS_SUCCESS",
  GET_ALBUMS_FAILED = "ARTIST_ALBUM.GET_ALBUMS_FAILED",

  LOAD_MORE_ALBUMS = "ARTIST_ALBUM.LOAD_MORE_ALBUMS_START",
  LOAD_MORE_ALBUMS_SUCCESS = "ARTIST_ALBUM.LOAD_MORE_ALBUMS_SUCCESS",
  LOAD_MORE_ALBUMS_FAILED = "ARTIST_ALBUM.LOAD_MORE_ALBUMS_FAILED",

  OPEN_CREATE_ALBUM_MODAL = "ARTIST_ALBUM.OPEN_CREATE_ALBUM_MODAL",
  CLOSE_CREATE_ALBUM_MODAL = "ARTIST_ALBUM.CLOSE_CREATE_ALBUM_MODAL",

  CREATE_ALBUM = "ARTIST_ALBUM.CREATE_ALBUM_START",
  CREATE_ALBUM_SUCCESS = "ARTIST_ALBUM.CREATE_ALBUM_SUCCESS",
  CREATE_ALBUM_FAILED = "ARTIST_ALBUM.CREATE_ALBUM_FAILED",

  OPEN_EDIT_ALBUM_MODAL = "ARTIST_ALBUM.OPEN_EDIT_ALBUM_MODAL",
  CLOSE_EDIT_ALBUM_MODAL = "ARTIST_ALBUM.CLOSE_EDIT_ALBUM_MODAL",

  EDIT_ALBUM = "ARTIST_ALBUM.EDIT_ALBUM_START",
  EDIT_ALBUM_SUCCESS = "ARTIST_ALBUM.EDIT_ALBUM_SUCCESS",
  EDIT_ALBUM_FAILED = "ARTIST_ALBUM.EDIT_ALBUM_FAILED",
};