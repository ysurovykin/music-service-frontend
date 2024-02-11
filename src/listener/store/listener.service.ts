import api from "../../helpers/http/api.helper";
import { AxiosResponse } from "axios";
import {
    ChangeRepeatSongStateRequest,
    ChangeShuffleStateRequest,
    ListenerInfoResponseData,
    SavePlayTimeRequest,
    UpdateSongPlayerDataRequest,
    ChangeVolumeRequest
} from "./listener.model";

export default class ListenerService {
    static async getListenerById(listenerId: string): Promise<AxiosResponse<ListenerInfoResponseData>> {
        return await api.get<ListenerInfoResponseData>(`/listener/${listenerId}`);
    }

    static async updateSongPlayerData(updateSongPlayerDataRequest: UpdateSongPlayerDataRequest): Promise<void> {
        return api.put('/listener/update-song-player-data', { ...updateSongPlayerDataRequest });
    }
    
    static async savePlayTime(savePlayTimeRequest: SavePlayTimeRequest): Promise<void> {
        return api.put('/listener/save-play-time', { ...savePlayTimeRequest });
    }

    static async changeVolume(changeVolumeRequest: ChangeVolumeRequest): Promise<void> {
        return api.put('/listener/change-volume', { ...changeVolumeRequest })
    }

    static async changeRepeatSongState(changeRepeatSongStateRequest: ChangeRepeatSongStateRequest): Promise<void> {
        return api.put('/listener/change-repeat-song-state', { ...changeRepeatSongStateRequest });
    }

    static async changeShuffleState(changeShuffleStateRequest: ChangeShuffleStateRequest): Promise<void> {
        return api.put('/listener/change-shuffle-state', { ...changeShuffleStateRequest })
    }
}