export const songState: ArtistSongState = {
  isSongsLoading: undefined,
  songs: undefined,
  isMoreSongsForLoading: undefined
};

export interface ArtistSongState {
  isSongsLoading?: boolean;
  songs?: Array<ArtistSongInfoResponseData>;
  isMoreSongsForLoading?: boolean;
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
}

export type GetArtistSongsRequestData = {
  offset: number;
  limit: number;
  search?: string;
}

export type GetArtistSongsResponseData = {
  songs: Array<ArtistSongInfoResponseData>;
  isMoreSongsForLoading: boolean;
}

export enum ArtistSongActionTypes {
  UPLOAD_SONGS = "ARTIST_SONG.UPLOAD_SONG_START",
  UPLOAD_SONGS_SUCCESS = "ARTIST_SONG.UPLOAD_SONG_SUCCESS",
  UPLOAD_SONGS_FAILED = "ARTIST_SONG.UPLOAD_SONG_FAILED",

  GET_SONGS = "ARTIST_SONG.GET_SONGS_START",
  GET_SONGS_SUCCESS = "ARTIST_SONG.GET_SONGS_SUCCESS",
  GET_SONGS_FAILED = "ARTIST_SONG.GET_SONGS_FAILED",

  LOAD_MORE_SONGS = "ARTIST_SONG.LOAD_MORE_SONGS_START",
  LOAD_MORE_SONGS_SUCCESS = "ARTIST_SONG.LOAD_MORE_SONGS_SUCCESS",
  LOAD_MORE_SONGS_FAILED = "ARTIST_SONG.LOAD_MORE_SONGS_FAILED",

  HIDE_SONG = "ARTIST_SONG.HIDE_SONG_START",
  HIDE_SONG_SUCCESS = "ARTIST_SONG.HIDE_SONG_SUCCESS",
  HIDE_SONG_FAILED = "ARTIST_SONG.HIDE_SONG_FAILED",

  UNHIDE_SONG = "ARTIST_SONG.UNHIDE_SONG_START",
  UNHIDE_SONG_SUCCESS = "ARTIST_SONG.UNHIDE_SONG_SUCCESS",
  UNHIDE_SONG_FAILED = "ARTIST_SONG.UNHIDE_SONG_FAILED",
};