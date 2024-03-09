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
        artist: action.payload.artist,
        date: action.payload.date,
        coverImageUrl: action.payload.coverImageUrl,
        backgroundColor: action.payload.backgroundColor,
        lyricsBackgroundShadow: action.payload.lyricsBackgroundShadow,
        isAddedToLibrary: action.payload.isAddedToLibrary
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
    default: {
      return { ...state }
    }
  }
}