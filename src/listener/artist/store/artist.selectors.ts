import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const artistState = (state: InitialState) => state.artist;

const artistId = createSelector(artistState, artist => artist?.artistId);
const name = createSelector(artistState, artist => artist?.name);
const country = createSelector(artistState, artist => artist?.country);
const description = createSelector(artistState, artist => artist?.description);
const socialLinks = createSelector(artistState, artist => artist?.socialLinks);
const followers = createSelector(artistState, artist => artist?.followers);
const isArtistLoading = createSelector(artistState, artist => artist?.isArtistLoading);
const isArtistQueueLoading = createSelector(artistState, artist => artist?.isArtistQueueLoading);
const artistsQueue = createSelector(artistState, artist => artist?.artistsQueue);
const albums = createSelector(artistState, artist => artist?.albums);

export const artistSelectors = {
  artistId,
  name,
  country,
  description,
  socialLinks,
  followers,
  isArtistLoading,
  isArtistQueueLoading,
  artistsQueue,
  albums
};