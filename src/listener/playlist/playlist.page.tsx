import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { playlistActions } from './store/playlist.actions';
import { useSelector } from 'react-redux';
import { playlistSelectors } from './store/playlist.selectors';
import { Avatar, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { getBackground } from '../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../components/song-table/song-table.component';
import { useInView } from 'react-intersection-observer';

const { Text, Title } = Typography;

export function PlaylistPage() {

  const { playlistId } = useParams<{ playlistId: string }>();
  const { ref, inView } = useInView({ threshold: 1 });

  const name = useSelector(playlistSelectors.name);
  const date = useSelector(playlistSelectors.date);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const backgroundColor = useSelector(playlistSelectors.backgroundColor);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));

  useEffect(() => {
    if (playlistId) {
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll'>
      <div style={{ background: getBackground() }} className="playlist-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView} />
        <div>
          {name && <Title ref={ref} level={4}>Name: {name}</Title>}
          {date && <Title level={4}>Date: {date.toString()}</Title>}
          {playlistCoverImageUrl && <Avatar src={playlistCoverImageUrl} />}
          <SongTableComponent songsSourceOptions={{ playlistId }} />
        </div>
      </div>
    </div>
  );
}
