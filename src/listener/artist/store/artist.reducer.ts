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
        artists: action.payload.artists,
        isMoreArtistsForLoading: action.payload.isMoreArtistsForLoading
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
        isArtistsLoading: true
      }
    }
    case ArtistActionTypes.GET_ARTIST_BY_ID_SUCCESS: {
      return {
        ...state,
        isArtistsLoading: false,
        artistId: action.payload.artistId,
        name: action.payload.name,
        country: action.payload.country,
        description: action.payload.description,
        socialLinks: action.payload.socialLinks,
        followers: action.payload.followers,
        backgroundColor: action.payload.backgroundColor,
        profileImageUrl: action.payload.profileImageUrl,
        songsCount: action.payload.songsCount,
        songsTimeDuration: action.payload.songsTimeDuration,
        likedSongsCount: action.payload.likedSongsCount,
        likedSongsTimeDuration: action.payload.likedSongsTimeDuration,
        albumsCount: action.payload.albumsCount,
        albumsWhereAppearsCount: action.payload.albumsWhereAppearsCount,
      }
    }
    case ArtistActionTypes.GET_ARTIST_BY_ID_FAILED: {
      return {
        ...state,
        isArtistsLoading: false
      }
    }
    case ArtistActionTypes.FOLLOW_ARTIST_SUCCESS: {
      return {
        ...state,
        isFollowed: true
      }
    }
    case ArtistActionTypes.UNFOLLOW_ARTIST_SUCCESS: {
      return {
        ...state,
        isFollowed: false
      }
    }
    case ArtistActionTypes.GET_GENRES: {
      return {
        ...state,
        isGenresLoading: true
      }
    }
    case ArtistActionTypes.GET_GENRES_SUCCESS: {
      return {
        ...state,
        isGenresLoading: false,
        genres: action.payload
      }
    }
    case ArtistActionTypes.GET_GENRES_FAILED: {
      return {
        ...state,
        isGenresLoading: false
      }
    }
    case ArtistActionTypes.GET_MOST_RECENT_RELEASE: {
      return {
        ...state,
        isMostRecentReleaseLoading: true
      }
    }
    case ArtistActionTypes.GET_MOST_RECENT_RELEASE_SUCCESS: {
      return {
        ...state,
        isMostRecentReleaseLoading: false,
        mostRecentRelease: action.payload
      }
    }
    case ArtistActionTypes.GET_MOST_RECENT_RELEASE_FAILED: {
      return {
        ...state,
        isMostRecentReleaseLoading: false
      }
    }
    case ArtistActionTypes.OPEN_DISCOVER_ARTIST_MODAL: {
      return {
        ...state,
        isDiscoverArtistModalOpen: true
      }
    }
    case ArtistActionTypes.CLOSE_DISCOVER_ARTIST_MODAL: {
      return {
        ...state,
        isDiscoverArtistModalOpen: false
      }
    }
    case ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY: {
      return {
        ...state,
        isFollowedArtistsLoading: true
      }
    }
    case ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS: {
      return {
        ...state,
        isFollowedArtistsLoading: false,
        followedArtists: action.payload.followedArtists,
        isMoreFollowedArtistsForLoading: action.payload.isMoreFollowedArtistsForLoading,
      }
    }
    case ArtistActionTypes.GET_ARTISTS_IN_LISTENER_LIBRARY_FAILED: {
      return {
        ...state,
        isFollowedArtistsLoading: false
      }
    }
    case ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY: {
      return {
        ...state,
        isFollowedArtistsLoading: true
      }
    }
    case ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_SUCCESS: {
      return {
        ...state,
        isFollowedArtistsLoading: false,
        followedArtists: action.payload.followedArtists,
        isMoreFollowedArtistsForLoading: action.payload.isMoreFollowedArtistsForLoading,
      }
    }
    case ArtistActionTypes.LOAD_MORE_ARTISTS_IN_LISTENER_LIBRARY_FAILED: {
      return {
        ...state,
        isFollowedArtistsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}