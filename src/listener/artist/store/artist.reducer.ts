import { ArtistActionTypes, artistState } from './artist.model';
import { ArtistState } from './artist.model';
import { ArtistActions } from './artist.actions.types';

export const artistReducer = (state = artistState, action: ArtistActions): ArtistState => {
  switch (action.type) {
    case ArtistActionTypes.GET_ARTISTS: {
      return {
        ...state,
        isArtistQueueLoading: true
      }
    }
    case ArtistActionTypes.GET_ARTISTS_SUCCESS: {
      return {
        ...state,
        isArtistQueueLoading: false,
        artistsQueue: action.payload
      }
    }
    case ArtistActionTypes.GET_ARTISTS_FAILED: {
      return {
        ...state,
        isArtistQueueLoading: false
      }
    }
    case ArtistActionTypes.GET_ARTIST_BY_ID: {
      return {
        ...state,
        isArtistLoading: true
      }
    }
    case ArtistActionTypes.GET_ARTIST_BY_ID_SUCCESS: {
      return {
        ...state,
        isArtistLoading: false,
        artistId: action.payload.artistId,
        name: action.payload.name,
        country: action.payload.country,
        description: action.payload.description,
        socialLinks: action.payload.socialLinks,
        followers: action.payload.followers,
        albums: action.payload.albums
      }
    }
    case ArtistActionTypes.GET_ARTIST_BY_ID_FAILED: {
      return {
        ...state,
        isArtistLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}