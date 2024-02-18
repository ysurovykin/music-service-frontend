import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { playlistActions } from './store/playlist.actions';
import { useSelector } from 'react-redux';
import { playlistSelectors } from './store/playlist.selectors';
import { Avatar, Button, List, Typography } from 'antd';
import { SongComponent } from '../components/song/song.component';

const { Text, Title } = Typography;

export function PlaylistPage() {
  let navigate = useNavigate();

  const { playlistId } = useParams<{ playlistId: string }>();
  const name = useSelector(playlistSelectors.name);
  const date = useSelector(playlistSelectors.date);
  const playlistCoverImageUrl = useSelector(playlistSelectors.coverImageUrl);
  const songs = useSelector(playlistSelectors.songs);

  const dispatch = useDispatch()
  const getPlaylistData = (playlistId: string) => dispatch(playlistActions.getPlaylistById(playlistId));

  useEffect(() => {
    if (playlistId) {
      getPlaylistData(playlistId);
    }
  }, [playlistId]);

  return (
    <div className="playlist-page listener-group-page">
      <Button
        onClick={() => navigate(-1)} >
        {'< Back'}
      </Button>
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
  );
}
