import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ListenerInfoResponseData,
} from "./listener.model";

export default class ListenerService {
    static async getListenerById(listenerId: string): Promise<AxiosResponse<ListenerInfoResponseData>> {
        return await api.get<ListenerInfoResponseData>(`/listener/${listenerId}`);
    }
}