import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  ArtistProfileActionTypes,
  ArtistProfileInfoResponseData,
  ChangeSubscriptionRequestData,
  EditProfileRequestData,
} from "./artist-profile.model";

export type GetArtistProfileByIdStartActionType = {
  type: typeof ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID;
  payload: string;
};

export type GetArtistProfileByIdSuccessActionType = {
  type: typeof ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_SUCCESS;
  payload: ArtistProfileInfoResponseData;
};

export type GetArtistProfileByIdFailedActionType = {
  type: typeof ArtistProfileActionTypes.GET_ARTIS_PROFILE_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type OpenEditProfileModalActionType = {
  type: typeof ArtistProfileActionTypes.OPEN_EDIT_PROFILE_MODAL;
  payload: undefined;
};

export type CloseEditProfileModalActionType = {
  type: typeof ArtistProfileActionTypes.CLOSE_EDIT_PROFILE_MODAL;
  payload: undefined;
};

export type EditProfileStartActionType = {
  type: typeof ArtistProfileActionTypes.EDIT_PROFILE;
  payload: EditProfileRequestData;
};

export type EditProfileSuccessActionType = {
  type: typeof ArtistProfileActionTypes.EDIT_PROFILE_SUCCESS;
  payload: undefined;
};

export type EditProfileFailedActionType = {
  type: typeof ArtistProfileActionTypes.EDIT_PROFILE_FAILED;
  payload: ActionFailedError;
};

export type OpenChangeSubscriptionModalActionType = {
  type: typeof ArtistProfileActionTypes.OPEN_CHANGE_SUBSCRIPTION_MODAL;
  payload: undefined;
};

export type CloseChangeSubscriptionModalActionType = {
  type: typeof ArtistProfileActionTypes.CLOSE_CHANGE_SUBSCRIPTION_MODAL;
  payload: undefined;
};

export type ChangeSubscriptionStartActionType = {
  type: typeof ArtistProfileActionTypes.CHANGE_SUBSCRIPTION;
  payload: ChangeSubscriptionRequestData;
};

export type ChangeSubscriptionSuccessActionType = {
  type: typeof ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_SUCCESS;
  payload: undefined;
};

export type ChangeSubscriptionFailedActionType = {
  type: typeof ArtistProfileActionTypes.CHANGE_SUBSCRIPTION_FAILED;
  payload: ActionFailedError;
};

export type ArtistProfileActions =
  | GetArtistProfileByIdStartActionType
  | GetArtistProfileByIdSuccessActionType
  | GetArtistProfileByIdFailedActionType
  | OpenEditProfileModalActionType
  | CloseEditProfileModalActionType
  | EditProfileStartActionType
  | EditProfileSuccessActionType
  | EditProfileFailedActionType
  | OpenChangeSubscriptionModalActionType
  | CloseChangeSubscriptionModalActionType
  | ChangeSubscriptionStartActionType
  | ChangeSubscriptionSuccessActionType
  | ChangeSubscriptionFailedActionType;