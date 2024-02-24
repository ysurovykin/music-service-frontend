import { AlbumShortDataType } from "../../album/store/album.model";
import { ArtistShortData } from "../../artist/store/artist.model";

export const songState: SongState = {
  name: undefined,
  artists: undefined,
  songId: undefined,
  album: undefined,
  plays: undefined,
  date: undefined,
  duration: undefined,
  coverImageUrl: undefined,
  backgroundColor: undefined,
  lyricsBackgroundShadow: undefined,
  songUrl: undefined,
  isSongDataLoading: false,
  isPlaying: false,
  isEditPlaylistModalOpen: undefined,
  playlistIds: undefined,
  isPlaylistIdsLoading: undefined,
  editPlaylistsSongId: undefined,
  editPlaylistsSongPlaylistIds: undefined,
  isSongsLoading: undefined,
  songs: undefined,
  isMoreSongsForLoading: undefined
};

export interface SongState extends SongInfoResponseData {
  isPlaying?: boolean;
  isSongDataLoading?: boolean;
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

export type PlaySongData = {
  songId?: string;
  name?: string;
  artists?: Array<ArtistShortData>;
  coverImageUrl?: string;
  backgroundColor?: string;
  lyricsBackgroundShadow?: string;
  songUrl?: string;
  duration?: number;
  playlistIds?: Array<string>;
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

export type EditPlaylistResult = {
  playlistIds: Array<string>,
  songs?: Array<SongInfoResponseData>;
}

export enum SongActionTypes {
  GET_SONG_BY_ID = "GET_SONG_BY_ID_START",
  GET_SONG_BY_ID_SUCCESS = "GET_SONG_BY_ID_SUCCESS",
  GET_SONG_BY_ID_FAILED = "GET_SONG_BY_ID_FAILED",

  PLAY_SONG = "PLAY_SONG",
  UNPAUSE_SONG = "UNPAUSE_SONG",
  PAUSE_SONG = "PAUSE_SONG",

  OPEN_EDIT_PLAYLISTS_MODAL = "OPEN_EDIT_PLAYLISTS_MODAL",
  CLOSE_EDIT_PLAYLISTS_MODAL = "CLOSE_EDIT_PLAYLISTS_MODAL",

  EDIT_PLAYLISTS = "EDIT_PLAYLISTS",
  EDIT_PLAYLISTS_SUCCESS = "EDIT_PLAYLISTS_SUCCESS",
  EDIT_PLAYLISTS_FAILED = "EDIT_PLAYLISTS_FAILED",

  GET_SONGS = "GET_SONGS_START",
  GET_SONGS_SUCCESS = "GET_SONGS_SUCCESS",
  GET_SONGS_FAILED = "GET_SONGS_FAILED",

  CLEAR_SONGS = "CLEAR_SONGS"
};