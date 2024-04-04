import { AlbumInfoResponseData } from "../album/store/album.model";
import { ArtistInfoResponseData } from "../artist/store/artist.model";
import { PlaylistInfoResponseData } from "../playlist/store/playlist.model";

export const listenerState: ListenerState = {
  isListenerLoading: undefined,
  name: undefined,
  profileImageUrl: undefined,
  backgroundColor: undefined,
  mostVisitedContent: undefined,
  isMostVisitedContentLoading: false,
  homePageContent: undefined,
  isHomePageContentLoading: false,
  subscription: undefined
};

export interface ListenerState {
  isListenerLoading?: boolean,
  name?: string
  profileImageUrl?: string;
  backgroundColor?: string;
  mostVisitedContent?: Array<ContentData>;
  isMostVisitedContentLoading?: boolean;
  homePageContent?: Array<HomePageContentResponseData>;
  isHomePageContentLoading?: boolean;
  subscription?: string;
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
  subscription?: string;
}

export type ContentData =
  ArtistInfoResponseData & { type: 'artist' } |
  AlbumInfoResponseData & { type: 'album' } |
  PlaylistInfoResponseData & { type: 'playlist' };

export enum HomePageContentTypesEnum {
  'artist' = 'artist',
  'album' = 'album',
  'playlist' = 'playlist'
}

export type HomePageContentResponseData = {
  contentType: HomePageContentTypesEnum,
  contentTitle: string,
  content: Array<ContentData>
}

export enum ListenerActionTypes {
  GET_LISTENER_BY_ID = "LISTENER.GET_LISTENER_BY_ID_START",
  GET_LISTENER_BY_ID_SUCCESS = "LISTENER.GET_LISTENER_BY_ID_SUCCESS",
  GET_LISTENER_BY_ID_FAILED = "LISTENER.GET_LISTENER_BY_ID_FAILED",

  GET_RECENT_MOST_VISITED_CONTENT = "LISTENER.GET_RECENT_MOST_VISITED_CONTENT_START",
  GET_RECENT_MOST_VISITED_CONTENT_SUCCESS = "LISTENER.GET_RECENT_MOST_VISITED_CONTENT_SUCCESS",
  GET_RECENT_MOST_VISITED_CONTENT_FAILED = "LISTENER.GET_RECENT_MOST_VISITED_CONTENT_FAILED",

  GET_HOME_PAGE_CONTENT = "LISTENER.GET_HOME_PAGE_CONTENT_START",
  GET_HOME_PAGE_CONTENT_SUCCESS = "LISTENER.GET_HOME_PAGE_CONTENT_SUCCESS",
  GET_HOME_PAGE_CONTENT_FAILED = "LISTENER.GET_HOME_PAGE_CONTENT_FAILED",
};