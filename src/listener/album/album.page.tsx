import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { albumActions } from './store/album.actions';
import { useSelector } from 'react-redux';
import { albumSelectors } from './store/album.selectors';
import { Avatar, Button, List, Typography } from 'antd';
import { SongComponent } from '../song/song.component';

const { Text, Title } = Typography;

export function AlbumPage() {
  let navigate = useNavigate();

  const { albumId } = useParams<{ albumId: string }>();
  const name = useSelector(albumSelectors.name);
  const artist = useSelector(albumSelectors.artist);
  const date = useSelector(albumSelectors.date);
  const albumCoverImageUrl = useSelector(albumSelectors.coverImageUrl);
  const likes = useSelector(albumSelectors.likes);
  const songs = useSelector(albumSelectors.songs);

  const dispatch = useDispatch()
  const getAlbumData = (albumId: string) => dispatch(albumActions.getAlbumById(albumId));

  useEffect(() => {
    if (albumId) {
      getAlbumData(albumId);
    }
  }, [albumId]);

  return (
    <div className="album-page listener-group-page">
      <Button
        onClick={() => navigate(-1)} >
        {'< Back'}
      </Button>
      <div>
        {name && <Title level={4}>Name: {name}</Title>}
        {artist && <Title level={4}>Artist: <RouterLink to={`/artist/${artist.id}`}>{artist.name}</RouterLink></Title>}
        {date && <Title level={4}>Date: {date.toString()}</Title>}
        <Title level={4}>Likes: {likes || 0}</Title>
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
  );
}
