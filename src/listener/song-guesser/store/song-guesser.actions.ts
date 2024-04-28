import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  CountAvailableSongsStartActionType,
  CountAvailableSongsSuccessActionType,
  CountAvailableSongsFailedActionType,
  StartSongGuesserStartActionType,
  StartSongGuesserSuccessActionType,
  StartSongGuesserFailedActionType,
  CheckAnswerStartActionType,
  CheckAnswerCorrectSuccessActionType,
  CheckAnswerWrongSuccessActionType,
  CheckAnswerFailedActionType,
  SkipSongStartActionType,
  SkipSongSuccessActionType,
  SkipSongFailedActionType,
  OpenGameOverModalActionType,
  CloseGameOverModalActionType,
  OpenGuesserRulesModalActionType,
  CloseGuesserRulesModalActionType,
  OpenGuesserGameModalActionType,
  CloseGuesserGameModalActionType,
  GetFinishedSongGuesserStatsStartActionType,
  GetFinishedSongGuesserStatsSuccessActionType,
  GetFinishedSongGuesserStatsFailedActionType,
  GetFinishedSongGuessersStartActionType,
  GetFinishedSongGuessersSuccessActionType,
  GetFinishedSongGuessersFailedActionType,
  LoadMoreFinishedSongGuessersStartActionType,
  LoadMoreFinishedSongGuessersSuccessActionType,
  LoadMoreFinishedSongGuessersFailedActionType,
  GetFinishedSongGuesserByIdStartActionType,
  GetFinishedSongGuesserByIdSuccessActionType,
  GetFinishedSongGuesserByIdFailedActionType,
  OpenGuesserStatsModalActionType,
  CloseGuesserStatsModalActionType
} from "./song-guesser.actions.types";
import {
  CheckAnswerRequestData,
  CorrectAnswerResponseData,
  CountAvailableSongsRequestData,
  FinishedSongGuesserFullResponseData,
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

export const countAvailableSongsStartAction = (request: CountAvailableSongsRequestData):
  CountAvailableSongsStartActionType => ({ type: SongGuesserActionTypes.COUNT_AVAILABLE_SONGS, payload: request });

export const countAvailableSongsSuccessAction = (count: number):
  CountAvailableSongsSuccessActionType => ({ type: SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_SUCCESS, payload: count });

export const countAvailableSongsFailedAction = (error: ActionFailedError):
  CountAvailableSongsFailedActionType => ({ type: SongGuesserActionTypes.COUNT_AVAILABLE_SONGS_FAILED, payload: error });

export const startSongGuesserStartAction = (request: StartSongGuesserRequestData):
  StartSongGuesserStartActionType => ({ type: SongGuesserActionTypes.START_SONG_GUESSER, payload: request });

export const startSongGuesserSuccessAction = (response: SongGuesserInfoResponseData):
  StartSongGuesserSuccessActionType => ({ type: SongGuesserActionTypes.START_SONG_GUESSER_SUCCESS, payload: response });

export const startSongGuesserFailedAction = (error: ActionFailedError):
  StartSongGuesserFailedActionType => ({ type: SongGuesserActionTypes.START_SONG_GUESSER_FAILED, payload: error });

export const checkAnswerStartAction = (request: CheckAnswerRequestData):
  CheckAnswerStartActionType => ({ type: SongGuesserActionTypes.CHECK_ANSWER, payload: request });

export const checkAnswerCorrectSuccessAction = (response: CorrectAnswerResponseData):
  CheckAnswerCorrectSuccessActionType => ({ type: SongGuesserActionTypes.CHECK_ANSWER_CORRECT_SUCCESS, payload: response });

export const checkAnswerWrongSuccessAction = (response: WrongAnswerResponseData):
  CheckAnswerWrongSuccessActionType => ({ type: SongGuesserActionTypes.CHECK_ANSWER_INCORRECT_SUCCESS, payload: response });

export const checkAnswerFailedAction = (error: ActionFailedError):
  CheckAnswerFailedActionType => ({ type: SongGuesserActionTypes.CHECK_ANSWER_FAILED, payload: error });

export const skipSongStartAction = (request: SkipSongRequestData):
  SkipSongStartActionType => ({ type: SongGuesserActionTypes.SKIP_SONG, payload: request });

export const skipSongSuccessAction = (response: SkipSongResponseData):
  SkipSongSuccessActionType => ({ type: SongGuesserActionTypes.SKIP_SONG_SUCCESS, payload: response });

export const skipSongFailedAction = (error: ActionFailedError):
  SkipSongFailedActionType => ({ type: SongGuesserActionTypes.SKIP_SONG_FAILED, payload: error });

export const openGuesserRulesModalAction = ():
  OpenGuesserRulesModalActionType => ({ type: SongGuesserActionTypes.OPEN_GUESSER_RULES_MODAL, payload: undefined });

export const closeGuesserRulesModalAction = ():
  CloseGuesserRulesModalActionType => ({ type: SongGuesserActionTypes.CLOSE_GUESSER_RULES_MODAL, payload: undefined });

export const openGuesserGameModalAction = (data: OpenGuesserGameModalData):
  OpenGuesserGameModalActionType => ({ type: SongGuesserActionTypes.OPEN_GUESSER_GAME_MODAL, payload: data });

export const closeGuesserGameModalAction = ():
  CloseGuesserGameModalActionType => ({ type: SongGuesserActionTypes.CLOSE_GUESSER_GAME_MODAL, payload: undefined });

export const openGameOverModalAction = ():
  OpenGameOverModalActionType => ({ type: SongGuesserActionTypes.OPEN_GAME_OVER_MODAL, payload: undefined });

export const closeGameOverModalAction = ():
  CloseGameOverModalActionType => ({ type: SongGuesserActionTypes.CLOSE_GAME_OVER_MODAL, payload: undefined });

export const openGuesserStatsModalAction = ():
  OpenGuesserStatsModalActionType => ({ type: SongGuesserActionTypes.OPEN_GUESSER_STATS_MODAL, payload: undefined });

export const closeGuesserStatsModalAction = ():
  CloseGuesserStatsModalActionType => ({ type: SongGuesserActionTypes.CLOSE_GUESSER_STATS_MODAL, payload: undefined });


export const getFinishedSongGuesserStatsStartAction = ():
  GetFinishedSongGuesserStatsStartActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS, payload: undefined });

