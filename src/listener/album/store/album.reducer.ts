import { AlbumActionTypes, albumState } from './album.model';
import { AlbumState } from './album.model';
import { AlbumActions } from './album.actions.types';

export const albumReducer = (state = albumState, action: AlbumActions): AlbumState => {
  switch (action.type) {
    case AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID: {
      return {
        ...state,
        isAlbumsLoading: true
      }
    }
    case AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_SUCCESS: {
      return {
        ...state,
        isAlbumsLoading: false,
        albums: action.payload
      }
    }
    case AlbumActionTypes.GET_ALBUMS_BY_ARTIST_ID_FAILED: {
      return {
        ...state,
        isAlbumsLoading: false
      }
    }
    case AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS: {
      return {
        ...state,
        isAlbumsArtistAppearsInLoading: true
      }
    }
    case AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_SUCCESS: {
      return {
        ...state,
        isAlbumsArtistAppearsInLoading: false,
        albumsArtistAppearsIn: action.payload
      }
    }
    case AlbumActionTypes.GET_ALBUMS_WHERE_ARTIST_APPEARS_FAILED: {
      return {
        ...state,
        isAlbumsArtistAppearsInLoading: false
      }
    }
    case AlbumActionTypes.GET_ALBUM_BY_ID: {
      return {
        ...state,
        isAlbumDataLoading: true,
        hidden: false
      }
    }
    case AlbumActionTypes.GET_ALBUM_BY_ID_SUCCESS: {
      return {
        ...state,
        isAlbumDataLoading: false,
        name: action.payload.name,
        artist: action.payload.artist,
        date: action.payload.date,
        coverImageUrl: action.payload.coverImageUrl,
        backgroundColor: action.payload.backgroundColor,
        lyricsBackgroundShadow: action.payload.lyricsBackgroundShadow,
        isAddedToLibrary: action.payload.isAddedToLibrary,
        songsCount: action.payload.songsCount,
        songsTimeDuration: action.payload.songsTimeDuration,
      }
    }
    case AlbumActionTypes.GET_ALBUM_BY_ID_FAILED: {
      return {
        ...state,
        isAlbumDataLoading: false
      }
    }
    case AlbumActionTypes.ADD_ALBUM_TO_LIBRARY_SUCCESS: {
      return {
        ...state,
        isAddedToLibrary: true
      }
    }
    case AlbumActionTypes.REMOVE_ALBUM_FROM_LIBRARY: {
      return {
        ...state,
        isAddedToLibrary: false
      }
    }
    case AlbumActionTypes.UPDATE_ALBUMS_INFO: {
      return {
        ...state,
        albums: action.payload
      }
    }
    case AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY: {
      return {
        ...state,
        isLikedAlbumsLoading: true
      }
    }
    case AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS: {
      return {
        ...state,
        isLikedAlbumsLoading: false,
        likedAlbums: action.payload.likedAlbums,
        isMoreLikedAlbumsForLoading: action.payload.isMoreLikedAlbumsForLoading,
      }
    }
    case AlbumActionTypes.GET_ALBUMS_IN_LISTENER_LIBRARY_FAILED: {
      return {
        ...state,
        isLikedAlbumsLoading: false
      }
    }
    case AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY: {
      return {
        ...state,
        isLikedAlbumsLoading: true
      }
    }
    case AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_SUCCESS: {
      return {
        ...state,
        isLikedAlbumsLoading: false,
        likedAlbums: action.payload.likedAlbums,
        isMoreLikedAlbumsForLoading: action.payload.isMoreLikedAlbumsForLoading,
      }
    }
    case AlbumActionTypes.LOAD_MORE_ALBUMS_IN_LISTENER_LIBRARY_FAILED: {
      return {
        ...state,
        isLikedAlbumsLoading: false
      }
    }
    case AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH: {
      return {
        ...state,
        isTopAlbumsThisMonthLoading: true
      }
    }
    case AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH_SUCCESS: {
      return {
        ...state,
        isTopAlbumsThisMonthLoading: false,
        topAlbumsThisMonth: action.payload.topAlbumsThisMonth,
        isMoreTopAlbumsThisMonthForLoading: action.payload.isMoreTopAlbumsThisMonthForLoading,
      }
    }
    case AlbumActionTypes.GET_LISTENER_TOP_ALBUMS_THIS_MONTH_FAILED: {
      return {
        ...state,
        isTopAlbumsThisMonthLoading: false
      }
    }
    case AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH: {
      return {
        ...state,
        isTopAlbumsThisMonthLoading: true
      }
    }
    case AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH_SUCCESS: {
      return {
        ...state,
        isTopAlbumsThisMonthLoading: false,
        topAlbumsThisMonth: action.payload.topAlbumsThisMonth,
        isMoreTopAlbumsThisMonthForLoading: action.payload.isMoreTopAlbumsThisMonthForLoading,
      }
    }
    case AlbumActionTypes.LOAD_MORE_LISTENER_TOP_ALBUMS_THIS_MONTH_FAILED: {
      return {
        ...state,
        isTopAlbumsThisMonthLoading: false
      }
    }
    case AlbumActionTypes.GET_ALBUMS: {
      return {
        ...state,
        isAlbumsLoading: true
      }
    }
    case AlbumActionTypes.GET_ALBUMS_SUCCESS: {
      return {
        ...state,
        isAlbumsLoading: false,
        albums: action.payload.albums,
        isMoreAlbumsForLoading: action.payload.isMoreAlbumsForLoading,
      }
    }
    case AlbumActionTypes.GET_ALBUMS_FAILED: {
      return {
        ...state,
        isAlbumsLoading: false
      }
    }
    case AlbumActionTypes.LOAD_MORE_ALBUMS: {
      return {
        ...state,
        isAlbumsLoading: true
      }
    }
    case AlbumActionTypes.LOAD_MORE_ALBUMS_SUCCESS: {
      return {
        ...state,
        isAlbumsLoading: false,
        albums: action.payload.albums,
        isMoreAlbumsForLoading: action.payload.isMoreAlbumsForLoading,
      }
    }
    case AlbumActionTypes.LOAD_MORE_ALBUMS_FAILED: {
      return {
        ...state,
        isAlbumsLoading: false
      }
    }
    case AlbumActionTypes.MARK_HIDDEN_ALBUM: {
      return {
        ...state,
        albumId: action.payload,
        hidden: true
      }
    }
    case AlbumActionTypes.GET_NEXT_ALBUM_RELEASE: {
      return {
        ...state,
        isNextAlbumReleaseLoading: true
      }
    }
    case AlbumActionTypes.GET_NEXT_ALBUM_RELEASE_SUCCESS: {
      return {
        ...state,
        isNextAlbumReleaseLoading: false,
        nextAlbumRelease: action.payload
      }
    }
    case AlbumActionTypes.GET_NEXT_ALBUM_RELEASE_FAILED: {
      return {
        ...state,
        isNextAlbumReleaseLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}