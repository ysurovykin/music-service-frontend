import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  GetArtistProfileByIdStartActionType,
  GetArtistProfileByIdSuccessActionType,
  GetArtistProfileByIdFailedActionType,
  OpenEditProfileModalActionType,
  CloseEditProfileModalActionType,
  EditProfileStartActionType,
  EditProfileSuccessActionType,
  EditProfileFailedActionType,
  OpenChangeSubscriptionModalActionType,
  CloseChangeSubscriptionModalActionType,
  ChangeSubscriptionStartActionType,
  ChangeSubscriptionSuccessActionType,
  ChangeSubscriptionFailedActionType
} from "./artist-profile.actions.types";
import {
  ArtistProfileActionTypes,
  ArtistProfileInfoResponseData,
  ChangeSubscriptionRequestData,
  EditProfileRequestData,
} from "./artist-profile.model"

export const getArtistProfileByIdStartAction = (artistId: string):
  GetArtistProfileByIdStartActionType => ({ type: ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID, payload: artistId });

export const getArtistProfileByIdSuccessAction = (response: ArtistProfileInfoResponseData):
  GetArtistProfileByIdSuccessActionType => ({ type: ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_SUCCESS, payload: response });

export const getArtistProfileByIdFailedAction = (error: ActionFailedError):
  GetArtistProfileByIdFailedActionType => ({ type: ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_FAILED, payload: error });

  export const openEditProfileModalAction = ():
  OpenEditProfileModalActionType => ({ type: ArtistProfileActionTypes.OPEN_EDIT_PROFILE_MODAL, payload: undefined });

export const closeEditProfileModalAction = ():
  CloseEditProfileModalActionType => ({ type: ArtistProfileActionTypes.CLOSE_EDIT_PROFILE_MODAL, payload: undefined });

export const editProfileStartAction = (request: EditProfileRequestData):
  EditProfileStartActionType => ({ type: ArtistProfileActionTypes.EDIT_PROFILE, payload: request });

export const editProfileSuccessAction = ():
  EditProfileSuccessActionType => ({ type: ArtistProfileActionTypes.EDIT_PROFILE_SUCCESS, payload: undefined });

export const editProfileFailedAction = (error: ActionFailedError):
  EditProfileFailedActionType => ({ type: ArtistProfileActionTypes.EDIT_PROFILE_FAILED, payload: error });

export const openChangeSubscriptionModalAction = ():
  OpenChangeSubscriptionModalActionType => ({ type: ArtistProfileActionTypes.OPEN_CHANGE_SUBSCRIPTION_MODAL, payload: undefined });

export const closeChangeSubscriptionModalAction = ():
  CloseChangeSubscriptionModalActionType => ({ type: ArtistProfileActionTypes.CLOSE_CHANGE_SUBSCRIPTION_MODAL, payload: undefined });

export const changeSubscriptionStartAction = (request: ChangeSubscriptionRequestData):
  ChangeSubscriptionStartActionType => ({ type: ArtistProfileActionTypes.CHANGE_SUBSCRIPTION, payload: request });

export const changeSubscriptionSuccessAction = ():
  ChangeSubscriptionSuccessActionType => ({ type: ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_SUCCESS, payload: undefined });

export const changeSubscriptionFailedAction = (error: ActionFailedError):
  ChangeSubscriptionFailedActionType => ({ type: ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_FAILED, payload: error });

export const artistProfileActions = {
  getArtistProfileById: (artistId: string) => getArtistProfileByIdStartAction(artistId),
  getArtistProfileByIdSuccess: (response: ArtistProfileInfoResponseData) => getArtistProfileByIdSuccessAction(response),
  getArtistProfileByIdFailed: (error: ActionFailedError) => getArtistProfileByIdFailedAction(error),
  openEditProfileModal: () => openEditProfileModalAction(),
  closeEditProfileModal: () => closeEditProfileModalAction(),
  editProfile: (request: EditProfileRequestData) => editProfileStartAction(request),
  editProfileSuccess: () => editProfileSuccessAction(),
  editProfileFailed: (error: ActionFailedError) => editProfileFailedAction(error),
  openChangeSubscriptionModal: () => openChangeSubscriptionModalAction(),
  closeChangeSubscriptionModal: () => closeChangeSubscriptionModalAction(),
  changeSubscription: (request: ChangeSubscriptionRequestData) => changeSubscriptionStartAction(request),
  changeSubscriptionSuccess: () => changeSubscriptionSuccessAction(),
  changeSubscriptionFailed: (error: ActionFailedError) => changeSubscriptionFailedAction(error),
}

