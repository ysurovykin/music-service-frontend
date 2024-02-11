import { ActionFailedError } from "../../helpers/react/redux.helper";
import { 
  GetListenerByIdStartActionType, 
  GetListenerByIdSuccessActionType, 
  GetListenerByIdFailedActionType,
  UpdateSongPlayerDataStartActionType,
  UpdateSongPlayerDataSuccessActionType,
  UpdateSongPlayerDataFailedActionType,
  SavePlayTimeStartActionType,
  SavePlayTimeSuccessActionType,
  SavePlayTimeFailedActionType,
  ChangeVolumeStartActionType,
  ChangeVolumeSuccessActionType,
  ChangeVolumeFailedActionType,
  ChangeRepeatSongStateStartActionType,
  ChangeRepeatSongStateSuccessActionType,
  ChangeRepeatSongStateFailedActionType,
  ChangeShuffleStateStartActionType,
  ChangeShuffleStateSuccessActionType,
  ChangeShuffleStateFailedActionType
} from "./listener.actions.types";
import {
  ChangeRepeatSongStateRequest,
  ChangeShuffleStateRequest,
  ListenerActionTypes, 
  ListenerInfoResponseData, 
  SavePlayTimeRequest,
  UpdateSongPlayerDataRequest,
  ChangeVolumeRequest 
} from "./listener.model"

export const getListenerByIdStartAction = (listenerId: string): 
  GetListenerByIdStartActionType => ({type: ListenerActionTypes.GET_LISTENER_BY_ID, payload: listenerId});

export const getListenerByIdSuccessAction = (response: ListenerInfoResponseData): 
  GetListenerByIdSuccessActionType => ({type: ListenerActionTypes.GET_LISTENER_BY_ID_SUCCESS, payload: response});

export const getListenerByIdFailedAction = (error: ActionFailedError): 
  GetListenerByIdFailedActionType => ({type: ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, payload: error});

export const updateSongPlayerDataStartAction = (updateSongPlayerDataRequest: UpdateSongPlayerDataRequest): 
  UpdateSongPlayerDataStartActionType => ({type: ListenerActionTypes.UPDATE_SONG_PLAYER_DATA, payload: updateSongPlayerDataRequest});

export const updateSongPlayerDataSuccessAction = (): 
  UpdateSongPlayerDataSuccessActionType => ({type: ListenerActionTypes.UPDATE_SONG_PLAYER_DATA_SUCCESS, payload: undefined});

export const updateSongPlayerDataFailedAction = (error: ActionFailedError): 
  UpdateSongPlayerDataFailedActionType => ({type: ListenerActionTypes.UPDATE_SONG_PLAYER_DATA_FAILED, payload: error});

export const savePlayTimeStartAction = (savePlayTimeRequest: SavePlayTimeRequest): 
  SavePlayTimeStartActionType => ({type: ListenerActionTypes.SAVE_PLAY_TIME, payload: savePlayTimeRequest});

export const savePlayTimeSuccessAction = (): 
  SavePlayTimeSuccessActionType => ({type: ListenerActionTypes.SAVE_PLAY_TIME_SUCCESS, payload: undefined});

export const savePlayTimeFailedAction = (error: ActionFailedError): 
  SavePlayTimeFailedActionType => ({type: ListenerActionTypes.SAVE_PLAY_TIME_FAILED, payload: error});

export const changeVolumeStartAction = (changeVolumeRequest: ChangeVolumeRequest): 
  ChangeVolumeStartActionType => ({type: ListenerActionTypes.CHANGE_VOLUME, payload: changeVolumeRequest});

export const changeVolumeSuccessAction = (): 
  ChangeVolumeSuccessActionType => ({type: ListenerActionTypes.CHANGE_VOLUME_SUCCESS, payload: undefined});

export const changeVolumeFailedAction = (error: ActionFailedError): 
  ChangeVolumeFailedActionType => ({type: ListenerActionTypes.CHANGE_VOLUME_FAILED, payload: error});

export const changeRepeatSongStateStartActionType = (changeRepeatSongStateRequest: ChangeRepeatSongStateRequest):
  ChangeRepeatSongStateStartActionType => ({type: ListenerActionTypes.CHANGE_REPEAT_SONG_STATE, payload: changeRepeatSongStateRequest});

export const changeRepeatSongStateSuccessActionType = ():
  ChangeRepeatSongStateSuccessActionType => ({type: ListenerActionTypes.CHANGE_REPEAT_SONG_STATE_SUCCESS, payload: undefined});

export const changeRepeatSongStateFailedActionType = (error: ActionFailedError):
  ChangeRepeatSongStateFailedActionType => ({type: ListenerActionTypes.CHANGE_REPEAT_SONG_STATE_FAILED, payload: error});

export const changeShuffleStateStartActionType = (changeShuffleStateRequest: ChangeShuffleStateRequest):
  ChangeShuffleStateStartActionType => ({type: ListenerActionTypes.CHANGE_SHUFFLE_STATE, payload: changeShuffleStateRequest});

export const changeShuffleStateSuccessActionType = ():
  ChangeShuffleStateSuccessActionType => ({type: ListenerActionTypes.CHANGE_SHUFFLE_STATE_SUCCESS, payload: undefined});

export const changeShuffleStateFailedActionType = (error: ActionFailedError):
  ChangeShuffleStateFailedActionType => ({type: ListenerActionTypes.CHANGE_SHUFFLE_STATE_FAILED, payload: error});


export const listenerActions = {
  getListenerById: (listenerId: string) => getListenerByIdStartAction(listenerId),
  getListenerByIdSuccess: (response: ListenerInfoResponseData) => getListenerByIdSuccessAction(response),
  getListenerByIdFailed: (error: ActionFailedError) => getListenerByIdFailedAction(error),
  updateSongPlayerData: (updateSongPlayerDataRequest: UpdateSongPlayerDataRequest) => updateSongPlayerDataStartAction(updateSongPlayerDataRequest),
  updateSongPlayerDataSuccess: () => updateSongPlayerDataSuccessAction(),
  updateSongPlayerDataFailed: (error: ActionFailedError) => updateSongPlayerDataFailedAction(error),
  savePlayTime: (savePlayTimeRequest: SavePlayTimeRequest) => savePlayTimeStartAction(savePlayTimeRequest),
  savePlayTimeSuccess: () => savePlayTimeSuccessAction(),
  savePlayTimeFailed: (error: ActionFailedError) => savePlayTimeFailedAction(error),
  changeVolume: (changeVolumeRequest: ChangeVolumeRequest) => changeVolumeStartAction(changeVolumeRequest),
  changeVolumeSuccess: () => changeVolumeSuccessAction(),
  changeVolumeFailed: (error: ActionFailedError) => changeVolumeFailedAction(error),
  changeRepeatSongState: (changeRepeatSongStateRequest: ChangeRepeatSongStateRequest) => changeRepeatSongStateStartActionType(changeRepeatSongStateRequest),
  changeRepeatSongStateSuccess: () => changeRepeatSongStateSuccessActionType(),
  changeRepeatSongStateFailed: (error: ActionFailedError) => changeRepeatSongStateFailedActionType(error),
  changeShuffleState: (changeShuffleStateRequest: ChangeShuffleStateRequest) => changeShuffleStateStartActionType(changeShuffleStateRequest),
  changeShuffleStateSuccess: () => changeShuffleStateSuccessActionType(),
  changeShuffleStateFailed: (error: ActionFailedError) => changeShuffleStateFailedActionType(error),
}

