import api from "../../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import { ArtistFullResponseDataType, ArtistInfoResponseDataType } from "./artist.model";

export default class ArtistService {
    static async getArtists(): Promise<AxiosResponse<Array<ArtistInfoResponseDataType>>> {
        return await api.get<Array<ArtistInfoResponseDataType>>('/artist/artists');
    }

    static async getArtistById(artistId: string): Promise<AxiosResponse<ArtistFullResponseDataType>> {
        return await api.get<ArtistFullResponseDataType>(`/artist/${artistId}`);
    }
}