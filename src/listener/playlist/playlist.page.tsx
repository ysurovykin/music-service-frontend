import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { playlistActions } from './store/playlist.actions';
import { useSelector } from 'react-redux';
import { playlistSelectors } from './store/playlist.selectors';
import { Avatar, List, Typography } from 'antd';
import { SongComponent } from '../song/song.component';
import { HeaderComponent } from '../components/header/header.component';
import { calculateIsReachedBottom, calculateScrollY, getBackground } from '../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../components/song-table/song-table.component';

const { Text, Title } = Typography;

export function PlaylistPage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isReachedBottom, setIsReachedBottom] = useState<boolean>(false);

  const { playlistId } = useParams<{ playlistId: string }>();

  const name = useSelector(playlistSelectors.name);
  const date = useSelector(playlistSelectors.date);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const backgroundColor = useSelector(playlistSelectors.backgroundColor);

  const pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));

  useEffect(() => {
    if (playlistId) {
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

  const updateScrollData = () => {
    setScrollY(calculateScrollY(pageRef))
    setIsReachedBottom(calculateIsReachedBottom(pageRef))
  };

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div ref={pageRef} style={{background: getBackground()}} className="playlist-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          scrollY={scrollY} />
        <div>
          {name && <Title level={4}>Name: {name}</Title>}
          {date && <Title level={4}>Date: {date.toString()}</Title>}
          {playlistCoverImageUrl && <Avatar src={playlistCoverImageUrl} />}
          <SongTableComponent songsSourceOptions={{playlistId}} isReachedBottom={isReachedBottom}/>
        </div>
      </div>
    </div>
  );
}
