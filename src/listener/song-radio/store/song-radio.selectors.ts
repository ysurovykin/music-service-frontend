import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const songRadioState = (state: InitialState) => state.songRadio;

const isSongRadioLoading = createSelector(songRadioState, songRadio => songRadio?.isSongRadioLoading);
const name = createSelector(songRadioState, songRadio => songRadio?.name);
const lastUpdatedAt = createSelector(songRadioState, songRadio => songRadio?.lastUpdatedAt);
const coverImageUrl = createSelector(songRadioState, songRadio => songRadio?.coverImageUrl);
const songName = createSelector(songRadioState, songRadio => songRadio?.songName);
const backgroundColor = createSelector(songRadioState, songRadio => songRadio?.backgroundColor);
const isRefreshSongRadioModalOpen = createSelector(songRadioState, songRadio => songRadio?.isRefreshSongRadioModalOpen);
const baseSongId = createSelector(songRadioState, songRadio => songRadio?.baseSongId);
const listenerSongRadios = createSelector(songRadioState, songRadio => songRadio?.listenerSongRadios);
const isListenerSongRadiosLoading = createSelector(songRadioState, songRadio => songRadio?.isListenerSongRadiosLoading);
const isMoreListenerSongRadiosForLoading = createSelector(songRadioState, songRadio => songRadio?.isMoreListenerSongRadiosForLoading);
const songsTimeDuration = createSelector(songRadioState, songRadio => songRadio?.songsTimeDuration);
const songsCount = createSelector(songRadioState, songRadio => songRadio?.songsCount);

export const songRadioSelectors = {
  name,
  lastUpdatedAt,
  coverImageUrl,
  songName,
  backgroundColor,
  isSongRadioLoading,
  isRefreshSongRadioModalOpen,
  baseSongId,
  listenerSongRadios,
  isListenerSongRadiosLoading,
  isMoreListenerSongRadiosForLoading,
  songsTimeDuration,
  songsCount,
};