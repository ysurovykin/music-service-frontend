import { AxiosError } from "axios";
import { Bounce, TypeOptions, toast } from "react-toastify";

export interface ActionFailedError {
  error: AxiosError
}

export type ErrorActionType = {
  type: string;
  payload: ActionFailedError;
};

export function showNotification(type: TypeOptions, message: string, autoClose: number = 3000, isLoading: boolean = false) {
  return toast(message, {
    position: "top-right",
    type: type,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    isLoading
  });
}

export function updateNotification(toastId: string, message: string, type: TypeOptions, autoClose: number = 3000) {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: autoClose,
  });
}

export function getErrorMessage(error: AxiosError) {
  if (typeof error === 'string') {
    return error || '';
  }
  type ErrorDataType = { message: string };
  const errorData = error?.response?.data;
  if (errorData) {
    return (errorData as ErrorDataType).message || '';
  }
  if (error?.message) {
    return error.message;
  }
  return '';
}