import { SongInfoResponseData } from "../../song/store/song.model";

export const songGuesserState: SongGuesserState = {
  isSongGuesserLoading: false,
  isCountAvailableSongsLoading: false,
  availableSongsByFilter: undefined,
  isCheckAnswerLoading: false,
  isSkipSongLoading: false,
  songGuesserId: undefined,
  songUrl: undefined,
  startTime: undefined,
  artistName: undefined,
  songName: undefined,
  timeSpentInSeconds: undefined,
  correctAnswers: undefined,
  mistakes: undefined,
  formatedSongNameGuess: undefined,
  formatedArtistNameGuess: undefined,
  isSongNameCorrect: undefined,
  isArtistNameCorrect: undefined,
  filter: undefined,
  difficulty: undefined,
  gameOver: false,
  gameOverInfo: undefined,
  isGuesserRulesModalOpen: false,
  isGuesserGameModalOpen: false,
  isGameOverModalOpen: false,
  guesserBaseAlbum: undefined,
  guesserBaseArtist: undefined,
  finishedSongGuessers: undefined,
  isMoreFinishedSongGuessersForLoading: undefined,
  isFinishedSongGuessersLoading: undefined,
  songGuesserStats: undefined,
  isSongGuesserStatsLoading: undefined,
  isFinishedSongGuesserDataLoading: undefined,
  finishedSongGuesserData: undefined,
  isGuesserStatsModalOpen: false
};

export interface SongGuesserState extends SongGuesserInfoResponseData {
  isSongGuesserLoading: boolean;
  isCountAvailableSongsLoading: boolean;
  availableSongsByFilter?: number;
  isCheckAnswerLoading: boolean;
  isSkipSongLoading: boolean;
  artistName?: string;
  songName?: string;
  timeSpentInSeconds?: number;
  correctAnswers?: number;
  mistakes?: number;
  formatedSongNameGuess?: Array<FormatedGuessData>;
  formatedArtistNameGuess?: Array<FormatedGuessData>;
  isSongNameCorrect?: boolean;
  isArtistNameCorrect?: boolean;
  filter?: SongGuesserFilterData;
  difficulty?: SongGuesserDifficultyEnum;
  gameOver: boolean;
  gameOverInfo?: GameOverData;
  isGameOverModalOpen: boolean;
  isGuesserRulesModalOpen: boolean;
  isGuesserGameModalOpen: boolean;
  guesserBaseAlbum?: SongGuesserFilterContentData;
  guesserBaseArtist?: SongGuesserFilterContentData;
  finishedSongGuessers?: Array<FinishedSongGuesserInfoResponseData>;
  isFinishedSongGuessersLoading?: boolean;
  isMoreFinishedSongGuessersForLoading?: boolean;
  songGuesserStats?: SongGuesserStatsData;
  isSongGuesserStatsLoading?: boolean;
  finishedSongGuesserData?: FinishedSongGuesserFullResponseData;
  isFinishedSongGuesserDataLoading?: boolean;
  isGuesserStatsModalOpen?: boolean;
}

export type SongGuesserInfoResponseData = {
  songGuesserId?: string;
  songUrl?: string;
  startTime?: number;
}

export type SongGuesserAnswerRequestData = {
  artistName: string;
  songName: string;
}

export type CorrectAnswerResponseData = {
  isCorrect: true;
  songUrl: string;
  startTime: number;
  gameOver: boolean;
  gameOverInfo: GameOverData;
}

export type GameOverData = {
  timeSpentInSeconds: number;
  correctAnswers: number;
  incorrectAnswers: number;
  closeAnswers: number;
  skippedAnswers: number;
}

export type FormatedGuessType = 'correct' | 'missplaced' | 'incorrect';

export type FormatedGuessData = {
  symbol: string;
  type: FormatedGuessType;
}

export type WrongAnswerResponseData = {
  isCorrect: false;
  isClose: boolean;
  mistakes: number;
  formatedSongNameGuess: Array<FormatedGuessData>;
  formatedArtistNameGuess: Array<FormatedGuessData>;
  isSongNameCorrect: boolean;
  isArtistNameCorrect: boolean;
  artistName?: string;
  songName?: string;
  gameOver: boolean;
  gameOverInfo: GameOverData;
}

export type CheckAnswerResponseData = CorrectAnswerResponseData | WrongAnswerResponseData;

export type SkipSongResponseData = {
  artistName: string;
  songName: string;
  mistakes: number;
  songUrl?: string;
  startTime?: number;
  gameOver: boolean;
  gameOverInfo: GameOverData;
}

