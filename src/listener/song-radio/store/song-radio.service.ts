import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    CreateSongRadioRequestData,
    CreateSongRadioResponseData,
    GetListenerSongRadiosRequestData,
    SongRadioInfoResponseData,
    SongRadioFullResponseData,
    GetListenerSongRadiosResponseData
} from "./song-radio.model";

export default class SongRadioService {
    static async getSongRadio(listenerId: string, songId: string): Promise<AxiosResponse<SongRadioFullResponseData>> {
        return await api.get<SongRadioFullResponseData>(`/song-radio/${songId}`, { params: { listenerId: listenerId } });
    }

    static async getListenerSongRadios(listenerId: string,
        request: GetListenerSongRadiosRequestData): Promise<AxiosResponse<GetListenerSongRadiosResponseData>> {
        return await api.get<GetListenerSongRadiosResponseData>(`/song-radio/listener-song-radios/${listenerId}`, { params: { ...request } });
    }

    static async createSongRadio(listenerId: string,
        request: CreateSongRadioRequestData): Promise<AxiosResponse<CreateSongRadioResponseData>> {
        return await api.post<CreateSongRadioResponseData>('/song-radio/create', {
            songId: request.song?.songId,
            shouldRefresh: request.shouldRefresh
        }, {
            params: { listenerId: listenerId }
        });
    }
}