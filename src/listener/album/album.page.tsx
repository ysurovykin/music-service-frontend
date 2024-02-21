import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { albumActions } from './store/album.actions';
import { useSelector } from 'react-redux';
import { albumSelectors } from './store/album.selectors';
import { Avatar, Button, List, Typography } from 'antd';
import { SongComponent } from '../song/song.component';
import { HeaderComponent } from '../components/header/header.component';
import { calculateScrollY } from '../../helpers/react/listener-page.helper';

const { Text, Title } = Typography;

export function AlbumPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const { albumId } = useParams<{ albumId: string }>();
  const name = useSelector(albumSelectors.name);
  const artist = useSelector(albumSelectors.artist);
  const date = useSelector(albumSelectors.date);
  const albumCoverImageUrl = useSelector(albumSelectors.coverImageUrl);
  const songs = useSelector(albumSelectors.songs);
  const backgroundColor = useSelector(albumSelectors.backgroundColor);

  const dispatch = useDispatch()
  const getAlbumData = (albumId: string) => dispatch(albumActions.getAlbumById(albumId));

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (albumId) {
      getAlbumData(albumId);
    }
  }, [albumId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div ref={pageRef} className="album-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          scrollY={scrollY} />
        <div>
          {name && <Title level={4}>Name: {name}</Title>}
          {artist && <Title level={4}>Artist: <RouterLink to={`/artist/${artist.id}`}>{artist.name}</RouterLink></Title>}
          {date && <Title level={4}>Date: {date.toString()}</Title>}
          {albumCoverImageUrl && <Avatar src={albumCoverImageUrl} />}
          <List
            header={<Text>Songs:</Text>}
            bordered
            dataSource={songs}
            renderItem={(song, index) => (
              <List.Item key={song.songId}>
                <SongComponent song={song} index={index + 1} songsQueue={songs || []} />
              </List.Item>
            )}>
          </List>
        </div>
      </div>
    </div>
  );
}
