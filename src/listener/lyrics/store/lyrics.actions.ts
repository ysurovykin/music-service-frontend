import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetLyricsStartActionType,
  GetLyricsSuccessActionType,
  GetLyricsFailedActionType,
} from "./lyrics.actions.types";
import { LyricsActionTypes, LyricsInfoResponseData } from "./lyrics.model";

export const getSongLyricsStartAction = (songId: string):
  GetLyricsStartActionType => ({ type: LyricsActionTypes.GET_SONG_LYRICS, payload: songId });

export const getSongLyricsSuccessAction = (response: LyricsInfoResponseData):
  GetLyricsSuccessActionType => ({ type: LyricsActionTypes.GET_SONG_LYRICS_SUCCESS, payload: response });

export const getSongLyricsFailedAction = (error: ActionFailedError):
  GetLyricsFailedActionType => ({ type: LyricsActionTypes.GET_SONG_LYRICS_FAILED, payload: error });

export const lyricsActions = {
  getSongLyrics: (songId: string) => getSongLyricsStartAction(songId),
  getSongLyricsSuccess: (response: LyricsInfoResponseData) => getSongLyricsSuccessAction(response),
  getSongLyricsFailed: (error: ActionFailedError) => getSongLyricsFailedAction(error),
}

