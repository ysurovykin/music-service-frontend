import { Bounce, TypeOptions, toast } from "react-toastify";

export interface ActionFailedError {
  error: Error
}

export type ErrorActionType = {
  type: string;
  payload: ActionFailedError;
};

export function showNotification(type: TypeOptions, message: string, autoClose: number = 3000) {
  toast(message, {
    position: "top-right",
    type: type,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}