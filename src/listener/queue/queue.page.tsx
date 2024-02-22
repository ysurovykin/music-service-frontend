import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, Typography } from 'antd';
import { formatSongQueue } from '../../helpers/react/song-player.helper';
import { SongComponent } from '../song/song.component';
import { useSelector } from 'react-redux';
import { songSelectors } from '../song/store/song.selectors';
import { HeaderComponent } from '../components/header/header.component';
import { calculateScrollY, getBackground } from '../../helpers/react/listener-page.helper';

const { Title } = Typography;

export function QueuePage() {
  const lastSavedQueue = JSON.parse(localStorage.getItem('songsQueue') || '[]');
  const lastSavedSongIndex = +(localStorage.getItem('songIndex') || '');

  const [scrollY, setScrollY] = useState<number>(0);

  const queue = useSelector(songSelectors.songsQueue) || lastSavedQueue;
  const songIndex = useSelector(songSelectors.songIndex) || lastSavedSongIndex;

  const pageRef = useRef<HTMLDivElement>(null);

  const formatedQueue = useMemo(() => {
    if (!isNaN(songIndex) && queue) {
      return formatSongQueue(songIndex, queue)
    }
  }, [songIndex, queue])

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div ref={pageRef} style={{background: getBackground()}} className="queue-page listener-group-page">
        <HeaderComponent scrollY={scrollY} />
        <div>
          <Title level={4}>Queue</Title>
          <Title level={5}>Now playing</Title>
          <SongComponent
            song={formatedQueue?.[0] || {}}
            index={1}
            songsQueue={queue} />
          <Title level={5}>Next up</Title>
          <List
            dataSource={formatedQueue}
            renderItem={(song, index) => (
              index !== 0 && <List.Item key={song.songId}>
                <SongComponent song={song} index={index + 1} songsQueue={queue || []} />
              </List.Item>
            )}>
          </List>
        </div>
      </div>
    </div>
  );
}
