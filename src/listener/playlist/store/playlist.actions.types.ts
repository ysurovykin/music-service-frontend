import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  PlaylistActionTypes,
  PlaylistInfoResponseData,
  EditPlaylistsRequest,
  openEditSongPlaylistsModal,
  CreatePlaylistRequestData,
  EditPlaylistRequestData,
  PlaylistFullResponseData,
} from "./playlist.model";

export type GetPlaylistsByListenerIdStartActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID;
  payload: string;
};

export type GetPlaylistsByListenerIdSuccessActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS;
  payload: Array<PlaylistInfoResponseData>;
};

export type GetPlaylistsByListenerIdFailedActionType = {
  type: typeof PlaylistActionTypes.GET_PLAYLISTS_BY_LISTENER_ID_FAILED;
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
  payload: openEditSongPlaylistsModal;
};

export type CloseEditPlaylistsModalActionType = {
  type: typeof PlaylistActionTypes.CLOSE_EDIT_SONG_PLAYLISTS_MODAL;
  payload: undefined;
};

export type EditSongPlaylistsStartActionType = {
  type: typeof PlaylistActionTypes.EDIT_SONG_PLAYLISTS;
  payload: EditPlaylistsRequest;
};

export type EditSongPlaylistsSuccessActionType = {
  type: typeof PlaylistActionTypes.EDIT_SONG_PLAYLISTS_SUCCESS;
  payload: undefined;
};

export type EditSongPlaylistsFailedActionType = {
  type: typeof PlaylistActionTypes.EDIT_SONG_PLAYLISTS_FAILED;
  payload: ActionFailedError;
};

export type PlaylistActions =
  | GetPlaylistsByListenerIdStartActionType
  | GetPlaylistsByListenerIdSuccessActionType
  | GetPlaylistsByListenerIdFailedActionType
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
  | CloseEditPlaylistModalActionType;