export enum SongGuesserDifficultyEnum {
  'NEW_TO_MUSIC' = 'NEW_TO_MUSIC',
  'FREQUENT_LISTENER' = 'FREQUENT_LISTENER',
  'TRUE_FAN' = 'TRUE_FAN',
}

export type SongGuesserFilterContentData = {
  name: string;
  id: string;
};

export type SongGuesserFilterData = {
  languages?: Array<string>;
  genres?: Array<string>;
  playlists?: Array<SongGuesserFilterContentData>;
  album?: SongGuesserFilterContentData;
  artist?: SongGuesserFilterContentData;
  fromLikedAlbums?: boolean;
  fromFollowedArtists?: boolean;
};

export type OpenGuesserGameModalData = {
  album?: SongGuesserFilterContentData;
  artist?: SongGuesserFilterContentData;
}

export type CountAvailableSongsRequestData = {
  filter: SongGuesserFilterData;
}

export type StartSongGuesserRequestData = {
  filter: SongGuesserFilterData;
  difficulty: SongGuesserDifficultyEnum;
}

export type CheckAnswerRequestData = {
  songGuesserId: string;
  answer: SongGuesserAnswerRequestData;
}

export type SkipSongRequestData = {
  songGuesserId: string;
}

export enum SongGuesserSortTypeEnum {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
  'NEUTRAL' = 'NEUTRAL',
}

export type SongGuesserSortData = {
  timeSpent?: SongGuesserSortTypeEnum;
  finishedAt: SongGuesserSortTypeEnum;
  answers?: SongGuesserSortTypeEnum;
};

export type GetFinishedSongGuessersRequestData = {
  offset: number;
  limit: number;
  difficulties?: Array<SongGuesserDifficultyEnum>,
  sort?: SongGuesserSortData
  filter?: SongGuesserFilterData;
}

export type SongGuesserAnswersFullData = {
  artist: SongGuesserFilterContentData;
  song: SongGuesserFilterContentData;
  albumId: string;
  attemptsCount: number;
  attempts: Array<GuesserAttemptData>,
  spentTimeInSeconds: number;
  answered?: boolean;
  skipped?: boolean;
  isCloseAnswer?: boolean;
}

export type FinishedSongGuesserInfoResponseData = {
  songGuesserId: string;
  filter: SongGuesserFilterData;
  difficulty: SongGuesserDifficultyEnum;
  finishedAt: Date,
  mistakes: number;
  timeSpentInSeconds: number;
  correctAnswers: number;
  skippedAnswers: number;
  closeAnswers: number;
}

export type FinishedSongGuesserFullResponseData = {
  filter: SongGuesserFilterData;
  difficulty: SongGuesserDifficultyEnum;
  finishedAt: Date,
  mistakes: number;
  timeSpentInSeconds: number;
  correctAnswers: number;
  skippedAnswers: number;
  closeAnswers: number;
  answers: Array<SongGuesserAnswersFullData>;
}

export type MostSongGuesserStatData = {
  guesserSongName: string,
  guesserArtistName: string,
  guesses: number,
}

export type SongGuesserStatsData = {
  totalGames: number;
  bestScore: number;
  bestGameId: string;
  timeSpentInGuesserInSeconds: number;
  correctGuesses: number;
  closeGuesses: number;
  incorrectGuesses: number;
  skippedGuesses: number;
  mostSkippedGuesser: MostSongGuesserStatData;
  mostCloseGuesser: MostSongGuesserStatData;
  mostIncorrectGuesser: MostSongGuesserStatData;
  mostCorrectGuesser: MostSongGuesserStatData;
}

export type GetFinishedSongGuessersResponseData = {
  finishedSongGuessers: Array<FinishedSongGuesserInfoResponseData>;
  isMoreFinishedSongGuessersForLoading: boolean;
}

export type GuesserAttemptData = {
  attempt: number
  artistNameGuess: string
  songNameGuess: string
  formatedArtistNameGuess: Array<FormatedGuessData>,
  formatedSongNameGuess: Array<FormatedGuessData>,
  spentTimeInSeconds: number,
  answered?: boolean,
  skipped?: boolean,
  isCloseAnswer?: boolean,
}

export enum SongGuesserActionTypes {
  COUNT_AVAILABLE_SONGS = "SONG_GUESSER.COUNT_AVAILABLE_SONGS_START",
  COUNT_AVAILABLE_SONGS_SUCCESS = "SONG_GUESSER.COUNT_AVAILABLE_SONGS_SUCCESS",
  COUNT_AVAILABLE_SONGS_FAILED = "SONG_GUESSER.COUNT_AVAILABLE_SONGS_FAILED",

