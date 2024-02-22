import React, { useState } from "react";
import {
  PauseOutlined,
  PlayArrowOutlined,
} from '@mui/icons-material';
import { Avatar, Typography } from "antd";
import { listenerProfileTypePalete } from "../../config";
import { useDispatch } from "react-redux";
import { songActions } from "./store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "./store/song.selectors";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime } from "../../helpers/react/song-player.helper";
import { SongInfoResponseData, PlaySongData } from "./store/song.model";

const { Text, Title } = Typography;

export function SongComponent({
  song,
  songsQueue,
  index,
}: {
  song: SongInfoResponseData,
  songsQueue: Array<SongInfoResponseData>,
  index: number
}) {
  const [isHovered, setIsHovered] = useState<boolean>();

  const isPlaying = useSelector(songSelectors.isPlaying);
  const songId = localStorage.getItem('songId');

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(songActions.pauseSong());
  const playSong = (songData: PlaySongData) => dispatch(songActions.playSong(songData));
  const unpauseSong = () => dispatch(songActions.unpauseSong());

  const startPlaySong = () => {
    const songIndex = songsQueue.findIndex(songInQueue => songInQueue.songId === song?.songId);
    localStorage.setItem('songId', song?.songId?.toString() || '');
    localStorage.setItem('songsQueue', JSON.stringify(songsQueue));
    localStorage.setItem('songIndex', songIndex.toString());
    localStorage.setItem('playTime', JSON.stringify(0));
    localStorage.setItem('playlistIds', JSON.stringify(song?.playlistIds || []));
    playSong({
      songId: song?.songId,
      name: song?.name,
      duration: song?.duration,
      coverImageUrl: song?.coverImageUrl,
      songUrl: song?.songUrl,
      artists: song?.artists,
      playlistIds: song?.playlistIds,
      backgroundColor: song?.backgroundColor,
      lyricsBackgroundShadow: song?.lyricsBackgroundShadow,
      songsQueue,
      songIndex
    })
  }

  const renderPlayButton = () => {
    if (songId === song?.songId) {
      if (isPlaying) {
        return (
          <PauseOutlined
            sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
            onClick={pauseSong} />
        );
      } else {
        return (
          <PlayArrowOutlined
            sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
            onClick={unpauseSong} />
        );
      }
    }
    return (
      <PlayArrowOutlined
        sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
        onClick={() => startPlaySong()} />
    );

  }

  return (
    <div
      className="song"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="song__wrapper">
        <div className="song__play-button">
          {isHovered ? renderPlayButton() : <Text>{index}</Text>}
        </div>
        <Avatar shape='square' size={64} src={song?.coverImageUrl} />
        <div className="song__credentials">
          <Title className="m-0" level={5}>{song?.name}</Title>
          <Text>{song?.artists?.map(artist => (<RouterLink to={`/artist/${artist.id}`}>{artist.name}</RouterLink>))}</Text>
        </div>
      </div>
      <RouterLink to={`/album/${song?.album?.id}`}>{song?.album?.name}</RouterLink>
      <Text>{formatTime(song?.duration!)}</Text>
    </div>
  );
};