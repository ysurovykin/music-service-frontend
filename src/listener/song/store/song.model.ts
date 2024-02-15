import { AlbumShortDataType } from "../../album/store/album.model";
import { ArtistShortDataType } from "../../artist/store/artist.model";

export const songState: SongState = {
  name: undefined,
  artists: undefined,
  songId: undefined,
  album: undefined,
  plays: undefined,
  date: undefined,
  duration: undefined,
  coverImageUrl: undefined,
  songUrl: undefined,
  isSongDataLoading: false,
  isPlaying: false,
  songsQueue: undefined,
  songIndex: undefined
};

export interface SongState extends SongInfoResponseData {
  isPlaying?: boolean,
  isSongDataLoading?: boolean,
  songsQueue?: Array<SongInfoResponseData>,
  songIndex?: number
}

export type PlaySongtData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortDataType>;
  coverImageUrl?: string;
  songUrl?: string;
  duration?: number;
  songsQueue?: Array<SongInfoResponseData>;
  songIndex?: number;
}

export type SongInfoResponseData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortDataType>;
  album?: AlbumShortDataType;
  plays?: number;
  date?: Date;
  duration?: number;
  coverImageUrl?: string;
  songUrl?: string;
}

export enum SongActionTypes {
  GET_SONG_BY_ID = "GET_SONG_BY_ID_START",
  GET_SONG_BY_ID_SUCCESS = "GET_SONG_BY_ID_SUCCESS",
  GET_SONG_BY_ID_FAILED = "GET_SONG_BY_ID_FAILED",

  PLAY_SONG = "PLAY_SONG",
  UNPAUSE_SONG = "UNPAUSE_SONG",
  PAUSE_SONG = "PAUSE_SONG",
};