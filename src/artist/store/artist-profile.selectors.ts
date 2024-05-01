import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const artistProfileState = (state: InitialState) => state.artistProfile;

const isArtistProfileLoading = createSelector(artistProfileState, artistProfile => artistProfile?.isArtistProfileLoading);
const name = createSelector(artistProfileState, artistProfile => artistProfile?.name);
const backgroundColor = createSelector(artistProfileState, artistProfile => artistProfile?.backgroundColor);
const profileImageUrl = createSelector(artistProfileState, artistProfile => artistProfile?.profileImageUrl);
const subscription = createSelector(artistProfileState, artistProfile => artistProfile?.subscription);
const subscriptionCanceledAtDate = createSelector(artistProfileState, artistProfile => artistProfile?.subscriptionCanceledAtDate);
const isSubscriptionChangingLoading = createSelector(artistProfileState, artistProfile => artistProfile?.isSubscriptionChangingLoading);
const isChangeSubscriptionModalOpen = createSelector(artistProfileState, artistProfile => artistProfile?.isChangeSubscriptionModalOpen);
const isEditProfileModalOpen = createSelector(artistProfileState, artistProfile => artistProfile?.isEditProfileModalOpen);
const isEditProfileLoading = createSelector(artistProfileState, artistProfile => artistProfile?.isEditProfileLoading);

export const artistProfileSelectors = {
  isArtistProfileLoading,
  name,
  backgroundColor,
  profileImageUrl,
  subscription,
  subscriptionCanceledAtDate,
  isSubscriptionChangingLoading,
  isChangeSubscriptionModalOpen,
  isEditProfileModalOpen,
  isEditProfileLoading,
};