export const getFinishedSongGuesserStatsSuccessAction = (stats: SongGuesserStatsData):
  GetFinishedSongGuesserStatsSuccessActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_SUCCESS, payload: stats });

export const getFinishedSongGuesserStatsFailedAction = (error: ActionFailedError):
  GetFinishedSongGuesserStatsFailedActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_STATS_FAILED, payload: error });

export const getFinishedSongGuessersStartAction = (request: GetFinishedSongGuessersRequestData):
  GetFinishedSongGuessersStartActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS, payload: request });

export const getFinishedSongGuessersSuccessAction = (response: GetFinishedSongGuessersResponseData):
  GetFinishedSongGuessersSuccessActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_SUCCESS, payload: response });

export const getFinishedSongGuessersFailedAction = (error: ActionFailedError):
  GetFinishedSongGuessersFailedActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSERS_FAILED, payload: error });

export const loadMoreFinishedSongGuessersStartAction = (request: GetFinishedSongGuessersRequestData):
  LoadMoreFinishedSongGuessersStartActionType => ({ type: SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS, payload: request });

export const loadMoreFinishedSongGuessersSuccessAction = (response: GetFinishedSongGuessersResponseData):
  LoadMoreFinishedSongGuessersSuccessActionType => ({ type: SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_SUCCESS, payload: response });

export const loadMoreFinishedSongGuessersFailedAction = (error: ActionFailedError):
  LoadMoreFinishedSongGuessersFailedActionType => ({ type: SongGuesserActionTypes.LOAD_MORE_FINISHED_SONG_GUESSERS_FAILED, payload: error });

export const getFinishedSongGuesserByIdStartAction = (request: string):
  GetFinishedSongGuesserByIdStartActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID, payload: request });

