import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { albumActions } from './store/album.actions';
import { useSelector } from 'react-redux';
import { albumSelectors } from './store/album.selectors';
import { Avatar, Button, List, Typography } from 'antd';
import { PauseOutlined, PlayArrowOutlined } from '@mui/icons-material';
import { listenerProfileTypePalete } from '../../config';
import { songSelectors } from '../song/store/song.selectors';
import { songActions } from '../song/store/song.actions';
import { SongShortData } from '../song/store/song.model';

const { Text, Title, Link } = Typography;

export function AlbumPage() {
  let navigate = useNavigate();

  const { albumId } = useParams<{albumId: string}>();
  const name = useSelector(albumSelectors.name);
  const artist = useSelector(albumSelectors.artist);
  const date = useSelector(albumSelectors.date);
  const albumCoverImageUrl = useSelector(albumSelectors.downloadUrl);
  const likes = useSelector(albumSelectors.likes);
  const songs = useSelector(albumSelectors.songs);
  const isPlaying = useSelector(songSelectors.isPlaying);
  const songId = useSelector(songSelectors.songId);
  
  const dispatch = useDispatch()
  const getAlbumData = (albumId: string) => dispatch(albumActions.getAlbumById(albumId));
  const pauseSong = () => dispatch(songActions.pauseSong());
  const playSong = (songData: SongShortData) => dispatch(songActions.playSong(songData));
  const unpauseSong = () => dispatch(songActions.unpauseSong());

  useEffect(() => {
    if (albumId) {
      getAlbumData(albumId);
    }
  }, [albumId]);

  const startPlaySong = (id: string, songName: string, songUrl: string) => {
    playSong({
      songId: id,
      name: songName,
      coverImageurl: albumCoverImageUrl,
      songUrl,
      artists: [{id: `${artist?.id}`, name: `${artist?.name}`}]
    })
  }
  
  const renderPlayButton = (id: string, name: string, downloadUrl: string) => {
    if (songId === id) {
      if (isPlaying) {
        return (
          <PauseOutlined 
            fontSize={'large'} 
            sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
            onClick={pauseSong} />
        );
      } else {
        return (
          <PlayArrowOutlined 
            fontSize={'large'} 
            sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
            onClick={unpauseSong} />
        );
      }
    }
    return (
      <PlayArrowOutlined 
        fontSize={'large'} 
        sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
        onClick={() => startPlaySong(id, name, downloadUrl)} />
    );
        
  }

  return (
    <div className="album-page">
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
              <List.Item>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {renderPlayButton(song.songId, song.name, song.downloadUrl)}
                  <Text>{index+1} {song.name}</Text>
                </div>
                <Text>{song.plays}</Text>
                <Text>{song.plays} plays</Text>
              </List.Item>
            )}>
          </List>
      </div>
    </div>
  );
}
