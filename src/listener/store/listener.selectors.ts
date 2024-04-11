import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const listenerState = (state: InitialState) => state.listener;

const isListenerLoading = createSelector(listenerState, listener => listener?.isListenerLoading);
const name = createSelector(listenerState, listener => listener?.name);
const backgroundColor = createSelector(listenerState, album => album?.backgroundColor);
const profileImageUrl = createSelector(listenerState, album => album?.profileImageUrl);
const mostVisitedContent = createSelector(listenerState, album => album?.mostVisitedContent);
const isMostVisitedContentLoading = createSelector(listenerState, album => album?.isMostVisitedContentLoading);
const homePageContent = createSelector(listenerState, album => album?.homePageContent);
const isHomePageContentLoading = createSelector(listenerState, album => album?.isHomePageContentLoading);
const isEditProfileLoading = createSelector(listenerState, album => album?.isEditProfileLoading);
const isEditProfileModalOpen = createSelector(listenerState, album => album?.isEditProfileModalOpen);
const subscription = createSelector(listenerState, album => album?.subscription);
const isAccountContentCountLoading = createSelector(listenerState, album => album?.isAccountContentCountLoading);
const playlistCount = createSelector(listenerState, album => album?.playlistCount);
const followedArtistsCount = createSelector(listenerState, album => album?.followedArtistsCount);
const likedAlbumsCount = createSelector(listenerState, album => album?.likedAlbumsCount);
const isGetStartedModalOpen = createSelector(listenerState, album => album?.isGetStartedModalOpen);
const recommendedGenres = createSelector(listenerState, album => album?.recommendedGenres);
const otherGenres = createSelector(listenerState, album => album?.otherGenres);
const isExistingGenresLoading = createSelector(listenerState, album => album?.isExistingGenresLoading);
const recommendedArtists = createSelector(listenerState, album => album?.recommendedArtists);
const isRecommendedArtistsLoading = createSelector(listenerState, album => album?.isRecommendedArtistsLoading);
const isMoreRecommendedArtistsForLoading = createSelector(listenerState, album => album?.isMoreRecommendedArtistsForLoading);
const getStartedCompleted = createSelector(listenerState, album => album?.getStartedCompleted);
const isSaveGetStartedResultsLoading = createSelector(listenerState, album => album?.isSaveGetStartedResultsLoading);

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
  isSaveGetStartedResultsLoading
};