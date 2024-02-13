import { ActionFailedError } from "../../../helpers/react/redux.helper";
import {
  GetArtistsFailedActionType,
  GetArtistsStartActionType,
  GetArtistsSuccessActionType,
  GetArtistByIdStartActionType,
  GetArtistByIdSuccessActionType,
  GetArtistByIdFailedActionType
} from "./artist.actions.types";
import { ArtistActionTypes, ArtistFullResponseDataType, ArtistInfoResponseDataType } from "./artist.model";

export const getArtistsStartAction = ():
  GetArtistsStartActionType => ({ type: ArtistActionTypes.GET_ARTISTS, payload: undefined });

export const getArtistsSuccessAction = (response: Array<ArtistInfoResponseDataType>):
  GetArtistsSuccessActionType => ({ type: ArtistActionTypes.GET_ARTISTS_SUCCESS, payload: response });

export const getArtistsFailedAction = (error: ActionFailedError):
  GetArtistsFailedActionType => ({ type: ArtistActionTypes.GET_ARTISTS_FAILED, payload: error });

export const getArtistByIdStartAction = (artistId: string):
  GetArtistByIdStartActionType => ({ type: ArtistActionTypes.GET_ARTIST_BY_ID, payload: artistId });

export const getArtistByIdSuccessAction = (response: ArtistFullResponseDataType):
  GetArtistByIdSuccessActionType => ({ type: ArtistActionTypes.GET_ARTIST_BY_ID_SUCCESS, payload: response });

export const getArtistByIdFailedAction = (error: ActionFailedError):
  GetArtistByIdFailedActionType => ({ type: ArtistActionTypes.GET_ARTIST_BY_ID_FAILED, payload: error });

export const artistActions = {
  getArtists: () => getArtistsStartAction(),
  getArtistsSuccess: (response: Array<ArtistInfoResponseDataType>) => getArtistsSuccessAction(response),
  getArtistsFailed: (error: ActionFailedError) => getArtistsFailedAction(error),
  getArtistById: (artistId: string) => getArtistByIdStartAction(artistId),
  getArtistByIdSuccess: (response: ArtistFullResponseDataType) => getArtistByIdSuccessAction(response),
  getArtistByIdFailed: (error: ActionFailedError) => getArtistByIdFailedAction(error),
}

