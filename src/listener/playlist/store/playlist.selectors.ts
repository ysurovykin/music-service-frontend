import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const playlistState = (state: InitialState) => state.playlist;

const playlistId = createSelector(playlistState, playlist => playlist?.playlistId);
const name = createSelector(playlistState, playlist => playlist?.name);
const playlists = createSelector(playlistState, playlist => playlist?.playlists);
const isPlaylistsInListenerLibraryLoading = createSelector(playlistState, playlist => playlist?.isPlaylistsInListenerLibraryLoading);
const playlistsInListenerLibrary = createSelector(playlistState, playlist => playlist?.playlistsInListenerLibrary);
const date = createSelector(playlistState, playlist => playlist?.date);
const coverImageUrl = createSelector(playlistState, playlist => playlist?.coverImageUrl);
const tag = createSelector(playlistState, playlist => playlist?.tag);
const isPlaylistDataLoading = createSelector(playlistState, playlist => playlist?.isPlaylistDataLoading);
const isPlaylistsLoading = createSelector(playlistState, playlist => playlist?.isPlaylistsLoading);
const backgroundColor = createSelector(playlistState, playlist => playlist?.backgroundColor);
const isCreatePlaylistModalOpen = createSelector(playlistState, playlist => playlist?.isCreatePlaylistModalOpen);
const isCreatePlaylistLoading = createSelector(playlistState, playlist => playlist?.isCreatePlaylistLoading);
const isEditSongPlaylistsModalOpen = createSelector(playlistState, playlist => playlist?.isEditSongPlaylistsModalOpen);
const isEditSongPlaylistsLoading = createSelector(playlistState, playlist => playlist?.isEditSongPlaylistsLoading);
const editPlaylistsSong = createSelector(playlistState, playlist => playlist?.editPlaylistsSong);
const isEditPlaylistLoading = createSelector(playlistState, playlist => playlist?.isEditPlaylistLoading);
const isEditPlaylistModalOpen = createSelector(playlistState, playlist => playlist?.isEditPlaylistModalOpen);
const editable = createSelector(playlistState, playlist => playlist?.editable);
const pinned = createSelector(playlistState, playlist => playlist?.pinned);
const songsCount = createSelector(playlistState, playlist => playlist?.songsCount);
const songsTimeDuration = createSelector(playlistState, playlist => playlist?.songsTimeDuration);

export const playlistSelectors = {
  playlistId,
  name,
  playlists,
  isPlaylistsInListenerLibraryLoading,
  playlistsInListenerLibrary,
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
  editPlaylistsSong,
  isEditPlaylistLoading,
  isEditPlaylistModalOpen,
  editable,
  pinned,
  songsCount,
  songsTimeDuration
};