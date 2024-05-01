import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const userState = (state: InitialState) => state.user;

const email = createSelector(userState, user => user?.email);
const birthDate = createSelector(userState, user => user?.birthDate);
const country = createSelector(userState, user => user?.country);
const gender = createSelector(userState, user => user?.gender);
const isAuthorizationLoading = createSelector(userState, user => user?.isAuthorizationLoading);
const name = createSelector(userState, user => user?.name);
const userId = createSelector(userState, user => user?.userId);
const profileType = createSelector(userState, user => user?.profileType);
const hasListenerProfile = createSelector(userState, user => user?.hasListenerProfile);
const hasArtistProfile = createSelector(userState, user => user?.hasArtistProfile);
const userCreditCards = createSelector(userState, user => user?.userCreditCards);
const isGetUserCreditCardsLoading = createSelector(userState, user => user?.isGetUserCreditCardsLoading);

export const userSelectors = {
  email,
  birthDate,
  country,
  gender,
  isAuthorizationLoading,
  name,
  userId,
  profileType,
  hasListenerProfile,
  hasArtistProfile,
  userCreditCards,
  isGetUserCreditCardsLoading,
};