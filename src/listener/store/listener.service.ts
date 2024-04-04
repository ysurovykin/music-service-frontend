import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ListenerInfoResponseData, 
    ContentData,
    HomePageContentResponseData
} from "./listener.model";

export default class ListenerService {
    static async getListenerById(listenerId: string): Promise<AxiosResponse<ListenerInfoResponseData>> {
        return await api.get<ListenerInfoResponseData>(`/listener/${listenerId}`);
    }

    static async getRecentMostVisitedContent(listenerId: string): Promise<AxiosResponse<Array<ContentData>>> {
        return await api.get<Array<ContentData>>(`/listener/recent-most-visited-content/${listenerId}`);
    }

    static async getHomePageContent(listenerId: string): Promise<AxiosResponse<Array<HomePageContentResponseData>>> {
        return await api.get<Array<HomePageContentResponseData>>(`/listener/home-page-content/${listenerId}`);
    }
}