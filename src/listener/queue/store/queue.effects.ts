import { put, select, takeEvery } from 'redux-saga/effects'
import { QueueActionTypes, QueueInfoResponseData, QueueSongInfoResponseData } from './queue.model';
import QueueService from './queue.service';
import { queueActions } from './queue.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { AddSongToQueueActionType, GenerateQueueStartActionType, GetQueueStartActionType, RemoveSongFromQueueActionType } from './queue.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { queueSelectors } from './queue.selectors';

export const queueEffects = [
  takeEvery(QueueActionTypes.GET_QUEUE, getQueue),
  takeEvery(QueueActionTypes.GET_QUEUE_FAILED, handleError),
  takeEvery(QueueActionTypes.ADD_SONG_TO_QUEUE, addSongToQueue),
  takeEvery(QueueActionTypes.ADD_SONG_TO_QUEUE_FAILED, handleError),
  takeEvery(QueueActionTypes.REMOVE_SONG_FROM_QUEUE, removeSongFromQueue),
  takeEvery(QueueActionTypes.REMOVE_SONG_FROM_QUEUE_FAILED, handleError),
  takeEvery(QueueActionTypes.GENERATE_QUEUE, generateQueue),
  takeEvery(QueueActionTypes.GENERATE_QUEUE_FAILED, handleError),
];

function* getQueue(action: GetQueueStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const queue: QueueInfoResponseData = yield QueueService.getQueue(action.payload, listenerId);
    yield put(queueActions.getQueueSuccess(queue));
  } catch (e) {
    const error = e as Error;
    yield put(queueActions.getQueueFailed({ error }));
  }
}

function* addSongToQueue(action: AddSongToQueueActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const song: QueueSongInfoResponseData = yield QueueService.addSongToQueue(action.payload, listenerId);
    if (!song) {
      throw new Error(`Error on adding song to queue`);
    }
    const queue: Array<QueueSongInfoResponseData> = yield select(queueSelectors.queue);
    const songsQueueToEdit: Array<QueueSongInfoResponseData> = queue?.length ? structuredClone(queue) : [];
    const currentSongIndex = songsQueueToEdit.findIndex(songInQueue => songInQueue.songQueueId === action.payload.currentSongQueueId);
    songsQueueToEdit.splice(currentSongIndex + 1, 0, song);
    yield put(queueActions.addSongToQueueSuccess(songsQueueToEdit));
  } catch (e) {
    const error = e as Error;
    yield put(queueActions.addSongToQueueFailed({ error }));
  }
}

function* removeSongFromQueue(action: RemoveSongFromQueueActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield QueueService.removeSongFromQueue(action.payload, listenerId);
    const queue: Array<QueueSongInfoResponseData> = yield select(queueSelectors.queue);
    const songsQueueToEdit: Array<QueueSongInfoResponseData> = queue?.length ? structuredClone(queue) : [];
    const songIndex = songsQueueToEdit.findIndex(songInQueue => songInQueue.songQueueId === action.payload.songQueueId);
    songsQueueToEdit.splice(songIndex, 1);
    yield put(queueActions.removeSongFromQueueSuccess(songsQueueToEdit));
  } catch (e) {
    const error = e as Error;
    yield put(queueActions.removeSongFromQueueFailed({ error }));
  }
}

function* generateQueue(action: GenerateQueueStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: QueueInfoResponseData = yield QueueService.generateQueue(action.payload, listenerId);
    const currentQueue: Array<QueueSongInfoResponseData> = yield select(queueSelectors.queue);
    const newQueue = response.queue || [];
    const updatedQueue = action.payload.isNewQueue ? [...newQueue] :
    action.payload.extendForward ? [...currentQueue, ...newQueue] :
        [...newQueue, ...currentQueue];
    if (action.payload.isNewQueue) {
      localStorage.setItem('songQueueId', response.songQueueId || '');
    }
    yield put(queueActions.generateQueueSuccess({
      queue: updatedQueue,
      songQueueId: response.songQueueId,
      isMoreSongsBehindForLoading: response.isMoreSongsBehindForLoading,
      isMoreSongsForwardForLoading: response.isMoreSongsForwardForLoading
    }));
    yield put(queueActions.unpauseSong());
  } catch (e) {
    const error = e as Error;
    yield put(queueActions.generateQueueFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}