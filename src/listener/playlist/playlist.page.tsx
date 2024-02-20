import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { playlistActions } from './store/playlist.actions';
import { useSelector } from 'react-redux';
import { playlistSelectors } from './store/playlist.selectors';
import { Avatar, List, Typography } from 'antd';
import { SongComponent } from '../song/song.component';
import { HeaderComponent } from '../components/header/header.component';

const { Text, Title } = Typography;

export function PlaylistPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const { playlistId } = useParams<{ playlistId: string }>();

  const name = useSelector(playlistSelectors.name);
  const date = useSelector(playlistSelectors.date);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const songs = useSelector(playlistSelectors.songs);

  const pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));

  const calculateScrollY = () => {
    return Math.abs((pageRef?.current?.getBoundingClientRect().top || 0) - (pageRef?.current?.offsetTop || 0));
  }

  useEffect(() => {
    if (playlistId) {
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

  return (
    <div className='playlist-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY())}>
      <div className="playlist-page">
        <HeaderComponent background={'red'} scrollY={scrollY} />
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
