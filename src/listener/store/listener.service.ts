import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ListenerInfoResponseData, MostVisitedContentData,
} from "./listener.model";

export default class ListenerService {
    static async getListenerById(listenerId: string): Promise<AxiosResponse<ListenerInfoResponseData>> {
        return await api.get<ListenerInfoResponseData>(`/listener/${listenerId}`);
    }

    static async getRecentMostVisitedContent(listenerId: string): Promise<AxiosResponse<Array<MostVisitedContentData>>> {
        return await api.get<Array<MostVisitedContentData>>(`/listener/recent-most-visited-content/${listenerId}`);
    }
}