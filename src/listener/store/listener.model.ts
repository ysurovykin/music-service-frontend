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
  subscription: undefined,
  isEditProfileLoading: false,
  isEditProfileModalOpen: false,
  isAccountContentCountLoading: false,
  playlistCount: undefined,
  followedArtistsCount: undefined,
  likedAlbumsCount: undefined,
  isGetStartedModalOpen: false,
  recommendedGenres: undefined,
  otherGenres: undefined,
  recommendedArtists: undefined,
  isExistingGenresLoading: false,
  isRecommendedArtistsLoading: false,
  isMoreRecommendedArtistsForLoading: false,
  getStartedCompleted: undefined,
  isSaveGetStartedResultsLoading: false,
  isChangeSubscriptionModalOpen: false,
  isSubscriptionChangingLoading: false,
  isGetUserCreditCardsLoading: false,
  userCreditCards: undefined,
  subscriptionCanceledAtDate: undefined,
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
  isEditProfileLoading?: boolean;
  isEditProfileModalOpen?: boolean;
  isAccountContentCountLoading?: boolean;
  playlistCount?: number;
  followedArtistsCount?: number;
  likedAlbumsCount?: number;
  isGetStartedModalOpen?: boolean;
  recommendedGenres?: Array<string>;
  otherGenres?: Array<string>;
  isExistingGenresLoading: boolean;
  recommendedArtists?: Array<ArtistInfoResponseData>;
  isRecommendedArtistsLoading: boolean;
  isMoreRecommendedArtistsForLoading: boolean;
  getStartedCompleted?: boolean;
  isSaveGetStartedResultsLoading?: boolean;
  isChangeSubscriptionModalOpen?: boolean;
  isSubscriptionChangingLoading?: boolean;
  isGetUserCreditCardsLoading?: boolean;
  userCreditCards?: Array<UserCreditCardInfo>;
  subscriptionCanceledAtDate?: string;
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
  getStartedCompleted?: boolean;
  subscriptionCanceledAtDate?: string;
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

export type EditProfileRequestData = {
  name: string;
  profileImage?: Blob;
}

export type GetAccountContentCountResponseData = {
  playlistCount: number;
  followedArtistsCount: number;
  likedAlbumsCount: number;
}

export enum GetStartedGenresTypeEnum {
  'choosen' = 'choosen',
  'recommended' = 'recommended',
  'other' = 'other',
}

export type GetStartedGenresData = {
  genre: string;
  type: 'choosen' | 'recommended' | 'other'
}

export type GetExistingGenresRequestData = {
  choosenGenres: Array<string>;
  search: string;
}

export type GetExistingGenresResponseData = {
  recommendedGenres: Array<string>;
  otherGenres: Array<string>;
}

export type GetRecommendedArtistsRequestData = {
  genres: Array<string>;
  offset: number;
  limit: number;
}

export type GetRecommendedArtistsResponseData = {
  recommendedArtists: Array<ArtistInfoResponseData>;
  isMoreRecommendedArtistsForLoading: boolean;
}

export type SaveGetStartedResultsRequestData = {
  genres: Array<string>;
  artistIds: Array<string>;
}

export type GetHomePageContentRequestData = {
  forceUpdate?: boolean;
}

export type CardDetails = {
  holderName: string;
  number: string;
  date: string;
  cvv: string;
}

export type UserCreditCardInfo = {
  cardId: string;
  lastDigits: string;
}

