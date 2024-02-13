import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  GetListenerByIdStartActionType,
  GetListenerByIdSuccessActionType,
  GetListenerByIdFailedActionType
} from "./listener.actions.types";
import {
  ListenerActionTypes,
  ListenerInfoResponseData
} from "./listener.model"

export const getListenerByIdStartAction = (listenerId: string):
  GetListenerByIdStartActionType => ({ type: ListenerActionTypes.GET_LISTENER_BY_ID, payload: listenerId });

export const getListenerByIdSuccessAction = (response: ListenerInfoResponseData):
  GetListenerByIdSuccessActionType => ({ type: ListenerActionTypes.GET_LISTENER_BY_ID_SUCCESS, payload: response });

export const getListenerByIdFailedAction = (error: ActionFailedError):
  GetListenerByIdFailedActionType => ({ type: ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, payload: error });

export const listenerActions = {
  getListenerById: (listenerId: string) => getListenerByIdStartAction(listenerId),
  getListenerByIdSuccess: (response: ListenerInfoResponseData) => getListenerByIdSuccessAction(response),
  getListenerByIdFailed: (error: ActionFailedError) => getListenerByIdFailedAction(error)
}

