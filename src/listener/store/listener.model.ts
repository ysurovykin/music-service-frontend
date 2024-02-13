export const listenerState: ListenerState = {
  isListenerLoading: undefined,
  name: undefined,
};

export interface ListenerState {
  isListenerLoading?: boolean,
  name?: string
}

export enum RepeatSongStateEnum {
  'none' = 'none',
  'loop' = 'loop',
  'one' = 'one'
}

export type RepeatSongStates = 'none' | 'loop' | 'one';

export type ListenerInfoResponseData = {
  name?: string;
}

export enum ListenerActionTypes {
  GET_LISTENER_BY_ID = "GET_LISTENER_BY_ID_START",
  GET_LISTENER_BY_ID_SUCCESS = "GET_LISTENER_BY_ID_SUCCESS",
  GET_LISTENER_BY_ID_FAILED = "GET_LISTENER_BY_ID_FAILED",
};