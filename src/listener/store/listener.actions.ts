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
  GetHomePageContentFailedActionType,
  EditProfileStartActionType,
  EditProfileSuccessActionType,
  EditProfileFailedActionType,
  GetAccountContentCountStartActionType,
  GetAccountContentCountSuccessActionType,
  GetAccountContentCountFailedActionType,
  OpenEditProfileModalActionType,
  CloseEditProfileModalActionType,
  OpenGetStartedModalActionType,
  CloseGetStartedModalActionType,
  GetExistingGenresStartActionType,
  GetExistingGenresSuccessActionType,
  GetExistingGenresFailedActionType,
  GetRecommendedArtistsStartActionType,
  GetRecommendedArtistsSuccessActionType,
  GetRecommendedArtistsFailedActionType,
  LoadMoreRecommendedArtistsStartActionType,
  LoadMoreRecommendedArtistsSuccessActionType,
  LoadMoreRecommendedArtistsFailedActionType,
  SaveGetStartedResultsStartActionType,
  SaveGetStartedResultsSuccessActionType,
  SaveGetStartedResultsFailedActionType,
} from "./listener.actions.types";
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
  SaveGetStartedResultsRequestData
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

export const getHomePageContentStartAction = (request: GetHomePageContentRequestData):
  GetHomePageContentStartActionType => ({ type: ListenerActionTypes.GET_HOME_PAGE_CONTENT, payload: request });

export const getHomePageContentSuccessAction = (response: Array<HomePageContentResponseData>):
  GetHomePageContentSuccessActionType => ({ type: ListenerActionTypes.GET_HOME_PAGE_CONTENT_SUCCESS, payload: response });

export const getHomePageContentFailedAction = (error: ActionFailedError):
  GetHomePageContentFailedActionType => ({ type: ListenerActionTypes.GET_HOME_PAGE_CONTENT_FAILED, payload: error });

export const editProfileStartAction = (request: EditProfileRequestData):
  EditProfileStartActionType => ({ type: ListenerActionTypes.EDIT_PROFILE, payload: request });

export const editProfileSuccessAction = ():
  EditProfileSuccessActionType => ({ type: ListenerActionTypes.EDIT_PROFILE_SUCCESS, payload: undefined });

export const editProfileFailedAction = (error: ActionFailedError):
  EditProfileFailedActionType => ({ type: ListenerActionTypes.EDIT_PROFILE_FAILED, payload: error });

export const getAccountContentCountStartAction = ():
  GetAccountContentCountStartActionType => ({ type: ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT, payload: undefined });

export const getAccountContentCountSuccessAction = (response: GetAccountContentCountResponseData):
  GetAccountContentCountSuccessActionType => ({ type: ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_SUCCESS, payload: response });

export const getAccountContentCountFailedAction = (error: ActionFailedError):
  GetAccountContentCountFailedActionType => ({ type: ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_FAILED, payload: error });

export const openEditProfileModalAction = ():
  OpenEditProfileModalActionType => ({ type: ListenerActionTypes.OPEN_EDIT_PROFILE_MODAL, payload: undefined });

export const closeEditProfileModalAction = ():
  CloseEditProfileModalActionType => ({ type: ListenerActionTypes.CLOSE_EDIT_PROFILE_MODAL, payload: undefined });

export const openGetStartedModalAction = ():
  OpenGetStartedModalActionType => ({ type: ListenerActionTypes.OPEN_GET_STARTED_MODAL, payload: undefined });

export const closeGetStartedModalAction = ():
  CloseGetStartedModalActionType => ({ type: ListenerActionTypes.CLOSE_GET_STARTED_MODAL, payload: undefined });

export const getExistingGenresStartAction = (request: GetExistingGenresRequestData):
  GetExistingGenresStartActionType => ({ type: ListenerActionTypes.GET_EXISTING_GENRES, payload: request });

export const getExistingGenresSuccessAction = (response: GetExistingGenresResponseData):
  GetExistingGenresSuccessActionType => ({ type: ListenerActionTypes.GET_EXISTING_GENRES_SUCCESS, payload: response });

export const getExistingGenresFailedAction = (error: ActionFailedError):
  GetExistingGenresFailedActionType => ({ type: ListenerActionTypes.GET_EXISTING_GENRES_FAILED, payload: error });

export const getRecommendedArtistsStartAction = (request: GetRecommendedArtistsRequestData):
  GetRecommendedArtistsStartActionType => ({ type: ListenerActionTypes.GET_RECOMMENDED_ARTISTS, payload: request });

export const getRecommendedArtistsSuccessAction = (response: GetRecommendedArtistsResponseData):
  GetRecommendedArtistsSuccessActionType => ({ type: ListenerActionTypes.GET_RECOMMENDED_ARTISTS_SUCCESS, payload: response });