  START_SONG_GUESSER = "SONG_GUESSER.START_SONG_GUESSER_START",
  START_SONG_GUESSER_SUCCESS = "SONG_GUESSER.START_SONG_GUESSER_SUCCESS",
  START_SONG_GUESSER_FAILED = "SONG_GUESSER.START_SONG_GUESSER_FAILED",

  CHECK_ANSWER = "SONG_GUESSER.CHECK_ANSWER_START",
  CHECK_ANSWER_CORRECT_SUCCESS = "SONG_GUESSER.CHECK_ANSWER_CORRECT_SUCCESS",
  CHECK_ANSWER_INCORRECT_SUCCESS = "SONG_GUESSER.CHECK_ANSWER_INCORRECT_SUCCESS",
  CHECK_ANSWER_FAILED = "SONG_GUESSER.CHECK_ANSWER_FAILED",

  SKIP_SONG = "SONG_GUESSER.SKIP_SONG_START",
  SKIP_SONG_SUCCESS = "SONG_GUESSER.SKIP_SONG_SUCCESS",
  SKIP_SONG_FAILED = "SONG_GUESSER.SKIP_SONG_FAILED",

  OPEN_GUESSER_RULES_MODAL = "SONG_GUESSER.OPEN_GUESSER_RULES_MODAL",
  CLOSE_GUESSER_RULES_MODAL = "SONG_GUESSER.CLOSE_GUESSER_RULES_MODAL",

  OPEN_GUESSER_GAME_MODAL = "SONG_GUESSER.OPEN_GUESSER_GAME_MODAL",
  CLOSE_GUESSER_GAME_MODAL = "SONG_GUESSER.CLOSE_GUESSER_GAME_MODAL",

  OPEN_GAME_OVER_MODAL = "SONG_GUESSER.OPEN_GAME_OVER_MODAL",
  CLOSE_GAME_OVER_MODAL = "SONG_GUESSER.CLOSE_GAME_OVER_MODAL",

  OPEN_GUESSER_STATS_MODAL = "SONG_GUESSER.OPEN_GUESSER_STATS_MODAL",
  CLOSE_GUESSER_STATS_MODAL = "SONG_GUESSER.CLOSE_GUESSER_STATS_MODAL",

  GET_FINISHED_SONG_GUESSER_STATS = "SONG_GUESSER.GET_FINISHED_SONG_GUESSER_STATS_START",
  GET_FINISHED_SONG_GUESSER_STATS_SUCCESS = "SONG_GUESSER.GET_FINISHED_SONG_GUESSER_STATS_SUCCESS",
  GET_FINISHED_SONG_GUESSER_STATS_FAILED = "SONG_GUESSER.GET_FINISHED_SONG_GUESSER_STATS_FAILED",

  GET_FINISHED_SONG_GUESSERS = "SONG_GUESSER.GET_FINISHED_SONG_GUESSERS_START",
  GET_FINISHED_SONG_GUESSERS_SUCCESS = "SONG_GUESSER.GET_FINISHED_SONG_GUESSERS_SUCCESS",
  GET_FINISHED_SONG_GUESSERS_FAILED = "SONG_GUESSER.GET_FINISHED_SONG_GUESSERS_FAILED",

  LOAD_MORE_FINISHED_SONG_GUESSERS = "SONG_GUESSER.LOAD_MORE_FINISHED_SONG_GUESSERS_START",
  LOAD_MORE_FINISHED_SONG_GUESSERS_SUCCESS = "SONG_GUESSER.LOAD_MORE_FINISHED_SONG_GUESSERS_SUCCESS",
  LOAD_MORE_FINISHED_SONG_GUESSERS_FAILED = "SONG_GUESSER.LOAD_MORE_FINISHED_SONG_GUESSERS_FAILED",

  GET_FINISHED_SONG_GUESSER_BY_ID = "SONG_GUESSER.GET_FINISHED_SONG_GUESSER_BY_ID_START",
  GET_FINISHED_SONG_GUESSER_BY_ID_SUCCESS = "SONG_GUESSER.GET_FINISHED_SONG_GUESSER_BY_ID_SUCCESS",
  GET_FINISHED_SONG_GUESSER_BY_ID_FAILED = "SONG_GUESSER.GET_FINISHED_SONG_GUESSER_BY_ID_FAILED",
};