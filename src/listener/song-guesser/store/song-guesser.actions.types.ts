import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  CheckAnswerRequestData,
  CheckAnswerResponseData,
  CorrectAnswerResponseData,
  CountAvailableSongsRequestData,
  FinishedSongGuesserFullResponseData,
  FinishedSongGuesserInfoResponseData,
  GetFinishedSongGuessersRequestData,
  GetFinishedSongGuessersResponseData,
  OpenGuesserGameModalData,
  SkipSongRequestData,
  SkipSongResponseData,
  SongGuesserActionTypes,
  SongGuesserInfoResponseData,
  SongGuesserStatsData,
  StartSongGuesserRequestData,
  WrongAnswerResponseData
} from "./song-guesser.model";

export type CountAvailableSongsStartActionType = {
  type: typeof SongGuesserActionTypes.COUNT_AVAILABLE_SONGS;
  payload: CountAvailableSongsRequestData;
};

export type CountAvailableSongsSuccessActionType = {
  type: typeof SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_SUCCESS;
  payload: number;
};

export type CountAvailableSongsFailedActionType = {
  type: typeof SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_FAILED;
  payload: ActionFailedError;
};

export type StartSongGuesserStartActionType = {
  type: typeof SongGuesserActionTypes.START_SONG_GUESSER;
  payload: StartSongGuesserRequestData;
};

export type StartSongGuesserSuccessActionType = {
  type: typeof SongGuesserActionTypes.START_SONG_GUESSER_SUCCESS;
  payload: SongGuesserInfoResponseData;
};

export type StartSongGuesserFailedActionType = {
  type: typeof SongGuesserActionTypes.START_SONG_GUESSER_FAILED;
  payload: ActionFailedError;
};

export type CheckAnswerStartActionType = {
  type: typeof SongGuesserActionTypes.CHECK_ANSWER;
  payload: CheckAnswerRequestData;
};

export type CheckAnswerCorrectSuccessActionType = {
  type: typeof SongGuesserActionTypes.CHECK_ANSWER_CORRECT_SUCCESS;
  payload: CorrectAnswerResponseData;
};

export type CheckAnswerWrongSuccessActionType = {
  type: typeof SongGuesserActionTypes.CHECK_ANSWER_INCORRECT_SUCCESS;
  payload: WrongAnswerResponseData;
};

export type CheckAnswerFailedActionType = {
  type: typeof SongGuesserActionTypes.CHECK_ANSWER_FAILED;
  payload: ActionFailedError;
};

export type SkipSongStartActionType = {
  type: typeof SongGuesserActionTypes.SKIP_SONG;
  payload: SkipSongRequestData;
};

export type SkipSongSuccessActionType = {
  type: typeof SongGuesserActionTypes.SKIP_SONG_SUCCESS;
  payload: SkipSongResponseData;
};

export type SkipSongFailedActionType = {
  type: typeof SongGuesserActionTypes.SKIP_SONG_FAILED;
  payload: ActionFailedError;
};

export type OpenGuesserRulesModalActionType = {
  type: typeof SongGuesserActionTypes.OPEN_GUESSER_RULES_MODAL;
  payload: undefined;
};

export type CloseGuesserRulesModalActionType = {
  type: typeof SongGuesserActionTypes.CLOSE_GUESSER_RULES_MODAL;
  payload: undefined;
};

export type OpenGuesserGameModalActionType = {
  type: typeof SongGuesserActionTypes.OPEN_GUESSER_GAME_MODAL;
  payload: OpenGuesserGameModalData;
};

export type CloseGuesserGameModalActionType = {
  type: typeof SongGuesserActionTypes.CLOSE_GUESSER_GAME_MODAL;
  payload: undefined;
};

export type OpenGameOverModalActionType = {
  type: typeof SongGuesserActionTypes.OPEN_GAME_OVER_MODAL;
  payload: undefined;
};

export type CloseGameOverModalActionType = {
  type: typeof SongGuesserActionTypes.CLOSE_GAME_OVER_MODAL;
  payload: undefined;
};

export type OpenGuesserStatsModalActionType = {
  type: typeof SongGuesserActionTypes.OPEN_GUESSER_STATS_MODAL;
  payload: undefined;
};

export type CloseGuesserStatsModalActionType = {
  type: typeof SongGuesserActionTypes.CLOSE_GUESSER_STATS_MODAL;
  payload: undefined;
};


export type GetFinishedSongGuesserStatsStartActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS;
  payload: undefined;
};

export type GetFinishedSongGuesserStatsSuccessActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_SUCCESS;
  payload: SongGuesserStatsData;
};

export type GetFinishedSongGuesserStatsFailedActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_FAILED;
  payload: ActionFailedError;
};

export type GetFinishedSongGuessersStartActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS;
  payload: GetFinishedSongGuessersRequestData;
};

export type GetFinishedSongGuessersSuccessActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_SUCCESS;
  payload: GetFinishedSongGuessersResponseData;
};

export type GetFinishedSongGuessersFailedActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_FAILED;
  payload: ActionFailedError;
};

export type LoadMoreFinishedSongGuessersStartActionType = {
  type: typeof SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS;
  payload: GetFinishedSongGuessersRequestData;
};

export type LoadMoreFinishedSongGuessersSuccessActionType = {
  type: typeof SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_SUCCESS;
  payload: GetFinishedSongGuessersResponseData;
};

export type LoadMoreFinishedSongGuessersFailedActionType = {
  type: typeof SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_FAILED;
  payload: ActionFailedError;
};

export type GetFinishedSongGuesserByIdStartActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID;
  payload: string;
};

export type GetFinishedSongGuesserByIdSuccessActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_SUCCESS;
  payload: FinishedSongGuesserFullResponseData;
};

export type GetFinishedSongGuesserByIdFailedActionType = {
  type: typeof SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type SongGuesserActions =
  | CountAvailableSongsStartActionType
  | CountAvailableSongsSuccessActionType
  | CountAvailableSongsFailedActionType
  | StartSongGuesserStartActionType
  | StartSongGuesserSuccessActionType
  | StartSongGuesserFailedActionType
  | CheckAnswerStartActionType
  | CheckAnswerCorrectSuccessActionType
  | CheckAnswerWrongSuccessActionType
  | CheckAnswerFailedActionType
  | SkipSongStartActionType
  | SkipSongSuccessActionType
  | SkipSongFailedActionType
  | OpenGameOverModalActionType
  | CloseGameOverModalActionType
  | OpenGuesserRulesModalActionType
  | CloseGuesserRulesModalActionType
  | OpenGuesserGameModalActionType
  | CloseGuesserGameModalActionType
  | OpenGuesserStatsModalActionType
  | CloseGuesserStatsModalActionType
  | GetFinishedSongGuesserStatsStartActionType
  | GetFinishedSongGuesserStatsSuccessActionType
  | GetFinishedSongGuesserStatsFailedActionType
  | GetFinishedSongGuessersStartActionType
  | GetFinishedSongGuessersSuccessActionType
  | GetFinishedSongGuessersFailedActionType
  | LoadMoreFinishedSongGuessersStartActionType
  | LoadMoreFinishedSongGuessersSuccessActionType
  | LoadMoreFinishedSongGuessersFailedActionType
  | GetFinishedSongGuesserByIdStartActionType
  | GetFinishedSongGuesserByIdSuccessActionType
  | GetFinishedSongGuesserByIdFailedActionType;
