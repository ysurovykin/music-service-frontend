import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  HomePageContentResponseData,
  ListenerActionTypes,
  ListenerInfoResponseData,
  ContentData,
  EditProfileRequestData,
  GetAccountContentCountResponseData,
  GetExistingGenresRequestData,
  GetExistingGenresResponseData,
  GetRecommendedArtistsRequestData,
  GetRecommendedArtistsResponseData,
  GetHomePageContentRequestData,
  SaveGetStartedResultsRequestData,
  ChangeSubscriptionRequestData,
  UserCreditCardInfo
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
  payload: GetHomePageContentRequestData;
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

export type OpenGetStartedModalActionType = {
  type: typeof ListenerActionTypes.OPEN_GET_STARTED_MODAL;
  payload: undefined;
};

export type CloseGetStartedModalActionType = {
  type: typeof ListenerActionTypes.CLOSE_GET_STARTED_MODAL;
  payload: undefined;
};

export type GetExistingGenresStartActionType = {
  type: typeof ListenerActionTypes.GET_EXISTING_GENRES;
  payload: GetExistingGenresRequestData;
};

export type GetExistingGenresSuccessActionType = {
  type: typeof ListenerActionTypes.GET_EXISTING_GENRES_SUCCESS;
  payload: GetExistingGenresResponseData;
};

export type GetExistingGenresFailedActionType = {
  type: typeof ListenerActionTypes.GET_EXISTING_GENRES_FAILED;
  payload: ActionFailedError;
};

export type GetRecommendedArtistsStartActionType = {
  type: typeof ListenerActionTypes.GET_RECOMMENDED_ARTISTS;
  payload: GetRecommendedArtistsRequestData;
};

export type GetRecommendedArtistsSuccessActionType = {
  type: typeof ListenerActionTypes.GET_RECOMMENDED_ARTISTS_SUCCESS;
  payload: GetRecommendedArtistsResponseData;
};

export type GetRecommendedArtistsFailedActionType = {
  type: typeof ListenerActionTypes.GET_RECOMMENDED_ARTISTS_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreRecommendedArtistsStartActionType = {
  type: typeof ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS;
  payload: GetRecommendedArtistsRequestData;
};

export type LoadMoreRecommendedArtistsSuccessActionType = {
  type: typeof ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_SUCCESS;
  payload: GetRecommendedArtistsResponseData;
};

export type LoadMoreRecommendedArtistsFailedActionType = {
  type: typeof ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_FAILED;
  payload: ActionFailedError;
};

export type SaveGetStartedResultsStartActionType = {
  type: typeof ListenerActionTypes.SAVE_GET_STARTED_RESULTS;
  payload: SaveGetStartedResultsRequestData;
};

export type SaveGetStartedResultsSuccessActionType = {
  type: typeof ListenerActionTypes.SAVE_GET_STARTED_RESULTS_SUCCESS;
  payload: undefined;
};

export type SaveGetStartedResultsFailedActionType = {
  type: typeof ListenerActionTypes.SAVE_GET_STARTED_RESULTS_FAILED;
  payload: ActionFailedError;
};

export type OpenChangeSubscriptionModalActionType = {
  type: typeof ListenerActionTypes.OPEN_CHANGE_SUBSCRIPTION_MODAL;
  payload: undefined;
};

export type CloseChangeSubscriptionModalActionType = {
  type: typeof ListenerActionTypes.CLOSE_CHANGE_SUBSCRIPTION_MODAL;
  payload: undefined;
};

export type ChangeSubscriptionStartActionType = {
  type: typeof ListenerActionTypes.CHANGE_SUBSCRIPTION;
  payload: ChangeSubscriptionRequestData;
};

export type ChangeSubscriptionSuccessActionType = {
  type: typeof ListenerActionTypes.CHANGE_SUBSCRIPTION_SUCCESS;
  payload: undefined;
};

export type ChangeSubscriptionFailedActionType = {
  type: typeof ListenerActionTypes.CHANGE_SUBSCRIPTION_FAILED;
  payload: ActionFailedError;
};

export type GetUserCreditCardsStartActionType = {
  type: typeof ListenerActionTypes.GET_USER_CREDIT_CARDS;
  payload: undefined;
};

export type GetUserCreditCardsSuccessActionType = {
  type: typeof ListenerActionTypes.GET_USER_CREDIT_CARDS_SUCCESS;
  payload: Array<UserCreditCardInfo>;
};

export type GetUserCreditCardsFailedActionType = {
  type: typeof ListenerActionTypes.GET_USER_CREDIT_CARDS_FAILED;
  payload: ActionFailedError;
};

export type DeleteUserCreditCardStartActionType = {
  type: typeof ListenerActionTypes.DELETE_USER_CREDIT_CARD;
  payload: string;
};

export type DeleteUserCreditCardSuccessActionType = {
  type: typeof ListenerActionTypes.DELETE_USER_CREDIT_CARD_SUCCESS;
  payload: undefined;
};

export type DeleteUserCreditCardFailedActionType = {
  type: typeof ListenerActionTypes.DELETE_USER_CREDIT_CARD_FAILED;
  payload: ActionFailedError;
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
  | CloseEditProfileModalActionType
  | OpenGetStartedModalActionType
  | CloseGetStartedModalActionType
  | GetExistingGenresStartActionType
  | GetExistingGenresSuccessActionType
  | GetExistingGenresFailedActionType
  | GetRecommendedArtistsStartActionType
  | GetRecommendedArtistsSuccessActionType
  | GetRecommendedArtistsFailedActionType
  | LoadMoreRecommendedArtistsStartActionType
  | LoadMoreRecommendedArtistsSuccessActionType
  | LoadMoreRecommendedArtistsFailedActionType
  | SaveGetStartedResultsStartActionType
  | SaveGetStartedResultsSuccessActionType
  | SaveGetStartedResultsFailedActionType
  | OpenChangeSubscriptionModalActionType
  | CloseChangeSubscriptionModalActionType
  | ChangeSubscriptionStartActionType
  | ChangeSubscriptionSuccessActionType
  | ChangeSubscriptionFailedActionType
  | GetUserCreditCardsStartActionType
  | GetUserCreditCardsSuccessActionType
  | GetUserCreditCardsFailedActionType
  | DeleteUserCreditCardStartActionType
  | DeleteUserCreditCardSuccessActionType
  | DeleteUserCreditCardFailedActionType;
