import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { AddSongToQueueRequestData, GenerateQueueRequestData, QueueInfoResponseData, QueueSongInfoResponseData, RemoveSongFromQueueRequestData } from "./queue.model";

export default class QueueService {
    static async getQueue(songQueueId: string, listenerId: string): Promise<AxiosResponse<QueueInfoResponseData>> {
        return await api.get<QueueInfoResponseData>('/queue', { params: { songQueueId, listenerId } });
    }

    static async addSongToQueue(request: AddSongToQueueRequestData, listenerId: string): Promise<AxiosResponse<QueueSongInfoResponseData>> {
        return await api.post<QueueSongInfoResponseData>('/queue/add-song', {...request}, { params: { listenerId } });
    }

    static async removeSongFromQueue(request: RemoveSongFromQueueRequestData, listenerId: string): Promise<AxiosResponse<QueueInfoResponseData>> {
        return await api.post<QueueInfoResponseData>('/queue/remove-song', {...request}, { params: { listenerId } });
    }

    static async generateQueue(request: GenerateQueueRequestData, listenerId: string): Promise<AxiosResponse<QueueInfoResponseData>> {
        return await api.post<QueueInfoResponseData>('/queue/generate', { ...request }, { params: { listenerId } });
    }
}