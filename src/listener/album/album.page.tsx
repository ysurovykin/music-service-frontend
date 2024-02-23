import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { albumActions } from './store/album.actions';
import { useSelector } from 'react-redux';
import { albumSelectors } from './store/album.selectors';
import { Avatar, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { calculateIsReachedBottom, calculateScrollY, getBackground } from '../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../components/song-table/song-table.component';

const { Title } = Typography;

export function AlbumPage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isReachedBottom, setIsReachedBottom] = useState<boolean>(false);

  const { albumId } = useParams<{ albumId: string }>();
  const name = useSelector(albumSelectors.name);
  const artist = useSelector(albumSelectors.artist);
  const date = useSelector(albumSelectors.date);
  const albumCoverImageUrl = useSelector(albumSelectors.coverImageUrl);
  const backgroundColor = useSelector(albumSelectors.backgroundColor);

  const dispatch = useDispatch()
  const getAlbumData = (albumId: string) => dispatch(albumActions.getAlbumById(albumId));

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (albumId) {
      getAlbumData(albumId);
    }
  }, [albumId]);

  const updateScrollData = () => {
    setScrollY(calculateScrollY(pageRef))
    setIsReachedBottom(calculateIsReachedBottom(pageRef))
  };

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => updateScrollData()}>
      <div ref={pageRef} style={{ background: getBackground(backgroundColor) }} className="album-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          scrollY={scrollY} />
        <div>
          {name && <Title level={4}>Name: {name}</Title>}
          {artist && <Title level={4}>Artist: <RouterLink to={`/artist/${artist.id}`}>{artist.name}</RouterLink></Title>}
          {date && <Title level={4}>Date: {date.toString()}</Title>}
          {albumCoverImageUrl && <Avatar src={albumCoverImageUrl} />}
          <SongTableComponent songsSourceOptions={{albumId}} isReachedBottom={isReachedBottom}/>
        </div>
      </div>
    </div>
  );
}
