import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const songState = (state: InitialState) => state.song;

const songs = createSelector(songState, song => song?.songs);
const isSongsLoading = createSelector(songState, song => song?.isSongsLoading);
const isMoreSongsForLoading = createSelector(songState, song => song?.isMoreSongsForLoading);

export const songSelectors = {
  songs,
  isSongsLoading,
  isMoreSongsForLoading
};