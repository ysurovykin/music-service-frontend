import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessTime,
  AddCircleOutline,
  AlbumOutlined,
  CastOutlined,
  ContentCopyOutlined,
  DeleteOutlineOutlined,
  Explicit,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  PauseOutlined,
  PersonOutlineOutlined,
  PlayArrowOutlined,
  PlaylistAddOutlined
} from '@mui/icons-material';
import { Avatar, Dropdown, Table, Tooltip, Typography } from 'antd';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  GetSongsOptions,
  GetSongsRequestData,
  GetSongsSortingOptions,
  RecordSongPlayRowDataRequestData,
  SongInfoResponseData
} from '../../song/store/song.model';
import { useSelector } from 'react-redux';
import { songSelectors } from '../../song/store/song.selectors';
import { useDispatch } from 'react-redux';
import { songActions } from '../../song/store/song.actions';
import { DOMAIN, listenerProfileTypePalete, songsLoadingLimit } from '../../../config';
import { formatTime, updateCurrentSongAllPlayTime } from '../../../helpers/react/song-player.helper';
import { queueSelectors } from '../../queue/store/queue.selectors';
import { AddSongToQueueRequestData, GenerateQueueRequestData, QueueSongInfoResponseData, RemoveSongFromQueueRequestData } from '../../queue/store/queue.model';
import { queueActions } from '../../queue/store/queue.actions';
import { useInView } from 'react-intersection-observer';
import { ColumnProps, ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { playlistActions } from '../../playlist/store/playlist.actions';
import { playlistSelectors } from '../../playlist/store/playlist.selectors';
import { OpenEditSongPlaylistsModal } from '../../playlist/store/playlist.model';
import { MenuProps } from 'antd/lib';
import { showNotification } from '../../../helpers/react/redux.helper';
import { RepeatSongStateEnum } from '../../store/listener.model';
import { EmptySongListComponent } from '../../song/empty-song-list/empty-song-list.component';
import { CreateSongRadioRequestData } from '../../song-radio/store/song-radio.model';
import { songRadioActions } from '../../song-radio/store/song-radio.actions';

const { Text, Title } = Typography;

export function SongTableComponent({
  songsSourceOptions,
  sortingOptions,
  onlyLiked,
  search,
  offsetHeader = 64
}: {
  songsSourceOptions?: GetSongsOptions;
  sortingOptions?: GetSongsSortingOptions;
  onlyLiked?: boolean;
  search?: string;
  offsetHeader?: number;
}) {
  const [offset, setOffset] = useState(0);
  const [searchedSongVisited, setSearchedSongVisited] = useState<boolean>(false);
  const [searchedSongShowed, setSearchedSongShowed] = useState<boolean>(false);
  const [shouldShowAlbumColumn, setShouldShowAlbumColumn] = useState<boolean>(window.innerWidth > 950);
  const [hoveredSongId, setHoveredSongId] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const searchedSongRef = useRef<HTMLDivElement>(null);
  const lastSongRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({ threshold: 0 });

  const songs = useSelector(songSelectors.songs)
  const isSongsLoading = useSelector(songSelectors.isSongsLoading);
  const isMoreSongsForLoading = useSelector(songSelectors.isMoreSongsForLoading);
  const isPlaying = useSelector(queueSelectors.isPlaying);
  const songsQueue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);
  const isQueueLoading = useSelector(queueSelectors.isQueueLoading);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(queueActions.pauseSong());
  const unpauseSong = () => dispatch(queueActions.unpauseSong());
  const openEditSongPlaylistsModal = (songInfo: OpenEditSongPlaylistsModal) =>
    dispatch(playlistActions.openEditSongPlaylistsModal(songInfo));
  const getSongs = (request: GetSongsRequestData) => dispatch(songActions.getSongs(request));
  const loadMoreSongs = (request: GetSongsRequestData) => dispatch(songActions.loadMoreSongs(request));
  const clearSongs = () => dispatch(songActions.clearSongs());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const addSongToQueue = (request: AddSongToQueueRequestData) => dispatch(queueActions.addSongToQueue(request));
  const recordSongPlayRowData = (request: RecordSongPlayRowDataRequestData) => dispatch(songActions.recordSongPlayRowData(request));
  const createSongRadio = (request: CreateSongRadioRequestData) => dispatch(songRadioActions.createSongRadio(request));

  const currentlyPlayingSong = useMemo(() => {
    return songsQueue?.find(song => song.songQueueId === songQueueId);
  }, [songQueueId, songsQueue]);

  const handleLoadMore = async () => {
    if (!isSongsLoading && (typeof isMoreSongsForLoading === 'undefined' || isMoreSongsForLoading)) {
      loadMoreSongs({
        options: songsSourceOptions,
        offset,
        limit: songsLoadingLimit,
        onlyLiked: onlyLiked,
        sortingOptions: sortingOptions,
        search: search
      });
      setOffset(state => state + 1);
    }
  };

  const startPlaySong = (currentSong: SongInfoResponseData) => {
    if (!isQueueLoading) {
      updateCurrentSongAllPlayTime();
      recordSongPlayRowData({
        songId: localStorage.getItem('currentPlayingSongId') || ''
      })
      generateQueue({
        isNewQueue: true,
        shuffleEnabled: false,
        repeatSongState: localStorage.getItem('repeatSongState') as RepeatSongStateEnum ||
          JSON.stringify(RepeatSongStateEnum.none),
        songId: currentSong?.songId || '',
        onlyLiked: onlyLiked,
        sortingOptions: sortingOptions,
        options: songsSourceOptions,
        search: search
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
    if (!searchedSongShowed && searchParams.get("songId")) {
      if (searchedSongRef.current) {
        searchedSongRef.current.scrollIntoView({ behavior: 'smooth' });
        setSearchedSongShowed(true);
      } else {
        lastSongRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchedSongRef, searchParams, songs]);

  useEffect(() => {
    clearSongs();
    if (songsSourceOptions || search) {
      getSongs({
        options: songsSourceOptions,
        offset: 0,
        limit: songsLoadingLimit,
        onlyLiked: onlyLiked,
        sortingOptions: sortingOptions,
        search
      });
      setOffset(1);
    }
  }, [songsSourceOptions?.albumId, songsSourceOptions?.playlistId, songsSourceOptions?.songRadioBaseSongId, songsSourceOptions?.artistId, search])

  useEffect(() => {
    return () => {
      setOffset(0);
      setHoveredSongId('');
      clearSongs();
    };
  }, []);

  const copySongLink = (albumId: string, songId: string) => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${albumId}?songId=${songId}`);
    showNotification('success', 'Song link copied to clipboard');
  }

  const updateShouldShowAlbumColumnState = () => {
    if (window.innerWidth > 950) {
      setShouldShowAlbumColumn(true);
    } else {
      setShouldShowAlbumColumn(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateShouldShowAlbumColumnState);
    return () => {
      window.removeEventListener('resize', updateShouldShowAlbumColumnState);
    }
  }, []);

  const renderTableColumns = (): { [columnName: string]: ColumnProps<SongInfoResponseData> } => {
    const titleColumn: ColumnProps<SongInfoResponseData> = {
      title: <p style={{ paddingLeft: '16px' }}>Title</p>,
      dataIndex: 'name',
      key: 'name',
      render: (value, record, index) => (
        <div
          className={`song__wrapper ${!songsSourceOptions?.albumId ? 'song__wrapper--with-cover' : 'song__wrapper--without-cover'}`}
          ref={(index + 2 === songs?.length && isMoreSongsForLoading) ? ref : null}
          key={record.songId}>
          <div
            className="song__play-button"
            style={{ justifyContent: (hoveredSongId === record.songId && !record.hidden) ? 'normal' : 'end' }}>
            {(hoveredSongId === record.songId && !record.hidden) ? renderPlayButton(record) : <Text>{index + 1}</Text>}
          </div>
          {!songsSourceOptions?.albumId && <Avatar shape='square' size={48} src={record?.coverImageUrl} />}
          <div
            className="song__credentials"
            ref={record.songId === searchParams.get("songId") ?
              searchedSongRef :
              (index + 1 === songs?.length) ?
                lastSongRef :
                null}>
            <Title className="m-0" level={5}>{record?.name}</Title>
            <div>
              <Text className='song__credentials-artists-wrapper'>
                {record?.explicit ? <Tooltip title='Explicit'><Explicit fontSize="small" /></Tooltip> : <></>}
                {record?.artists
                  ?.map<React.ReactNode>(artist => <RouterLink key={artist.name} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
                  .reduce((prev, curr) => [prev, ', ', curr])}
              </Text>
            </div>
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
      width: '25%',
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
      if (songsSourceOptions?.playlistId) {
        return (
          <Tooltip title={record.hidden ? 'Song currently unavailable' : `Add song ${record.name} to playlist`}>
            {hoveredSongId === record.songId ?
              record.playlistIds?.length ?
                <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
                <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> :
              <div></div>}
          </Tooltip>
        );
      }
      return (
        <Tooltip title={record.hidden ? 'Song currently unavailable' : `Add song ${record.name} to playlist`}>
          {record.playlistIds?.length ?
            <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
            hoveredSongId === record.songId ?
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> :
              <div></div>}
        </Tooltip>
      );
    }

    const likeColumn: ColumnProps<SongInfoResponseData> = {
      align: 'center',
      width: '50px',
      dataIndex: 'like',
      render: (value, record, index) => (record.hidden ? <></> :
        <div
          className="song-player__additional-controller-icon-wrapper cursor-pointer"
          onClick={() => openEditSongPlaylistsModal({
            editPlaylistsSong: record
          })}>
          {renderLikeButton(record)}
        </div>),
      key: 'like'
    };

    const durationColumn: ColumnProps<SongInfoResponseData> = {
      title: <AccessTime fontSize='small' />,
      align: 'center',
      width: '75px',
      dataIndex: 'duration',
      render: (value, record) => formatTime(record.duration || 0),
      key: 'duration'
    };

    const generateMenuItems = (record: QueueSongInfoResponseData): MenuProps['items'] => {
      return [
        {
          label: <div
            className='dropdown-item'
            onClick={() => openEditSongPlaylistsModal({
              editPlaylistsSong: record
            })}>
            <AddCircleOutline /><p>Add to playlist</p>
          </div>,
          key: '0',
        },
        {
          label: <div
            className='dropdown-item'
            onClick={() => addSongToQueue({ songId: record?.songId || '', currentSongQueueId: currentlyPlayingSong?.songQueueId || '' })}>
            <PlaylistAddOutlined /><p>Add to queue</p>
          </div>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <div
            className='dropdown-item'
            onClick={() => createSongRadio({ song: record })}>
            <CastOutlined /><p>Generate song radio</p>
          </div>,
          key: '2',
        },
        {
          label: <RouterLink to={`/artist/${record?.artists?.[0].id}`}>
            <div className='dropdown-item'>
              <PersonOutlineOutlined /><p>Go to artist</p>
            </div>
          </RouterLink>,
          key: '3',
        },
        {
          label: <RouterLink to={`/album/${record?.album?.id}`}>
            <div className='dropdown-item'>
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
            className='dropdown-item'
            onClick={() => copySongLink(record?.album?.id || '', record?.songId || '')}>
            <ContentCopyOutlined /><p>Copy song link</p>
          </div>,
          key: '5',
        }
      ]
    };

    const menuColumn: ColumnProps<SongInfoResponseData> = {
      align: 'center',
      width: '75px',
      dataIndex: 'duration',
      render: (value, record) =>
        <Tooltip title={`More options for song ${record.name}`}>
          {record.hidden ? <></> : <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
            {hoveredSongId === record.songId ? <Dropdown menu={{ items: generateMenuItems(record) }} trigger={['click']}>
              <MoreHoriz sx={{ color: 'white' }} />
            </Dropdown> : <div></div>}
          </div>}
        </Tooltip>,
      key: 'duration'
    };

    return {
      titleColumn,
      playsColumn,
      albumColumn,
      dateColumn,
      likeColumn,
      durationColumn,
      menuColumn
    };
  }

  const renderTableColumnsOnBigDevice = (): ColumnsType<SongInfoResponseData> => {
    const {
      titleColumn,
      playsColumn,
      albumColumn,
      dateColumn,
      likeColumn,
      durationColumn,
      menuColumn
    } = renderTableColumns();

    if (songsSourceOptions?.playlistId) {
      return [
        titleColumn,
        albumColumn,
        dateColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    } else if (songsSourceOptions?.songRadioBaseSongId) {
      return [
        titleColumn,
        albumColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    } else if (songsSourceOptions?.listenerId) {
      return [
        titleColumn,
        albumColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    } else if (search) {
      return [
        titleColumn,
        albumColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    }
    return [
      titleColumn,
      playsColumn,
      likeColumn,
      durationColumn,
      menuColumn
    ];
  };

  const renderTableColumnsOnSmallDevice = (): ColumnsType<SongInfoResponseData> => {
    const {
      titleColumn,
      playsColumn,
      albumColumn,
      dateColumn,
      likeColumn,
      durationColumn,
      menuColumn
    } = renderTableColumns();

    if (songsSourceOptions?.playlistId) {
      return [
        titleColumn,
        dateColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    } else if (songsSourceOptions?.songRadioBaseSongId) {
      return [
        titleColumn,
        albumColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    } else if (songsSourceOptions?.listenerId) {
      return [
        titleColumn,
        albumColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    } else if (search) {
      return [
        titleColumn,
        albumColumn,
        likeColumn,
        durationColumn,
        menuColumn
      ];
    }
    return [
      titleColumn,
      playsColumn,
      likeColumn,
      durationColumn,
      menuColumn
    ];
  };

  const onMouseEnterSongRow = (songId: string) => {
    setHoveredSongId(songId);
    if (!searchedSongVisited && songId === searchParams.get("songId")) {
      setSearchedSongVisited(true);
    }
  }

  return (
    <>
      <Table
        dataSource={songs?.map(song => ({ ...song, key: song.songId }))}
        columns={shouldShowAlbumColumn ? renderTableColumnsOnBigDevice() : renderTableColumnsOnSmallDevice()}
        onRow={(record) => ({
          onMouseEnter: () => onMouseEnterSongRow(record.songId || ''),
          onMouseLeave: () => setHoveredSongId('')
        })}
        loading={!songs?.length && isSongsLoading}
        rowClassName={(record, index) =>
          record.hidden ? 'song__song-table-row song__song-table-row--hidden' :
            (!searchedSongVisited && record.songId === searchParams.get("songId")) ?
              'song__song-table-row song__song-table-row--searched' :
              'song__song-table-row song__song-table-row--visible'
        }
        pagination={false}
        bordered={false}
        sticky={{ offsetHeader }} />
      {!songs?.length && !isSongsLoading ? <EmptySongListComponent /> : null}
    </>
  );
}