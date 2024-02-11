import { SongInfoResponseData } from "../song/store/song.model";

export const listenerState: ListenerState = {
  isListenerLoading: undefined,
  name: undefined,
  volume: undefined,
  shuffleEnabled: undefined,
  repeatSongState: undefined,
  songId: undefined,
  songsQueue: undefined,
  playTime: undefined,
  songIndex: undefined
};

export interface ListenerState {
  isListenerLoading?: boolean, 
  name?: string,
  volume?: number
  shuffleEnabled?: boolean,
  repeatSongState?: RepeatSongStateEnum,
  songId?: string,
  songsQueue?: Array<SongInfoResponseData>,
  playTime?: number,
  songIndex?: number
}

export enum RepeatSongStateEnum {
  'none' = 'none',
  'loop' = 'loop',
  'one' = 'one'
}

export type ListenerInfoResponseData = {
  volume?: number,
  shuffleEnabled?: boolean,
  repeatSongState?: RepeatSongStateEnum,
  songId?: string,
  songsQueue?: Array<SongInfoResponseData>,
  name?: string;
  songIndex?: number;
  playTime?: number; 
}

export type ListenerSongDataToUpdate = {
  songId?: string,
  songsQueue?: Array<SongInfoResponseData>,
  songIndex?: number
}

export type UpdateSongPlayerDataRequest = {
  listenerId?: string,
  songData: ListenerSongDataToUpdate
}

export type SavePlayTimeRequest = {
  listenerId?: string,
  playTime?: number
}

export type ChangeVolumeRequest = {
  listenerId?: string,
  volume?: number
}

export type ChangeRepeatSongStateRequest = {
  listenerId?: string,
  repeatSongState?: RepeatSongStateEnum
}

export type ChangeShuffleStateRequest = {
  listenerId?: string,
  shuffleEnabled?: boolean
}

export enum ListenerActionTypes {
  GET_LISTENER_BY_ID = "GET_LISTENER_BY_ID_START",
  GET_LISTENER_BY_ID_SUCCESS = "GET_LISTENER_BY_ID_SUCCESS",
  GET_LISTENER_BY_ID_FAILED = "GET_LISTENER_BY_ID_FAILED",
  
  UPDATE_SONG_PLAYER_DATA = "UPDATE_SONG_PLAYER_DATA_START",
  UPDATE_SONG_PLAYER_DATA_SUCCESS = "UPDATE_SONG_PLAYER_DATA_SUCCESS",
  UPDATE_SONG_PLAYER_DATA_FAILED = "UPDATE_SONG_PLAYER_DATA_FAILED",
  SAVE_PLAY_TIME = "SAVE_PLAY_TIME_START",
  SAVE_PLAY_TIME_SUCCESS = "SAVE_PLAY_TIME_SUCCESS",
  SAVE_PLAY_TIME_FAILED = "SAVE_PLAY_TIME_FAILED",
  CHANGE_VOLUME = "CHANGE_VOLUME_START",
  CHANGE_VOLUME_SUCCESS = "CHANGE_VOLUME_SUCCESS",
  CHANGE_VOLUME_FAILED = "CHANGE_VOLUME_FAILED",
  CHANGE_REPEAT_SONG_STATE = "CHANGE_REPEAT_SONG_STATE_START",
  CHANGE_REPEAT_SONG_STATE_SUCCESS = "CHANGE_REPEAT_SONG_STATE_SUCCESS",
  CHANGE_REPEAT_SONG_STATE_FAILED = "CHANGE_REPEAT_SONG_STATE_FAILED",
  CHANGE_SHUFFLE_STATE = "CHANGE_SHUFFLE_STATE_START",
  CHANGE_SHUFFLE_STATE_SUCCESS = "CHANGE_SHUFFLE_STATE_SUCCESS",
  CHANGE_SHUFFLE_STATE_FAILED = "CHANGE_SHUFFLE_STATE_FAILED"
};