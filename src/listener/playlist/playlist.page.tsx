import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { playlistActions } from './store/playlist.actions';
import { useSelector } from 'react-redux';
import { playlistSelectors } from './store/playlist.selectors';
import { Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { formatPlaylistTime, getBackground, renderPlaylistIcon } from '../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../components/song-table/song-table.component';
import { useInView } from 'react-intersection-observer';
import { PlaylistTagEnum } from './store/playlist.model';
import { showNotification } from '../../helpers/react/redux.helper';
import { PlayArrow } from '@mui/icons-material';
import { listenerProfileTypePalete } from '../../config';
import { queueActions } from '../queue/store/queue.actions';
import { GenerateQueueRequestData } from '../queue/store/queue.model';
import { songSelectors } from '../song/store/song.selectors';

const { Title, Text } = Typography;

export function PlaylistPage() {
  const location = useLocation();
  const { pathname } = location;
  const { ref, inView } = useInView({ threshold: 1 });

  const [isCoverImageHovered, setIsCoverImageHovered] = useState<boolean>(false);

  const name = useSelector(playlistSelectors.name);
  const tag = useSelector(playlistSelectors.tag);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const backgroundColor = useSelector(playlistSelectors.backgroundColor);
  const editable = useSelector(playlistSelectors.editable);
  const songs = useSelector(songSelectors.songs);
  const songsCount = useSelector(playlistSelectors.songsCount);
  const songsTimeDuration = useSelector(playlistSelectors.songsTimeDuration);
  const description = useSelector(playlistSelectors.description);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));
  const openEditPlaylistModal = () => dispatch(playlistActions.openEditPlaylistModal());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

  const playlistId = useMemo(() => {
    return pathname?.split('/')[2];
  }, [pathname])

  useEffect(() => {
    if (playlistId) {
      localStorage.setItem('currentSourceId', playlistId);
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="playlist-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView}
          playSongsOptions={{ options: { playlistId } }} />
        <div className='playlist-page__info'>
          <div
            className={`playlist-page__cover-wrapper ${isCoverImageHovered ? 'cursor-pointer' : ''}`}
            onClick={() => isCoverImageHovered && generateQueue({
              isNewQueue: true,
              shuffleEnabled: false,
              options: {
                playlistId
              }
              //TODO write when needed sortingOptions={{ }} 
            })}
            onMouseEnter={() => setIsCoverImageHovered(!!songs?.length && true)}
            onMouseLeave={() => setIsCoverImageHovered(false)}>
            {renderPlaylistIcon(160, 'absolute', playlistCoverImageUrl, tag as PlaylistTagEnum, backgroundColor, name)}
            {isCoverImageHovered && <div className='playlist-page__cover-shadow'></div>}
            {isCoverImageHovered && <PlayArrow sx={{ color: listenerProfileTypePalete.base }} className='playlist-page__play-button' />}
          </div>
          <div className='playlist-page__credits'>
            <Title
              className='m-0'
              level={5}>Playlist</Title>
            <Title
              className={`m-0 ${editable ? 'cursor-pointer' : ''}`}
              level={1}
              style={{ width: 'fit-content' }}
              ref={ref}
              onClick={() => editable ?
                openEditPlaylistModal() :
                showNotification('info', 'You cannot edit an automatically created playlist')}>
              {name}
            </Title>
            <Text
              className='mt-0'
              style={{ color: 'grey' }}>
              {description}
            </Text>
            <Title
              className='m-0'
              level={5}>
              {songsCount} songs, {formatPlaylistTime(songsTimeDuration!)}
            </Title>
          </div>
        </div>
        <SongTableComponent songsSourceOptions={{ playlistId }} />
      </div>
    </div>
  );
}
