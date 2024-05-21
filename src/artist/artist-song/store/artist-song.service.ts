import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { GetArtistAlbumSongsResponseData, ArtistSongInfoResponseData } from "./artist-song.model";

export default class ArtistSongService {

  static async getArtistAlbumSongs(artistId: string, albumId: string): Promise<AxiosResponse<GetArtistAlbumSongsResponseData>> {
    return await api.get<GetArtistAlbumSongsResponseData>(`/song/artist-album-songs/${albumId}`, { params: { artistId } });
  }

  static async uploadSong(request: FormData): Promise<AxiosResponse<void>> {
    return await api.post<void>('/song/upload', request, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async hideSong(artistId: string, songId: string): Promise<AxiosResponse<void>> {
    return await api.post<void>(`/song/hide/${songId}`, {}, { params: { artistId } });
  }

  static async unhideSong(artistId: string, songId: string): Promise<AxiosResponse<void>> {
    return await api.post<void>(`/song/unhide/${songId}`, {}, { params: { artistId } });
  }

}