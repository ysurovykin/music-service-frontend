import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const listenerState = (state: InitialState) => state.listener;

const isListenerLoading = createSelector(listenerState, listener => listener?.isListenerLoading);
const name = createSelector(listenerState, listener => listener?.name);
const backgroundColor = createSelector(listenerState, listener => listener?.backgroundColor);
const profileImageUrl = createSelector(listenerState, listener => listener?.profileImageUrl);
const mostVisitedContent = createSelector(listenerState, listener => listener?.mostVisitedContent);
const isMostVisitedContentLoading = createSelector(listenerState, listener => listener?.isMostVisitedContentLoading);
const homePageContent = createSelector(listenerState, listener => listener?.homePageContent);
const isHomePageContentLoading = createSelector(listenerState, listener => listener?.isHomePageContentLoading);
const isEditProfileLoading = createSelector(listenerState, listener => listener?.isEditProfileLoading);
const isEditProfileModalOpen = createSelector(listenerState, listener => listener?.isEditProfileModalOpen);
const subscription = createSelector(listenerState, listener => listener?.subscription);
const isAccountContentCountLoading = createSelector(listenerState, listener => listener?.isAccountContentCountLoading);
const playlistCount = createSelector(listenerState, listener => listener?.playlistCount);
const followedArtistsCount = createSelector(listenerState, listener => listener?.followedArtistsCount);
const likedAlbumsCount = createSelector(listenerState, listener => listener?.likedAlbumsCount);
const isGetStartedModalOpen = createSelector(listenerState, listener => listener?.isGetStartedModalOpen);
const recommendedGenres = createSelector(listenerState, listener => listener?.recommendedGenres);
const otherGenres = createSelector(listenerState, listener => listener?.otherGenres);
const isExistingGenresLoading = createSelector(listenerState, listener => listener?.isExistingGenresLoading);
const recommendedArtists = createSelector(listenerState, listener => listener?.recommendedArtists);
const isRecommendedArtistsLoading = createSelector(listenerState, listener => listener?.isRecommendedArtistsLoading);
const isMoreRecommendedArtistsForLoading = createSelector(listenerState, listener => listener?.isMoreRecommendedArtistsForLoading);
const getStartedCompleted = createSelector(listenerState, listener => listener?.getStartedCompleted);
const isSaveGetStartedResultsLoading = createSelector(listenerState, listener => listener?.isSaveGetStartedResultsLoading);
const isChangeSubscriptionModalOpen = createSelector(listenerState, listener => listener?.isChangeSubscriptionModalOpen);
const isSubscriptionChangingLoading = createSelector(listenerState, listener => listener?.isSubscriptionChangingLoading);
const subscriptionCanceledAtDate = createSelector(listenerState, listener => listener?.subscriptionCanceledAtDate);

export const listenerSelectors = {
  isListenerLoading,
  name,
  backgroundColor,
  profileImageUrl,
  mostVisitedContent,
  isMostVisitedContentLoading,
  homePageContent,
  isHomePageContentLoading,
  isEditProfileLoading,
  isEditProfileModalOpen,
  subscription,
  isAccountContentCountLoading,
  playlistCount,
  followedArtistsCount,
  likedAlbumsCount,
  isGetStartedModalOpen,
  recommendedGenres,
  otherGenres,
  isExistingGenresLoading,
  recommendedArtists,
  isRecommendedArtistsLoading,
  isMoreRecommendedArtistsForLoading,
  getStartedCompleted,
  isSaveGetStartedResultsLoading,
  isChangeSubscriptionModalOpen,
  isSubscriptionChangingLoading,
  subscriptionCanceledAtDate,
};