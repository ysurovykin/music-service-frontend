import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const artistSongState = (state: InitialState) => state.artistSong;

const artistSongs = createSelector(artistSongState, artistSong => artistSong?.songs);
const isSongsLoading = createSelector(artistSongState, artistSong => artistSong?.isSongsLoading);
const isHideSongLoading = createSelector(artistSongState, artistSong => artistSong?.isHideSongLoading);
const isUnhideSongLoading = createSelector(artistSongState, artistSong => artistSong?.isUnhideSongLoading);
const isUploadSongLoading = createSelector(artistSongState, artistSong => artistSong?.isUploadSongLoading);
const isUploadSongModalOpen = createSelector(artistSongState, artistSong => artistSong?.isUploadSongModalOpen);

export const artistSongSelectors = {
  artistSongs,
  isSongsLoading,
  isHideSongLoading,
  isUnhideSongLoading,
  isUploadSongLoading,
  isUploadSongModalOpen,
};