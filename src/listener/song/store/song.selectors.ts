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
const isEditPlaylistModalOpen = createSelector(songState, song => song?.isEditPlaylistModalOpen);
const playlistIds = createSelector(songState, song => song?.playlistIds);
const isPlaylistIdsLoading = createSelector(songState, song => song?.isPlaylistIdsLoading);
const editPlaylistsSongId = createSelector(songState, song => song?.editPlaylistsSongId);
const editPlaylistsSongPlaylistIds = createSelector(songState, song => song?.editPlaylistsSongPlaylistIds);
const backgroundColor = createSelector(songState, album => album?.backgroundColor);
const lyricsBackgroundShadow = createSelector(songState, album => album?.lyricsBackgroundShadow);
const songs = createSelector(songState, song => song?.songs);
const isSongsLoading = createSelector(songState, album => album?.isSongsLoading);
const isMoreSongsForLoading = createSelector(songState, album => album?.isMoreSongsForLoading);

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
  isEditPlaylistModalOpen,
  playlistIds,
  isPlaylistIdsLoading,
  editPlaylistsSongId,
  editPlaylistsSongPlaylistIds,
  backgroundColor,
  lyricsBackgroundShadow,
  songs,
  isSongsLoading,
  isMoreSongsForLoading
};