import React, { useEffect, useState } from 'react';
import {
  AccessTime,
  Favorite,
  FavoriteBorder,
  PauseOutlined,
  PlayArrowOutlined
} from '@mui/icons-material';
import { Avatar, Table, Typography } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import {
  GetSongsOptions,
  GetSongsRequestData,
  OpenEditPlaylistsModal,
  PlaySongData,
  SongInfoResponseData
} from '../../song/store/song.model';
import { useSelector } from 'react-redux';
import { songSelectors } from '../../song/store/song.selectors';
import { useDispatch } from 'react-redux';
import { songActions } from '../../song/store/song.actions';
import { listenerProfileTypePalete } from '../../../config';
import { formatTime } from '../../../helpers/react/song-player.helper';

const { Text, Title } = Typography;

export function SongTableComponent({
  songsSourceOptions,
  isReachedBottom
}: {
  songsSourceOptions: GetSongsOptions,
  isReachedBottom: boolean
}) {
  const lastSavedSongsQueue: Array<SongInfoResponseData> = JSON.parse(localStorage.getItem('songsQueue') || '[]');

  const [offset, setOffset] = useState(0);
  const [hoveredSongId, setHoveredSongId] = useState<string>('');
  const [songsQueue, setSongsQueue] = useState<Array<SongInfoResponseData>>(lastSavedSongsQueue);

  const songs = useSelector(songSelectors.songs)
  const isLoading = useSelector(songSelectors.isSongsLoading);
  const isMoreSongsForLoading = useSelector(songSelectors.isMoreSongsForLoading);
  const isPlaying = useSelector(songSelectors.isPlaying);
  const songId = localStorage.getItem('songId');

  const isEditPlaylistModalOpen = useSelector(songSelectors.isEditPlaylistModalOpen);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(songActions.pauseSong());
  const playSong = (songData: PlaySongData) => dispatch(songActions.playSong(songData));
  const unpauseSong = () => dispatch(songActions.unpauseSong());
  const openEditPlaylistsModal = (songInfo: OpenEditPlaylistsModal) => dispatch(songActions.openEditPlaylistsModal(songInfo));
  const closeEditPlaylistsModal = () => dispatch(songActions.closeEditPlaylistsModal());
  const getSongs = (request: GetSongsRequestData) => dispatch(songActions.getSongs(request));
  const clearSongs = () => dispatch(songActions.clearSongs());

  const handleLoadMore = async () => {
    if (typeof isMoreSongsForLoading === 'undefined' || isMoreSongsForLoading) {
      getSongs({
        options: songsSourceOptions,
        offset,
        limit: 5
      });
      setOffset(state => state + 1);
    }
  };

  const startPlaySong = (currentSong: SongInfoResponseData) => {
    const songIndex = songsQueue?.findIndex(songInQueue => songInQueue.songId === currentSong?.songId);
    currentSong?.songId && localStorage.setItem('songId', currentSong.songId.toString());
    songsQueue && localStorage.setItem('songsQueue', JSON.stringify(songsQueue));
    !isNaN(songIndex) && localStorage.setItem('songIndex', songIndex.toString());
    currentSong?.playlistIds && localStorage.setItem('playlistIds', JSON.stringify(currentSong.playlistIds));
    localStorage.setItem('playTime', JSON.stringify(0));
    playSong({
      songId: currentSong?.songId,
      name: currentSong?.name,
      duration: currentSong?.duration,
      coverImageUrl: currentSong?.coverImageUrl,
      songUrl: currentSong?.songUrl,
      artists: currentSong?.artists,
      playlistIds: currentSong?.playlistIds,
      backgroundColor: currentSong?.backgroundColor,
      lyricsBackgroundShadow: currentSong?.lyricsBackgroundShadow,
      songsQueue,
      songIndex
    })
  }

  const renderPlayButton = (currentSong: SongInfoResponseData) => {
    if (songId === currentSong?.songId) {
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
        onClick={() => startPlaySong(currentSong)} />
    );
  }

  useEffect(() => {
    if (isReachedBottom) {
      handleLoadMore();
    }
  }, [isReachedBottom]);

  useEffect(() => {
    getSongs({
      options: songsSourceOptions,
      offset: 0,
      limit: 5
    });
    setOffset(state => state + 1);
    return () => {
      setOffset(0);
      setHoveredSongId('');
      clearSongs();
    };
  }, [])

  return (
    <Table
      dataSource={songs?.map(son => ({ ...son, key: son.songId }))}
      columns={[
        {
          title: 'Title',
          dataIndex: 'name',
          key: 'name',
          render: (value, record, index) => (
            <div key={record.songId} className="song__wrapper">
              <div className="song__play-button">
                {hoveredSongId === record.songId ? renderPlayButton(record) : <Text>{index + 1}</Text>}
              </div>
              <Avatar shape='square' size={64} src={record?.coverImageUrl} />
              <div className="song__credentials">
                <Title className="m-0" level={5}>{record?.name}</Title>
                <Text>{record?.artists?.map(artist =>
                  (<RouterLink key={artist.id} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
                )}</Text>
              </div>
            </div>
          )
        },
        {
          title: 'Plays',
          align: 'center',
          width: '30%',
          dataIndex: 'plays',
          key: 'plays'
        },
        {
          align: 'center',
          width: '50px',
          dataIndex: 'like',
          render: (value, record, index) => (<div
            className="song-player__additional-controller-icon-wrapper"
            onClick={() => isEditPlaylistModalOpen ? closeEditPlaylistsModal() : openEditPlaylistsModal({
              editPlaylistsSongId: record.songId || '',
              editPlaylistsSongPlaylistIds: record.playlistIds || []
            })}>
            {record.playlistIds?.length ?
              <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            }
          </div>),
          key: 'like'
        },
        {
          title: <AccessTime fontSize='small' />,
          align: 'center',
          width: '10%',
          dataIndex: 'duration',
          render: (value, record) => formatTime(record.duration || 0),
          key: 'duration'
        }
      ]}
      onRow={(record) => ({
        onMouseEnter: () => setHoveredSongId(record.songId || ''),
        onMouseLeave: () => setHoveredSongId('')
      })}
      pagination={false}
      bordered={false}
      sticky={{ offsetHeader: 64 }}>

    </Table>
  );
}