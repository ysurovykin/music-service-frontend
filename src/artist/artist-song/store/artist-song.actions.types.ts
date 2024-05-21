import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  ArtistSongActionTypes,
  GetArtistAlbumSongsResponseData,
  ArtistSongInfoResponseData,
  UploadSongRequestData
} from "./artist-song.model";

export type GetArtistAlbumSongsStartActionType = {
  type: typeof ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS;
  payload: string;
};

export type GetArtistAlbumSongsSuccessActionType = {
  type: typeof ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_SUCCESS;
  payload: GetArtistAlbumSongsResponseData;
};

export type GetArtistAlbumSongsFailedActionType = {
  type: typeof ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_FAILED;
  payload: ActionFailedError;
};

export type UploadSongStartActionType = {
  type: typeof ArtistSongActionTypes.UPLOAD_SONG;
  payload: UploadSongRequestData;
};

export type UploadSongSuccessActionType = {
  type: typeof ArtistSongActionTypes.UPLOAD_SONG_SUCCESS;
  payload: undefined;
};

export type UploadSongFailedActionType = {
  type: typeof ArtistSongActionTypes.UPLOAD_SONG_FAILED;
  payload: ActionFailedError;
};

export type HideSongStartActionType = {
  type: typeof ArtistSongActionTypes.HIDE_SONG;
  payload: string;
};

export type HideSongSuccessActionType = {
  type: typeof ArtistSongActionTypes.HIDE_SONG_SUCCESS;
  payload: undefined;
};

export type HideSongFailedActionType = {
  type: typeof ArtistSongActionTypes.HIDE_SONG_FAILED;
  payload: ActionFailedError;
};

export type UnhideSongStartActionType = {
  type: typeof ArtistSongActionTypes.UNHIDE_SONG;
  payload: string;
};

export type UnhideSongSuccessActionType = {
  type: typeof ArtistSongActionTypes.UNHIDE_SONG_SUCCESS;
  payload: undefined;
};

export type UnhideSongFailedActionType = {
  type: typeof ArtistSongActionTypes.UNHIDE_SONG_FAILED;
  payload: ActionFailedError;
};

export type OpenUploadSongModalActionType = {
  type: typeof ArtistSongActionTypes.OPEN_UPLOAD_SONG_MODAL;
  payload: undefined;
};

export type CloseUploadSongModalActionType = {
  type: typeof ArtistSongActionTypes.CLOSE_UPLOAD_SONG_MODAL;
  payload: undefined;
};

export type SongActions =
  | UploadSongStartActionType
  | UploadSongSuccessActionType
  | UploadSongFailedActionType
  | GetArtistAlbumSongsStartActionType
  | GetArtistAlbumSongsSuccessActionType
  | GetArtistAlbumSongsFailedActionType
  | HideSongStartActionType
  | HideSongSuccessActionType
  | HideSongFailedActionType
  | UnhideSongStartActionType
  | UnhideSongSuccessActionType
  | UnhideSongFailedActionType
  | OpenUploadSongModalActionType
  | CloseUploadSongModalActionType;
