import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { CreatePlaylistRequestData, EditPlaylistsRequest, PlaylistInfoResponseData } from "./playlist.model";

export default class PlaylistService {
    static async getPlaylistsByListenerId(listenerId: string): Promise<AxiosResponse<Array<PlaylistInfoResponseData>>> {
        return await api.get<Array<PlaylistInfoResponseData>>(`/playlist/playlists/${listenerId}`);
    }

    static async getPlaylistById(playlistId: string): Promise<AxiosResponse<PlaylistInfoResponseData>> {
        return await api.get<PlaylistInfoResponseData>(`/playlist/${playlistId}`);
    }

    static async createPlaylist(listenerId: string, request: FormData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/playlist/create', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { listenerId }
        });
    }

    static async editPlaylist(listenerId: string, request: FormData): Promise<AxiosResponse<void>> {
        return await api.post<void>('/playlist/edit', request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { listenerId }
        });
    }

    static async editSongPlaylists(listenerId: string, request: EditPlaylistsRequest): Promise<AxiosResponse<Array<string>>> {
        return await api.post<Array<string>>('/playlist/edit-song-paylists', request, { params: { listenerId } });
    }
}