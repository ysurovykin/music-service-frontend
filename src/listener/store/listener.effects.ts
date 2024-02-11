import { put, takeEvery } from 'redux-saga/effects'
import { ListenerActionTypes, ListenerInfoResponseData } from './listener.model';
import { 
  GetListenerByIdStartActionType, 
  SavePlayTimeStartActionType, 
  UpdateSongPlayerDataStartActionType, 
  ChangeVolumeStartActionType, 
  ChangeRepeatSongStateStartActionType,
  ChangeShuffleStateStartActionType
} from './listener.actions.types';
import ListenerService from './listener.service';
import { listenerActions } from './listener.actions';
import { ErrorActionType } from '../../helpers/react/redux.helper';

export const listenerEffects = [
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID, getListenerById),
  takeEvery(ListenerActionTypes.GET_LISTENER_BY_ID_FAILED, handleError),
  takeEvery(ListenerActionTypes.UPDATE_SONG_PLAYER_DATA, updateSongPlayerData),
  takeEvery(ListenerActionTypes.UPDATE_SONG_PLAYER_DATA_FAILED, handleError),
  takeEvery(ListenerActionTypes.SAVE_PLAY_TIME, savePlayTime),
  takeEvery(ListenerActionTypes.SAVE_PLAY_TIME_FAILED, handleError),
  takeEvery(ListenerActionTypes.CHANGE_VOLUME, changeVolume),
  takeEvery(ListenerActionTypes.CHANGE_VOLUME_FAILED, handleError),
  takeEvery(ListenerActionTypes.CHANGE_REPEAT_SONG_STATE, changeRepeatSongState),
  takeEvery(ListenerActionTypes.CHANGE_REPEAT_SONG_STATE_FAILED, handleError),
  takeEvery(ListenerActionTypes.CHANGE_SHUFFLE_STATE, changeShuffleState),
  takeEvery(ListenerActionTypes.CHANGE_SHUFFLE_STATE_FAILED, handleError)
];

function* getListenerById(action: GetListenerByIdStartActionType) {
  try {
    const listenerResponseData: ListenerInfoResponseData = yield ListenerService.getListenerById(action.payload);
    yield put(listenerActions.getListenerByIdSuccess(listenerResponseData));
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.getListenerByIdFailed({error}));
  }
}

function* updateSongPlayerData(action: UpdateSongPlayerDataStartActionType) {
  try {
    yield ListenerService.updateSongPlayerData(action.payload);
    yield put(listenerActions.updateSongPlayerDataSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.updateSongPlayerDataFailed({error}));
  }
}

function* savePlayTime(action: SavePlayTimeStartActionType) {
  try {
    yield ListenerService.savePlayTime(action.payload);
    yield put(listenerActions.savePlayTimeSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.savePlayTimeFailed({error}));
  }
}

function* changeVolume(action: ChangeVolumeStartActionType) {
  try {
    yield ListenerService.changeVolume(action.payload);
    yield put(listenerActions.changeVolumeSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.changeVolumeFailed({error}));
  }
}

function* changeRepeatSongState(action: ChangeRepeatSongStateStartActionType) {
  try {
    yield ListenerService.changeRepeatSongState(action.payload);
    yield put(listenerActions.changeRepeatSongStateSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.changeRepeatSongStateFailed({error}));
  }
}

function* changeShuffleState(action: ChangeShuffleStateStartActionType) {
  try {
    yield ListenerService.changeShuffleState(action.payload);
    yield put(listenerActions.changeShuffleStateSuccess());
  } catch (e) {
    const error = e as Error;
    yield put(listenerActions.changeShuffleStateFailed({error}));
  }
}

function* handleError(action: ErrorActionType) {
  yield console.log('error', action.payload.error);
}