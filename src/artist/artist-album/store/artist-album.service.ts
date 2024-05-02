import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { AlbumInfoResponseData, GetAlbumsRequest, GetAlbumsResponse } from "./artist-album.model";

export default class ArtistAlbumService {

    static async getAlbumById(artistId: string, albumId: string): Promise<AxiosResponse<AlbumInfoResponseData>> {
        return await api.get<AlbumInfoResponseData>(`/album/artist-album/${albumId}`, {
            params: { artistId }
        });
    }

    static async getAlbums(artistId: string, request: GetAlbumsRequest): Promise<AxiosResponse<GetAlbumsResponse>> {
        return await api.get<GetAlbumsResponse>(`/album/artist-albums/${artistId}`, {
            params: { ...request }
        });
    }

    static async createAlbum(artistId: string, request: FormData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/album/create', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { artistId }
        });
    }

    static async editAlbum(artistId: string, request: FormData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/album/edit', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { artistId }
        });
    }

    static async hideAlbum(artistId: string, albumId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>(`/album/hide/${albumId}`, {}, { params: { artistId } });
    }

    static async unhideAlbum(artistId: string, albumId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>(`/album/hide/${albumId}`, {}, { params: { artistId } });
    }
}