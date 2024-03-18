import { AlbumInfoResponseData } from "../album/store/album.model";
import { ArtistInfoResponseData } from "../artist/store/artist.model";
import { PlaylistInfoResponseData } from "../playlist/store/playlist.model";

export const listenerState: ListenerState = {
  isListenerLoading: undefined,
  name: undefined,
  profileImageUrl: undefined,
  backgroundColor: undefined,
  mostVisitedContent: undefined,
  isMostVisitedContentLoading: false
};

export interface ListenerState {
  isListenerLoading?: boolean,
  name?: string
  profileImageUrl?: string;
  backgroundColor?: string;
  mostVisitedContent?: Array<MostVisitedContentData>;
  isMostVisitedContentLoading?: boolean;
}

export enum RepeatSongStateEnum {
  'none' = 'none',
  'loop' = 'loop',
  'one' = 'one'
}

export type RepeatSongStates = 'none' | 'loop' | 'one';

export type ListenerInfoResponseData = {
  name?: string;
  profileImageUrl?: string;
  backgroundColor?: string;
}

export type MostVisitedContentData = 
  ArtistInfoResponseData & { type: 'artist' } | 
  AlbumInfoResponseData & { type: 'album' } |
  PlaylistInfoResponseData & { type: 'playlist' };

export enum ListenerActionTypes {
  GET_LISTENER_BY_ID = "LISTENER.GET_LISTENER_BY_ID_START",
  GET_LISTENER_BY_ID_SUCCESS = "LISTENER.GET_LISTENER_BY_ID_SUCCESS",
  GET_LISTENER_BY_ID_FAILED = "LISTENER.GET_LISTENER_BY_ID_FAILED",

  GET_RECENT_MOST_VISITED_CONTENT = "LISTENER.GET_RECENT_MOST_VISITED_CONTENT_START",
  GET_RECENT_MOST_VISITED_CONTENT_SUCCESS = "LISTENER.GET_RECENT_MOST_VISITED_CONTENT_SUCCESS",
  GET_RECENT_MOST_VISITED_CONTENT_FAILED = "LISTENER.GET_RECENT_MOST_VISITED_CONTENT_FAILED",
};