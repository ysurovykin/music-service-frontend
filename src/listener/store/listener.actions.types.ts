import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  ListenerActionTypes,
  ListenerInfoResponseData
} from "./listener.model";

export type GetListenerByIdStartActionType = {
  type: typeof ListenerActionTypes.GET_LISTENER_BY_ID;
  payload: string;
};

export type GetListenerByIdSuccessActionType = {
  type: typeof ListenerActionTypes.GET_LISTENER_BY_ID_SUCCESS;
  payload: ListenerInfoResponseData;
};

export type GetListenerByIdFailedActionType = {
  type: typeof ListenerActionTypes.GET_LISTENER_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type ListenerActions =
  | GetListenerByIdStartActionType
  | GetListenerByIdSuccessActionType
  | GetListenerByIdFailedActionType;
