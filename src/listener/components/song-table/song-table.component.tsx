import React, { useEffect, useMemo, useState } from 'react';
import {
  AccessTime,
  Favorite,
  FavoriteBorder,
  PauseOutlined,
  PlayArrowOutlined
} from '@mui/icons-material';
import { Avatar, Table, TableColumnsType, Typography } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import {
  GetSongsOptions,
  GetSongsRequestData,
  SongInfoResponseData
} from '../../song/store/song.model';
import { useSelector } from 'react-redux';
import { songSelectors } from '../../song/store/song.selectors';
import { useDispatch } from 'react-redux';
import { songActions } from '../../song/store/song.actions';
import { listenerProfileTypePalete, songsLoadingLimit } from '../../../config';
import { formatTime } from '../../../helpers/react/song-player.helper';
import { queueSelectors } from '../../queue/store/queue.selectors';
import { GenerateQueueRequestData } from '../../queue/store/queue.model';
import { queueActions } from '../../queue/store/queue.actions';
import { useInView } from 'react-intersection-observer';
import { ColumnProps, ColumnsType } from 'antd/es/table';
import { platform } from 'os';
import moment from 'moment';
import { playlistActions } from '../../playlist/store/playlist.actions';
import { playlistSelectors } from '../../playlist/store/playlist.selectors';
import { openEditSongPlaylistsModal } from '../../playlist/store/playlist.model';

const { Text, Title } = Typography;

export function SongTableComponent({
  songsSourceOptions,
}: {
  songsSourceOptions: GetSongsOptions;
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
  const isEditSongPlaylistsModalOpen = useSelector(playlistSelectors.isEditSongPlaylistsModalOpen);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(queueActions.pauseSong());
  const unpauseSong = () => dispatch(queueActions.unpauseSong());
  const openEditSongPlaylistsModal = (songInfo: openEditSongPlaylistsModal) => dispatch(playlistActions.openEditSongPlaylistsModal(songInfo));
  const closeEditSongPlaylistsModal = () => dispatch(playlistActions.closeEditSongPlaylistsModal());
  const getSongs = (request: GetSongsRequestData) => dispatch(songActions.getSongs(request));
  const clearSongs = () => dispatch(songActions.clearSongs());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

  const currentlyPlayingSong = useMemo(() => {
    return songsQueue?.find(song => song.songQueueId === songQueueId);
  }, [songQueueId, songsQueue]);

  const handleLoadMore = async () => {
    if (!isSongsLoading && (typeof isMoreSongsForLoading === 'undefined' || isMoreSongsForLoading)) {
      getSongs({
        options: songsSourceOptions,
        offset,
        limit: songsLoadingLimit
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
    clearSongs();
    if (songsSourceOptions && !isSongsLoading) {
      getSongs({
        options: songsSourceOptions,
        offset: 0,
        limit: songsLoadingLimit
      });
      setOffset(state => state + 1);
    }
  }, [songsSourceOptions.albumId, songsSourceOptions.playlistId, songsSourceOptions.artistId])

  useEffect(() => {
    return () => {
      setOffset(0);
      setHoveredSongId('');
      clearSongs();
    };
  }, []);

  const renderTableColumns = (): ColumnsType<SongInfoResponseData> => {
    const titleColumn: ColumnProps<SongInfoResponseData> = {
      title: <p style={{ paddingLeft: '16px' }}>Title</p>,
      dataIndex: 'name',
      key: 'name',
      render: (value, record, index) => (
        <div
          className={`song__wrapper ${!songsSourceOptions?.albumId ? 'song__wrapper--with-cover' : 'song__wrapper--without-cover'}`}
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
    };

    const dateColumn: ColumnProps<SongInfoResponseData> = {
      title: 'Date added',
      align: 'left',
      width: '20%',
      render: (value, record) => moment(record.date).fromNow(),
      dataIndex: 'date',
      key: 'date'
    };

    const albumColumn: ColumnProps<SongInfoResponseData> = {
      title: 'Album',
      align: 'left',
      width: '30%',
      render: (value, record) => <div className='song__album-wrapper'>
        <RouterLink to={`/album/${record.album?.id}`}>{record.album?.name}</RouterLink>
      </div>,
      dataIndex: 'album',
      key: 'album'
    };

    const playsColumn: ColumnProps<SongInfoResponseData> = {
      title: 'Plays',
      align: 'center',
      width: '30%',
      dataIndex: 'plays',
      key: 'plays'
    };

    const renderLikeButton = (record: SongInfoResponseData) => {
      if (songsSourceOptions.playlistId) {
        return (
          hoveredSongId === record.songId ?
            record.playlistIds?.length ?
              <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> :
            <div></div>
        );
      }
      return (
        record.playlistIds?.length ?
          <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
          hoveredSongId === record.songId ?
            <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> :
            <div></div>
      );
    }

    const likeColumn: ColumnProps<SongInfoResponseData> = {
      align: 'center',
      width: '50px',
      dataIndex: 'like',
      render: (value, record, index) => (<div
        className="song-player__additional-controller-icon-wrapper cursor-pointer"
        onClick={() => isEditSongPlaylistsModalOpen ? closeEditSongPlaylistsModal() : openEditSongPlaylistsModal({
          editPlaylistsSongId: record.songId || '',
          editPlaylistsSongPlaylistIds: record.playlistIds || []
        })}>
        {renderLikeButton(record)}
      </div>),
      key: 'like'
    };

    const durationColumn: ColumnProps<SongInfoResponseData> = {
      title: <AccessTime fontSize='small' />,
      align: 'center',
      width: '10%',
      dataIndex: 'duration',
      render: (value, record) => formatTime(record.duration || 0),
      key: 'duration'
    };


    if (songsSourceOptions.playlistId) {
      return [
        titleColumn,
        albumColumn,
        dateColumn,
        likeColumn,
        durationColumn
      ];
    }
    return [
      titleColumn,
      playsColumn,
      likeColumn,
      durationColumn
    ];
  }

  return (
    <Table
      dataSource={songs?.map(song => ({ ...song, key: song.songId }))}
      columns={renderTableColumns()}
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