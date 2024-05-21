import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  UploadSongStartActionType,
  UploadSongSuccessActionType,
  UploadSongFailedActionType,
  GetArtistAlbumSongsStartActionType,
  GetArtistAlbumSongsSuccessActionType,
  GetArtistAlbumSongsFailedActionType,
  HideSongStartActionType,
  HideSongSuccessActionType,
  HideSongFailedActionType,
  UnhideSongStartActionType,
  UnhideSongSuccessActionType,
  UnhideSongFailedActionType,
  OpenUploadSongModalActionType,
  CloseUploadSongModalActionType,
} from "./artist-song.actions.types";
import {
  ArtistSongActionTypes,
  ArtistSongInfoResponseData,
  GetArtistAlbumSongsResponseData,
  UploadSongRequestData
} from "./artist-song.model";

export const getArtistAlbumSongsStartAction = (albumId: string):
  GetArtistAlbumSongsStartActionType => ({ type: ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS, payload: albumId });

export const getArtistAlbumSongsSuccessAction = (response: GetArtistAlbumSongsResponseData):
  GetArtistAlbumSongsSuccessActionType => ({ type: ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_SUCCESS, payload: response });

export const getArtistAlbumSongsFailedAction = (error: ActionFailedError):
  GetArtistAlbumSongsFailedActionType => ({ type: ArtistSongActionTypes.GET_ARTIST_ALBUM_SONGS_FAILED, payload: error });

export const uploadSongStartAction = (request: UploadSongRequestData):
  UploadSongStartActionType => ({ type: ArtistSongActionTypes.UPLOAD_SONG, payload: request });

export const uploadSongSuccessAction = ():
  UploadSongSuccessActionType => ({ type: ArtistSongActionTypes.UPLOAD_SONG_SUCCESS, payload: undefined });

export const uploadSongFailedAction = (error: ActionFailedError):
  UploadSongFailedActionType => ({ type: ArtistSongActionTypes.UPLOAD_SONG_FAILED, payload: error });

export const hideSongStartAction = (songId: string):
  HideSongStartActionType => ({ type: ArtistSongActionTypes.HIDE_SONG, payload: songId });

export const hideSongSuccessAction = ():
  HideSongSuccessActionType => ({ type: ArtistSongActionTypes.HIDE_SONG_SUCCESS, payload: undefined });

export const hideSongFailedAction = (error: ActionFailedError):
  HideSongFailedActionType => ({ type: ArtistSongActionTypes.HIDE_SONG_FAILED, payload: error });

export const unhideSongStartAction = (songId: string):
  UnhideSongStartActionType => ({ type: ArtistSongActionTypes.UNHIDE_SONG, payload: songId });

export const unhideSongSuccessAction = ():
  UnhideSongSuccessActionType => ({ type: ArtistSongActionTypes.UNHIDE_SONG_SUCCESS, payload: undefined });

export const unhideSongFailedAction = (error: ActionFailedError):
  UnhideSongFailedActionType => ({ type: ArtistSongActionTypes.UNHIDE_SONG_FAILED, payload: error });

export const openUploadSongModalAction = ():
  OpenUploadSongModalActionType => ({ type: ArtistSongActionTypes.OPEN_UPLOAD_SONG_MODAL, payload: undefined });

export const closeUploadSongModalAction = ():
  CloseUploadSongModalActionType => ({ type: ArtistSongActionTypes.CLOSE_UPLOAD_SONG_MODAL, payload: undefined });

export const artistSongActions = {
  getArtistAlbumSongs: (albumId: string) => getArtistAlbumSongsStartAction(albumId),
  getArtistAlbumSongsSuccess: (response: GetArtistAlbumSongsResponseData) => getArtistAlbumSongsSuccessAction(response),
  getArtistAlbumSongsFailed: (error: ActionFailedError) => getArtistAlbumSongsFailedAction(error),
  uploadSong: (request: UploadSongRequestData) => uploadSongStartAction(request),
  uploadSongSuccess: () => uploadSongSuccessAction(),
  uploadSongFailed: (error: ActionFailedError) => uploadSongFailedAction(error),
  hideSong: (songId: string) => hideSongStartAction(songId),
  hideSongSuccess: () => hideSongSuccessAction(),
  hideSongFailed: (error: ActionFailedError) => hideSongFailedAction(error),
  unhideSong: (songId: string) => unhideSongStartAction(songId),
  unhideSongSuccess: () => unhideSongSuccessAction(),
  unhideSongFailed: (error: ActionFailedError) => unhideSongFailedAction(error),
  openUploadSongModal: () => openUploadSongModalAction(),
  closeUploadSongModal: () => closeUploadSongModalAction(),
}
