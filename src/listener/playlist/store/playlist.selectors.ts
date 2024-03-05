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
const backgroundColor = createSelector(playlistState, album => album?.backgroundColor);
const isCreatePlaylistModalOpen = createSelector(playlistState, playlist => playlist?.isCreatePlaylistModalOpen);
const isCreatePlaylistLoading = createSelector(playlistState, album => album?.isCreatePlaylistLoading);
const isEditSongPlaylistsModalOpen = createSelector(playlistState, song => song?.isEditSongPlaylistsModalOpen);
const isEditSongPlaylistsLoading = createSelector(playlistState, song => song?.isEditSongPlaylistsLoading);
const editPlaylistsSongId = createSelector(playlistState, song => song?.editPlaylistsSongId);
const editPlaylistsSongPlaylistIds = createSelector(playlistState, song => song?.editPlaylistsSongPlaylistIds);
const isEditPlaylistLoading = createSelector(playlistState, song => song?.isEditPlaylistLoading);
const isEditPlaylistModalOpen = createSelector(playlistState, song => song?.isEditPlaylistModalOpen);
const editable = createSelector(playlistState, song => song?.editable);

export const playlistSelectors = {
  playlistId,
  name,
  playlists,
  date,
  coverImageUrl,
  tag,
  isPlaylistDataLoading,
  isPlaylistsLoading,
  backgroundColor,
  isCreatePlaylistModalOpen,
  isCreatePlaylistLoading,
  isEditSongPlaylistsModalOpen,
  isEditSongPlaylistsLoading,
  editPlaylistsSongId,
  editPlaylistsSongPlaylistIds,
  isEditPlaylistLoading,
  isEditPlaylistModalOpen,
  editable
};