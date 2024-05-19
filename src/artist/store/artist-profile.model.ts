export const artistProfileState: ArtistProfileState = {
  isArtistProfileLoading: undefined,
  name: undefined,
  profileImageUrl: undefined,
  backgroundColor: undefined,
  subscription: undefined,
  subscriptionCanceledAtDate: undefined,
  isChangeSubscriptionModalOpen: undefined,
  isSubscriptionChangingLoading: undefined,
  isEditProfileModalOpen: undefined,
  isEditProfileLoading: undefined,
  isArtistStatsLoading: undefined,
  generalStats: undefined,
  advancedStats: undefined,
};

export interface ArtistProfileState {
  isArtistProfileLoading?: boolean;
  name?: string;
  profileImageUrl?: string;
  backgroundColor?: string;
  subscription?: string;
  subscriptionCanceledAtDate?: string;
  isChangeSubscriptionModalOpen?: boolean;
  isSubscriptionChangingLoading?: boolean;
  isEditProfileModalOpen?: boolean;
  isEditProfileLoading?: boolean;
  isArtistStatsLoading?: boolean;
  generalStats?: ArtistGeneralStats;
  advancedStats?: ArtistAdvancedStats;
}

export type ArtistProfileInfoResponseData = {
  artistProfileId: string;
  name: string;
  profileImageUrl: string;
  backgroundColor: string;
  subscription: string;
  subscriptionCanceledAtDate: string;
}

export type EditProfileRequestData = {
  name: string;
  profileImage?: Blob;
}

export type CardDetails = {
  holderName: string;
  number: string;
  date: string;
  cvv: string;
}

export type ChangeSubscriptionRequestData = {
  subscription: string;
  cardId?: string; //if cardDetails is undefined
  cardDetails?: CardDetails; //if cardId is undefined
  profileType: string;
}

export type ArtistGeneralStats = {
  followers?: number;
  listeners?: number;
  songsCount?: number;
  songsDuration?: number;
  likes?: number;
}

export type ArtistAdvancedStats = {
  plays?: number;
  playsDynamics?: string;
  songRadios?: number;
  songGuessers?: number;
}

export type ArtistStatsResponseData = {
  generalStats?: ArtistGeneralStats;
  advancedStats?: ArtistAdvancedStats;
}

export enum ArtistProfileActionTypes {
  GET_ARTIS_PROFILE_BY_ID = "ARTIS_PROFILE.GET_ARTIS_PROFILE_BY_ID_START",
  GET_ARTIS_PROFILE_BY_ID_SUCCESS = "ARTIS_PROFILE.GET_ARTIS_PROFILE_BY_ID_SUCCESS",
  GET_ARTIS_PROFILE_BY_ID_FAILED = "ARTIS_PROFILE.GET_ARTIS_PROFILE_BY_ID_FAILED",

  OPEN_CHANGE_SUBSCRIPTION_MODAL = "ARTIS_PROFILE.OPEN_CHANGE_SUBSCRIPTION_MODAL",
  CLOSE_CHANGE_SUBSCRIPTION_MODAL = "ARTIS_PROFILE.CLOSE_CHANGE_SUBSCRIPTION_MODAL",

  CHANGE_SUBSCRIPTION = "ARTIS_PROFILE.CHANGE_SUBSCRIPTION_START",
  CHANGE_SUBSCRIPTION_SUCCESS = "ARTIS_PROFILE.CHANGE_SUBSCRIPTION_SUCCESS",
  CHANGE_SUBSCRIPTION_FAILED = "ARTIS_PROFILE.CHANGE_SUBSCRIPTION_FAILED",

  OPEN_EDIT_PROFILE_MODAL = "ARTIS_PROFILE.OPEN_EDIT_PROFILE_MODAL",
  CLOSE_EDIT_PROFILE_MODAL = "ARTIS_PROFILE.CLOSE_EDIT_PROFILE_MODAL",

  EDIT_PROFILE = "ARTIS_PROFILE.EDIT_PROFILE_START",
  EDIT_PROFILE_SUCCESS = "ARTIS_PROFILE.EDIT_PROFILE_SUCCESS",
  EDIT_PROFILE_FAILED = "ARTIS_PROFILE.EDIT_PROFILE_FAILED",

  GET_ARTIS_STATS = "ARTIS_PROFILE.GET_ARTIS_STATS_START",
  GET_ARTIS_STATS_SUCCESS = "ARTIS_PROFILE.GET_ARTIS_STATS_SUCCESS",
  GET_ARTIS_STATS_FAILED = "ARTIS_PROFILE.GET_ARTIS_STATS_FAILED",
};