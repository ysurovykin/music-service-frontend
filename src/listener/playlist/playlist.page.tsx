import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { playlistActions } from './store/playlist.actions';
import { useSelector } from 'react-redux';
import { playlistSelectors } from './store/playlist.selectors';
import { Avatar, List, Typography } from 'antd';
import { SongComponent } from '../song/song.component';
import { HeaderComponent } from '../components/header/header.component';
import { calculateScrollY, getBackground } from '../../helpers/react/listener-page.helper';

const { Text, Title } = Typography;

export function PlaylistPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const { playlistId } = useParams<{ playlistId: string }>();

  const name = useSelector(playlistSelectors.name);
  const date = useSelector(playlistSelectors.date);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const songs = useSelector(playlistSelectors.songs);
  const backgroundColor = useSelector(playlistSelectors.backgroundColor);

  const pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));

  useEffect(() => {
    if (playlistId) {
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

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
