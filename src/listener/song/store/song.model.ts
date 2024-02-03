import { AlbumShortDataType } from "../../album/store/album.model";
import { ArtistShortDataType } from "../../artist/store/artist.model";

export const songState: SongState = {
  name: undefined,
  artists: undefined,
  songId: undefined,
  album: undefined,
  plays: undefined,
  date: undefined,
  coverImageurl: undefined,
  songUrl: undefined,
  songsQueue: undefined,
  isSongsQueueLoading: false,
  isSongDataLoading: false,
  isPlaying: false
};

export interface SongState extends SongInfoResponseData {
  isPlaying?: boolean,
  isSongDataLoading?: boolean,
  isSongsQueueLoading?: boolean, 
  songsQueue?: Array<SongInfoResponseData>
}

export type SongShortData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortDataType>;
  coverImageurl?: string;
  songUrl?: string;
}

export type SongInfoResponseData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortDataType>;
  album?: AlbumShortDataType;
  plays?: number;
  date?: Date;
  coverImageurl?: string;
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