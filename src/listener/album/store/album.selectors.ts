import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const albumState = (state: InitialState) => state.album;

const albumId = createSelector(albumState, album => album?.albumId);
const name = createSelector(albumState, album => album?.name);
const albums = createSelector(albumState, album => album?.albums);
const albumsArtistAppearsIn = createSelector(albumState, album => album?.albumsArtistAppearsIn);
const artist = createSelector(albumState, album => album?.artist);
const date = createSelector(albumState, album => album?.date);
const coverImageUrl = createSelector(albumState, album => album?.coverImageUrl);
const isAlbumDataLoading = createSelector(albumState, album => album?.isAlbumDataLoading);
const isAlbumsLoading = createSelector(albumState, album => album?.isAlbumsLoading);
const isAlbumsArtistAppearsInLoading = createSelector(albumState, album => album?.isAlbumsArtistAppearsInLoading);
const backgroundColor = createSelector(albumState, album => album?.backgroundColor);
const lyricsBackgroundShadow = createSelector(albumState, album => album?.lyricsBackgroundShadow);
const isAddedToLibrary = createSelector(albumState, album => album?.isAddedToLibrary);
const songsCount = createSelector(albumState, album => album?.songsCount);
const songsTimeDuration = createSelector(albumState, album => album?.songsTimeDuration);

export const albumSelectors = {
  albumId,
  name,
  albums,
  albumsArtistAppearsIn,
  artist,
  date,
  coverImageUrl,
  isAlbumDataLoading,
  isAlbumsLoading,
  isAlbumsArtistAppearsInLoading,
  backgroundColor,
  lyricsBackgroundShadow,
  isAddedToLibrary,
  songsCount,
  songsTimeDuration
};