import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const queueState = (state: InitialState) => state.queue;

const queue = createSelector(queueState, queue => queue?.queue);
const isQueueLoading = createSelector(queueState, queue => queue?.isQueueLoading);
const isMoreSongsForwardForLoading = createSelector(queueState, queue => queue?.isMoreSongsForwardForLoading);
const isMoreSongsBehindForLoading = createSelector(queueState, queue => queue?.isMoreSongsBehindForLoading);

export const queueSelectors = {
  queue,
  isQueueLoading,
  isMoreSongsForwardForLoading,
  isMoreSongsBehindForLoading,
};