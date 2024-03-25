import { GetSongsSortingOptions, SongInfoResponseData } from "../../song/store/song.model";

export const lyricsState: LyricsState = {
  lyrics: undefined,
  synchronized: undefined,
  isLyricsLoading: false
};

export interface LyricsState extends LyricsInfoResponseData {
  isLyricsLoading: boolean;
}

export type LyricsInfoResponseData = {
  synchronized?: boolean;
  lyrics?: Array<LyricsData>;
};

export type LyricsData = {
  text: string;
  start?: string;
  end?: string;
};

export enum LyricsActionTypes {
  GET_SONG_LYRICS = "LYRICS.GET_SONG_LYRICS",
  GET_SONG_LYRICS_SUCCESS = "LYRICS.GET_SONG_LYRICS_SUCCESS",
  GET_SONG_LYRICS_FAILED = "LYRICS.GET_SONG_LYRICS_FAILED"
};