export type ChangeSubscriptionRequestData = {
  subscription: string;
  cardId?: string; //if cardDetails is undefined
  cardDetails?: CardDetails; //if cardId is undefined
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

  EDIT_PROFILE = "LISTENER.EDIT_PROFILE_START",
  EDIT_PROFILE_SUCCESS = "LISTENER.EDIT_PROFILE_SUCCESS",
  EDIT_PROFILE_FAILED = "LISTENER.EDIT_PROFILE_FAILED",

  OPEN_EDIT_PROFILE_MODAL = "LISTENER.OPEN_EDIT_PROFILE_MODAL",
  CLOSE_EDIT_PROFILE_MODAL = "LISTENER.CLOSE_EDIT_PROFILE_MODAL",

  GET_ACCOUNT_CONTENT_COUNT = "LISTENER.GET_ACCOUNT_CONTENT_COUNT_START",
  GET_ACCOUNT_CONTENT_COUNT_SUCCESS = "LISTENER.GET_ACCOUNT_CONTENT_COUNT_SUCCESS",
  GET_ACCOUNT_CONTENT_COUNT_FAILED = "LISTENER.GET_ACCOUNT_CONTENT_COUNT_FAILED",

  OPEN_GET_STARTED_MODAL = "LISTENER.OPEN_GET_STARTED_MODAL",
  CLOSE_GET_STARTED_MODAL = "LISTENER.CLOSE_GET_STARTED_MODAL",

  GET_EXISTING_GENRES = "LISTENER.GET_EXISTING_GENRES_START",
  GET_EXISTING_GENRES_SUCCESS = "LISTENER.GET_EXISTING_GENRES_SUCCESS",
  GET_EXISTING_GENRES_FAILED = "LISTENER.GET_EXISTING_GENRES_FAILED",

  GET_RECOMMENDED_ARTISTS = "LISTENER.GET_RECOMMENDED_ARTISTS_START",
  GET_RECOMMENDED_ARTISTS_SUCCESS = "LISTENER.GET_RECOMMENDED_ARTISTS_SUCCESS",
  GET_RECOMMENDED_ARTISTS_FAILED = "LISTENER.GET_RECOMMENDED_ARTISTS_FAILED",

  LOAD_MORE_RECOMMENDED_ARTISTS = "LISTENER.LOAD_MORE_RECOMMENDED_ARTISTS_START",
  LOAD_MORE_RECOMMENDED_ARTISTS_SUCCESS = "LISTENER.LOAD_MORE_RECOMMENDED_ARTISTS_SUCCESS",
  LOAD_MORE_RECOMMENDED_ARTISTS_FAILED = "LISTENER.LOAD_MORE_RECOMMENDED_ARTISTS_FAILED",

  SAVE_GET_STARTED_RESULTS = "LISTENER.SAVE_GET_STARTED_RESULTS_START",
  SAVE_GET_STARTED_RESULTS_SUCCESS = "LISTENER.SAVE_GET_STARTED_RESULTS_SUCCESS",
  SAVE_GET_STARTED_RESULTS_FAILED = "LISTENER.SAVE_GET_STARTED_RESULTS_FAILED",

  OPEN_CHANGE_SUBSCRIPTION_MODAL = "LISTENER.OPEN_CHANGE_SUBSCRIPTION_MODAL",
  CLOSE_CHANGE_SUBSCRIPTION_MODAL = "LISTENER.CLOSE_CHANGE_SUBSCRIPTION_MODAL",

  CHANGE_SUBSCRIPTION = "LISTENER.CHANGE_SUBSCRIPTION_START",
  CHANGE_SUBSCRIPTION_SUCCESS = "LISTENER.CHANGE_SUBSCRIPTION_SUCCESS",
  CHANGE_SUBSCRIPTION_FAILED = "LISTENER.CHANGE_SUBSCRIPTION_FAILED",

  GET_USER_CREDIT_CARDS = "LISTENER.GET_USER_CREDIT_CARDS_START",
  GET_USER_CREDIT_CARDS_SUCCESS = "LISTENER.GET_USER_CREDIT_CARDS_SUCCESS",
  GET_USER_CREDIT_CARDS_FAILED = "LISTENER.GET_USER_CREDIT_CARDS_FAILED",

  DELETE_USER_CREDIT_CARD = "LISTENER.DELETE_USER_CREDIT_CARD_START",
  DELETE_USER_CREDIT_CARD_SUCCESS = "LISTENER.DELETE_USER_CREDIT_CARD_SUCCESS",
  DELETE_USER_CREDIT_CARD_FAILED = "LISTENER.DELETE_USER_CREDIT_CARD_FAILED",
};