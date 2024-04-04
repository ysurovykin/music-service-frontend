import { put, select, takeEvery } from 'redux-saga/effects'
import { HomePageContentResponseData, ListenerActionTypes, ListenerInfoResponseData, ContentData } from './listener.model';
import {
  GetHomePageContentStartActionType,
  GetListenerByIdStartActionType, GetRecentMostVisitedContentStartActionType
} from './listener.actions.types';
import ListenerService from './listener.service';
import { listenerActions } from './listener.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../helpers/react/redux.helper';
import { userSelectors } from '../../user/store/user.selectors';
import { AxiosError } from 'axios';

export const listenerEffects = [
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID, getListenerById),
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT, getRecentMostVisitedContent),
  takeEvery(ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_HOME_PAGE_CONTENT, getHomePageContent),
  takeEvery(ListenerActionTypes.GET_HOME_PAGE_CONTENT_FAILED, handleError)
];

function* getListenerById(action: GetListenerByIdStartActionType) {
  try {
    const listenerResponseData: ListenerInfoResponseData = yield ListenerService.getListenerById(action.payload);
    yield put(listenerActions.getListenerByIdSuccess(listenerResponseData));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getListenerByIdFailed({ error }));
  }
}

function* getRecentMostVisitedContent(action: GetRecentMostVisitedContentStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: Array<ContentData> = yield ListenerService.getRecentMostVisitedContent(listenerId);
    yield put(listenerActions.getRecentMostVisitedContentSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getRecentMostVisitedContentFailed({ error }));
  }
}

function* getHomePageContent(action: GetHomePageContentStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: Array<HomePageContentResponseData> = yield ListenerService.getHomePageContent(listenerId);
    yield put(listenerActions.getHomePageContentSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getHomePageContentFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}