import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ArtistProfileInfoResponseData,
    ChangeSubscriptionRequestData,
} from "./artist-profile.model";

export default class ArtistProfileService {
    static async getArtistProfileById(artistProfileId: string): Promise<AxiosResponse<ArtistProfileInfoResponseData>> {
        return await api.get<ArtistProfileInfoResponseData>(`/artist-profile/${artistProfileId}`);
    }

    static async editProfile(artistProfileId: string, request: FormData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/artist-profile/edit-profile', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { artistProfileId }
        });
    }

    static async changeSubscription(artistProfileId: string, request: ChangeSubscriptionRequestData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/user/change-subscription', { ...request }, {
            params: { userId: artistProfileId }
        });
    }

}