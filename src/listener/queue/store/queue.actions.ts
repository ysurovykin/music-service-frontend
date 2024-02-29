import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { SongInfoResponseData } from "../../song/store/song.model";
import {
  GetQueueStartActionType,
  GetQueueSuccessActionType,
  GetQueueFailedActionType,
  GenerateQueueStartActionType,
  GenerateQueueSuccessActionType,
  GenerateQueueFailedActionType,
  UpdateQueueLikesActionType,
  AddSongToQueueActionType,
  AddSongToQueueSuccessActionType,
  AddSongToQueueFailedActionType,
  RemoveSongFromQueueActionType,
  RemoveSongFromQueueSuccessActionType,
  RemoveSongFromQueueFailedActionType,
  SwitchSongActionType,
  PauseSongActionType,
  UnpauseSongActionType,
} from "./queue.actions.types";
import { AddSongToQueueRequestData, GenerateQueueRequestData, QueueActionTypes, QueueInfoResponseData, QueueSongInfoResponseData, RemoveSongFromQueueRequestData } from "./queue.model";

export const getQueueStartAction = (songQueueId: string):
  GetQueueStartActionType => ({ type: QueueActionTypes.GET_QUEUE, payload: songQueueId });

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

export const updateQueueLikesAction = (queue: Array<QueueSongInfoResponseData>):
  UpdateQueueLikesActionType => ({ type: QueueActionTypes.UPDATE_QUEUE_LIKES, payload: queue });

export const addSongToQueueAction = (request: AddSongToQueueRequestData):
  AddSongToQueueActionType => ({ type: QueueActionTypes.ADD_SONG_TO_QUEUE, payload: request });

export const addSongToQueueSuccessAction = (song: Array<QueueSongInfoResponseData>):
  AddSongToQueueSuccessActionType => ({ type: QueueActionTypes.ADD_SONG_TO_QUEUE_SUCCESS, payload: song });

export const addSongToQueueFailedAction = (error: ActionFailedError):
  AddSongToQueueFailedActionType => ({ type: QueueActionTypes.ADD_SONG_TO_QUEUE_FAILED, payload: error });

export const removeSongFromQueueAction = (request: RemoveSongFromQueueRequestData):
  RemoveSongFromQueueActionType => ({ type: QueueActionTypes.REMOVE_SONG_FROM_QUEUE, payload: request });

export const removeSongFromQueueSuccessAction = (updatedQueue: Array<QueueSongInfoResponseData>):
  RemoveSongFromQueueSuccessActionType => ({ type: QueueActionTypes.REMOVE_SONG_FROM_QUEUE_SUCCESS, payload: updatedQueue });

export const removeSongFromQueueFailedAction = (error: ActionFailedError):
  RemoveSongFromQueueFailedActionType => ({ type: QueueActionTypes.REMOVE_SONG_FROM_QUEUE_FAILED, payload: error });

export const playSongAction = (songQueueId: string):
  SwitchSongActionType => ({ type: QueueActionTypes.SWITCH_SONG, payload: songQueueId });

export const pauseSongAction = ():
  PauseSongActionType => ({ type: QueueActionTypes.PAUSE_SONG, payload: undefined });

export const unpauseSongAction = ():
  UnpauseSongActionType => ({ type: QueueActionTypes.UNPAUSE_SONG, payload: undefined });

export const queueActions = {
  getQueue: (songQueueId: string) => getQueueStartAction(songQueueId),
  getQueueSuccess: (response: QueueInfoResponseData) => getQueueSuccessAction(response),
  getQueueFailed: (error: ActionFailedError) => getQueueFailedAction(error),
  generateQueue: (request: GenerateQueueRequestData) => generateQueueStartAction(request),
  generateQueueSuccess: (response: QueueInfoResponseData) => generateQueueSuccessAction(response),
  generateQueueFailed: (error: ActionFailedError) => generateQueueFailedAction(error),
  updateQueueLikes: (queue: Array<QueueSongInfoResponseData>) => updateQueueLikesAction(queue),
  addSongToQueue: (request: AddSongToQueueRequestData) => addSongToQueueAction(request),
  addSongToQueueSuccess: (updatedQueue: Array<QueueSongInfoResponseData>) => addSongToQueueSuccessAction(updatedQueue),
  addSongToQueueFailed: (error: ActionFailedError) => addSongToQueueFailedAction(error),
  removeSongFromQueue: (request: RemoveSongFromQueueRequestData) => removeSongFromQueueAction(request),
  removeSongFromQueueSuccess: (updatedQueue: Array<QueueSongInfoResponseData>) => removeSongFromQueueSuccessAction(updatedQueue),
  removeSongFromQueueFailed: (error: ActionFailedError) => removeSongFromQueueFailedAction(error),
  switchSong: (songQueueId: string) => playSongAction(songQueueId),
  pauseSong: () => pauseSongAction(),
  unpauseSong: () => unpauseSongAction(),
}

