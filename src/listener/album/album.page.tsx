import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { albumActions } from './store/album.actions';
import { useSelector } from 'react-redux';
import { albumSelectors } from './store/album.selectors';
import { Avatar, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { formatPlaylistTime, getBackground, renderPlaylistIcon } from '../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../components/song-table/song-table.component';
import { useInView } from 'react-intersection-observer';

const { Title } = Typography;

export function AlbumPage() {
  const { ref, inView } = useInView({ threshold: 1 });

  const { albumId } = useParams<{ albumId: string }>();
  const name = useSelector(albumSelectors.name);
  const artist = useSelector(albumSelectors.artist);
  const date = useSelector(albumSelectors.date);
  const albumCoverImageUrl = useSelector(albumSelectors.coverImageUrl);
  const backgroundColor = useSelector(albumSelectors.backgroundColor);

  const dispatch = useDispatch()
  const getAlbumData = (albumId: string) => dispatch(albumActions.getAlbumById(albumId));

  useEffect(() => {
    if (albumId) {
      getAlbumData(albumId);
    }
  }, [albumId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll'>
      <div style={{ background: getBackground(backgroundColor) }} className="album-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          showHeader={!inView}
          background={backgroundColor} />
        <div className='album-page__info'>
          {renderPlaylistIcon(96, albumCoverImageUrl, undefined, backgroundColor, name)}
          <div>
            <Title className='m-0' level={5}>Album</Title>
            <Title className='m-0' ref={ref} level={2}>{name}</Title>
            <Title className='m-0' level={5}>
              <RouterLink to={`/artist/${artist?.id}`}>{artist?.name}</RouterLink>, {3} songs, {formatPlaylistTime(120)}
            </Title>
          </div>
        </div>
        <SongTableComponent songsSourceOptions={{ albumId }} />
      </div>
    </div>
  );
}
