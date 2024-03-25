import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { LyricsInfoResponseData } from "./lyrics.model";

export default class LyricsService {
    static async getSongLyrics(songId: string): Promise<AxiosResponse<LyricsInfoResponseData>> {
        return await api.get<LyricsInfoResponseData>(`/lyrics/${songId}`);
    }
}