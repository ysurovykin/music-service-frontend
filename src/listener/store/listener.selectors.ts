import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const listenerState = (state: InitialState) => state.listener;

const isListenerLoading = createSelector(listenerState, listener => listener?.isListenerLoading);
const name = createSelector(listenerState, listener => listener?.name);
const volume = createSelector(listenerState, listener => listener?.volume);
const shuffleEnabled = createSelector(listenerState, listener => listener?.shuffleEnabled);
const repeatSongState = createSelector(listenerState, listener => listener?.repeatSongState);
const songId = createSelector(listenerState, listener => listener?.songId);
const songsQueue = createSelector(listenerState, listener => listener?.songsQueue);
const playTime = createSelector(listenerState, listener => listener?.playTime);
const songIndex = createSelector(listenerState, listener => listener?.songIndex);

export const listenerSelectors = {
  isListenerLoading,
  name,
  volume,
  shuffleEnabled,
  repeatSongState,
  songId,
  songsQueue,
  playTime,
  songIndex
};