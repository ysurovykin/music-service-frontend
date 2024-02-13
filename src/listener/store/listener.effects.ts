import { put, takeEvery } from 'redux-saga/effects'
import { ListenerActionTypes, ListenerInfoResponseData } from './listener.model';
import { 
  GetListenerByIdStartActionType
} from './listener.actions.types';
import ListenerService from './listener.service';
import { listenerActions } from './listener.actions';
import { ErrorActionType } from '../../helpers/react/redux.helper';

export const listenerEffects = [
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID, getListenerById),
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, handleError)
];

function* getListenerById(action: GetListenerByIdStartActionType) {
  try {
    const listenerResponseData: ListenerInfoResponseData = yield ListenerService.getListenerById(action.payload);
    yield put(listenerActions.getListenerByIdSuccess(listenerResponseData));
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.getListenerByIdFailed({error}));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}