import { GetSongsSortingOptions, SongInfoResponseData } from "../../song/store/song.model";
import { RepeatSongStates } from "../../store/listener.model";

export const queueState: QueueState = {
  queue: undefined,
  songQueueId: undefined,
  isPlaying: false,
  isQueueLoading: false,
  isMoreSongsForwardForLoading: false,
  isMoreSongsBehindForLoading: false
};

export interface QueueState extends QueueInfoResponseData {
  isQueueLoading: boolean;
  isPlaying?: boolean;
}

export type QueueSong = {
  songId?: string;
  songQueueId?: string;
}

export type QueueSongInfoResponseData = SongInfoResponseData & {
  songQueueId?: string;
}

export type AddSongToQueueRequestData = {
  currentSongQueueId: string;
  songId: string;
}

export type RemoveSongFromQueueRequestData = {
  songQueueId: string;
}

export type QueueInfoResponseData = {
  queue?: Array<QueueSongInfoResponseData>;
  songQueueId?: string;
  isMoreSongsForwardForLoading?: boolean;
  isMoreSongsBehindForLoading?: boolean;
}

export type GenerateQueueRequestData = {
  shuffleEnabled: boolean;
  isNewQueue: boolean;
  songQueueId?: string; //define if isNewQueue === false
  extendForward?: boolean; //define if isNewQueue === false
  songId?: string; //define if isNewQueue === true
  options?: GenerateQueueOptions; //define if isNewQueue === true
  onlyLiked?: boolean;
  sortingOptions?: GetSongsSortingOptions;
  repeatSongState?: RepeatSongStates;
  search?: string;
  shouldUnpause?: boolean;
}

export type GenerateQueueOptions = {
  albumId?: string;
  artistId?: string;
  playlistId?: string;
  songRadioBaseSongId?: string;
  listenerId?: string;
}

export enum QueueActionTypes {
  GET_QUEUE = "QUEUE.GET_QUEUE",
  GET_QUEUE_SUCCESS = "QUEUE.GET_QUEUE_SUCCESS",
  GET_QUEUE_FAILED = "QUEUE.GET_QUEUE_FAILED",
  GENERATE_QUEUE = "QUEUE.GENERATE_QUEUE",
  GENERATE_QUEUE_SUCCESS = "QUEUE.GENERATE_QUEUE_SUCCESS",
  GENERATE_QUEUE_FAILED = "QUEUE.GENERATE_QUEUE_FAILED",
  UPDATE_QUEUE_LIKES = "QUEUE.UPDATE_QUEUE_LIKES",
  ADD_SONG_TO_QUEUE = "QUEUE.ADD_SONG_TO_QUEUE",
  ADD_SONG_TO_QUEUE_SUCCESS = "QUEUE.ADD_SONG_TO_QUEUE_SUCCESS",
  ADD_SONG_TO_QUEUE_FAILED = "QUEUE.ADD_SONG_TO_QUEUE_FAILED",
  REMOVE_SONG_FROM_QUEUE = "QUEUE.REMOVE_SONG_FROM_QUEUE",
  REMOVE_SONG_FROM_QUEUE_SUCCESS = "QUEUE.REMOVE_SONG_FROM_QUEUE_SUCCESS",
  REMOVE_SONG_FROM_QUEUE_FAILED = "QUEUE.REMOVE_SONG_FROM_QUEUE_FAILED",
  SWITCH_SONG = "QUEUE.SWITCH_SONG",
  UNPAUSE_SONG = "QUEUE.UNPAUSE_SONG",
  PAUSE_SONG = "QUEUE.PAUSE_SONG",
};