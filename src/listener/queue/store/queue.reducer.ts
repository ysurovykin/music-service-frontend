import { QueueActionTypes, queueState } from './queue.model';
import { QueueState } from './queue.model';
import { QueueActions } from './queue.actions.types';

export const queueReducer = (state = queueState, action: QueueActions): QueueState => {
  switch (action.type) {
    case QueueActionTypes.GET_QUEUE: {
      return {
        ...state,
        isQueueLoading: true
      }
    }
    case QueueActionTypes.GET_QUEUE_SUCCESS: {
      return {
        ...state,
        isQueueLoading: false,
        queue: action.payload.queue,
        isMoreSongsForwardForLoading: action.payload.isMoreSongsForwardForLoading,
        isMoreSongsBehindForLoading: action.payload.isMoreSongsBehindForLoading
      }
    }
    case QueueActionTypes.GET_QUEUE_FAILED: {
      return {
        ...state,
        isQueueLoading: false
      }
    }
    case QueueActionTypes.GENERATE_QUEUE: {
      return {
        ...state,
        isQueueLoading: true
      }
    }
    case QueueActionTypes.GENERATE_QUEUE_SUCCESS: {
      return {
        ...state,
        isQueueLoading: false,
        queue: action.payload.queue,
        isMoreSongsForwardForLoading: action.payload.isMoreSongsForwardForLoading,
        isMoreSongsBehindForLoading: action.payload.isMoreSongsBehindForLoading
      }
    }
    case QueueActionTypes.GENERATE_QUEUE_FAILED: {
      return {
        ...state,
        isQueueLoading: false
      }
    }
    case QueueActionTypes.UPDATE_QUEUE_LIKES: {
      return {
        ...state,
        queue: action.payload
      }
    }
    default: {
      return { ...state }
    }
  }
}