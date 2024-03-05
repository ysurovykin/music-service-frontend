import React, { useEffect, useMemo } from 'react';
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

const { Title } = Typography;

export function PlaylistPage() {

  const location = useLocation();
  const { pathname } = location;
  const { ref, inView } = useInView({ threshold: 1 });

  const name = useSelector(playlistSelectors.name);
  // const songCount = useSelector(playlistSelectors.songCount);
  // const songTime = useSelector(playlistSelectors.songTime);
  const tag = useSelector(playlistSelectors.tag);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const backgroundColor = useSelector(playlistSelectors.backgroundColor);
  const editable = useSelector(playlistSelectors.editable);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));
  const openEditPlaylistModal = () => dispatch(playlistActions.openEditPlaylistModal());

  const playlistId = useMemo(() => {
    return pathname?.split('/')[2];
  }, [pathname])

  useEffect(() => {
    if (playlistId) {
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll'>
      <div style={{ background: getBackground(backgroundColor) }} className="playlist-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView} />
        <div className='playlist-page__info'>
          {renderPlaylistIcon(96, playlistCoverImageUrl, tag as PlaylistTagEnum, backgroundColor, name)}
          <div>
            <Title
              className='m-0'
              level={5}>Playlist</Title>
            <Title
              className={`m-0 ${editable ? 'cursor-pointer' : ''}`}
              level={2}
              style={{ width: 'fit-content' }}
              ref={ref}
              onClick={() => editable ?
                openEditPlaylistModal() :
                showNotification('info', 'You cannot edit an automatically created playlist')}>
              {name}</Title>
            <Title
              className='m-0'
              level={5}>{3} songs, {formatPlaylistTime(120)}</Title>
          </div>
        </div>
        <SongTableComponent songsSourceOptions={{ playlistId }} />
      </div>
    </div>
  );
}
