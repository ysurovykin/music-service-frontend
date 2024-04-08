import { put, select, takeEvery } from 'redux-saga/effects'
import {
  ArtistActionTypes,
  ArtistFullResponseData,
  ArtistGenres,
  ArtistInfoResponseData,
  GetArtistsInListenerLibraryResponse,
  GetArtistsResponse,
  GetListenerTopArtistsThisMonthResponse
} from './artist.model';
import ArtistService from './artist.service';
import { artistActions } from './artist.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../../helpers/react/redux.helper';
import {
  FollowArtistStartActionType,
  GetArtistByIdStartActionType,
  GetArtistsInListenerLibraryStartActionType,
  GetArtistsStartActionType,
  GetFansAlsoLikeArtistsStartActionType,
  GetGenresStartActionType,
  GetListenerTopArtistsThisMonthStartActionType,
  GetMostRecentReleaseStartActionType,
  LoadMoreArtistsInListenerLibraryStartActionType,
  LoadMoreListenerTopArtistsThisMonthStartActionType,
  UnfollowArtistStartActionType
} from './artist.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { AlbumFullResponseData } from '../../album/store/album.model';
import { artistSelectors } from './artist.selectors';
import { AxiosError } from 'axios';

export const artistEffects = [
  takeEvery(ArtistActionTypes.GET_ARTISTS, getArtists),
  takeEvery(ArtistActionTypes.GET_ARTISTS_FAILED, handleError),
  takeEvery(ArtistActionTypes.LOAD_MORE_ARTISTS, loadMoreArtists),
  takeEvery(ArtistActionTypes.LOAD_MORE_ARTISTS_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_ARTIST_BY_ID, getArtistById),
  takeEvery(ArtistActionTypes.GET_ARTIST_BY_ID_FAILED, handleError),
  takeEvery(ArtistActionTypes.FOLLOW_ARTIST, followArtist),
  takeEvery(ArtistActionTypes.FOLLOW_ARTIST_FAILED, handleError),
  takeEvery(ArtistActionTypes.UNFOLLOW_ARTIST, unfollowArtist),
  takeEvery(ArtistActionTypes.UNFOLLOW_ARTIST_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_GENRES, getGenres),
  takeEvery(ArtistActionTypes.GET_GENRES_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_MOST_RECENT_RELEASE, getMostRecentRelease),
  takeEvery(ArtistActionTypes.GET_MOST_RECENT_RELEASE_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY, getArtistsInListenerLibrary),
  takeEvery(ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY_FAILED, handleError),
  takeEvery(ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY, loadMoreArtistsInListenerLibrary),
  takeEvery(ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH, getListenerTopArtistsThisMonth),
  takeEvery(ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED, handleError),
  takeEvery(ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH, loadMoreListenerTopArtistsThisMonth),
  takeEvery(ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS, getFansAlsoLikeArtists),
  takeEvery(ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS_FAILED, handleError),
];

function* getArtists(action: GetArtistsStartActionType) {
  try {
    const response: GetArtistsResponse = yield ArtistService.getArtists(action.payload);
    yield put(artistActions.getArtistsSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getArtistsFailed({ error }));
  }
}

function* loadMoreArtists(action: GetArtistsStartActionType) {
  try {
    const response: GetArtistsResponse = yield ArtistService.getArtists(action.payload);
    const currentArtists: Array<ArtistInfoResponseData> = yield select(artistSelectors.artists);
    const artists: Array<ArtistInfoResponseData> = (currentArtists || []).concat(...response.artists);
    yield put(artistActions.loadMoreArtistsSuccess({
      artists: artists,
      isMoreArtistsForLoading: response.isMoreArtistsForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.loadMoreArtistsFailed({ error }));
  }
}

function* getArtistById(action: GetArtistByIdStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const artist: ArtistFullResponseData = yield ArtistService.getArtistById(listenerId, action.payload);
    yield put(artistActions.getArtistByIdSuccess(artist));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getArtistByIdFailed({ error }));
  }
}

