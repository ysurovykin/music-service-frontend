import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, Typography } from 'antd';
import { formatSongQueue } from '../../helpers/react/song-player.helper';
import { SongComponent } from '../components/song/song.component';
import { useSelector } from 'react-redux';
import { songSelectors } from '../song/store/song.selectors';

const { Title } = Typography;

export function QueuePage() {
  let navigate = useNavigate();

  const lastSavedQueue = JSON.parse(localStorage.getItem('songsQueue') || '[]');
  const lastSavedSongIndex = +(localStorage.getItem('songIndex') || '');
  const queue = useSelector(songSelectors.songsQueue) || lastSavedQueue;
  const songIndex = useSelector(songSelectors.songIndex) || lastSavedSongIndex;

  const formatedQueue = useMemo(() => {
    if (!isNaN(songIndex) && queue) {
      return formatSongQueue(songIndex, queue)
    }
  }, [songIndex, queue])

  return (
    <div className="queue-page">
      <Button
        onClick={() => navigate(-1)} >
        {'< Back'}
      </Button>
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
  );
}
