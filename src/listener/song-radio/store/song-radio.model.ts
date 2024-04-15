import { SongInfoResponseData } from "../../song/store/song.model";

export const songRadioState: SongRadioState = {
  status: undefined,
  isSongRadioLoading: false,
  name: undefined,
  lastUpdatedAt: undefined,
  coverImageUrl: undefined,
  songName: undefined,
  backgroundColor: undefined,
  baseSongId: undefined,
  isRefreshSongRadioModalOpen: false,
  listenerSongRadios: undefined,
  isListenerSongRadiosLoading: false,
  isMoreListenerSongRadiosForLoading: undefined,
  songsTimeDuration: undefined,
  songsCount: undefined
};

export interface SongRadioState extends SongRadioFullResponseData {
  isSongRadioLoading: boolean;
  isRefreshSongRadioModalOpen: boolean;
  listenerSongRadios?: Array<SongRadioInfoResponseData>;
  isListenerSongRadiosLoading?: boolean;
  isMoreListenerSongRadiosForLoading?: boolean;
}

export type SongRadioInfoResponseData = {
  name?: string,
  lastUpdatedAt?: Date,
  coverImageUrl?: string,
  songName?: string,
  backgroundColor?: string,
  baseSongId?: string
}

export type SongRadioFullResponseData = SongRadioInfoResponseData & {
  status?: 204;
  songsTimeDuration?: number;
  songsCount?: number;
  brandNew?: boolean;
}

export type ApproveRequestResponseData = {
  status: 300,
  approveRefresh: boolean
}

export type CreateSongRadioResponseData = SongRadioFullResponseData | ApproveRequestResponseData;

export type CreateSongRadioRequestData = {
  song: SongInfoResponseData;
  shouldRefresh?: boolean;
}

export type GetListenerSongRadiosRequestData = {
  offset: number;
  limit: number;
  search?: string;
}

export type GetListenerSongRadiosResponseData = {
  listenerSongRadios: Array<SongRadioInfoResponseData>;
  isMoreListenerSongRadiosForLoading: boolean;
}

export enum SongRadioActionTypes {
  GET_SONG_RADIO = "SONG_RADIO.GET_SONG_RADIO",
  GET_SONG_RADIO_SUCCESS = "SONG_RADIO.GET_SONG_RADIO_SUCCESS",
  GET_SONG_RADIO_FAILED = "SONG_RADIO.GET_SONG_RADIO_FAILED",

  GET_LISTENER_SONG_RADIOS = "SONG_RADIO.GET_LISTENER_SONG_RADIOS",
  GET_LISTENER_SONG_RADIOS_SUCCESS = "SONG_RADIO.GET_LISTENER_SONG_RADIOS_SUCCESS",
  GET_LISTENER_SONG_RADIOS_FAILED = "SONG_RADIO.GET_LISTENER_SONG_RADIOS_FAILED",

  LOAD_MORE_LISTENER_SONG_RADIOS = "SONG_RADIO.LOAD_MORE_LISTENER_SONG_RADIOS",
  LOAD_MORE_LISTENER_SONG_RADIOS_SUCCESS = "SONG_RADIO.LOAD_MORE_LISTENER_SONG_RADIOS_SUCCESS",
  LOAD_MORE_LISTENER_SONG_RADIOS_FAILED = "SONG_RADIO.LOAD_MORE_LISTENER_SONG_RADIOS_FAILED",

  CREATE_SONG_RADIO = "SONG_RADIO.CREATE_SONG_RADIO",
  CREATE_SONG_RADIO_SUCCESS = "SONG_RADIO.CREATE_SONG_RADIO_SUCCESS",
  CREATE_SONG_RADIO_FAILED = "SONG_RADIO.CREATE_SONG_RADIO_FAILED",

  OPEN_REFRESH_SONG_RADIO_MODAL = "SONG_RADIO.OPEN_REFRESH_SONG_RADIO_MODAL",
  CLOSE_REFRESH_SONG_RADIO_MODAL = "SONG_RADIO.CLOSE_REFRESH_SONG_RADIO_MODAL",
};