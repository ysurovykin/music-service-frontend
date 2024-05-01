import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { SwitchProfileTypeRequestData, UserCreditCardInfo, UserDataWithTokens, UserLoginData, UserRegistrationData } from "./user.model";

export default class UserService {
    static async login(loginData: UserLoginData): Promise<AxiosResponse<UserDataWithTokens>> {
        return await api.post<UserDataWithTokens>('/user/login', { ...loginData });
    }

    static async registration(registrationData: UserRegistrationData): Promise<AxiosResponse<UserDataWithTokens>> {
        return api.post<UserDataWithTokens>('/user/registration', { ...registrationData });
    }

    static async refresh(): Promise<AxiosResponse<UserDataWithTokens>> {
        return api.get<UserDataWithTokens>('/user/refresh', { params: { profileType: localStorage.getItem('profileType') } });
    }

    static async logout(): Promise<void> {
        return api.post('/user/logout')
    }

    static async switchProfileType(request: SwitchProfileTypeRequestData): Promise<UserDataWithTokens> {
        return api.post('/user/switch-profile-type', { ...request })
    }
    
    static async getUserCreditCards(userId: string): Promise<AxiosResponse<Array<UserCreditCardInfo>>> {
        return await api.get<Array<UserCreditCardInfo>>(`/user/credit-cards/${userId}`);
    }

    static async deleteUserCreditCard(userId: string, cardId: string): Promise<AxiosResponse<void>> {
        return await api.delete<void>(`/user/${userId}/delete-credit-card/${cardId}`);
    }
}