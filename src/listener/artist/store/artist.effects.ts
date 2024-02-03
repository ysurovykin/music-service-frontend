import { put, takeEvery } from 'redux-saga/effects'
import { ArtistActionTypes, ArtistFullResponseDataType, ArtistInfoResponseDataType } from './artist.model';
import ArtistService from './artist.service';
import { artistActions } from './artist.actions';
import { ErrorActionType } from '../../../helpers/react/redux.helper';
import { GetArtistByIdStartActionType } from './artist.actions.types';

export const artistEffects = [
  takeEvery(ArtistActionTypes.GET_ARTISTS, getArtists),
  takeEvery(ArtistActionTypes.GET_ARTISTS_FAILED, handleError),
  takeEvery(ArtistActionTypes.GET_ARTIST_BY_ID, getArtistById),
  takeEvery(ArtistActionTypes.GET_ARTIST_BY_ID_FAILED, handleError)
];

function* getArtists() {
  try {
    const artists: Array<ArtistInfoResponseDataType> = yield ArtistService.getArtists();
    yield put(artistActions.getArtistsSuccess(artists));
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.getArtistsFailed({error}));
  }
}

function* getArtistById(action: GetArtistByIdStartActionType) {
  try {
    const artist: ArtistFullResponseDataType = yield ArtistService.getArtistById(action.payload);
    yield put(artistActions.getArtistByIdSuccess(artist));
  } catch (e) {
    const error = e as Error;
    yield put(artistActions.getArtistByIdFailed({error}));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}