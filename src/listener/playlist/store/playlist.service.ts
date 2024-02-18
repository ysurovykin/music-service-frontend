import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { PlaylistFullResponseData, PlaylistInfoResponseData } from "./playlist.model";

export default class PlaylistService {
    static async getPlaylistsByListenerId(listenerId: string): Promise<AxiosResponse<Array<PlaylistInfoResponseData>>> {
        return await api.get<Array<PlaylistInfoResponseData>>(`/playlist/playlists/${listenerId}`);
    }

    static async getPlaylistById(playlistId: string): Promise<AxiosResponse<PlaylistFullResponseData>> {
        return await api.get<PlaylistFullResponseData>(`/playlist/${playlistId}`);
    }
}