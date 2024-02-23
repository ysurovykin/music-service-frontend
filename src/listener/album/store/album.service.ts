import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { AlbumInfoResponseData } from "./album.model";

export default class AlbumService {
    static async getAlbumsByArtistId(artistId: string): Promise<AxiosResponse<Array<AlbumInfoResponseData>>> {
        return await api.get<Array<AlbumInfoResponseData>>(`/album/albums/${artistId}`);
    }

    static async getAlbumById(albumId: string): Promise<AxiosResponse<AlbumInfoResponseData>> {
        return await api.get<AlbumInfoResponseData>(`/album/${albumId}`);
    }
}