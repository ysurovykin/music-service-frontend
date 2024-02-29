import { SongInfoResponseData } from "../../song/store/song.model";

export const playlistState: PlaylistState = {
  playlists: undefined,
  isPlaylistsLoading: false,
  isPlaylistDataLoading: false,
  playlistId: undefined,
  name: undefined,
  date: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined
};

export interface PlaylistState extends PlaylistInfoResponseData {
  isPlaylistsLoading: boolean,
  isPlaylistDataLoading: boolean,
  playlists?: Array<PlaylistInfoResponseData>
}

export type CreatePlaylistRequestData = {
  name: string;
  listenerId: string;
  songIds?: Array<string>;
};

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
  date?: Date;
  tag?: string;
  coverImageUrl?: string;
  backgroundColor?: string;
}

export enum PlaylistActionTypes {
  GET_PLAYLISTS_BY_LISTENER_ID = "PLAYLIST.GET_PLAYLISTS_BY_LISTENER_ID_START",
  GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS = "PLAYLIST.GET_PLAYLISTS_BY_LISTENER_ID_SUCCESS",
  GET_PLAYLISTS_BY_LISTENER_ID_FAILED = "PLAYLIST.GET_PLAYLISTS_BY_LISTENER_ID_FAILED",
  GET_PLAYLIST_BY_ID = "PLAYLIST.GET_PLAYLIST_BY_ID_START",
  GET_PLAYLIST_BY_ID_SUCCESS = "PLAYLIST.GET_PLAYLIST_BY_ID_SUCCESS",
  GET_PLAYLIST_BY_ID_FAILED = "PLAYLIST.GET_PLAYLIST_BY_ID_FAILED",
};