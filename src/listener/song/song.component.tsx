import React, { memo, useEffect, useState } from "react";
import {
  AddCircleOutline,
  AlbumOutlined,
  CastOutlined,
  ContentCopyOutlined,
  DeleteOutlineOutlined,
  Explicit,
  ExplicitOutlined,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  PauseOutlined,
  PersonOutlineOutlined,
  PlayArrowOutlined,
  PlaylistAddOutlined,
} from '@mui/icons-material';
import { Avatar, Dropdown, Tooltip, Typography } from "antd";
import { DOMAIN, listenerProfileTypePalete } from "../../config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime, updateCurrentSongAllPlayTime } from "../../helpers/react/song-player.helper";
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
import { playlistActions } from "../playlist/store/playlist.actions";
import { playlistSelectors } from "../playlist/store/playlist.selectors";
import { OpenEditSongPlaylistsModal } from "../playlist/store/playlist.model";
import { showNotification } from "../../helpers/react/redux.helper";
import { GetSongsSortingOptions, RecordSongPlayRowDataRequestData } from "./store/song.model";
import { RepeatSongStateEnum } from "../store/listener.model";
import { songActions } from "./store/song.actions";
import { songRadioActions } from "../song-radio/store/song-radio.actions";
import { CreateSongRadioRequestData } from "../song-radio/store/song-radio.model";

const { Text, Title } = Typography;

