
export interface ActionFailedError {
  error: Error
}

export type ErrorActionType = {
  type: string;
  payload: ActionFailedError;
};
