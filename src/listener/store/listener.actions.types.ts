import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  ListenerActionTypes,
  ListenerInfoResponseData,
  MostVisitedContentData
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

export type GetRecentMostVisitedContentStartActionType = {
  type: typeof ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT;
  payload: undefined;
};

export type GetRecentMostVisitedContentSuccessActionType = {
  type: typeof ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_SUCCESS;
  payload: Array<MostVisitedContentData>;
};

export type GetRecentMostVisitedContentFailedActionType = {
  type: typeof ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED;
  payload: ActionFailedError;
};

export type ListenerActions =
  | GetListenerByIdStartActionType
  | GetListenerByIdSuccessActionType
  | GetListenerByIdFailedActionType
  | GetRecentMostVisitedContentStartActionType
  | GetRecentMostVisitedContentSuccessActionType
  | GetRecentMostVisitedContentFailedActionType;
