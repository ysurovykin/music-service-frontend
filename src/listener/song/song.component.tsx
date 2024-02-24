import React, { useState } from "react";
import {
  Favorite,
  FavoriteBorder,
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
import { SongInfoResponseData, PlaySongData, OpenEditPlaylistsModal } from "./store/song.model";
import { queueActions } from "../queue/store/queue.actions";
import { GenerateQueueOptions, GenerateQueueRequestData } from "../queue/store/queue.model";
import { queueSelectors } from "../queue/store/queue.selectors";

const { Text, Title } = Typography;

export function SongComponent({
  song,
  index,
  options,
}: {
  song: SongInfoResponseData,
  index: number,
  options?: GenerateQueueOptions,
}) {
  const [isHovered, setIsHovered] = useState<boolean>();

  const isPlaying = useSelector(songSelectors.isPlaying);
  const isEditPlaylistModalOpen = useSelector(songSelectors.isEditPlaylistModalOpen);
  const songId = useSelector(songSelectors.songId);
  const queue = useSelector(queueSelectors.queue);

  const dispatch = useDispatch();
  const openEditPlaylistsModal = (songInfo: OpenEditPlaylistsModal) => dispatch(songActions.openEditPlaylistsModal(songInfo));
  const closeEditPlaylistsModal = () => dispatch(songActions.closeEditPlaylistsModal());
  const pauseSong = () => dispatch(songActions.pauseSong());
  const playSong = (songData: PlaySongData) => dispatch(songActions.playSong(songData));
  const unpauseSong = () => dispatch(songActions.unpauseSong());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

  const startPlaySong = () => {
    localStorage.setItem('songId', song?.songId?.toString() || '');
    localStorage.setItem('playTime', JSON.stringify(0));
    const songIndexInQueue = queue?.findIndex(song => song.songId === songId);
    if (((queue?.length || 0) - 1) === songIndexInQueue) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songId: songId || '',
        options,
        extendForward: true
      });
    } else if (songIndexInQueue === 0) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songId: songId || '',
        options,
        extendForward: false
      });
    }
    playSong({
      songId: song?.songId,
      name: song?.name,
      duration: song?.duration,
      coverImageUrl: song?.coverImageUrl,
      songUrl: song?.songUrl,
      artists: song?.artists,
      playlistIds: song?.playlistIds,
      backgroundColor: song?.backgroundColor,
      lyricsBackgroundShadow: song?.lyricsBackgroundShadow
    });
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

  };

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
          <Text>{song?.artists?.map(artist =>
            (<RouterLink key={artist.id} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
          )}</Text>
        </div>
      </div>
      <RouterLink to={`/album/${song?.album?.id}`}>{song?.album?.name}</RouterLink>
      <div
        className="song-player__additional-controller-icon-wrapper"
        onClick={() => isEditPlaylistModalOpen ? closeEditPlaylistsModal() : openEditPlaylistsModal({
          editPlaylistsSongId: songId || '',
          editPlaylistsSongPlaylistIds: song.playlistIds || []
        })}>
        {song?.playlistIds?.length ?
          <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
          <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
        }
      </div>
      <Text>{formatTime(song?.duration!)}</Text>
    </div>
  );
};