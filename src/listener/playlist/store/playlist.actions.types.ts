import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  PlaylistActionTypes,
  PlaylistInfoResponseData,
  EditedPlaylistDataForRequest,
  OpenEditSongPlaylistsModal,
  CreatePlaylistRequestData,
  EditPlaylistRequestData,
  PlaylistFullResponseData,
  GetPlaylistsRequest,
  ChangePlaylistPinRequestData,
} from "./playlist.model";

export type GetPlaylistsByListenerIdStartActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID;
  payload: GetPlaylistsRequest;
};

export type GetPlaylistsByListenerIdSuccessActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS;
  payload: Array<PlaylistInfoResponseData>;
};

export type GetPlaylistsByListenerIdFailedActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED;
  payload: ActionFailedError;
};

export type GetPlaylistsInListenerLibraryStartActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY;
  payload: GetPlaylistsRequest;
};

export type GetPlaylistsInListenerLibrarySuccessActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY_SUCCESS;
  payload: Array<PlaylistInfoResponseData>;
};

export type GetPlaylistsInListenerLibraryFailedActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_IN_LISTENER_LIBRARY_FAILED;
  payload: ActionFailedError;
};

export type GetPlaylistByIdStartActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLIST_BY_ID;
  payload: string;
};

export type GetPlaylistByIdSuccessActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLIST_BY_ID_SUCCESS;
  payload: PlaylistFullResponseData;
};

export type GetPlaylistByIdFailedActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLIST_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type OpenCreatePlaylistModalActionType = {
  type: typeof PlaylistActionTypes.OPEN_CREATE_PLAYLIST_MODAL;
  payload: undefined;
};

export type CloseCreatePlaylistModalActionType = {
  type: typeof PlaylistActionTypes.CLOSE_CREATE_PLAYLIST_MODAL;
  payload: undefined;
};

export type CreatePlaylistStartActionType = {
  type: typeof PlaylistActionTypes.CREATE_PLAYLIST;
  payload: CreatePlaylistRequestData;
}

export type CreatePlaylistSuccessActionType = {
  type: typeof PlaylistActionTypes.CREATE_PLAYLIST_SUCCESS;
  payload: undefined;
}

export type CreatePlaylistFailedActionType = {
  type: typeof PlaylistActionTypes.CREATE_PLAYLIST_FAILED;
  payload: ActionFailedError;
}

export type OpenEditPlaylistModalActionType = {
  type: typeof PlaylistActionTypes.OPEN_EDIT_PLAYLIST_MODAL;
  payload: undefined;
};

export type CloseEditPlaylistModalActionType = {
  type: typeof PlaylistActionTypes.CLOSE_EDIT_PLAYLIST_MODAL;
  payload: undefined;
};

export type EditPlaylistStartActionType = {
  type: typeof PlaylistActionTypes.EDIT_PLAYLIST;
  payload: EditPlaylistRequestData;
}

export type EditPlaylistSuccessActionType = {
  type: typeof PlaylistActionTypes.EDIT_PLAYLIST_SUCCESS;
  payload: undefined;
}

export type EditPlaylistFailedActionType = {
  type: typeof PlaylistActionTypes.EDIT_PLAYLIST_FAILED;
  payload: ActionFailedError;
}

export type OpenEditPlaylistsModalActionType = {
  type: typeof PlaylistActionTypes.OPEN_EDIT_SONG_PLAYLISTS_MODAL;
  payload: OpenEditSongPlaylistsModal;
};

export type CloseEditPlaylistsModalActionType = {
  type: typeof PlaylistActionTypes.CLOSE_EDIT_SONG_PLAYLISTS_MODAL;
  payload: undefined;
};

export type EditSongPlaylistsStartActionType = {
  type: typeof PlaylistActionTypes.EDIT_SONG_PLAYLISTS;
  payload: EditedPlaylistDataForRequest;
};

export type EditSongPlaylistsSuccessActionType = {
  type: typeof PlaylistActionTypes.EDIT_SONG_PLAYLISTS_SUCCESS;
  payload: undefined;
};

export type EditSongPlaylistsFailedActionType = {
  type: typeof PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED;
  payload: ActionFailedError;
};

export type PinPlaylistStartActionType = {
  type: typeof PlaylistActionTypes.PIN_PLAYLIST;
  payload: ChangePlaylistPinRequestData;
};

export type PinPlaylistSuccessActionType = {
  type: typeof PlaylistActionTypes.PIN_PLAYLIST_SUCCESS;
  payload: undefined;
};

export type PinPlaylistFailedActionType = {
  type: typeof PlaylistActionTypes.PIN_PLAYLIST_FAILED;
  payload: ActionFailedError;
};

export type UnpinPlaylistStartActionType = {
  type: typeof PlaylistActionTypes.UNPIN_PLAYLIST;
  payload: ChangePlaylistPinRequestData;
};

export type UnpinPlaylistSuccessActionType = {
  type: typeof PlaylistActionTypes.UNPIN_PLAYLIST_SUCCESS;
  payload: undefined;
};

export type UnpinPlaylistFailedActionType = {
  type: typeof PlaylistActionTypes.UNPIN_PLAYLIST_FAILED;
  payload: ActionFailedError;
};

export type PlaylistActions =
  | GetPlaylistsByListenerIdStartActionType
  | GetPlaylistsByListenerIdSuccessActionType
  | GetPlaylistsByListenerIdFailedActionType
  | GetPlaylistsInListenerLibraryStartActionType
  | GetPlaylistsInListenerLibrarySuccessActionType
  | GetPlaylistsInListenerLibraryFailedActionType
  | GetPlaylistByIdStartActionType
  | GetPlaylistByIdSuccessActionType
  | GetPlaylistByIdFailedActionType
  | OpenCreatePlaylistModalActionType
  | CloseCreatePlaylistModalActionType
  | CreatePlaylistStartActionType
  | CreatePlaylistSuccessActionType
  | CreatePlaylistFailedActionType
  | EditPlaylistStartActionType
  | EditPlaylistSuccessActionType
  | EditPlaylistFailedActionType
  | OpenEditPlaylistsModalActionType
  | CloseEditPlaylistsModalActionType
  | EditSongPlaylistsStartActionType
  | EditSongPlaylistsSuccessActionType
  | EditSongPlaylistsFailedActionType
  | OpenEditPlaylistModalActionType
  | CloseEditPlaylistModalActionType
  | PinPlaylistStartActionType
  | PinPlaylistSuccessActionType
  | PinPlaylistFailedActionType
  | UnpinPlaylistStartActionType
  | UnpinPlaylistSuccessActionType
  | UnpinPlaylistFailedActionType;