export const getRecommendedArtistsFailedAction = (error: ActionFailedError):
  GetRecommendedArtistsFailedActionType => ({ type: ListenerActionTypes.GET_RECOMMENDED_ARTISTS_FAILED, payload: error });

export const loadMoreRecommendedArtistsStartAction = (request: GetRecommendedArtistsRequestData):
  LoadMoreRecommendedArtistsStartActionType => ({ type: ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS, payload: request });

export const loadMoreRecommendedArtistsSuccessAction = (response: GetRecommendedArtistsResponseData):
  LoadMoreRecommendedArtistsSuccessActionType => ({ type: ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_SUCCESS, payload: response });

export const loadMoreRecommendedArtistsFailedAction = (error: ActionFailedError):
  LoadMoreRecommendedArtistsFailedActionType => ({ type: ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_FAILED, payload: error });

export const saveGetStartedResultsStartAction = (request: SaveGetStartedResultsRequestData):
  SaveGetStartedResultsStartActionType => ({ type: ListenerActionTypes.SAVE_GET_STARTED_RESULTS, payload: request });

export const saveGetStartedResultsSuccessAction = ():
  SaveGetStartedResultsSuccessActionType => ({ type: ListenerActionTypes.SAVE_GET_STARTED_RESULTS_SUCCESS, payload: undefined });

export const saveGetStartedResultsFailedAction = (error: ActionFailedError):
  SaveGetStartedResultsFailedActionType => ({ type: ListenerActionTypes.SAVE_GET_STARTED_RESULTS_FAILED, payload: error });

export const listenerActions = {
  getListenerById: (listenerId: string) => getListenerByIdStartAction(listenerId),
  getListenerByIdSuccess: (response: ListenerInfoResponseData) => getListenerByIdSuccessAction(response),
  getListenerByIdFailed: (error: ActionFailedError) => getListenerByIdFailedAction(error),
  getRecentMostVisitedContent: () => getRecentMostVisitedContentStartAction(),
  getRecentMostVisitedContentSuccess: (response: Array<ContentData>) => getRecentMostVisitedContentSuccessAction(response),
  getRecentMostVisitedContentFailed: (error: ActionFailedError) => getRecentMostVisitedContentFailedAction(error),
  getHomePageContent: (request: GetHomePageContentRequestData) => getHomePageContentStartAction(request),
  getHomePageContentSuccess: (response: Array<HomePageContentResponseData>) => getHomePageContentSuccessAction(response),
  getHomePageContentFailed: (error: ActionFailedError) => getHomePageContentFailedAction(error),
  editProfile: (request: EditProfileRequestData) => editProfileStartAction(request),
  editProfileSuccess: () => editProfileSuccessAction(),
  editProfileFailed: (error: ActionFailedError) => editProfileFailedAction(error),
  getAccountContentCount: () => getAccountContentCountStartAction(),
  getAccountContentCountSuccess: (response: GetAccountContentCountResponseData) => getAccountContentCountSuccessAction(response),
  getAccountContentCountFailed: (error: ActionFailedError) => getAccountContentCountFailedAction(error),
  openEditProfileModal: () => openEditProfileModalAction(),
  closeEditProfileModal: () => closeEditProfileModalAction(),
  openGetStartedModal: () => openGetStartedModalAction(),
  closeGetStartedModal: () => closeGetStartedModalAction(),
  getExistingGenres: (request: GetExistingGenresRequestData) => getExistingGenresStartAction(request),
  getExistingGenresSuccess: (response: GetExistingGenresResponseData) => getExistingGenresSuccessAction(response),
  getExistingGenresFailed: (error: ActionFailedError) => getExistingGenresFailedAction(error),
  getRecommendedArtists: (request: GetRecommendedArtistsRequestData) => getRecommendedArtistsStartAction(request),
  getRecommendedArtistsSuccess: (response: GetRecommendedArtistsResponseData) => getRecommendedArtistsSuccessAction(response),
  getRecommendedArtistsFailed: (error: ActionFailedError) => getRecommendedArtistsFailedAction(error),
  loadMoreRecommendedArtists: (request: GetRecommendedArtistsRequestData) => loadMoreRecommendedArtistsStartAction(request),
  loadMoreRecommendedArtistsSuccess: (response: GetRecommendedArtistsResponseData) => loadMoreRecommendedArtistsSuccessAction(response),
  loadMoreRecommendedArtistsFailed: (error: ActionFailedError) => loadMoreRecommendedArtistsFailedAction(error),
  saveGetStartedResults: (request: SaveGetStartedResultsRequestData) => saveGetStartedResultsStartAction(request),
  saveGetStartedResultsSuccess: () => saveGetStartedResultsSuccessAction(),
  saveGetStartedResultsFailed: (error: ActionFailedError) => saveGetStartedResultsFailedAction(error),

}

