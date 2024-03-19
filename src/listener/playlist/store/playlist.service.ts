import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { EditedPlaylistRequest, PlaylistFullResponseData, PlaylistInfoResponseData } from "./playlist.model";

export default class PlaylistService {
    static async getPlaylistsByListenerId(listenerId: string): Promise<AxiosResponse<Array<PlaylistInfoResponseData>>> {
        return await api.get<Array<PlaylistInfoResponseData>>(`/playlist/playlists/${listenerId}`);
    }

    static async getPlaylistById(playlistId: string): Promise<AxiosResponse<PlaylistFullResponseData>> {
        return await api.get<PlaylistFullResponseData>(`/playlist/${playlistId}`);
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

    static async editSongPlaylists(listenerId: string, request: EditedPlaylistRequest): Promise<AxiosResponse<Array<string>>> {
        return await api.post<Array<string>>('/playlist/edit-song-paylists', request, { params: { listenerId } });
    }

    static async pinPlaylist(listenerId: string, playlistId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/playlist/pin', { playlistId: playlistId }, {
            params: { listenerId }
        });
    }

    static async unpinPlaylist(listenerId: string, playlistId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/playlist/unpin', { playlistId: playlistId }, {
            params: { listenerId }
        });
    }
}