import { SongInfoResponseData } from "../../listener/song/store/song.model";

export const formatTime = (time: number): string => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60) < 10 ? `${Math.floor(time / 60)}` : Math.floor(time / 60);
    const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

    return `${minutes}:${seconds}`;
  }
  return '0:00';
}

export const formatSongQueue = (songId: string, queue: Array<SongInfoResponseData>): Array<SongInfoResponseData> => {
  const songIndex = queue.findIndex(song => song.songId === songId);
  const formatedQueue = queue.slice(songIndex);
  return formatedQueue;
}