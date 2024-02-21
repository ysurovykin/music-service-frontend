import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const songState = (state: InitialState) => state.song;

const name = createSelector(songState, song => song?.name);
const artists = createSelector(songState, song => song?.artists);
const songId = createSelector(songState, song => song?.songId);
const album = createSelector(songState, song => song?.album);
const plays = createSelector(songState, song => song?.plays);
const date = createSelector(songState, song => song?.date);
const coverImageUrl = createSelector(songState, song => song?.coverImageUrl);
const songUrl = createSelector(songState, song => song?.songUrl);
const isSongDataLoading = createSelector(songState, song => song?.isSongDataLoading);
const isPlaying = createSelector(songState, song => song?.isPlaying);
const duration = createSelector(songState, song => song?.duration);
const songsQueue = createSelector(songState, song => song?.songsQueue);
const songIndex = createSelector(songState, song => song?.songIndex);
const isEditPlaylistModalOpen = createSelector(songState, song => song?.isEditPlaylistModalOpen);
const playlistIds = createSelector(songState, song => song?.playlistIds);
const isPlaylistIdsLoading = createSelector(songState, song => song?.isPlaylistIdsLoading);
const editPlaylistsSongId = createSelector(songState, song => song?.editPlaylistsSongId);
const backgroundColor = createSelector(songState, album => album?.backgroundColor);
const backgroundShadow = createSelector(songState, album => album?.backgroundShadow);

export const songSelectors = {
  name,
  artists,
  songId,
  album,
  plays,
  date,
  coverImageUrl,
  songUrl,
  isSongDataLoading,
  isPlaying,
  duration,
  songsQueue,
  songIndex,
  isEditPlaylistModalOpen,
  playlistIds,
  isPlaylistIdsLoading,
  editPlaylistsSongId,
  backgroundColor,
  backgroundShadow
};