import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { ArtistFullResponseData, ArtistGenres, ArtistInfoResponseData, GetArtistsInListenerLibraryRequest, GetArtistsInListenerLibraryResponse } from "./artist.model";
import { AlbumFullResponseData } from "../../album/store/album.model";

export default class ArtistService {
    static async getArtists(): Promise<AxiosResponse<Array<ArtistInfoResponseData>>> {
        return await api.get<Array<ArtistInfoResponseData>>('/artist/artists');
    }

    static async getArtistById(listenerId: string, artistId: string): Promise<AxiosResponse<ArtistFullResponseData>> {
        return await api.get<ArtistFullResponseData>(`/artist/${artistId}`, {
            params: { listenerId }
        });
    }

    static async followArtist(listenerId: string, artistId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/artist/follow', { artistId: artistId }, {
            params: { listenerId }
        });
    }

    static async unfollowArtist(listenerId: string, artistId: string): Promise<AxiosResponse<void>> {
        return await api.post<void>('/artist/unfollow', { artistId: artistId }, {
            params: { listenerId }
        });
    }
    
    static async getGenres(artistId: string): Promise<AxiosResponse<Array<ArtistGenres>>> {
        return await api.get<Array<ArtistGenres>>(`/artist/genres/${artistId}`);
    }

    static async getMostRecentRelease(listenerId: string, artistId: string): Promise<AxiosResponse<AlbumFullResponseData>> {
        return await api.get<AlbumFullResponseData>(`/artist/most-recent-release/${artistId}`, {
            params: { listenerId }
        });
    }

    static async getArtistsInListenerLibrary(listenerId: string, request: GetArtistsInListenerLibraryRequest): Promise<AxiosResponse<GetArtistsInListenerLibraryResponse>> {
        return await api.get<GetArtistsInListenerLibraryResponse>(`/artist/artists-in-library/${listenerId}`, {
            params: { ...request }
        });
    }
}