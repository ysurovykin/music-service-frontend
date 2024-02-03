import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { SongInfoResponseData } from "./song.model";

export default class SongService {
    static async getSongById(songId: string): Promise<AxiosResponse<SongInfoResponseData>> {
        return await api.get<SongInfoResponseData>(`/song/${songId}`);
    }
}