export const SongComponent = memo(function SongComponent({
  song,
  currentlyPlayingSong,
  index,
  artistId,
  listenerId,
  showPlaysInfo,
  showAlbumInfo
}: {
  song: QueueSongInfoResponseData,
  currentlyPlayingSong: QueueSongInfoResponseData,
  index: number,
  artistId?: string,
  listenerId?: string,
  showPlaysInfo?: boolean,
  showAlbumInfo?: boolean
}) {
  const [isHovered, setIsHovered] = useState<boolean>();
  const [shouldShowAdditionalColumn, setShouldShowAdditionalColumn] = useState<boolean>(window.innerWidth > 950);

  const isPlaying = useSelector(queueSelectors.isPlaying);
  const isEditSongPlaylistsModalOpen = useSelector(playlistSelectors.isEditSongPlaylistsModalOpen);
  const queue = useSelector(queueSelectors.queue);
  const isMoreSongsBehindForLoading = useSelector(queueSelectors.isMoreSongsBehindForLoading);
  const isMoreSongsForwardForLoading = useSelector(queueSelectors.isMoreSongsForwardForLoading);

  const dispatch = useDispatch();
  const openEditSongPlaylistsModal = (songInfo: OpenEditSongPlaylistsModal) => dispatch(playlistActions.openEditSongPlaylistsModal(songInfo));
  const closeEditSongPlaylistsModal = () => dispatch(playlistActions.closeEditSongPlaylistsModal());
  const pauseSong = () => dispatch(queueActions.pauseSong());
  const switchSong = (songQueueId: string) => dispatch(queueActions.switchSong(songQueueId));
  const unpauseSong = () => dispatch(queueActions.unpauseSong());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const addSongToQueue = (request: AddSongToQueueRequestData) => dispatch(queueActions.addSongToQueue(request));
  const removeSongFromQueue = (request: RemoveSongFromQueueRequestData) => dispatch(queueActions.removeSongFromQueue(request));
  const recordSongPlayRowData = (request: RecordSongPlayRowDataRequestData) => dispatch(songActions.recordSongPlayRowData(request));
  const createSongRadio = (request: CreateSongRadioRequestData) => dispatch(songRadioActions.createSongRadio(request));

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => openEditSongPlaylistsModal({
          editPlaylistsSong: song
        })}>
        <AddCircleOutline /><p>Add to playlist</p>
      </div>,
      key: '0',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => addSongToQueue({ songId: song.songId || '', currentSongQueueId: currentlyPlayingSong.songQueueId || '' })}>
        <PlaylistAddOutlined /><p>Add to queue</p>
      </div>,
      key: '1',
    },
    index === 1 ?
      null :
      {
        label: <div
          className='dropdown-item'
          onClick={() => removeSongFromQueue({ songQueueId: song.songQueueId || '' })}>
          <DeleteOutlineOutlined /><p>Remove from queue</p>
        </div>,
        key: '2',
      },
    {
      type: 'divider',
    },
    {
      label: <div className='dropdown-item'
        onClick={() => createSongRadio({ song: song })}>
        <CastOutlined /><p>Generate song radio</p>
      </div>,
      key: '3',
    },
    {
      label: <RouterLink to={`/artist/${song?.artists?.[0].id}`}>
        <div className='dropdown-item'>
          <PersonOutlineOutlined /><p>Go to artist</p>
        </div>
      </RouterLink>,
      key: '4',
    },
    {
      label: <RouterLink to={`/album/${song?.album?.id}`}>
        <div className='dropdown-item'>
          <AlbumOutlined /> <p>Go to album</p>
        </div>
      </RouterLink>,
      key: '5',
    },
    {
      type: 'divider',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => copySongLink()}>
        <ContentCopyOutlined /><p>Copy song link</p>
      </div>,
      key: '6',
    }
  ];

  const updateShouldShowAdditionalColumnState = () => {
    if (window.innerWidth > 950) {
      setShouldShowAdditionalColumn(true);
    } else {
      setShouldShowAdditionalColumn(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateShouldShowAdditionalColumnState);
    return () => {
      window.removeEventListener('resize', updateShouldShowAdditionalColumnState);
    }
  }, []);

  const startPlaySong = () => {
    if (artistId) {
      updateCurrentSongAllPlayTime();
      recordSongPlayRowData({
        songId: localStorage.getItem('currentPlayingSongId') || ''
      });
      generateQueue({
        isNewQueue: true,
        shuffleEnabled: false,
        songId: song?.songId,
        options: { artistId: artistId },
        sortingOptions: { plays: -1 }
      });
    } else if (listenerId) {
      updateCurrentSongAllPlayTime();
      recordSongPlayRowData({
        songId: localStorage.getItem('currentPlayingSongId') || ''
      });
      generateQueue({
        isNewQueue: true,
        shuffleEnabled: false,
        songId: song?.songId,
        options: { listenerId: listenerId },
        sortingOptions: { plays: -1 }
      });
    } else {
      localStorage.setItem('songQueueId', song?.songQueueId?.toString() || '');
      localStorage.setItem('playTime', JSON.stringify(0));
      const songIndexInQueue = queue?.findIndex(song => song.songQueueId === currentlyPlayingSong?.songQueueId);
      updateCurrentSongAllPlayTime();
      recordSongPlayRowData({
        songId: localStorage.getItem('currentPlayingSongId') || ''
      });
      if (((queue?.length || 0) - 1) === songIndexInQueue && isMoreSongsForwardForLoading) {
        generateQueue({
          isNewQueue: false,
          shuffleEnabled: false,
          repeatSongState: localStorage.getItem('repeatSongState') as RepeatSongStateEnum ||
            JSON.stringify(RepeatSongStateEnum.none),
          songQueueId: song.songQueueId || '',
          extendForward: true
        });
      } else if (songIndexInQueue === 0 && isMoreSongsBehindForLoading) {
        generateQueue({
          isNewQueue: false,
          shuffleEnabled: false,
          repeatSongState: localStorage.getItem('repeatSongState') as RepeatSongStateEnum ||
            JSON.stringify(RepeatSongStateEnum.none),
          songQueueId: song.songQueueId || '',
          extendForward: false
        });
      }
      switchSong(song.songQueueId || '');
    }
  }

  const copySongLink = () => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${song?.album?.id}?songId=${song?.songId}`);
    showNotification('success', 'Song link copied to clipboard');
  }

  const renderPlayButton = () => {
    if (song?.songQueueId ?
      song?.songQueueId === currentlyPlayingSong?.songQueueId :
      song?.songId === currentlyPlayingSong?.songId) {
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
      className={`song ${song.hidden ? 'song--hidden' : ''} ${(showPlaysInfo && showAlbumInfo && shouldShowAdditionalColumn) ? 'song--show-additional-column' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="song__wrapper song__wrapper--with-cover">
        <div className="song__play-button" style={{ justifyContent: isHovered && !song.hidden ? 'normal' : 'end' }}>
          {isHovered && !song.hidden ? renderPlayButton() : <Text>{index}</Text>}
        </div>
        <Avatar shape='square' size={48} src={song?.coverImageUrl} />
        <div className="song__credentials">
          <Title className="m-0" level={5}>{song?.name}</Title>
          <Text className='song__credentials-artists-wrapper'>
            {song?.explicit ? <Tooltip title='Explicit'><Explicit fontSize="small" /></Tooltip> : <></>}
            {song?.artists
              ?.map<React.ReactNode>(artist => <RouterLink key={artist.name} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
              .reduce((prev, curr) => [prev, ', ', curr])}
          </Text>
        </div>
      </div>
      {(showAlbumInfo && shouldShowAdditionalColumn) && <div className="song__album-wrapper">
        <RouterLink to={`/album/${song?.album?.id}`}>{song?.album?.name}</RouterLink>
      </div>}
      {showPlaysInfo && <div className="song__plays-wrapper">
        <Text>{song.plays}</Text>
      </div>}
      <div className="song__options-block">
        {song.hidden ? <div className="song-player__additional-controller-icon-wrapper"></div> :
          <Tooltip title={`Add song ${song.name} to playlist`}>
            <div
              className="song-player__additional-controller-icon-wrapper cursor-pointer"
              onClick={() => isEditSongPlaylistsModalOpen ? closeEditSongPlaylistsModal() : openEditSongPlaylistsModal({
                editPlaylistsSong: song
              })}>
              {song?.playlistIds?.length ?
                <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
                isHovered ?
                  <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> :
                  <div></div>
              }
            </div>
          </Tooltip>}
        <div className="song-player__additional-controller-icon-wrapper">
          <Text>{formatTime(song?.duration!)}</Text>
        </div>
        {song.hidden ? <div className="song-player__additional-controller-icon-wrapper"></div> :
          <Tooltip title={`More options for song ${song.name}`}>
            <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
              {isHovered ? <Dropdown menu={{ items }} trigger={['click']}>
                <MoreHoriz sx={{ color: 'white' }} />
              </Dropdown> : <div></div>}
            </div>
          </Tooltip>}
      </div >
    </div >
  );
});