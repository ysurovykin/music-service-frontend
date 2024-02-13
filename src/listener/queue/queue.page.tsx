import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, Typography } from 'antd';
import { formatSongQueue } from '../../helpers/react/song-player.helper';
import { SongComponent } from '../components/song/song.component';

const { Title } = Typography;

export function QueuePage() {
  let navigate = useNavigate();
  
  const queue = JSON.parse(localStorage.getItem('songsQueue') || '[]');
  const songIndex = +(localStorage.getItem('songIndex') || '');
  
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
      <div style={{padding: '20px'}}>
        <Title level={4}>Queue</Title>
        <Title level={5}>Now playing</Title>
        <SongComponent 
          song={formatedQueue?.[0] || {}}
          index={1}
          songsQueue={queue}/>
        <Title level={5}>Next up</Title>
        <List
            dataSource={formatedQueue}
            renderItem={(song, index) => (
              index !== 0 && <List.Item key={song.songId}>
                <SongComponent song={song} index={index+1} songsQueue={queue || []}/>
              </List.Item>
            )}>
        </List>
      </div>
    </div>
  );
}
