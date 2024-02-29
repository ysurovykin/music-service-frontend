import React, { useMemo } from 'react';
import { List, Typography } from 'antd';
import { formatSongQueue } from '../../helpers/react/song-player.helper';
import { SongComponent } from '../song/song.component';
import { useSelector } from 'react-redux';
import { HeaderComponent } from '../components/header/header.component';
import { getBackground } from '../../helpers/react/listener-page.helper';
import { queueSelectors } from './store/queue.selectors';
import { useInView } from 'react-intersection-observer';

const { Title } = Typography;

export function QueuePage() {
  
  const { ref, inView } = useInView({ threshold: 1 });

  const queue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);
  const isQueueLoading = useSelector(queueSelectors.isQueueLoading);

  const formatedQueue = useMemo(() => {
    if (songQueueId && queue) {
      return formatSongQueue(songQueueId, queue)
    }
  }, [songQueueId, queue])

  return (
    <div className='listener-group-page__wrapper custom-scroll' >
      <div style={{ background: getBackground() }} className="listener-group-page">
        <HeaderComponent 
          showHeader={!inView} />
        <div className='queue-page'>
          <Title level={4}>Queue</Title>
          <Title ref={ref} level={5}>Now playing</Title>
          <SongComponent
            song={formatedQueue?.[0] || {}}
            currentlyPlayingSong={formatedQueue?.[0] || {}}
            index={1} />
          <Title level={5}>Next up</Title>
          <List
            loading={isQueueLoading}
            dataSource={formatedQueue}
            renderItem={(song, index) => (
              index !== 0 && <List.Item key={song.songId}>
                <SongComponent
                  song={song}
                  currentlyPlayingSong={formatedQueue?.[0] || {}}
                  index={index + 1} />
              </List.Item>
            )}>
          </List>
        </div>
      </div>
    </div>
  );
}
