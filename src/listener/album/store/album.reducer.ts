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
        likes: action.payload.likes,
        songs: action.payload.songs
      }
    }
    case AlbumActionTypes.GET_ALBUM_BY_ID_FAILED: {
      return {
        ...state,
        isAlbumDataLoading: false
      }
    }
    default: {
      return { ...state }
    }
  }
}