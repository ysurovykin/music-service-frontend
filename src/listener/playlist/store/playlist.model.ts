import { SongInfoResponseData } from "../../song/store/song.model";

export const playlistState: PlaylistState = {
  playlists: undefined,
  isPlaylistsLoading: false,
  isPlaylistDataLoading: false,
  playlistId: undefined,
  name: undefined,
  editable: undefined,
  pinned: undefined,
  description: undefined,
  tag: undefined,
  date: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined,
  isCreatePlaylistModalOpen: undefined,
  isCreatePlaylistLoading: undefined,
  isEditPlaylistModalOpen: undefined,
  isEditPlaylistLoading: undefined,
  isEditSongPlaylistsModalOpen: undefined,
  isEditSongPlaylistsLoading: undefined,
  editPlaylistsSong: undefined,
  songsTimeDuration: undefined,
  songsCount: undefined
};

export interface PlaylistState extends PlaylistFullResponseData {
  isPlaylistsLoading: boolean,
  isPlaylistDataLoading: boolean,
  playlists?: Array<PlaylistInfoResponseData>,
  isCreatePlaylistModalOpen?: boolean,
  isCreatePlaylistLoading?: boolean,
  isEditPlaylistModalOpen?: boolean,
  isEditPlaylistLoading?: boolean,
  isEditSongPlaylistsModalOpen?: boolean;
  isEditSongPlaylistsLoading?: boolean;
  editPlaylistsSong?: SongInfoResponseData;
}

export type EditedPlaylist = {
  playlist: PlaylistInfoResponseData;
  added: boolean;
}

export type EditedPlaylistShortInfo = {
  playlistId: string;
  added: boolean;
}

export type EditedPlaylistDataForRequest = {
  songId: string;
  editedPlaylists: Array<EditedPlaylist>;
  playlistIdToUpdate?: string;
  updateArtistLikedSongCount?: boolean;
}

export type EditedPlaylistRequest = {
  songId: string;
  editedPlaylists: Array<EditedPlaylistShortInfo>;
}

export type PlaylistShortData = {
  name: string;
  id: string;
}

export enum PlaylistTagEnum {
  'liked' = 'liked'
}

export type PlaylistInfoResponseData = {
  playlistId?: string;
  name?: string;
  description?: string;
  date?: Date;
  editable?: boolean;
  pinned?: boolean;
  tag?: string;
  coverImageUrl?: string;
  backgroundColor?: string;
}

export type PlaylistFullResponseData = PlaylistInfoResponseData & {
  songsTimeDuration?: number;
  songsCount?: number;
}

export type openEditSongPlaylistsModal = {
  editPlaylistsSong: SongInfoResponseData;
};

export type CreatePlaylistRequestData = {
  name: string;
  description?: string;
  songIds?: Array<string>;
  coverImage?: Blob;
  backgroundColor?: string;
};

export type EditPlaylistRequestData = CreatePlaylistRequestData & {
  playlistId: string;
};

export enum PlaylistActionTypes {
  GET_PLAYLISTS_BY_LISTENER_ID = "PLAYLIST.GET_PLAYLISTS_BY_LISTENER_ID_START",
  GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS = "PLAYLIST.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS",
  GET_PLAYLISTS_BY_LISTENER_ID_FAILED = "PLAYLIST.GET_PLAYLISTS_BY_LISTENER_ID_FAILED",

  GET_PLAYLIST_BY_ID = "PLAYLIST.GET_PLAYLIST_BY_ID_START",
  GET_PLAYLIST_BY_ID_SUCCESS = "PLAYLIST.GET_PLAYLIST_BY_ID_SUCCESS",
  GET_PLAYLIST_BY_ID_FAILED = "PLAYLIST.GET_PLAYLIST_BY_ID_FAILED",

  OPEN_CREATE_PLAYLIST_MODAL = "PLAYLIST.OPEN_CREATE_PLAYLIST_MODAL",
  CLOSE_CREATE_PLAYLIST_MODAL = "PLAYLIST.CLOSE_CREATE_PLAYLIST_MODAL",

  CREATE_PLAYLIST = "PLAYLIST.CREATE_PLAYLIST_START",
  CREATE_PLAYLIST_SUCCESS = "PLAYLIST.CREATE_PLAYLIST_SUCCESS",
  CREATE_PLAYLIST_FAILED = "PLAYLIST.CREATE_PLAYLIST_FAILED",

  OPEN_EDIT_PLAYLIST_MODAL = "PLAYLIST.OPEN_EDIT_PLAYLIST_MODAL",
  CLOSE_EDIT_PLAYLIST_MODAL = "PLAYLIST.CLOSE_EDIT_PLAYLIST_MODAL",

  EDIT_PLAYLIST = "PLAYLIST.EDIT_PLAYLIST_START",
  EDIT_PLAYLIST_SUCCESS = "PLAYLIST.EDIT_PLAYLIST_SUCCESS",
  EDIT_PLAYLIST_FAILED = "PLAYLIST.EDIT_PLAYLIST_FAILED",

  OPEN_EDIT_SONG_PLAYLISTS_MODAL = "PLAYLIST.OPEN_EDIT_SONG_PLAYLISTS_MODAL",
  CLOSE_EDIT_SONG_PLAYLISTS_MODAL = "PLAYLIST.CLOSE_EDIT_SONG_PLAYLISTS_MODAL",

  EDIT_SONG_PLAYLISTS = "PLAYLIST.EDIT_SONG_PLAYLISTS",
  EDIT_SONG_PLAYLISTS_SUCCESS = "PLAYLIST.EDIT_SONG_PLAYLISTS_SUCCESS",
  EDIT_SONG_PLAYLISTS_FAILED = "PLAYLIST.EDIT_SONG_PLAYLISTS_FAILED",

  PIN_PLAYLIST = "PLAYLIST.PIN_PLAYLIST",
  PIN_PLAYLIST_SUCCESS = "PLAYLIST.PIN_PLAYLIST_SUCCESS",
  PIN_PLAYLIST_FAILED = "PLAYLIST.PIN_PLAYLISTS_FAILED",

  UNPIN_PLAYLIST = "PLAYLIST.UNPIN_PLAYLIST",
  UNPIN_PLAYLIST_SUCCESS = "PLAYLIST.UNPIN_PLAYLIST_SUCCESS",
  UNPIN_PLAYLIST_FAILED = "PLAYLIST.UNPIN_PLAYLIST_FAILED",
};