import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ListenerInfoResponseData,
    ContentData,
    HomePageContentResponseData,
    GetAccountContentCountResponseData,
    GetExistingGenresRequestData,
    GetRecommendedArtistsRequestData,
    GetExistingGenresResponseData,
    GetRecommendedArtistsResponseData,
    GetHomePageContentRequestData,
    SaveGetStartedResultsRequestData,
    ChangeSubscriptionRequestData,
    UserCreditCardInfo
} from "./listener.model";

export default class ListenerService {
    static async getListenerById(listenerId: string): Promise<AxiosResponse<ListenerInfoResponseData>> {
        return await api.get<ListenerInfoResponseData>(`/listener/${listenerId}`);
    }

    static async getRecentMostVisitedContent(listenerId: string): Promise<AxiosResponse<Array<ContentData>>> {
        return await api.get<Array<ContentData>>(`/listener/recent-most-visited-content/${listenerId}`);
    }

    static async getHomePageContent(listenerId: string, request: GetHomePageContentRequestData): Promise<AxiosResponse<Array<HomePageContentResponseData>>> {
        return await api.get<Array<HomePageContentResponseData>>(`/listener/home-page-content/${listenerId}`, {
            params: { ...request }
        });
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

    static async getExistingGenres(listenerId: string, request: GetExistingGenresRequestData): Promise<AxiosResponse<GetExistingGenresResponseData>> {
        return await api.get<GetExistingGenresResponseData>(`/listener/existing-genres/${listenerId}`, {
            params: { ...request }
        });
    }

    static async getRecommendedArtists(listenerId: string, request: GetRecommendedArtistsRequestData): Promise<AxiosResponse<GetRecommendedArtistsResponseData>> {
        return await api.get<GetRecommendedArtistsResponseData>(`/listener/recommended-artists/${listenerId}`, {
            params: { ...request }
        });
    }

    static async saveGetStartedResults(listenerId: string, request: SaveGetStartedResultsRequestData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/listener/get-started', { ...request }, {
            params: { listenerId: listenerId }
        });
    }

    static async getUserCreditCards(listenerId: string): Promise<AxiosResponse<Array<UserCreditCardInfo>>> {
        return await api.get<Array<UserCreditCardInfo>>(`/listener/credit-cards/${listenerId}`);
    }

    static async changeSubscription(listenerId: string, request: ChangeSubscriptionRequestData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/listener/change-subscription', { ...request }, {
            params: { listenerId: listenerId }
        });
    }

    static async deleteUserCreditCard(listenerId: string, cardId: string): Promise<AxiosResponse<void>> {
        return await api.delete<void>(`/listener/${listenerId}/delete-credit-card/${cardId}`);
    }
}