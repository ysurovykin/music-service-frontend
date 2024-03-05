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

export type GetSongsRequestData = {
  options: GetSongsOptions;
  offset: number;
  limit: number;
}

export type GetSongsResponseData = {
  songs: Array<SongInfoResponseData>;
  isMoreSongsForLoading: boolean;
}

export type GetSongsOptions = {
  albumId?: string;
  artistId?: string;
  playlistId?: string;
}

export enum SongActionTypes {
  GET_SONGS = "SONG.GET_SONGS_START",
  GET_SONGS_SUCCESS = "SONG.GET_SONGS_SUCCESS",
  GET_SONGS_FAILED = "SONG.GET_SONGS_FAILED",

  CLEAR_SONGS = "SONG.CLEAR_SONGS"
};