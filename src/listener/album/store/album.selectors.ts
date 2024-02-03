import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const albumState = (state: InitialState) => state.album;

const albumId = createSelector(albumState, album => album?.albumId);
const name = createSelector(albumState, album => album?.name);
const albums = createSelector(albumState, album => album?.albums);
const artist = createSelector(albumState, album => album?.artist);
const date = createSelector(albumState, album => album?.date);
const downloadUrl = createSelector(albumState, album => album?.downloadUrl);
const likes = createSelector(albumState, album => album?.likes);
const isAlbumDataLoading = createSelector(albumState, album => album?.isAlbumDataLoading);
const isAlbumsLoading = createSelector(albumState, album => album?.isAlbumsLoading);
const songs = createSelector(albumState, album => album?.songs);

export const albumSelectors = {
  albumId,
  name,
  albums,
  artist,
  date,
  downloadUrl,
  likes,
  isAlbumDataLoading,
  isAlbumsLoading,
  songs
};