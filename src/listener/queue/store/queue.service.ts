import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { GenerateQueueRequestData, QueueInfoResponseData } from "./queue.model";

export default class QueueService {
    static async getQueue(songId: string, listenerId: string): Promise<AxiosResponse<QueueInfoResponseData>> {
        return await api.get<QueueInfoResponseData>('/queue/', { params: { songId, listenerId } });
    }

    static async generateQueue(request: GenerateQueueRequestData, listenerId: string): Promise<AxiosResponse<QueueInfoResponseData>> {
        return await api.post<QueueInfoResponseData>('/queue/generate', { ...request }, { params: { listenerId } });
    }
}