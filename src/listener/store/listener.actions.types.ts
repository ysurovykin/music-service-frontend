import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  HomePageContentResponseData,
  ListenerActionTypes,
  ListenerInfoResponseData,
  ContentData,
  EditProfileRequestData,
  GetAccountContentCountResponseData
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
  payload: Array<ContentData>;
};

export type GetRecentMostVisitedContentFailedActionType = {
  type: typeof ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED;
  payload: ActionFailedError;
};

export type GetHomePageContentStartActionType = {
  type: typeof ListenerActionTypes.GET_HOME_PAGE_CONTENT;
  payload: undefined;
};

export type GetHomePageContentSuccessActionType = {
  type: typeof ListenerActionTypes.GET_HOME_PAGE_CONTENT_SUCCESS;
  payload: Array<HomePageContentResponseData>;
};

export type GetHomePageContentFailedActionType = {
  type: typeof ListenerActionTypes.GET_HOME_PAGE_CONTENT_FAILED;
  payload: ActionFailedError;
};

export type EditProfileStartActionType = {
  type: typeof ListenerActionTypes.EDIT_PROFILE;
  payload: EditProfileRequestData;
};

export type EditProfileSuccessActionType = {
  type: typeof ListenerActionTypes.EDIT_PROFILE_SUCCESS;
  payload: undefined;
};

export type EditProfileFailedActionType = {
  type: typeof ListenerActionTypes.EDIT_PROFILE_FAILED;
  payload: ActionFailedError;
};

export type GetAccountContentCountStartActionType = {
  type: typeof ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT;
  payload: undefined;
};

export type GetAccountContentCountSuccessActionType = {
  type: typeof ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_SUCCESS;
  payload: GetAccountContentCountResponseData;
};

export type GetAccountContentCountFailedActionType = {
  type: typeof ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_FAILED;
  payload: ActionFailedError;
};

export type OpenEditProfileModalActionType = {
  type: typeof ListenerActionTypes.OPEN_EDIT_PROFILE_MODAL;
  payload: undefined;
};

export type CloseEditProfileModalActionType = {
  type: typeof ListenerActionTypes.CLOSE_EDIT_PROFILE_MODAL;
  payload: undefined;
};

export type ListenerActions =
  | GetListenerByIdStartActionType
  | GetListenerByIdSuccessActionType
  | GetListenerByIdFailedActionType
  | GetRecentMostVisitedContentStartActionType
  | GetRecentMostVisitedContentSuccessActionType
  | GetRecentMostVisitedContentFailedActionType
  | GetHomePageContentStartActionType
  | GetHomePageContentSuccessActionType
  | GetHomePageContentFailedActionType
  | EditProfileStartActionType
  | EditProfileSuccessActionType
  | EditProfileFailedActionType
  | GetAccountContentCountStartActionType
  | GetAccountContentCountSuccessActionType
  | GetAccountContentCountFailedActionType
  | OpenEditProfileModalActionType
  | CloseEditProfileModalActionType;
