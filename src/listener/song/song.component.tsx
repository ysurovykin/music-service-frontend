import React, { useState } from "react";
import {
  AlbumOutlined,
  CastOutlined,
  ContentCopyOutlined,
  DeleteOutlineOutlined,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  PauseOutlined,
  PersonOutlineOutlined,
  PlayArrowOutlined,
  PlaylistAddOutlined,
} from '@mui/icons-material';
import { Avatar, Dropdown, Typography } from "antd";
import { DOMAIN, listenerProfileTypePalete } from "../../config";
import { useDispatch } from "react-redux";
import { songActions } from "./store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "./store/song.selectors";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime } from "../../helpers/react/song-player.helper";
import { OpenEditPlaylistsModal } from "./store/song.model";
import { queueActions } from "../queue/store/queue.actions";
import {
  AddSongToQueueRequestData,
  GenerateQueueOptions,
  GenerateQueueRequestData,
  QueueSongInfoResponseData,
  RemoveSongFromQueueRequestData
} from "../queue/store/queue.model";
import { queueSelectors } from "../queue/store/queue.selectors";
import { MenuProps } from "antd/lib";

const { Text, Title } = Typography;

export function SongComponent({
  song,
  currentlyPlayingSong,
  index,
  options,
}: {
  song: QueueSongInfoResponseData,
  currentlyPlayingSong: QueueSongInfoResponseData,
  index: number,
  options?: GenerateQueueOptions,
}) {
  const [isHovered, setIsHovered] = useState<boolean>();

  const isPlaying = useSelector(queueSelectors.isPlaying);
  const isEditPlaylistModalOpen = useSelector(songSelectors.isEditPlaylistModalOpen);
  const queue = useSelector(queueSelectors.queue);
  const isMoreSongsBehindForLoading = useSelector(queueSelectors.isMoreSongsBehindForLoading);
  const isMoreSongsForwardForLoading = useSelector(queueSelectors.isMoreSongsForwardForLoading);

  const dispatch = useDispatch();
  const openEditPlaylistsModal = (songInfo: OpenEditPlaylistsModal) => dispatch(songActions.openEditPlaylistsModal(songInfo));
  const closeEditPlaylistsModal = () => dispatch(songActions.closeEditPlaylistsModal());
  const pauseSong = () => dispatch(queueActions.pauseSong());
  const switchSong = (songQueueId: string) => dispatch(queueActions.switchSong(songQueueId));
  const unpauseSong = () => dispatch(queueActions.unpauseSong());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const addSongToQueue = (request: AddSongToQueueRequestData) => dispatch(queueActions.addSongToQueue(request));
  const removeSongFromQueue = (request: RemoveSongFromQueueRequestData) => dispatch(queueActions.removeSongFromQueue(request));

  const items: MenuProps['items'] = [
    {
      label: <div
        className='song__dropdown-item'
        onClick={() => addSongToQueue({ songId: song.songId || '', currentSongQueueId: currentlyPlayingSong.songQueueId || '' })}>
        <PlaylistAddOutlined /><p>Add to queue</p>
      </div>,
      key: '0',
    },
    {
      label: <div
        className='song__dropdown-item'
        onClick={() => removeSongFromQueue({ songQueueId: song.songQueueId || '' })}>
        <DeleteOutlineOutlined /><p>Remove from queue</p>
      </div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <RouterLink to={'/'}>
        <div className='song__dropdown-item'>
          <CastOutlined /><p>Generate playlist by song</p>
        </div>
      </RouterLink>,
      key: '2',
    },
    {
      label: <RouterLink to={`/artist/${song?.artists?.[0].id}`}>
        <div className='song__dropdown-item'>
          <PersonOutlineOutlined /><p>Go to artist</p>
        </div>
      </RouterLink>,
      key: '3',
    },
    {
      label: <RouterLink to={`/album/${song?.album?.id}`}>
        <div className='song__dropdown-item'>
          <AlbumOutlined /> <p>Go to album</p>
        </div>
      </RouterLink>,
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      label: <div
        className='song__dropdown-item'
        onClick={() => copySongLink()}>
        <ContentCopyOutlined /><p>Copy song link</p>
      </div>,
      key: '5',
    },
    {
      type: 'divider',
    },
  ];

  const startPlaySong = () => {
    localStorage.setItem('songQueueId', song?.songQueueId?.toString() || '');
    localStorage.setItem('playTime', JSON.stringify(0));
    const songIndexInQueue = queue?.findIndex(song => song.songQueueId === currentlyPlayingSong?.songQueueId);
    if (((queue?.length || 0) - 1) === songIndexInQueue && isMoreSongsForwardForLoading) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songQueueId: song.songQueueId || '',
        options,
        extendForward: true
      });
    } else if (songIndexInQueue === 0 && isMoreSongsBehindForLoading) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songQueueId: song.songQueueId || '',
        options,
        extendForward: false
      });
    }
    switchSong(song.songQueueId || '');
  }

  const copySongLink = () => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${song?.album?.id}?songId=${song?.songId}`);
  }

  const renderPlayButton = () => {
    if (song?.songQueueId === currentlyPlayingSong?.songQueueId) {
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
        <div className="song__play-button" style={{ justifyContent: isHovered ? 'normal' : 'end' }}>
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
      <div className="song__album-wrapper">
        <RouterLink to={`/album/${song?.album?.id}`}>{song?.album?.name}</RouterLink>
      </div>
      <div className="song__options-block">
        <div
          className="song-player__additional-controller-icon-wrapper cursor-pointer"
          onClick={() => isEditPlaylistModalOpen ? closeEditPlaylistsModal() : openEditPlaylistsModal({
            editPlaylistsSongId: song.songId || '',
            editPlaylistsSongPlaylistIds: song.playlistIds || []
          })}>
          {song?.playlistIds?.length ?
            <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
            isHovered ?
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> :
              <div></div>
          }
        </div>
        <div className="song-player__additional-controller-icon-wrapper">
          <Text>{formatTime(song?.duration!)}</Text>
        </div>
        <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
          {isHovered ? <Dropdown menu={{ items }} trigger={['click']}>
            <MoreHoriz sx={{ color: 'white' }} />
          </Dropdown> : <div></div>}
        </div>
      </div>
    </div>
  );
};