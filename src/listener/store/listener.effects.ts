import { put, select, takeEvery } from 'redux-saga/effects'
import { ListenerActionTypes, ListenerInfoResponseData, MostVisitedContentData } from './listener.model';
import {
  GetListenerByIdStartActionType, GetRecentMostVisitedContentStartActionType
} from './listener.actions.types';
import ListenerService from './listener.service';
import { listenerActions } from './listener.actions';
import { ErrorActionType, showNotification } from '../../helpers/react/redux.helper';
import { userSelectors } from '../../user/store/user.selectors';

export const listenerEffects = [
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID, getListenerById),
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT, getRecentMostVisitedContent),
  takeEvery(ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED, handleError)
];

function* getListenerById(action: GetListenerByIdStartActionType) {
  try {
    const listenerResponseData: ListenerInfoResponseData = yield ListenerService.getListenerById(action.payload);
    yield put(listenerActions.getListenerByIdSuccess(listenerResponseData));
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.getListenerByIdFailed({ error }));
  }
}

function* getRecentMostVisitedContent(action: GetRecentMostVisitedContentStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: Array<MostVisitedContentData> = yield ListenerService.getRecentMostVisitedContent(listenerId);
    yield put(listenerActions.getRecentMostVisitedContentSuccess(response));
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.getRecentMostVisitedContentFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}