export const getFinishedSongGuesserByIdSuccessAction = (response: FinishedSongGuesserFullResponseData):
  GetFinishedSongGuesserByIdSuccessActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_SUCCESS, payload: response });

export const getFinishedSongGuesserByIdFailedAction = (error: ActionFailedError):
  GetFinishedSongGuesserByIdFailedActionType => ({ type: SongGuesserActionTypes.GET_FINISHED_SONG_GUESSER_BY_ID_FAILED, payload: error });

export const songGuesserActions = {
  countAvailableSongs: (request: CountAvailableSongsRequestData) => countAvailableSongsStartAction(request),
  countAvailableSongsSuccess: (count: number) => countAvailableSongsSuccessAction(count),
  countAvailableSongsFailed: (error: ActionFailedError) => countAvailableSongsFailedAction(error),
  startSongGuesser: (request: StartSongGuesserRequestData) => startSongGuesserStartAction(request),
  startSongGuesserSuccess: (response: SongGuesserInfoResponseData) => startSongGuesserSuccessAction(response),
  startSongGuesserFailed: (error: ActionFailedError) => startSongGuesserFailedAction(error),
  checkAnswer: (request: CheckAnswerRequestData) => checkAnswerStartAction(request),
  checkAnswerCorrectSuccess: (response: CorrectAnswerResponseData) => checkAnswerCorrectSuccessAction(response),
  checkAnswerWrongSuccess: (response: WrongAnswerResponseData) => checkAnswerWrongSuccessAction(response),
  checkAnswerFailed: (error: ActionFailedError) => checkAnswerFailedAction(error),
  skipSong: (request: SkipSongRequestData) => skipSongStartAction(request),
  skipSongSuccess: (response: SkipSongResponseData) => skipSongSuccessAction(response),
  skipSongFailed: (error: ActionFailedError) => skipSongFailedAction(error),
  openGuesserRulesModal: () => openGuesserRulesModalAction(),
  closeGuesserRulesModal: () => closeGuesserRulesModalAction(),
  openGuesserGameModal: (data: OpenGuesserGameModalData) => openGuesserGameModalAction(data),
  closeGuesserGameModal: () => closeGuesserGameModalAction(),
  openGameOverModal: () => openGameOverModalAction(),
  closeGameOverModal: () => closeGameOverModalAction(),
  openGuesserStatsModal: () => openGuesserStatsModalAction(),
  closeGuesserStatsModal: () => closeGuesserStatsModalAction(),
  getFinishedSongGuesserStats: () => getFinishedSongGuesserStatsStartAction(),
  getFinishedSongGuesserStatsSuccess: (count: SongGuesserStatsData) => getFinishedSongGuesserStatsSuccessAction(count),
  getFinishedSongGuesserStatsFailed: (error: ActionFailedError) => getFinishedSongGuesserStatsFailedAction(error),
  getFinishedSongGuessers: (request: GetFinishedSongGuessersRequestData) => getFinishedSongGuessersStartAction(request),
  getFinishedSongGuessersSuccess: (count: GetFinishedSongGuessersResponseData) => getFinishedSongGuessersSuccessAction(count),
  getFinishedSongGuessersFailed: (error: ActionFailedError) => getFinishedSongGuessersFailedAction(error),
  loadMoreFinishedSongGuessers: (request: GetFinishedSongGuessersRequestData) => loadMoreFinishedSongGuessersStartAction(request),
  loadMoreFinishedSongGuessersSuccess: (count: GetFinishedSongGuessersResponseData) => loadMoreFinishedSongGuessersSuccessAction(count),
  loadMoreFinishedSongGuessersFailed: (error: ActionFailedError) => loadMoreFinishedSongGuessersFailedAction(error),
  getFinishedSongGuesserById: (request: string) => getFinishedSongGuesserByIdStartAction(request),
  getFinishedSongGuesserByIdSuccess: (count: FinishedSongGuesserFullResponseData) => getFinishedSongGuesserByIdSuccessAction(count),
  getFinishedSongGuesserByIdFailed: (error: ActionFailedError) => getFinishedSongGuesserByIdFailedAction(error),
}

