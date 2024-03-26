import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { GetSongsRequestData, GetSongsResponseData, RecordSongPlayRowDataRequestData, SongInfoResponseData } from "./song.model";

export default class SongService {
    static async getSongById(listenerId: string, songId: string, playlistId?: string): Promise<AxiosResponse<SongInfoResponseData>> {
        return await api.get<SongInfoResponseData>(`/song/${songId}`, { params: { listenerId, playlistId } });
    }

    static async getSongs(listenerId: string, request: GetSongsRequestData): Promise<AxiosResponse<GetSongsResponseData>> {
        return await api.get<GetSongsResponseData>('/song/songs', { params: { listenerId, ...request } });
    }

    static async recordSongPlayRowData(listenerId: string, time: number, songId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/song/record-song-play-row-data', { time: time, songId: songId }, { params: { listenerId } });
    }

}