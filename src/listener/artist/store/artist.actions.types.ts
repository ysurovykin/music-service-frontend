import { ActionFailedError } from "../../../helpers/react/redux.helper";
import { ArtistActionTypes, ArtistFullResponseDataType, ArtistInfoResponseDataType } from "./artist.model";

export type GetArtistsStartActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS;
  payload: undefined;
};

export type GetArtistsSuccessActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_SUCCESS;
  payload: Array<ArtistInfoResponseDataType>;
};

export type GetArtistsFailedActionType = {
  type: typeof ArtistActionTypes.GET_ARTISTS_FAILED;
  payload: ActionFailedError;
};

export type GetArtistByIdStartActionType = {
  type: typeof ArtistActionTypes.GET_ARTIST_BY_ID;
  payload: string;
};

export type GetArtistByIdSuccessActionType = {
  type: typeof ArtistActionTypes.GET_ARTIST_BY_ID_SUCCESS;
  payload: ArtistFullResponseDataType;
};

export type GetArtistByIdFailedActionType = {
  type: typeof ArtistActionTypes.GET_ARTIST_BY_ID_FAILED;
  payload: ActionFailedError;
};

export type ArtistActions =
  | GetArtistsStartActionType
  | GetArtistsSuccessActionType
  | GetArtistsFailedActionType
  | GetArtistByIdStartActionType
  | GetArtistByIdSuccessActionType
  | GetArtistByIdFailedActionType;
