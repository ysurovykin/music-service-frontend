import { ActionFailedError } from "../../helpers/react/redux.helper";
import {
  ListenerActionTypes, 
  ChangeVolumeRequest,
  SavePlayTimeRequest,
  UpdateSongPlayerDataRequest,
  ListenerInfoResponseData,
  ChangeRepeatSongStateRequest,
  ChangeShuffleStateRequest
} from "./listener.model";

export type GetListenerByIdStartActionType = {
  type: typeof ListenerActionTypes.GET_LISTENER_BY_ID;
  payload: string;
};

export type GetListenerByIdSuccessActionType = {
  type: typeof ListenerActionTypes.GET_LISTENER_BY_ID_SUCCESS;
  payload: ListenerInfoResponseData;
};

export type GetListenerByIdFailedActionType = {
  type: typeof ListenerActionTypes.GET_LISTENER_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type UpdateSongPlayerDataStartActionType = {
  type: typeof ListenerActionTypes.UPDATE_SONG_PLAYER_DATA;
  payload: UpdateSongPlayerDataRequest;
};

export type UpdateSongPlayerDataSuccessActionType = {
  type: typeof ListenerActionTypes.UPDATE_SONG_PLAYER_DATA_SUCCESS;
  payload: undefined;
};

export type UpdateSongPlayerDataFailedActionType = {
  type: typeof ListenerActionTypes.UPDATE_SONG_PLAYER_DATA_FAILED;
  payload: ActionFailedError;
};

export type SavePlayTimeStartActionType = {
  type: typeof ListenerActionTypes.SAVE_PLAY_TIME;
  payload: SavePlayTimeRequest;
};

export type SavePlayTimeSuccessActionType = {
  type: typeof ListenerActionTypes.SAVE_PLAY_TIME_SUCCESS;
  payload: undefined;
};

export type SavePlayTimeFailedActionType = {
  type: typeof ListenerActionTypes.SAVE_PLAY_TIME_FAILED;
  payload: ActionFailedError;
};

export type ChangeVolumeStartActionType = {
  type: typeof ListenerActionTypes.CHANGE_VOLUME;
  payload: ChangeVolumeRequest;
};

export type ChangeVolumeSuccessActionType = {
  type: typeof ListenerActionTypes.CHANGE_VOLUME_SUCCESS;
  payload: undefined;
};

export type ChangeVolumeFailedActionType = {
  type: typeof ListenerActionTypes.CHANGE_VOLUME_FAILED;
  payload: ActionFailedError;
};

export type ChangeRepeatSongStateStartActionType = {
  type: typeof ListenerActionTypes.CHANGE_REPEAT_SONG_STATE;
  payload: ChangeRepeatSongStateRequest;
};

export type ChangeRepeatSongStateSuccessActionType = {
  type: typeof ListenerActionTypes.CHANGE_REPEAT_SONG_STATE_SUCCESS;
  payload: undefined;
};

export type ChangeRepeatSongStateFailedActionType = {
  type: typeof ListenerActionTypes.CHANGE_REPEAT_SONG_STATE_FAILED;
  payload: ActionFailedError;
};

export type ChangeShuffleStateStartActionType = {
  type: typeof ListenerActionTypes.CHANGE_SHUFFLE_STATE;
  payload: ChangeShuffleStateRequest;
};

export type ChangeShuffleStateSuccessActionType = {
  type: typeof ListenerActionTypes.CHANGE_SHUFFLE_STATE_SUCCESS;
  payload: undefined;
};

export type ChangeShuffleStateFailedActionType = {
  type: typeof ListenerActionTypes.CHANGE_SHUFFLE_STATE_FAILED;
  payload: ActionFailedError;
};

export type ListenerActions =
  | GetListenerByIdStartActionType
  | GetListenerByIdSuccessActionType
  | GetListenerByIdFailedActionType
  | UpdateSongPlayerDataStartActionType
  | UpdateSongPlayerDataSuccessActionType
  | UpdateSongPlayerDataFailedActionType
  | SavePlayTimeStartActionType
  | SavePlayTimeSuccessActionType
  | SavePlayTimeFailedActionType
  | ChangeVolumeStartActionType
  | ChangeVolumeSuccessActionType
  | ChangeVolumeFailedActionType
  | ChangeRepeatSongStateStartActionType
  | ChangeRepeatSongStateSuccessActionType
  | ChangeRepeatSongStateFailedActionType
  | ChangeShuffleStateStartActionType
  | ChangeShuffleStateSuccessActionType
  | ChangeShuffleStateFailedActionType;
