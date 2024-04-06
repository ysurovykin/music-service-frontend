import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ListenerInfoResponseData, 
    ContentData,
    HomePageContentResponseData,
    GetAccountContentCountResponseData
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
    
    static async editProfile(listenerId: string, request: FormData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/listener/edit-profile', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { listenerId }
        });
    }

    static async getAccountContentCount(listenerId: string): Promise<AxiosResponse<GetAccountContentCountResponseData>> {
        return await api.get<GetAccountContentCountResponseData>(`/listener/account-content-count/${listenerId}`);
    }
}