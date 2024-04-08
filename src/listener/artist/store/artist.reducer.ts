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
        monthlyListeners: action.payload.monthlyListeners,
        backgroundColor: action.payload.backgroundColor,
        profileImageUrl: action.payload.profileImageUrl,
        songsCount: action.payload.songsCount,
        songsTimeDuration: action.payload.songsTimeDuration,
        likedSongsCount: action.payload.likedSongsCount,
        likedSongsTimeDuration: action.payload.likedSongsTimeDuration,
        albumsCount: action.payload.albumsCount,
        albumsWhereAppearsCount: action.payload.albumsWhereAppearsCount,
        isFollowed: action.payload.isFollowed,
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
    
    case ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH: {
      return {
        ...state,
        isTopArtistsThisMonthLoading: true
      }
    }
    case ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS: {
      return {
        ...state,
        isTopArtistsThisMonthLoading: false,
        topArtistsThisMonth: action.payload.topArtistsThisMonth,
        isMoreTopArtistsThisMonthForLoading: action.payload.isMoreTopArtistsThisMonthForLoading,
      }
    }
    case ArtistActionTypes.GET_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED: {
      return {
        ...state,
        isTopArtistsThisMonthLoading: false
      }
    }
    case ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH: {
      return {
        ...state,
        isTopArtistsThisMonthLoading: true
      }
    }
    case ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_SUCCESS: {
      return {
        ...state,
        isTopArtistsThisMonthLoading: false,
        topArtistsThisMonth: action.payload.topArtistsThisMonth,
        isMoreTopArtistsThisMonthForLoading: action.payload.isMoreTopArtistsThisMonthForLoading,
      }
    }
    case ArtistActionTypes.LOAD_MORE_LISTENER_TOP_ARTISTS_THIS_MONTH_FAILED: {
      return {
        ...state,
        isTopArtistsThisMonthLoading: false
      }
    }
    case ArtistActionTypes.UPDATE_ARTIST_LIKED_SONGS_COUNT: {
      return {
        ...state,
        likedSongsCount: action.payload
      }
    }
    case ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS: {
      return {
        ...state,
        isFansAlsoLikeArtistsLoading: true
      }
    }
    case ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS_SUCCESS: {
      return {
        ...state,
        isFansAlsoLikeArtistsLoading: false,
        fansAlsoLikeArtists: action.payload,
      }
    }
    case ArtistActionTypes.GET_FANS_ALSO_LIKE_ARTISTS_FAILED: {
      return {
        ...state,
        isFansAlsoLikeArtistsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}