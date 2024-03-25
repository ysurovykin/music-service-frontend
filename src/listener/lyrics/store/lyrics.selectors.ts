import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const lyricsState = (state: InitialState) => state.lyrics;

const lyrics = createSelector(lyricsState, lyrics => lyrics?.lyrics);
const synchronized = createSelector(lyricsState, lyrics => lyrics?.synchronized);
const isLyricsLoading = createSelector(lyricsState, lyrics => lyrics?.isLyricsLoading);

export const lyricsSelectors = {
  lyrics,
  synchronized,
  isLyricsLoading
};