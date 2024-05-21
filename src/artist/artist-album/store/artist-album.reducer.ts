import { AlbumActionTypes, artistAlbumState } from './artist-album.model';
import { ArtistAlbumState } from './artist-album.model';
import { ArtistAlbumActions } from './artist-album.actions.types';

export const artistAlbumReducer = (state = artistAlbumState, action: ArtistAlbumActions): ArtistAlbumState => {
  switch (action.type) {
    case AlbumActionTypes.GET_ALBUM_BY_ID: {
      return {
        ...state,
        isAlbumDataLoading: true
      }
    }
    case AlbumActionTypes.GET_ALBUM_BY_ID_SUCCESS: {
      return {
        ...state,
        isAlbumDataLoading: false,
        name: action.payload.name,
        date: action.payload.date,
        coverImageUrl: action.payload.coverImageUrl,
        backgroundColor: action.payload.backgroundColor,
        hidden: action.payload.hidden,
        songsCount: action.payload.songsCount,
        songsTimeDuration: action.payload.songsTimeDuration,
        releaseDate: action.payload.releaseDate
      }
    }
    case AlbumActionTypes.GET_ALBUM_BY_ID_FAILED: {
      return {
        ...state,
        isAlbumDataLoading: false
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
    case AlbumActionTypes.OPEN_CREATE_ALBUM_MODAL: {
      return {
        ...state,
        isCreateAlbumModalOpen: true
      }
    }
    case AlbumActionTypes.CLOSE_CREATE_ALBUM_MODAL: {
      return {
        ...state,
        isCreateAlbumModalOpen: false
      }
    }
    case AlbumActionTypes.CREATE_ALBUM: {
      return {
        ...state,
        isCreateAlbumLoading: true
      }
    }
    case AlbumActionTypes.CREATE_ALBUM_SUCCESS: {
      return {
        ...state,
        isCreateAlbumLoading: false,
        isCreateAlbumModalOpen: false
      }
    }
    case AlbumActionTypes.CREATE_ALBUM_FAILED: {
      return {
        ...state,
        isCreateAlbumLoading: false
      }
    }
    case AlbumActionTypes.OPEN_EDIT_ALBUM_MODAL: {
      return {
        ...state,
        isEditAlbumModalOpen: true
      }
    }
    case AlbumActionTypes.CLOSE_EDIT_ALBUM_MODAL: {
      return {
        ...state,
        isEditAlbumModalOpen: false
      }
    }
    case AlbumActionTypes.EDIT_ALBUM: {
      return {
        ...state,
        isEditAlbumLoading: true
      }
    }
    case AlbumActionTypes.EDIT_ALBUM_SUCCESS: {
      return {
        ...state,
        isEditAlbumLoading: false,
        isEditAlbumModalOpen: false
      }
    }
    case AlbumActionTypes.EDIT_ALBUM_FAILED: {
      return {
        ...state,
        isEditAlbumLoading: false
      }
    }
    case AlbumActionTypes.HIDE_ALBUM: {
      return {
        ...state,
        isHideAlbumLoading: true
      }
    }
    case AlbumActionTypes.HIDE_ALBUM_SUCCESS: {
      return {
        ...state,
        isHideAlbumLoading: false,
        hidden: true
      }
    }
    case AlbumActionTypes.HIDE_ALBUM_FAILED: {
      return {
        ...state,
        isHideAlbumLoading: false
      }
    }
    case AlbumActionTypes.UNHIDE_ALBUM: {
      return {
        ...state,
        isUnhideAlbumLoading: true
      }
    }
    case AlbumActionTypes.UNHIDE_ALBUM_SUCCESS: {
      return {
        ...state,
        isUnhideAlbumLoading: false,
        hidden: false
      }
    }
    case AlbumActionTypes.UNHIDE_ALBUM_FAILED: {
      return {
        ...state,
        isUnhideAlbumLoading: false
      }
    }
    case AlbumActionTypes.GET_ALBUMS_STATS: {
      return {
        ...state,
        isAlbumStatsLoading: true
      }
    }
    case AlbumActionTypes.GET_ALBUMS_STATS_SUCCESS: {
      return {
        ...state,
        isAlbumStatsLoading: false,
        albumStats: action.payload
      }
    }
    case AlbumActionTypes.GET_ALBUMS_STATS_FAILED: {
      return {
        ...state,
        isAlbumStatsLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}