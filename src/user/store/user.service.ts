import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { UserDataWithTokens, UserLoginData, UserRegistrationData } from "./user.model";

export default class AuthService {
    static async login(loginData: UserLoginData): Promise<AxiosResponse<UserDataWithTokens>> {
        return await api.post<UserDataWithTokens>('/user/login', { ...loginData });
    }

    static async registration(registrationData: UserRegistrationData): Promise<AxiosResponse<UserDataWithTokens>> {
        return api.post<UserDataWithTokens>('/user/registration', { ...registrationData });
    }

    static async refresh(): Promise<AxiosResponse<UserDataWithTokens>> {
        return api.get<UserDataWithTokens>('/user/refresh');
    }

    static async logout(): Promise<void> {
        return api.post('/user/logout')
    }
}