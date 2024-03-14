import { AlbumShortDataType } from "../../album/store/album.model";
import { ArtistShortData } from "../../artist/store/artist.model";

export const songState: SongState = {
  isSongsLoading: undefined,
  songs: undefined,
  isMoreSongsForLoading: undefined
};

export interface SongState {
  isSongsLoading?: boolean;
  songs?: Array<SongInfoResponseData>;
  isMoreSongsForLoading?: boolean;
}

export type SongInfoResponseData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortData>;
  album?: AlbumShortDataType;
  plays?: number;
  date?: Date;
  duration?: number;
  coverImageUrl?: string;
  backgroundColor?: string;
  lyricsBackgroundShadow?: string;
  songUrl?: string;
  playlistIds?: Array<string>;
}

export type GetSongByIdRequestData = {
  songId: string;
  playlistId?: string;
}

export type GetSongsRequestData = {
  options: GetSongsOptions;
  offset: number;
  limit: number;
  onlyLiked?: boolean;
  sortingOptions?: GetSongsSortingOptions;
}

export type GetSongsResponseData = {
  songs: Array<SongInfoResponseData>;
  isMoreSongsForLoading: boolean;
}

export type GetSongsSortingOptions = {
  name?: number,
  album?: number,
  plays?: number,
  duration?: number,
  date?: number
}

export type GetSongsOptions = {
  albumId?: string;
  artistId?: string;
  playlistId?: string;
}

export enum SongActionTypes {
  GET_SONG_BY_ID = "SONG.GET_SONG_BY_ID",
  GET_SONG_BY_ID_SUCCESS = "SONG.GET_SONG_BY_ID_SUCCESS",
  GET_SONG_BY_ID_FAILED = "SONG.GET_SONG_BY_ID_FAILED",

  GET_SONGS = "SONG.GET_SONGS_START",
  GET_SONGS_SUCCESS = "SONG.GET_SONGS_SUCCESS",
  GET_SONGS_FAILED = "SONG.GET_SONGS_FAILED",

  LOAD_MORE_SONGS = "SONG.LOAD_MORE_SONGS_START",
  LOAD_MORE_SONGS_SUCCESS = "SONG.LOAD_MORE_SONGS_SUCCESS",
  LOAD_MORE_SONGS_FAILED = "SONG.LOAD_MORE_SONGS_FAILED",

  CLEAR_SONGS = "SONG.CLEAR_SONGS",

  EDIT_SONG_PLAYLISTS = "SONG.EDIT_SONG_PLAYLISTS"
};