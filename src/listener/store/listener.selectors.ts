import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const listenerState = (state: InitialState) => state.listener;

const isListenerLoading = createSelector(listenerState, listener => listener?.isListenerLoading);
const name = createSelector(listenerState, listener => listener?.name);
const backgroundColor = createSelector(listenerState, album => album?.backgroundColor);
const profileImageUrl = createSelector(listenerState, album => album?.profileImageUrl);

export const listenerSelectors = {
  isListenerLoading,
  name,
  backgroundColor,
  profileImageUrl
};