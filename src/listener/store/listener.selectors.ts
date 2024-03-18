import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const listenerState = (state: InitialState) => state.listener;

const isListenerLoading = createSelector(listenerState, listener => listener?.isListenerLoading);
const name = createSelector(listenerState, listener => listener?.name);
const backgroundColor = createSelector(listenerState, album => album?.backgroundColor);
const profileImageUrl = createSelector(listenerState, album => album?.profileImageUrl);
const mostVisitedContent = createSelector(listenerState, album => album?.mostVisitedContent);
const isMostVisitedContentLoading = createSelector(listenerState, album => album?.isMostVisitedContentLoading);

export const listenerSelectors = {
  isListenerLoading,
  name,
  backgroundColor,
  profileImageUrl,
  mostVisitedContent,
  isMostVisitedContentLoading,
};