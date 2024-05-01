import { put, select, takeEvery } from 'redux-saga/effects'
import { ArtistProfileActionTypes, ArtistProfileInfoResponseData } from './artist-profile.model';
import {
  ChangeSubscriptionStartActionType,
  EditProfileStartActionType,
  GetArtistProfileByIdStartActionType,
} from './artist-profile.actions.types';
import ArtistProfileService from './artist-profile.service';
import { artistProfileActions } from './artist-profile.actions';
import { ErrorActionType, getErrorMessage, showNotification } from '../../helpers/react/redux.helper';
import { AxiosError } from 'axios';
import { userSelectors } from '../../user/store/user.selectors';
import { userActions } from '../../user/store/user.actions';

export const artistProfileEffects = [
  takeEvery(ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID, getArtistProfileById),
  takeEvery(ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_FAILED, handleError),
  takeEvery(ArtistProfileActionTypes.EDIT_PROFILE, editProfile),
  takeEvery(ArtistProfileActionTypes.EDIT_PROFILE_FAILED, handleError),
  takeEvery(ArtistProfileActionTypes.CHANGE_SUBSCRIPTION, changeSubscription),
  takeEvery(ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_FAILED, handleError),
];

function* getArtistProfileById(action: GetArtistProfileByIdStartActionType) {
  try {
    const artistProfileResponseData: ArtistProfileInfoResponseData = yield ArtistProfileService.getArtistProfileById(action.payload);
    yield put(artistProfileActions.getArtistProfileByIdSuccess(artistProfileResponseData));
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistProfileActions.getArtistProfileByIdFailed({ error }));
  }
}

function* editProfile(action: EditProfileStartActionType) {
  try {
    const artistProfileId: string = yield select(userSelectors.userId);
    const formData = new FormData();
    if (action.payload.profileImage) {
      formData.append('image', action.payload.profileImage);
    }
    formData.append('name', action.payload.name.trim());
    yield ArtistProfileService.editProfile(artistProfileId, formData);

    yield put(artistProfileActions.editProfileSuccess());
    yield put(artistProfileActions.getArtistProfileById(artistProfileId));
    yield showNotification('success', 'Profile successfully edited');
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistProfileActions.editProfileFailed({ error }));
  }
}

function* changeSubscription(action: ChangeSubscriptionStartActionType) {
  try {
    const artistProfileId: string = yield select(userSelectors.userId);
    yield ArtistProfileService.changeSubscription(artistProfileId, action.payload);
    yield put(artistProfileActions.changeSubscriptionSuccess());
    yield put(artistProfileActions.getArtistProfileById(artistProfileId));
    yield put(userActions.getUserCreditCards());
    yield showNotification('success', 'Subscription successfully changed');
  } catch (e) {
    const error = e as AxiosError;
    yield put(artistProfileActions.changeSubscriptionFailed({ error }));
  }
}

function* handleError(action: ErrorActionType) {
  yield showNotification('error', (getErrorMessage(action.payload.error)));
}