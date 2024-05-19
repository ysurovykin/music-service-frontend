import moment from "moment";
import { QueueSongInfoResponseData } from "../../listener/queue/store/queue.model";

export const formatTime = (time: number): string => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60) < 10 ? `${Math.floor(time / 60)}` : Math.floor(time / 60);
    const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

    return `${minutes}:${seconds}`;
  }
  return '0:00';
}

export const formatSongQueue = (songQueueId: string, queue: Array<QueueSongInfoResponseData>): Array<QueueSongInfoResponseData> => {
  const songIndex = queue.findIndex(song => song.songQueueId === songQueueId);
  const formatedQueue = queue.slice(songIndex);
  return formatedQueue;
}

export const updateCurrentSongAllPlayTime = () => {
  const currentSongStartPlayDate = localStorage.getItem('currentSongStartPlayDate') || '';
  const timeListened = moment(new Date()).diff(new Date(currentSongStartPlayDate), 'second', true);
  if (timeListened < 60 * 30) { 
    const lastCurrentSongAllPlayTime = localStorage.getItem('currentSongAllPlayTime') || '0';
    const currentSongAllPlayTime = !isNaN(+lastCurrentSongAllPlayTime) ? +lastCurrentSongAllPlayTime : 0;
    localStorage.setItem('currentSongAllPlayTime', (+currentSongAllPlayTime + timeListened).toString());
  }
  localStorage.setItem('currentSongStartPlayDate', new Date().toISOString());
}