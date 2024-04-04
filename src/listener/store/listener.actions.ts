import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  GetListenerByIdStartActionType,
  GetListenerByIdSuccessActionType,
  GetListenerByIdFailedActionType,
  GetRecentMostVisitedContentStartActionType,
  GetRecentMostVisitedContentSuccessActionType,
  GetRecentMostVisitedContentFailedActionType,
  GetHomePageContentStartActionType,
  GetHomePageContentSuccessActionType,
  GetHomePageContentFailedActionType
} from "./listener.actions.types";
import {
  HomePageContentResponseData,
  ListenerActionTypes,
  ListenerInfoResponseData,
  ContentData
} from "./listener.model"

export const getListenerByIdStartAction = (listenerId: string):
  GetListenerByIdStartActionType => ({ type: ListenerActionTypes.GET_LISTENER_BY_ID, payload: listenerId });

export const getListenerByIdSuccessAction = (response: ListenerInfoResponseData):
  GetListenerByIdSuccessActionType => ({ type: ListenerActionTypes.GET_LISTENER_BY_ID_SUCCESS, payload: response });

export const getListenerByIdFailedAction = (error: ActionFailedError):
  GetListenerByIdFailedActionType => ({ type: ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, payload: error });

export const getRecentMostVisitedContentStartAction = ():
  GetRecentMostVisitedContentStartActionType => ({ type: ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT, payload: undefined });

export const getRecentMostVisitedContentSuccessAction = (response: Array<ContentData>):
  GetRecentMostVisitedContentSuccessActionType => ({ type: ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_SUCCESS, payload: response });

export const getRecentMostVisitedContentFailedAction = (error: ActionFailedError):
  GetRecentMostVisitedContentFailedActionType => ({ type: ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED, payload: error });

export const getHomePageContentStartAction = ():
  GetHomePageContentStartActionType => ({ type: ListenerActionTypes.GET_HOME_PAGE_CONTENT, payload: undefined });

export const getHomePageContentSuccessAction = (response: Array<HomePageContentResponseData>):
  GetHomePageContentSuccessActionType => ({ type: ListenerActionTypes.GET_HOME_PAGE_CONTENT_SUCCESS, payload: response });

export const getHomePageContentFailedAction = (error: ActionFailedError):
  GetHomePageContentFailedActionType => ({ type: ListenerActionTypes.GET_HOME_PAGE_CONTENT_FAILED, payload: error });

export const listenerActions = {
  getListenerById: (listenerId: string) => getListenerByIdStartAction(listenerId),
  getListenerByIdSuccess: (response: ListenerInfoResponseData) => getListenerByIdSuccessAction(response),
  getListenerByIdFailed: (error: ActionFailedError) => getListenerByIdFailedAction(error),
  getRecentMostVisitedContent: () => getRecentMostVisitedContentStartAction(),
  getRecentMostVisitedContentSuccess: (response: Array<ContentData>) => getRecentMostVisitedContentSuccessAction(response),
  getRecentMostVisitedContentFailed: (error: ActionFailedError) => getRecentMostVisitedContentFailedAction(error),
  getHomePageContent: () => getHomePageContentStartAction(),
  getHomePageContentSuccess: (response: Array<HomePageContentResponseData>) => getHomePageContentSuccessAction(response),
  getHomePageContentFailed: (error: ActionFailedError) => getHomePageContentFailedAction(error)
}

