import React, { useState } from "react";
import {
  PauseOutlined,
  PlayArrowOutlined,
} from '@mui/icons-material';
import { Avatar, Typography } from "antd";
import { listenerProfileTypePalete } from "../../../config";
import { useDispatch } from "react-redux";
import { songActions } from "../../song/store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "../../song/store/song.selectors";
import { Link as RouterLink} from 'react-router-dom';
import { formatTime } from "../../../helpers/react/song-player.helper";
import { SongInfoResponseData, SongShortData } from "../../song/store/song.model";

const { Text, Title } = Typography;

export function SongComponent({
  song,
  songsQueue,
  index,
}: {
  song: SongInfoResponseData,
  songsQueue: Array<SongInfoResponseData>,
  index: number
}) {
  const [isHovered, setIsHovered] = useState<boolean>();

  const isPlaying = useSelector(songSelectors.isPlaying);
  const songId = useSelector(songSelectors.songId);
  
  const dispatch = useDispatch()
  const pauseSong = () => dispatch(songActions.pauseSong());
  const playSong = (songData: SongShortData) => dispatch(songActions.playSong(songData));
  const unpauseSong = () => dispatch(songActions.unpauseSong());

  const startPlaySong = () => {
    const songIndex = songsQueue.findIndex(songInQueue => songInQueue.songId === song?.songId);
    playSong({
      songIndex: songIndex,
      songsQueue,
      songId: song?.songId,
      name: song?.name,
      duration: song?.duration,
      coverImageUrl: song?.coverImageUrl,
      songUrl: song?.songUrl,
      artists: song?.artists
    })
  }
  
  const renderPlayButton = () => {
    if (songId === song?.songId) {
      if (isPlaying) {
        return (
          <PauseOutlined 
            sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
            onClick={pauseSong} />
        );
      } else {
        return (
          <PlayArrowOutlined 
            sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
            onClick={unpauseSong} />
        );
      }
    }
    return (
      <PlayArrowOutlined 
        sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
        onClick={() => startPlaySong()} />
    );
        
  }

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        padding: '12px 0',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <div style={{
          display: 'flex',
          gap: '20px',
          minWidth: '250px',
          alignItems: 'center'
        }}>
          <div style={{width: '1em', display: 'flex', justifyContent: 'center'}}>
            {isHovered ? renderPlayButton() : <Text>{index}</Text>}
          </div>
          <Avatar shape='square' size={64} src={song?.coverImageUrl}/>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifySelf: 'start'
          }}>
            <Title style={{margin: '0px'}} level={5}>{song?.name}</Title>
            <Text>{song?.artists?.map(artist => (<RouterLink to={`/artist/${artist.id}`}>{artist.name}</RouterLink>))}</Text>
          </div>
        </div>
        <RouterLink to={`/album/${song?.album?.id}`}>{song?.album?.name}</RouterLink>
        <Text>{formatTime(song?.duration!)}</Text>
    </div>
  );
};