import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const artistAlbumState = (state: InitialState) => state.artistAlbum;

const albumId = createSelector(artistAlbumState, album => album?.albumId);
const name = createSelector(artistAlbumState, album => album?.name);
const albums = createSelector(artistAlbumState, album => album?.albums);
const date = createSelector(artistAlbumState, album => album?.date);
const coverImageUrl = createSelector(artistAlbumState, album => album?.coverImageUrl);
const isAlbumDataLoading = createSelector(artistAlbumState, album => album?.isAlbumDataLoading);
const isAlbumsLoading = createSelector(artistAlbumState, album => album?.isAlbumsLoading);
const isMoreAlbumsForLoading = createSelector(artistAlbumState, album => album?.isMoreAlbumsForLoading);
const backgroundColor = createSelector(artistAlbumState, album => album?.backgroundColor);
const songsCount = createSelector(artistAlbumState, album => album?.songsCount);
const songsTimeDuration = createSelector(artistAlbumState, album => album?.songsTimeDuration);
const isCreateAlbumModalOpen = createSelector(artistAlbumState, album => album?.isCreateAlbumModalOpen);
const isCreateAlbumLoading = createSelector(artistAlbumState, album => album?.isCreateAlbumLoading);
const isEditAlbumModalOpen = createSelector(artistAlbumState, album => album?.isEditAlbumModalOpen);
const isEditAlbumLoading = createSelector(artistAlbumState, album => album?.isEditAlbumLoading);
const hidden = createSelector(artistAlbumState, album => album.hidden);
const isHideAlbumLoading = createSelector(artistAlbumState, album => album.isHideAlbumLoading);
const isUnhideAlbumLoading = createSelector(artistAlbumState, album => album.isUnhideAlbumLoading);
const albumStats = createSelector(artistAlbumState, album => album.albumStats);
const isAlbumStatsLoading = createSelector(artistAlbumState, album => album.isAlbumStatsLoading);

export const artistAlbumSelectors = {
  albumId,
  name,
  albums,
  date,
  coverImageUrl,
  isAlbumDataLoading,
  isAlbumsLoading,
  isMoreAlbumsForLoading,
  backgroundColor,
  songsCount,
  songsTimeDuration,
  isCreateAlbumModalOpen,
  isCreateAlbumLoading,
  isEditAlbumModalOpen,
  isEditAlbumLoading,
  hidden,
  isHideAlbumLoading,
  isUnhideAlbumLoading,
  albumStats,
  isAlbumStatsLoading
};