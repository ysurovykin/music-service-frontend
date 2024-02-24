import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, Typography } from 'antd';
import { formatSongQueue } from '../../helpers/react/song-player.helper';
import { SongComponent } from '../song/song.component';
import { useSelector } from 'react-redux';
import { songSelectors } from '../song/store/song.selectors';
import { HeaderComponent } from '../components/header/header.component';
import { calculateScrollY, getBackground } from '../../helpers/react/listener-page.helper';
import { queueSelectors } from './store/queue.selectors';

const { Title } = Typography;

export function QueuePage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const queue = useSelector(queueSelectors.queue);
  const songId = useSelector(songSelectors.songId);

  const pageRef = useRef<HTMLDivElement>(null);

  const formatedQueue = useMemo(() => {
    if (songId && queue) {
      return formatSongQueue(songId, queue)
    }
  }, [songId, queue])

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div ref={pageRef} style={{background: getBackground()}} className="queue-page listener-group-page">
        <HeaderComponent scrollY={scrollY} />
        <div>
          <Title level={4}>Queue</Title>
          <Title level={5}>Now playing</Title>
          <SongComponent
            song={formatedQueue?.[0] || {}}
            index={1} />
          <Title level={5}>Next up</Title>
          <List
            dataSource={formatedQueue}
            renderItem={(song, index) => (
              index !== 0 && <List.Item key={song.songId}>
                <SongComponent song={song} index={index + 1} />
              </List.Item>
            )}>
          </List>
        </div>
      </div>
    </div>
  );
}
