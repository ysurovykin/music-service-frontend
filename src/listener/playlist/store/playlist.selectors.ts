import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const playlistState = (state: InitialState) => state.playlist;

const playlistId = createSelector(playlistState, playlist => playlist?.playlistId);
const name = createSelector(playlistState, playlist => playlist?.name);
const playlists = createSelector(playlistState, playlist => playlist?.playlists);
const date = createSelector(playlistState, playlist => playlist?.date);
const coverImageUrl = createSelector(playlistState, playlist => playlist?.coverImageUrl);
const tag = createSelector(playlistState, playlist => playlist?.tag);
const isPlaylistDataLoading = createSelector(playlistState, playlist => playlist?.isPlaylistDataLoading);
const isPlaylistsLoading = createSelector(playlistState, playlist => playlist?.isPlaylistsLoading);
const songs = createSelector(playlistState, playlist => playlist?.songs);
const backgroundColor = createSelector(playlistState, album => album?.backgroundColor);

export const playlistSelectors = {
  playlistId,
  name,
  playlists,
  date,
  coverImageUrl,
  tag,
  isPlaylistDataLoading,
  isPlaylistsLoading,
  songs,
  backgroundColor
};