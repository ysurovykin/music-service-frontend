import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import { AddSongToQueueRequestData, GenerateQueueRequestData, QueueActionTypes, QueueInfoResponseData, QueueSongInfoResponseData, RemoveSongFromQueueRequestData } from "./queue.model";

export type GetQueueStartActionType = {
  type: typeof QueueActionTypes.GET_QUEUE;
  payload: string;
};

export type GetQueueSuccessActionType = {
  type: typeof QueueActionTypes.GET_QUEUE_SUCCESS;
  payload: QueueInfoResponseData;
};

export type GetQueueFailedActionType = {
  type: typeof QueueActionTypes.GET_QUEUE_FAILED;
  payload: ActionFailedError;
};

export type GenerateQueueStartActionType = {
  type: typeof QueueActionTypes.GENERATE_QUEUE;
  payload: GenerateQueueRequestData;
};

export type GenerateQueueSuccessActionType = {
  type: typeof QueueActionTypes.GENERATE_QUEUE_SUCCESS;
  payload: QueueInfoResponseData;
};

export type GenerateQueueFailedActionType = {
  type: typeof QueueActionTypes.GENERATE_QUEUE_FAILED;
  payload: ActionFailedError;
};

export type UpdateQueueLikesActionType = {
  type: typeof QueueActionTypes.UPDATE_QUEUE_LIKES;
  payload: Array<QueueSongInfoResponseData>;
};

export type AddSongToQueueActionType = {
  type: typeof QueueActionTypes.ADD_SONG_TO_QUEUE;
  payload: AddSongToQueueRequestData;
};

export type AddSongToQueueSuccessActionType = {
  type: typeof QueueActionTypes.ADD_SONG_TO_QUEUE_SUCCESS;
  payload: Array<QueueSongInfoResponseData>;
};

export type AddSongToQueueFailedActionType = {
  type: typeof QueueActionTypes.ADD_SONG_TO_QUEUE_FAILED;
  payload: ActionFailedError;
};

export type RemoveSongFromQueueActionType = {
  type: typeof QueueActionTypes.REMOVE_SONG_FROM_QUEUE;
  payload: RemoveSongFromQueueRequestData;
};

export type RemoveSongFromQueueSuccessActionType = {
  type: typeof QueueActionTypes.REMOVE_SONG_FROM_QUEUE_SUCCESS;
  payload: Array<QueueSongInfoResponseData>;
};

export type RemoveSongFromQueueFailedActionType = {
  type: typeof QueueActionTypes.REMOVE_SONG_FROM_QUEUE_FAILED;
  payload: ActionFailedError;
};

export type SwitchSongActionType = {
  type: typeof QueueActionTypes.SWITCH_SONG;
  payload: string;
};

export type PauseSongActionType = {
  type: typeof QueueActionTypes.PAUSE_SONG;
  payload: undefined;
};

export type UnpauseSongActionType = {
  type: typeof QueueActionTypes.UNPAUSE_SONG;
  payload: undefined;
};

export type QueueActions =
  | GetQueueStartActionType
  | GetQueueSuccessActionType
  | GetQueueFailedActionType
  | GenerateQueueStartActionType
  | GenerateQueueSuccessActionType
  | GenerateQueueFailedActionType
  | UpdateQueueLikesActionType
  | AddSongToQueueActionType
  | RemoveSongFromQueueActionType
  | AddSongToQueueSuccessActionType
  | AddSongToQueueFailedActionType
  | RemoveSongFromQueueSuccessActionType
  | RemoveSongFromQueueFailedActionType
  | SwitchSongActionType
  | PauseSongActionType
  | UnpauseSongActionType;
