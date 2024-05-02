import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { albumActions } from './store/album.actions';
import { useSelector } from 'react-redux';
import { albumSelectors } from './store/album.selectors';
import { Avatar, Dropdown, Spin, Tooltip, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { formatPlaylistTime, getBackground, renderPlaylistIcon } from '../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../components/song-table/song-table.component';
import { useInView } from 'react-intersection-observer';
import { GenerateQueueRequestData } from '../queue/store/queue.model';
import { queueActions } from '../queue/store/queue.actions';
import { ContentCopyOutlined, Favorite, FavoriteBorder, MoreHoriz, PlayArrow, PlaylistAdd, PlaylistAddCheck, QuizOutlined } from '@mui/icons-material';
import { DOMAIN, listenerProfileTypePalete } from '../../config';
import { MenuProps } from 'antd/lib';
import { showNotification } from '../../helpers/react/redux.helper';
import { songSelectors } from '../song/store/song.selectors';
import { listenerSelectors } from '../store/listener.selectors';
import { songGuesserActions } from '../song-guesser/store/song-guesser.actions';
import { OpenGuesserGameModalData } from '../song-guesser/store/song-guesser.model';

const { Title } = Typography;

export function AlbumPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { albumId } = useParams<{ albumId: string }>();
  const [isCoverImageHovered, setIsCoverImageHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const name = useSelector(albumSelectors.name);
  const artist = useSelector(albumSelectors.artist);
  const date = useSelector(albumSelectors.date);
  const albumCoverImageUrl = useSelector(albumSelectors.coverImageUrl);
  const backgroundColor = useSelector(albumSelectors.backgroundColor);
  const isAddedToLibrary = useSelector(albumSelectors.isAddedToLibrary);
  const songs = useSelector(songSelectors.songs);
  const songsCount = useSelector(albumSelectors.songsCount);
  const songsTimeDuration = useSelector(albumSelectors.songsTimeDuration);
  const hidden = useSelector(albumSelectors.hidden);
  const subscription = useSelector(listenerSelectors.subscription);
  const isAlbumDataLoading = useSelector(albumSelectors.isAlbumDataLoading);
  const currentAlbumId = useSelector(albumSelectors.albumId);

  const dispatch = useDispatch()
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const getAlbumData = (albumId: string) => dispatch(albumActions.getAlbumById(albumId));
  const addAlbumToLibrary = (albumId: string) => dispatch(albumActions.addAlbumToLibrary(albumId));
  const removeAlbumFromLibrary = (albumId: string) => dispatch(albumActions.removeAlbumFromLibrary(albumId));
  const openGuesserGameModal = (data: OpenGuesserGameModalData) => dispatch(songGuesserActions.openGuesserGameModal(data));

  useEffect(() => {
    if (albumId) {
      localStorage.setItem('currentSourceId', albumId);
      getAlbumData(albumId);
    }
  }, [albumId]);

  useEffect(() => {
    if (currentAlbumId === albumId && !isAlbumDataLoading && hidden) {
      window?.history?.state?.idx !== 0 ? navigate(-1) : navigate('/');
    }
  }, [hidden, isAlbumDataLoading, currentAlbumId, albumId]);

  const copyAlbumLink = () => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${albumId}`);
    showNotification('success', 'Album link copied to clipboard');
  }

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => isAddedToLibrary ? removeAlbumFromLibrary(albumId!) : addAlbumToLibrary(albumId!)}>
        {isAddedToLibrary ?
          <><PlaylistAddCheck /><p>Remove from library</p></> :
          <><PlaylistAdd /><p>Add to library</p></>}
      </div>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <Tooltip title={subscription === 'free' ? 'This feature is not available for free subscription' : ''}>
        <div
          className='dropdown-item'
          onClick={() => subscription === 'free' ? {} : openGuesserGameModal({ artist: { name: name!, id: albumId! } })}>
          <QuizOutlined /><p>Start Song Guesser by album</p>
        </div>
      </Tooltip>,
      key: '1',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => copyAlbumLink()}>
        <ContentCopyOutlined /><p>Copy album link</p>
      </div>,
      key: '2',
    },
  ];

  return (
    <div className='user-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="album-page user-group-page">
        <HeaderComponent
          text={name || ''}
          showHeader={!inView && !isAlbumDataLoading}
          background={backgroundColor}
          playSongsOptions={{ options: { albumId } }} />
        <div className='album-page__info'>
          {isAlbumDataLoading ?
            <Avatar size={160} shape="square" /> :
            <div
              className={`album-page__cover-wrapper ${isCoverImageHovered ? 'cursor-pointer' : ''}`}
              onClick={() => isCoverImageHovered && generateQueue({
                isNewQueue: true,
                shuffleEnabled: false,
                options: {
                  albumId
                },
                sortingOptions: {}
              })}
              onMouseEnter={() => setIsCoverImageHovered(!!songs?.length && true)}
              onMouseLeave={() => setIsCoverImageHovered(false)}>
              {renderPlaylistIcon(160, 'absolute', albumCoverImageUrl, undefined, backgroundColor, name)}
              {isCoverImageHovered && <div className='album-page__cover-shadow'></div>}
              {isCoverImageHovered && <PlayArrow sx={{ color: listenerProfileTypePalete.base }} className='album-page__play-button' />}
            </div>}
          {isAlbumDataLoading ?
            <div className='album-page__loader-wrapper'><Spin /></div> :
            <div className='album-page__credits'>
              <Title className='m-0' level={5}>Album</Title>
              <Title className='mt-0' ref={ref} level={1}>{name}</Title>
              <div className='album-page__info-section'>
                <Title className='m-0' level={5}>
                  <RouterLink to={`/artist/${artist?.id}`}>{artist?.name}</RouterLink>, {songsCount} songs, {formatPlaylistTime(songsTimeDuration!)}
                </Title>
                <Tooltip title={isAddedToLibrary ? `Remove album ${name} from your library` : `Save album ${name} to your library`}>
                  <div
                    className="cursor-pointer"
                    onClick={() => isAddedToLibrary ? removeAlbumFromLibrary(albumId!) : addAlbumToLibrary(albumId!)}>
                    {isAddedToLibrary ?
                      <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
                      <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />}
                  </div>
                </Tooltip>
                <Tooltip title={`More options for album ${name}`}>
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <MoreHoriz className='cursor-pointer' sx={{ color: 'white' }} />
                  </Dropdown>
                </Tooltip>
              </div>
            </div>}
        </div>
        <SongTableComponent songsSourceOptions={{ albumId }} />
      </div>
    </div>
  );
}
