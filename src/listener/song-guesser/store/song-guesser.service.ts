import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    CheckAnswerResponseData,
    SongGuesserInfoResponseData,
    SkipSongResponseData,
    CountAvailableSongsRequestData,
    StartSongGuesserRequestData,
    CheckAnswerRequestData,
    SkipSongRequestData,
    SongGuesserStatsData,
    FinishedSongGuesserInfoResponseData,
    FinishedSongGuesserFullResponseData,
    GetFinishedSongGuessersRequestData,
    GetFinishedSongGuessersResponseData
} from "./song-guesser.model";

export default class SongGuesserService {
    static async countAvailableSongs(listenerId: string, request: CountAvailableSongsRequestData): Promise<AxiosResponse<number>> {
        return await api.get<number>('/song-guesser/available-songs', { params: { listenerId: listenerId, ...request } });
    }

    static async startSongGuesser(listenerId: string, request: StartSongGuesserRequestData): Promise<AxiosResponse<SongGuesserInfoResponseData>> {
        return await api.post<SongGuesserInfoResponseData>('/song-guesser/start', { ...request }, {
            params: { listenerId: listenerId }
        });
    }

    static async checkAnswer(listenerId: string, request: CheckAnswerRequestData): Promise<AxiosResponse<CheckAnswerResponseData>> {
        return await api.post<CheckAnswerResponseData>('/song-guesser/check', { ...request }, {
            params: { listenerId: listenerId }
        });
    }

    static async skipSong(listenerId: string, request: SkipSongRequestData): Promise<AxiosResponse<SkipSongResponseData>> {
        return await api.post<SkipSongResponseData>('/song-guesser/skip-song', { ...request }, {
            params: { listenerId: listenerId }
        });
    }

    static async getFinishedSongGuesserStats(listenerId: string): Promise<AxiosResponse<SongGuesserStatsData>> {
        return await api.get<SongGuesserStatsData>(`/song-guesser/stats/${listenerId}`);
    }

    static async getFinishedSongGuessers(listenerId: string, request: GetFinishedSongGuessersRequestData): Promise<AxiosResponse<GetFinishedSongGuessersResponseData>> {
        return await api.get<GetFinishedSongGuessersResponseData>(`/song-guesser/finished-guessers/${listenerId}`, { params: { ...request } });
    }

    static async getFinishedSongGuesserById(songGuesserId: string): Promise<AxiosResponse<FinishedSongGuesserFullResponseData>> {
        return await api.get<FinishedSongGuesserFullResponseData>(`/song-guesser/finished-guesser-details/${songGuesserId}`);
    }
}