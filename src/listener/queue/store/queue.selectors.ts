import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const queueState = (state: InitialState) => state.queue;

const queue = createSelector(queueState, queue => queue?.queue);
const songQueueId = createSelector(queueState, queue => queue?.songQueueId);
const isQueueLoading = createSelector(queueState, queue => queue?.isQueueLoading);
const isMoreSongsForwardForLoading = createSelector(queueState, queue => queue?.isMoreSongsForwardForLoading);
const isMoreSongsBehindForLoading = createSelector(queueState, queue => queue?.isMoreSongsBehindForLoading);
const isPlaying = createSelector(queueState, song => song?.isPlaying);

export const queueSelectors = {
  queue,
  songQueueId,
  isQueueLoading,
  isMoreSongsForwardForLoading,
  isMoreSongsBehindForLoading,
  isPlaying
};