import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { LyricsActionTypes, LyricsInfoResponseData} from "./lyrics.model";

export type GetLyricsStartActionType = {
  type: typeof LyricsActionTypes.GET_SONG_LYRICS;
  payload: string;
};

export type GetLyricsSuccessActionType = {
  type: typeof LyricsActionTypes.GET_SONG_LYRICS_SUCCESS;
  payload: LyricsInfoResponseData;
};

export type GetLyricsFailedActionType = {
  type: typeof LyricsActionTypes.GET_SONG_LYRICS_FAILED;
  payload: ActionFailedError;
};

export type LyricsActions =
  | GetLyricsStartActionType
  | GetLyricsSuccessActionType
  | GetLyricsFailedActionType;
