import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { EditPlaylistsRequest, GetSongsRequestData, GetSongsResponseData, SongInfoResponseData } from "./song.model";

export default class SongService {
    static async getSongById(listenerId: string, songId: string): Promise<AxiosResponse<SongInfoResponseData>> {
        return await api.get<SongInfoResponseData>(`/song/${songId}`, { params: { listenerId } });
    }

    static async getSongs(listenerId: string, request: GetSongsRequestData): Promise<AxiosResponse<GetSongsResponseData>> {
        return await api.get<GetSongsResponseData>(`/song/songs`, { params: { listenerId, ...request } });
    }

    static async editPlaylists(listenerId: string, request: EditPlaylistsRequest): Promise<AxiosResponse<Array<string>>> {
        return await api.post<Array<string>>('/song/edit-paylists', request, { params: { listenerId } });
    }
}