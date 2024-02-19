import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { EditPlaylistsRequest, SongInfoResponseData } from "./song.model";

export default class SongService {
    static async getSongById(songId: string): Promise<AxiosResponse<SongInfoResponseData>> {
        return await api.get<SongInfoResponseData>(`/song/${songId}`);
    }

    static async editPlaylists(request: EditPlaylistsRequest): Promise<AxiosResponse<Array<string>>> {
        return await api.post<Array<string>>('/song/edit-paylists', request);
    }
}