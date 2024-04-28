import { createSelector } from "reselect";
import { InitialState } from "../../../redux.store";

const songGuesserState = (state: InitialState) => state.songGuesser;

const isSongGuesserLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isSongGuesserLoading);
const isCountAvailableSongsLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isCountAvailableSongsLoading);
const songGuesserId = createSelector(songGuesserState, songGuesser => songGuesser?.songGuesserId);
const songUrl = createSelector(songGuesserState, songGuesser => songGuesser?.songUrl);
const startTime = createSelector(songGuesserState, songGuesser => songGuesser?.startTime);
const timeSpentInSeconds = createSelector(songGuesserState, songGuesser => songGuesser?.timeSpentInSeconds);
const correctAnswers = createSelector(songGuesserState, songGuesser => songGuesser?.correctAnswers);
const mistakes = createSelector(songGuesserState, songGuesser => songGuesser?.mistakes);
const formatedSongNameGuess = createSelector(songGuesserState, songGuesser => songGuesser?.formatedSongNameGuess);
const formatedArtistNameGuess = createSelector(songGuesserState, songGuesser => songGuesser?.formatedArtistNameGuess);
const filter = createSelector(songGuesserState, songGuesser => songGuesser?.filter);
const difficulty = createSelector(songGuesserState, songGuesser => songGuesser?.difficulty);
const gameOver = createSelector(songGuesserState, songGuesser => songGuesser?.gameOver);
const gameOverInfo = createSelector(songGuesserState, songGuesser => songGuesser?.gameOverInfo);
const isGuesserGameModalOpen = createSelector(songGuesserState, songGuesser => songGuesser?.isGuesserGameModalOpen);
const isGuesserRulesModalOpen = createSelector(songGuesserState, songGuesser => songGuesser?.isGuesserRulesModalOpen);
const isGuesserStatsModalOpen = createSelector(songGuesserState, songGuesser => songGuesser?.isGuesserStatsModalOpen);
const isGameOverModalOpen = createSelector(songGuesserState, songGuesser => songGuesser?.isGameOverModalOpen);
const guesserBaseAlbum = createSelector(songGuesserState, songGuesser => songGuesser?.guesserBaseAlbum);
const guesserBaseArtist = createSelector(songGuesserState, songGuesser => songGuesser?.guesserBaseArtist);
const availableSongsByFilter = createSelector(songGuesserState, songGuesser => songGuesser?.availableSongsByFilter);
const isCheckAnswerLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isCheckAnswerLoading);
const isSongNameCorrect = createSelector(songGuesserState, songGuesser => songGuesser?.isSongNameCorrect);
const isArtistNameCorrect = createSelector(songGuesserState, songGuesser => songGuesser?.isArtistNameCorrect);
const finishedSongGuessers = createSelector(songGuesserState, songGuesser => songGuesser?.finishedSongGuessers);
const isMoreFinishedSongGuessersForLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isMoreFinishedSongGuessersForLoading);
const isFinishedSongGuessersLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isFinishedSongGuessersLoading);
const songGuesserStats = createSelector(songGuesserState, songGuesser => songGuesser?.songGuesserStats);
const isSongGuesserStatsLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isSongGuesserStatsLoading);
const isFinishedSongGuesserDataLoading = createSelector(songGuesserState, songGuesser => songGuesser?.isFinishedSongGuesserDataLoading);
const finishedSongGuesserData = createSelector(songGuesserState, songGuesser => songGuesser?.finishedSongGuesserData);

export const songGuesserSelectors = {
  isSongGuesserLoading,
  songGuesserId,
  songUrl,
  startTime,
  timeSpentInSeconds,
  correctAnswers,
  mistakes,
  formatedSongNameGuess,
  formatedArtistNameGuess,
  filter,
  difficulty,
  gameOver,
  gameOverInfo,
  isGuesserGameModalOpen,
  isGuesserRulesModalOpen,
  isGuesserStatsModalOpen,
  isGameOverModalOpen,
  guesserBaseAlbum,
  guesserBaseArtist,
  availableSongsByFilter,
  isCountAvailableSongsLoading,
  isCheckAnswerLoading,
  isSongNameCorrect,
  isArtistNameCorrect,
  finishedSongGuessers,
  isMoreFinishedSongGuessersForLoading,
  isFinishedSongGuessersLoading,
  songGuesserStats,
  isSongGuesserStatsLoading,
  isFinishedSongGuesserDataLoading,
  finishedSongGuesserData,
};