import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const songState = (state: InitialState) => state.song;

const isEditPlaylistModalOpen = createSelector(songState, song => song?.isEditPlaylistModalOpen);
const isPlaylistIdsLoading = createSelector(songState, song => song?.isPlaylistIdsLoading);
const editPlaylistsSongId = createSelector(songState, song => song?.editPlaylistsSongId);
const editPlaylistsSongPlaylistIds = createSelector(songState, song => song?.editPlaylistsSongPlaylistIds);
const songs = createSelector(songState, song => song?.songs);
const isSongsLoading = createSelector(songState, album => album?.isSongsLoading);
const isMoreSongsForLoading = createSelector(songState, album => album?.isMoreSongsForLoading);

export const songSelectors = {
  isEditPlaylistModalOpen,
  isPlaylistIdsLoading,
  editPlaylistsSongId,
  editPlaylistsSongPlaylistIds,
  songs,
  isSongsLoading,
  isMoreSongsForLoading
};