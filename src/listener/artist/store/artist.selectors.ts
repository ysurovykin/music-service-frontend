import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const artistState = (state: InitialState) => state.artist;

const artistId = createSelector(artistState, artist => artist?.artistId);
const name = createSelector(artistState, artist => artist?.name);
const country = createSelector(artistState, artist => artist?.country);
const description = createSelector(artistState, artist => artist?.description);
const socialLinks = createSelector(artistState, artist => artist?.socialLinks);
const followers = createSelector(artistState, artist => artist?.followers);
const isArtistsLoading = createSelector(artistState, artist => artist?.isArtistsLoading);
const isMoreArtistsForLoading = createSelector(artistState, artist => artist?.isMoreArtistsForLoading);
const isArtistQueueLoading = createSelector(artistState, artist => artist?.isArtistQueueLoading);
const artists = createSelector(artistState, artist => artist?.artists);
const backgroundColor = createSelector(artistState, artist => artist?.backgroundColor);
const profileImageUrl = createSelector(artistState, artist => artist?.profileImageUrl);
const isFollowed = createSelector(artistState, artist => artist?.isFollowed);
const songsCount = createSelector(artistState, artist => artist?.songsCount);
const songsTimeDuration = createSelector(artistState, artist => artist?.songsTimeDuration);
const likedSongsCount = createSelector(artistState, artist => artist?.likedSongsCount);
const likedSongsTimeDuration = createSelector(artistState, artist => artist?.likedSongsTimeDuration);
const isDiscoverArtistModalOpen = createSelector(artistState, artist => artist?.isDiscoverArtistModalOpen);
const genres = createSelector(artistState, artist => artist?.genres);
const isGenresLoading = createSelector(artistState, artist => artist?.isGenresLoading);
const mostRecentRelease = createSelector(artistState, artist => artist?.mostRecentRelease);
const isMostRecentReleaseLoading = createSelector(artistState, artist => artist?.isMostRecentReleaseLoading);
const albumsCount = createSelector(artistState, artist => artist?.albumsCount);
const albumsWhereAppearsCount = createSelector(artistState, artist => artist?.albumsWhereAppearsCount);
const followedArtists = createSelector(artistState, artist => artist?.followedArtists);
const isFollowedArtistsLoading = createSelector(artistState, artist => artist?.isFollowedArtistsLoading);
const isMoreFollowedArtistsForLoading = createSelector(artistState, artist => artist?.isMoreFollowedArtistsForLoading);

export const artistSelectors = {
  artistId,
  name,
  country,
  description,
  socialLinks,
  followers,
  isArtistsLoading,
  isMoreArtistsForLoading,
  isArtistQueueLoading,
  artists,
  backgroundColor,
  profileImageUrl,
  isFollowed,
  songsCount,
  songsTimeDuration,
  likedSongsCount,
  likedSongsTimeDuration,
  isDiscoverArtistModalOpen,
  genres,
  isGenresLoading,
  mostRecentRelease,
  isMostRecentReleaseLoading,
  albumsCount,
  albumsWhereAppearsCount,
  followedArtists,
  isFollowedArtistsLoading,
  isMoreFollowedArtistsForLoading
};