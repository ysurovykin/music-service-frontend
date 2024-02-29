import { AlbumShortDataType } from "../../album/store/album.model";
import { ArtistShortData } from "../../artist/store/artist.model";

export const songState: SongState = {
  isEditPlaylistModalOpen: undefined,
  isPlaylistIdsLoading: undefined,
  editPlaylistsSongId: undefined,
  editPlaylistsSongPlaylistIds: undefined,
  isSongsLoading: undefined,
  songs: undefined,
  isMoreSongsForLoading: undefined
};

export interface SongState {
  isEditPlaylistModalOpen?: boolean;
  isPlaylistIdsLoading?: boolean;
  editPlaylistsSongId?: string;
  editPlaylistsSongPlaylistIds?: Array<string>;
  isSongsLoading?: boolean;
  songs?: Array<SongInfoResponseData>;
  isMoreSongsForLoading?: boolean;
}

export type EditedPlaylist = {
  playlistId: string;
  added: boolean;
}

export type EditPlaylistsRequest = {
  songId: string;
  editedPlaylists: Array<EditedPlaylist>;
  playlistIdToUpdate?: string
}

export type SongInfoResponseData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortData>;
  album?: AlbumShortDataType;
  plays?: number;
  date?: Date;
  duration?: number;
  coverImageUrl?: string;
  backgroundColor?: string;
  lyricsBackgroundShadow?: string;
  songUrl?: string;
  playlistIds?: Array<string>;
}

export type OpenEditPlaylistsModal = {
  editPlaylistsSongId: string;
  editPlaylistsSongPlaylistIds: Array<string>;
};

export type GetSongsRequestData = {
  options: GetSongsOptions;
  offset: number;
  limit: number;
}

export type GetSongsResponseData = {
  songs: Array<SongInfoResponseData>;
  isMoreSongsForLoading: boolean;
}

export type GetSongsOptions = {
  albumId?: string;
  artistId?: string;
  playlistId?: string;
}

export enum SongActionTypes {
  OPEN_EDIT_PLAYLISTS_MODAL = "SONG.OPEN_EDIT_PLAYLISTS_MODAL",
  CLOSE_EDIT_PLAYLISTS_MODAL = "SONG.CLOSE_EDIT_PLAYLISTS_MODAL",

  EDIT_PLAYLISTS = "SONG.EDIT_PLAYLISTS",
  EDIT_PLAYLISTS_SUCCESS = "SONG.EDIT_PLAYLISTS_SUCCESS",
  EDIT_PLAYLISTS_FAILED = "SONG.EDIT_PLAYLISTS_FAILED",

  GET_SONGS = "SONG.GET_SONGS_START",
  GET_SONGS_SUCCESS = "SONG.GET_SONGS_SUCCESS",
  GET_SONGS_FAILED = "SONG.GET_SONGS_FAILED",

  CLEAR_SONGS = "SONG.CLEAR_SONGS"
};