import { SongInfoResponseData } from "../../song/store/song.model";

export const queueState: QueueState = {
  queue: undefined,
  isQueueLoading: false,
  isMoreSongsForwardForLoading: false,
  isMoreSongsBehindForLoading: false
};

export interface QueueState extends QueueInfoResponseData {
  isQueueLoading: boolean;
}

export type QueueInfoResponseData = {
  queue?: Array<SongInfoResponseData>;
  isMoreSongsForwardForLoading?: boolean;
  isMoreSongsBehindForLoading?: boolean;
}

export type GenerateQueueRequestData = {
  songId: string;
  shuffleEnabled: boolean;
  isNewQueue: boolean;
  extendForward?: boolean; //define if isNewQueue === false
  options?: GenerateQueueOptions; //define if isNewQueue === true
}

export type GenerateQueueOptions = {
  albumId?: string;
  artistId?: string;
  playlistId?: string;
}

export enum QueueActionTypes {
  GET_QUEUE = "GET_QUEUE",
  GET_QUEUE_SUCCESS = "GET_QUEUE_SUCCESS",
  GET_QUEUE_FAILED = "GET_QUEUE_FAILED",
  GENERATE_QUEUE = "GENERATE_QUEUE",
  GENERATE_QUEUE_SUCCESS = "GENERATE_QUEUE_SUCCESS",
  GENERATE_QUEUE_FAILED = "GENERATE_QUEUE_FAILED",
  UPDATE_QUEUE_LIKES = "UPDATE_QUEUE_LIKES"
};