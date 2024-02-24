import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import {
  GetQueueStartActionType,
  GetQueueSuccessActionType,
  GetQueueFailedActionType,
  GenerateQueueStartActionType,
  GenerateQueueSuccessActionType,
  GenerateQueueFailedActionType,
  UpdateQueueLikesActionType
} from "./queue.actions.types";
import { GenerateQueueRequestData, QueueActionTypes, QueueInfoResponseData } from "./queue.model";

export const getQueueStartAction = (songId: string):
  GetQueueStartActionType => ({ type: QueueActionTypes.GET_QUEUE, payload: songId });

export const getQueueSuccessAction = (response: QueueInfoResponseData):
  GetQueueSuccessActionType => ({ type: QueueActionTypes.GET_QUEUE_SUCCESS, payload: response });

export const getQueueFailedAction = (error: ActionFailedError):
  GetQueueFailedActionType => ({ type: QueueActionTypes.GET_QUEUE_FAILED, payload: error });

export const generateQueueStartAction = (request: GenerateQueueRequestData):
  GenerateQueueStartActionType => ({ type: QueueActionTypes.GENERATE_QUEUE, payload: request });

export const generateQueueSuccessAction = (response: QueueInfoResponseData):
  GenerateQueueSuccessActionType => ({ type: QueueActionTypes.GENERATE_QUEUE_SUCCESS, payload: response });

export const generateQueueFailedAction = (error: ActionFailedError):
  GenerateQueueFailedActionType => ({ type: QueueActionTypes.GENERATE_QUEUE_FAILED, payload: error });

export const updateQueueLikesAction = (queue: Array<SongInfoResponseData>):
  UpdateQueueLikesActionType => ({ type: QueueActionTypes.UPDATE_QUEUE_LIKES, payload: queue });

export const queueActions = {
  getQueue: (songId: string) => getQueueStartAction(songId),
  getQueueSuccess: (response: QueueInfoResponseData) => getQueueSuccessAction(response),
  getQueueFailed: (error: ActionFailedError) => getQueueFailedAction(error),
  generateQueue: (request: GenerateQueueRequestData) => generateQueueStartAction(request),
  generateQueueSuccess: (response: QueueInfoResponseData) => generateQueueSuccessAction(response),
  generateQueueFailed: (error: ActionFailedError) => generateQueueFailedAction(error),
  updateQueueLikes: (queue: Array<SongInfoResponseData>) => updateQueueLikesAction(queue)
}

