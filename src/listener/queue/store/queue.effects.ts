import { put, select, takeEvery } from 'redux-saga/effects'
import { QueueActionTypes, QueueInfoResponseData } from './queue.model';
import QueueService from './queue.service';
import { queueActions } from './queue.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { GenerateQueueStartActionType, GetQueueStartActionType } from './queue.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { songSelectors } from '../../song/store/song.selectors';
import { SongInfoResponseData } from '../../song/store/song.model';
import { queueSelectors } from './queue.selectors';

export const queueEffects = [
  takeEvery(QueueActionTypes.GET_QUEUE, getQueue),
  takeEvery(QueueActionTypes.GET_QUEUE_FAILED, handleError),
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

function* generateQueue(action: GenerateQueueStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: QueueInfoResponseData = yield QueueService.generateQueue(action.payload, listenerId);
    const currentQueue: Array<SongInfoResponseData> = yield select(queueSelectors.queue);
    const newQueue = response.queue || [];
    const updatedQueue = action.payload.isNewQueue ? [...newQueue] :
    action.payload.extendForward ? [...currentQueue, ...newQueue] :
        [...newQueue, ...currentQueue];
    yield put(queueActions.generateQueueSuccess({
      queue: updatedQueue,
      isMoreSongsBehindForLoading: response.isMoreSongsBehindForLoading,
      isMoreSongsForwardForLoading: response.isMoreSongsForwardForLoading
    }));
  } catch (e) {
    const error = e as Error;
    yield put(queueActions.generateQueueFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}