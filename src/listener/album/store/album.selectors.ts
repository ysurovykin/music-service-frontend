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
const isMoreAlbumsForLoading = createSelector(albumState, album => album?.isMoreAlbumsForLoading);
const isAlbumsArtistAppearsInLoading = createSelector(albumState, album => album?.isAlbumsArtistAppearsInLoading);
const backgroundColor = createSelector(albumState, album => album?.backgroundColor);
const lyricsBackgroundShadow = createSelector(albumState, album => album?.lyricsBackgroundShadow);
const isAddedToLibrary = createSelector(albumState, album => album?.isAddedToLibrary);
const songsCount = createSelector(albumState, album => album?.songsCount);
const songsTimeDuration = createSelector(albumState, album => album?.songsTimeDuration);
const likedAlbums = createSelector(albumState, album => album?.likedAlbums);
const isLikedAlbumsLoading = createSelector(albumState, album => album?.isLikedAlbumsLoading);
const isMoreLikedAlbumsForLoading = createSelector(albumState, album => album?.isMoreLikedAlbumsForLoading);
const topAlbumsThisMonth = createSelector(albumState, album => album?.topAlbumsThisMonth);
const isMoreTopAlbumsThisMonthForLoading = createSelector(albumState, album => album?.isMoreTopAlbumsThisMonthForLoading);
const isTopAlbumsThisMonthLoading = createSelector(albumState, album => album?.isTopAlbumsThisMonthLoading);
const hidden = createSelector(albumState, album => album?.hidden);
const isNextAlbumReleaseLoading = createSelector(albumState, album => album?.isNextAlbumReleaseLoading);
const nextAlbumRelease = createSelector(albumState, album => album?.nextAlbumRelease);

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
  isMoreAlbumsForLoading,
  isAlbumsArtistAppearsInLoading,
  backgroundColor,
  lyricsBackgroundShadow,
  isAddedToLibrary,
  songsCount,
  songsTimeDuration,
  likedAlbums,
  isLikedAlbumsLoading,
  isMoreLikedAlbumsForLoading,
  topAlbumsThisMonth,
  isMoreTopAlbumsThisMonthForLoading,
  isTopAlbumsThisMonthLoading,
  hidden,
  isNextAlbumReleaseLoading,
  nextAlbumRelease,
};