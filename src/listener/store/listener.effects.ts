import { put, select, takeEvery } from 'redux-saga/effects'
import { HomePageContentResponseData, ListenerActionTypes, ListenerInfoResponseData, ContentData, GetAccountContentCountResponseData, GetExistingGenresResponseData, GetRecommendedArtistsResponseData, UserCreditCardInfo } from './listener.model';
import {
  ChangeSubscriptionStartActionType,
  DeleteUserCreditCardStartActionType,
  EditProfileStartActionType,
  GetAccountContentCountStartActionType,
  GetExistingGenresStartActionType,
  GetHomePageContentStartActionType,
  GetListenerByIdStartActionType, GetRecentMostVisitedContentStartActionType,
  GetRecommendedArtistsStartActionType,
  GetUserCreditCardsStartActionType,
  SaveGetStartedResultsStartActionType
} from './listener.actions.types';
import ListenerService from './listener.service';
import { listenerActions } from './listener.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../helpers/react/redux.helper';
import { userSelectors } from '../../user/store/user.selectors';
import { AxiosError } from 'axios';
import { listenerSelectors } from './listener.selectors';
import { ArtistInfoResponseData } from '../artist/store/artist.model';

export const listenerEffects = [
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID, getListenerById),
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT, getRecentMostVisitedContent),
  takeEvery(ListenerActionTypes.GET_RECENT_MOST_VISITED_CONTENT_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_HOME_PAGE_CONTENT, getHomePageContent),
  takeEvery(ListenerActionTypes.GET_HOME_PAGE_CONTENT_FAILED, handleError),
  takeEvery(ListenerActionTypes.EDIT_PROFILE, editProfile),
  takeEvery(ListenerActionTypes.EDIT_PROFILE_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT, getAccountContentCount),
  takeEvery(ListenerActionTypes.GET_ACCOUNT_CONTENT_COUNT_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_EXISTING_GENRES, getExistingGenres),
  takeEvery(ListenerActionTypes.GET_EXISTING_GENRES_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_RECOMMENDED_ARTISTS, getRecommendedArtists),
  takeEvery(ListenerActionTypes.GET_RECOMMENDED_ARTISTS_FAILED, handleError),
  takeEvery(ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS, loadMoreRecommendedArtists),
  takeEvery(ListenerActionTypes.LOAD_MORE_RECOMMENDED_ARTISTS_FAILED, handleError),
  takeEvery(ListenerActionTypes.SAVE_GET_STARTED_RESULTS, saveGetStartedResults),
  takeEvery(ListenerActionTypes.SAVE_GET_STARTED_RESULTS_FAILED, handleError),
  takeEvery(ListenerActionTypes.GET_USER_CREDIT_CARDS, getUserCreditCards),
  takeEvery(ListenerActionTypes.GET_USER_CREDIT_CARDS_FAILED, handleError),
  takeEvery(ListenerActionTypes.CHANGE_SUBSCRIPTION, changeSubscription),
  takeEvery(ListenerActionTypes.CHANGE_SUBSCRIPTION_FAILED, handleError),
  takeEvery(ListenerActionTypes.DELETE_USER_CREDIT_CARD, deleteUserCreditCard),
  takeEvery(ListenerActionTypes.DELETE_USER_CREDIT_CARD_FAILED, handleError),
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
    const response: Array<HomePageContentResponseData> = yield ListenerService.getHomePageContent(listenerId, action.payload);
    yield put(listenerActions.getHomePageContentSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getHomePageContentFailed({ error }));
  }
}

function* editProfile(action: EditProfileStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    if (action.payload.profileImage) {
      formData.append('image', action.payload.profileImage);
    }
    formData.append('name', action.payload.name.trim());
    yield ListenerService.editProfile(listenerId, formData);

    yield put(listenerActions.editProfileSuccess());
    yield put(listenerActions.getListenerById(listenerId));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.editProfileFailed({ error }));
  }
}

function* getAccountContentCount(action: GetAccountContentCountStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetAccountContentCountResponseData = yield ListenerService.getAccountContentCount(listenerId);
    yield put(listenerActions.getAccountContentCountSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getAccountContentCountFailed({ error }));
  }
}

function* getExistingGenres(action: GetExistingGenresStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetExistingGenresResponseData = yield ListenerService.getExistingGenres(listenerId, action.payload);
    yield put(listenerActions.getExistingGenresSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getExistingGenresFailed({ error }));
  }
}

function* getRecommendedArtists(action: GetRecommendedArtistsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetRecommendedArtistsResponseData = yield ListenerService.getRecommendedArtists(listenerId, action.payload);
    yield put(listenerActions.getRecommendedArtistsSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getRecommendedArtistsFailed({ error }));
  }
}

function* loadMoreRecommendedArtists(action: GetRecommendedArtistsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetRecommendedArtistsResponseData = yield ListenerService.getRecommendedArtists(listenerId, action.payload);
    const currentRecommendedArtists: Array<ArtistInfoResponseData> = yield select(listenerSelectors.recommendedArtists);
    const recommendedArtists: Array<ArtistInfoResponseData> = (currentRecommendedArtists || []).concat(...response.recommendedArtists);
    yield put(listenerActions.loadMoreRecommendedArtistsSuccess({
      recommendedArtists: recommendedArtists,
      isMoreRecommendedArtistsForLoading: response.isMoreRecommendedArtistsForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.loadMoreRecommendedArtistsFailed({ error }));
  }
}

function* saveGetStartedResults(action: SaveGetStartedResultsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ListenerService.saveGetStartedResults(listenerId, action.payload);
    yield put(listenerActions.saveGetStartedResultsSuccess());
    yield put(listenerActions.getHomePageContent({
      forceUpdate: true
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.saveGetStartedResultsFailed({ error }));
  }
}

function* getUserCreditCards(action: GetUserCreditCardsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: Array<UserCreditCardInfo> = yield ListenerService.getUserCreditCards(listenerId);
    yield put(listenerActions.getUserCreditCardsSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.getUserCreditCardsFailed({ error }));
  }
}

function* changeSubscription(action: ChangeSubscriptionStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ListenerService.changeSubscription(listenerId, action.payload);
    yield put(listenerActions.changeSubscriptionSuccess());
    yield put(listenerActions.getListenerById(listenerId));
    yield put(listenerActions.getUserCreditCards());
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.changeSubscriptionFailed({ error }));
  }
}

function* deleteUserCreditCard(action: DeleteUserCreditCardStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ListenerService.deleteUserCreditCard(listenerId, action.payload);
    yield put(listenerActions.deleteUserCreditCardSuccess());;
  } catch (e) {
    const error = e as AxiosError;
    yield put(listenerActions.deleteUserCreditCardFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}