function* followArtist(action: FollowArtistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ArtistService.followArtist(listenerId, action.payload);
    yield put(artistActions.followArtistSuccess());
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.followArtistFailed({ error }));
  }
}

function* unfollowArtist(action: UnfollowArtistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ArtistService.unfollowArtist(listenerId, action.payload);
    yield put(artistActions.unfollowArtistSuccess());
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.unfollowArtistFailed({ error }));
  }
}

function* getGenres(action: GetGenresStartActionType) {
  try {
    const genres: Array<ArtistGenres> = yield ArtistService.getGenres(action.payload);
    yield put(artistActions.getGenresSuccess(genres));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getGenresFailed({ error }));
  }
}

function* getMostRecentRelease(action: GetMostRecentReleaseStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const mostRecentRelease: AlbumFullResponseData = yield ArtistService.getMostRecentRelease(listenerId, action.payload);
    yield put(artistActions.getMostRecentReleaseSuccess(mostRecentRelease));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getMostRecentReleaseFailed({ error }));
  }
}

function* getArtistsInListenerLibrary(action: GetArtistsInListenerLibraryStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetArtistsInListenerLibraryResponse = yield ArtistService.getArtistsInListenerLibrary(listenerId, action.payload);
    yield put(artistActions.getArtistsInListenerLibrarySuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getArtistsInListenerLibraryFailed({ error }));
  }
}

function* loadMoreArtistsInListenerLibrary(action: LoadMoreArtistsInListenerLibraryStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetArtistsInListenerLibraryResponse = yield ArtistService.getArtistsInListenerLibrary(listenerId, action.payload);
    const currentFollowedArtists: Array<ArtistInfoResponseData> = yield select(artistSelectors.followedArtists);
    const followedArtists: Array<ArtistInfoResponseData> = (currentFollowedArtists || []).concat(...response.followedArtists);
    yield put(artistActions.loadMoreArtistsInListenerLibrarySuccess({
      followedArtists: followedArtists,
      isMoreFollowedArtistsForLoading: response.isMoreFollowedArtistsForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.loadMoreArtistsInListenerLibraryFailed({ error }));
  }
}

function* getListenerTopArtistsThisMonth(action: GetListenerTopArtistsThisMonthStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetListenerTopArtistsThisMonthResponse = yield ArtistService.getListenerTopArtistsThisMonth(listenerId, action.payload);
    yield put(artistActions.getListenerTopArtistsThisMonthSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getListenerTopArtistsThisMonthFailed({ error }));
  }
}

function* loadMoreListenerTopArtistsThisMonth(action: LoadMoreListenerTopArtistsThisMonthStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: GetListenerTopArtistsThisMonthResponse = yield ArtistService.getListenerTopArtistsThisMonth(listenerId, action.payload);
    const currentTopArtistsThisMonth: Array<ArtistInfoResponseData> = yield select(artistSelectors.topArtistsThisMonth);
    const topArtistsThisMonth: Array<ArtistInfoResponseData> = (currentTopArtistsThisMonth || []).concat(...response.topArtistsThisMonth);
    yield put(artistActions.loadMoreListenerTopArtistsThisMonthSuccess({
      topArtistsThisMonth: topArtistsThisMonth,
      isMoreTopArtistsThisMonthForLoading: response.isMoreTopArtistsThisMonthForLoading
    }));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.loadMoreListenerTopArtistsThisMonthFailed({ error }));
  }
}

function* getFansAlsoLikeArtists(action: GetFansAlsoLikeArtistsStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const response: Array<ArtistInfoResponseData> = yield ArtistService.getFansAlsoLikeArtists(listenerId, action.payload);
    yield put(artistActions.getFansAlsoLikeArtistsSuccess(response));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistActions.getFansAlsoLikeArtistsFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}