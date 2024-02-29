import React, { useEffect, useMemo, useState } from 'react';
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
  SongInfoResponseData
} from '../../song/store/song.model';
import { useSelector } from 'react-redux';
import { songSelectors } from '../../song/store/song.selectors';
import { useDispatch } from 'react-redux';
import { songActions } from '../../song/store/song.actions';
import { listenerProfileTypePalete } from '../../../config';
import { formatTime } from '../../../helpers/react/song-player.helper';
import { queueSelectors } from '../../queue/store/queue.selectors';
import { GenerateQueueRequestData } from '../../queue/store/queue.model';
import { queueActions } from '../../queue/store/queue.actions';
import { useInView } from 'react-intersection-observer';

const { Text, Title } = Typography;

export function SongTableComponent({
  songsSourceOptions,
}: {
  songsSourceOptions: GetSongsOptions
}) {
  const [offset, setOffset] = useState(0);
  const [hoveredSongId, setHoveredSongId] = useState<string>('');
  const { ref, inView } = useInView({ threshold: 0 });
  const songs = useSelector(songSelectors.songs)
  const isSongsLoading = useSelector(songSelectors.isSongsLoading);
  const isMoreSongsForLoading = useSelector(songSelectors.isMoreSongsForLoading);
  const isPlaying = useSelector(queueSelectors.isPlaying);
  const songsQueue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);
  const isQueueLoading = useSelector(queueSelectors.isQueueLoading);
  const isEditPlaylistModalOpen = useSelector(songSelectors.isEditPlaylistModalOpen);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(queueActions.pauseSong());
  const unpauseSong = () => dispatch(queueActions.unpauseSong());
  const openEditPlaylistsModal = (songInfo: OpenEditPlaylistsModal) => dispatch(songActions.openEditPlaylistsModal(songInfo));
  const closeEditPlaylistsModal = () => dispatch(songActions.closeEditPlaylistsModal());
  const getSongs = (request: GetSongsRequestData) => dispatch(songActions.getSongs(request));
  const clearSongs = () => dispatch(songActions.clearSongs());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

  const currentlyPlayingSong = useMemo(() => {
    return songsQueue?.find(song => song.songQueueId === songQueueId);
  }, [songQueueId, songsQueue]);

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
    if (!isQueueLoading) {
      generateQueue({
        isNewQueue: true,
        shuffleEnabled: false,
        songId: currentSong?.songId || '',
        options: songsSourceOptions
      });
    }
  }

  const renderPlayButton = (currentSong: SongInfoResponseData) => {
    if (currentlyPlayingSong?.songId === currentSong?.songId) {
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
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

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
      dataSource={songs?.map(song => ({ ...song, key: song.songId }))}
      columns={[
        {
          title: <p style={{ paddingLeft: '16px' }}>Title</p>,
          dataIndex: 'name',
          key: 'name',
          render: (value, record, index) => (
            <div
              className="song__wrapper"
              ref={(index + 2 === songs?.length && isMoreSongsForLoading) ? ref : null}
              key={record.songId}>
              <div className="song__play-button" style={{ justifyContent: hoveredSongId === record.songId ? 'normal' : 'end' }}>
                {hoveredSongId === record.songId ? renderPlayButton(record) : <Text>{index + 1}</Text>}
              </div>
              {!songsSourceOptions?.albumId && <Avatar shape='square' size={48} src={record?.coverImageUrl} />}
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