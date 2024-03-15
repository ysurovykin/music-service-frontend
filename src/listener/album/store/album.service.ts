import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { AlbumInfoResponseData, GetAlbumsInListenerLibraryRequest, GetAlbumsInListenerLibraryResponse } from "./album.model";

export default class AlbumService {
    static async getAlbumsByArtistId(listenerId: string, artistId: string): Promise<AxiosResponse<Array<AlbumInfoResponseData>>> {
        return await api.get<Array<AlbumInfoResponseData>>(`/album/albums/${artistId}`, {
            params: { listenerId }
        });
    }

    static async getAlbumsWhereArtistAppears(listenerId: string, artistId: string): Promise<AxiosResponse<Array<AlbumInfoResponseData>>> {
        return await api.get<Array<AlbumInfoResponseData>>(`/album/albums/artist-appears/${artistId}`, {
            params: { listenerId }
        });
    }

    static async getAlbumById(listenerId: string, albumId: string): Promise<AxiosResponse<AlbumInfoResponseData>> {
        return await api.get<AlbumInfoResponseData>(`/album/${albumId}`, {
            params: { listenerId }
        });
    }

    static async addAlbumToLibrary(listenerId: string, albumId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/album/add-to-library', { albumId }, {
            params: { listenerId }
        });
    }

    static async removeAlbumFromLibrary(listenerId: string, albumId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/album/remove-from-library', { albumId }, {
            params: { listenerId }
        });
    }

    static async getAlbumsInListenerLibrary(listenerId: string, request: GetAlbumsInListenerLibraryRequest): Promise<AxiosResponse<GetAlbumsInListenerLibraryResponse>> {
        return await api.get<GetAlbumsInListenerLibraryResponse>(`/album/albums-in-library/${listenerId}`, {
            params: { ...request }
        });
    }
}