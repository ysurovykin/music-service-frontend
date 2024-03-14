import { put, select, takeEvery } from 'redux-saga/effects'
import { ArtistActionTypes, ArtistFullResponseData, ArtistGenres, ArtistInfoResponseData } from './artist.model';
import ArtistService from './artist.service';
import { artistActions } from './artist.actions';
import { ErrorActionType, showNotification } from '../../../helpers/react/redux.helper';
import { FollowArtistStartActionType, GetArtistByIdStartActionType, GetGenresStartActionType, GetMostRecentReleaseStartActionType, UnfollowArtistStartActionType } from './artist.actions.types';
import { userSelectors } from '../../../user/store/user.selectors';
import { AlbumFullResponseData } from '../../album/store/album.model';

export const artistEffects = [
  takeEvery(ArtistActionTypes.GET_ARTISTS, getArtists),
  takeEvery(ArtistActionTypes.GET_ARTISTS_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_ARTIST_BY_ID, getArtistById),
  takeEvery(ArtistActionTypes.GET_ARTIST_BY_ID_FAILED, handleError),
  takeEvery(ArtistActionTypes.FOLLOW_ARTIST, followArtist),
  takeEvery(ArtistActionTypes.FOLLOW_ARTIST_FAILED, handleError),
  takeEvery(ArtistActionTypes.UNFOLLOW_ARTIST, unfollowArtist),
  takeEvery(ArtistActionTypes.UNFOLLOW_ARTIST_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_GENRES, getGenres),
  takeEvery(ArtistActionTypes.GET_GENRES_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_MOST_RECENT_RELEASE, getMostRecentRelease),
  takeEvery(ArtistActionTypes.GET_MOST_RECENT_RELEASE_FAILED, handleError)
];

function* getArtists() {
  try {
    const artists: Array<ArtistInfoResponseData> = yield ArtistService.getArtists();
    yield put(artistActions.getArtistsSuccess(artists));
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.getArtistsFailed({ error }));
  }
}

function* getArtistById(action: GetArtistByIdStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const artist: ArtistFullResponseData = yield ArtistService.getArtistById(listenerId, action.payload);
    yield put(artistActions.getArtistByIdSuccess(artist));
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.getArtistByIdFailed({ error }));
  }
}

function* followArtist(action: FollowArtistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ArtistService.followArtist(listenerId, action.payload);
    yield put(artistActions.followArtistSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.followArtistFailed({ error }));
  }
}

function* unfollowArtist(action: UnfollowArtistStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    yield ArtistService.unfollowArtist(listenerId, action.payload);
    yield put(artistActions.unfollowArtistSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.unfollowArtistFailed({ error }));
  }
}

function* getGenres(action: GetGenresStartActionType) {
  try {
    const genres: Array<ArtistGenres> = yield ArtistService.getGenres(action.payload);
    yield put(artistActions.getGenresSuccess(genres));
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.getGenresFailed({ error }));
  }
}

function* getMostRecentRelease(action: GetMostRecentReleaseStartActionType) {
  try {
    const listenerId: string = yield select(userSelectors.userId);
    const mostRecentRelease: AlbumFullResponseData = yield ArtistService.getMostRecentRelease(listenerId, action.payload);
    yield put(artistActions.getMostRecentReleaseSuccess(mostRecentRelease));
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.getMostRecentReleaseFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', action.payload.error.message);
}