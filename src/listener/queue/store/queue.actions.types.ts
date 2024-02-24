import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import { GenerateQueueRequestData, QueueActionTypes, QueueInfoResponseData } from "./queue.model";

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
  payload: Array<SongInfoResponseData>;
};

export type QueueActions =
  | GetQueueStartActionType
  | GetQueueSuccessActionType
  | GetQueueFailedActionType
  | GenerateQueueStartActionType
  | GenerateQueueSuccessActionType
  | GenerateQueueFailedActionType
  | UpdateQueueLikesActionType;
