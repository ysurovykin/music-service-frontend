import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const songState = (state: InitialState) => state.song;

const name = createSelector(songState, song => song?.name);
const artists = createSelector(songState, song => song?.artists);
const songId = createSelector(songState, song => song?.songId);
const album = createSelector(songState, song => song?.album);
const plays = createSelector(songState, song => song?.plays);
const date = createSelector(songState, song => song?.date);
const coverImageurl = createSelector(songState, song => song?.coverImageurl);
const songUrl = createSelector(songState, song => song?.songUrl);
const songsQueue = createSelector(songState, song => song?.songsQueue);
const isSongsQueueLoading = createSelector(songState, song => song?.isSongsQueueLoading);
const isSongDataLoading = createSelector(songState, song => song?.isSongDataLoading);
const isPlaying = createSelector(songState, song => song?.isPlaying);

export const songSelectors = {
  name,
  artists,
  songId,
  album,
  plays,
  date,
  coverImageurl,
  songUrl,
  songsQueue,
  isSongsQueueLoading,
  isSongDataLoading,
  isPlaying
};