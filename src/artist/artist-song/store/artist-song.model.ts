export const artistSongState: ArtistSongState = {
  isSongsLoading: undefined,
  songs: undefined,
  isUploadSongLoading: undefined,
  isUploadSongModalOpen: undefined,
  isHideSongLoading: undefined,
  isUnhideSongLoading: undefined,
};

export interface ArtistSongState {
  isSongsLoading?: boolean;
  songs?: Array<ArtistSongInfoResponseData>;
  isUploadSongLoading?: boolean;
  isUploadSongModalOpen?: boolean;
  isHideSongLoading?: boolean;
  isUnhideSongLoading?: boolean;
}

export type ArtistShortData = {
  name: string;
  id: string;
}

export type ArtistSongInfoResponseData = {
  songId?: string;
  name?: string;
  plays?: number;
  duration?: number;
  backgroundColor?: string;
  coverImageUrl?: string;
  hidden?: boolean;
  explicit?: boolean;
  coArtists?: Array<ArtistShortData>;
}

// export type GetArtistAlbumSongsRequestData = {
//   offset: number;
//   limit: number;
//   search?: string;
// }

export type GetArtistAlbumSongsResponseData = {
  songs: Array<ArtistSongInfoResponseData>;
  // isMoreSongsForLoading: boolean;
}

export type UploadSongRequestData = {
  name: string;
  coArtistIds?: Array<string>;
  albumId: string;
  language: string;
  genres: Array<string>;
  explicit: boolean;
  song: Blob;
};

export enum ArtistSongActionTypes {
  GET_ARTIST_ALBUM_SONGS = "ARTIST_SONG.GET_ARTIST_ALBUM_SONGS_START",
  GET_ARTIST_ALBUM_SONGS_SUCCESS = "ARTIST_SONG.GET_ARTIST_ALBUM_SONGS_SUCCESS",
  GET_ARTIST_ALBUM_SONGS_FAILED = "ARTIST_SONG.GET_ARTIST_ALBUM_SONGS_FAILED",

  UPLOAD_SONG = "ARTIST_SONG.UPLOAD_SONG_START",
  UPLOAD_SONG_SUCCESS = "ARTIST_SONG.UPLOAD_SONG_SUCCESS",
  UPLOAD_SONG_FAILED = "ARTIST_SONG.UPLOAD_SONG_FAILED",

  HIDE_SONG = "ARTIST_SONG.HIDE_SONG_START",
  HIDE_SONG_SUCCESS = "ARTIST_SONG.HIDE_SONG_SUCCESS",
  HIDE_SONG_FAILED = "ARTIST_SONG.HIDE_SONG_FAILED",

  UNHIDE_SONG = "ARTIST_SONG.UNHIDE_SONG_START",
  UNHIDE_SONG_SUCCESS = "ARTIST_SONG.UNHIDE_SONG_SUCCESS",
  UNHIDE_SONG_FAILED = "ARTIST_SONG.UNHIDE_SONG_FAILED",
  
  OPEN_UPLOAD_SONG_MODAL = "ARTIST_SONG.OPEN_UPLOAD_SONG_MODAL",
  CLOSE_UPLOAD_SONG_MODAL = "ARTIST_SONG.CLOSE_UPLOAD_SONG_MODAL",
};