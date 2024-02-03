import React, { useEffect, useRef, useState } from "react";
import {
  VolumeDownOutlined,
  VolumeUpOutlined,
  VolumeOffOutlined,
  VolumeMuteOutlined,
  PauseOutlined,
  PlayArrowOutlined,
  SkipNextOutlined,
  SkipPreviousOutlined,
  RepeatOneOutlined,
  RepeatOutlined,
  ShuffleOutlined
} from '@mui/icons-material';
import { Avatar, Slider, Typography } from "antd";
import { listenerProfileTypePalete } from "../../config";
import { ProfileOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { songActions } from "../song/store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "../song/store/song.selectors";
import { Link as RouterLink} from 'react-router-dom';

const { Text, Title } = Typography;

export function SongPlayerComponent() {

  const audioPlayer = useRef<HTMLAudioElement>(null)

  // const [index, setIndex] = useState(0);

  // const [currentSong] = useState(playlist[index]);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [repeatOneSong, setRepeatOneSong] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerIntervalId, setPlayerIntervalId] = useState<ReturnType<typeof setInterval>>();
  
  const isPlaying = useSelector(songSelectors.isPlaying);
  const name = useSelector(songSelectors.name);
  const songUrl = useSelector(songSelectors.songUrl);
  const coverImageurl = useSelector(songSelectors.coverImageurl);
  const artists = useSelector(songSelectors.artists);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(songActions.pauseSong());
  const unpauseSong = () => dispatch(songActions.unpauseSong());

  useEffect(() => {
    if (isPlaying) {
      if (audioPlayer.current) {
        audioPlayer.current.play()
      }
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
      const intervalId = setInterval(() => {
        if (audioPlayer.current) {
          setCurrentTime(audioPlayer?.current?.currentTime);
        }
      }, 1000)
      setPlayerIntervalId(intervalId);
    } else {
      if (audioPlayer.current) {
        audioPlayer.current.pause()
      }
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
    }
  }, [isPlaying, songUrl]);

  useEffect(() => {
    if (audioPlayer.current) {
      const songDuration = Math.floor(audioPlayer.current.duration);
      setDuration(songDuration);
    }
  }, [audioPlayer?.current?.readyState, songUrl]);

  const changePlayerCurrentTime = (value: number) => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = value;
      setCurrentTime(value);
    }
  }

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
    }
  }

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60) < 10 ? `${Math.floor(time / 60)}` : Math.floor(time / 60);
      const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return '0:00';
  }

  const toggleSkipForward = () => {
    // if(index >= playlist.length - 1) {
    //     setIndex(0);
    //     audioPlayer.current.src = playlist[0];
    //     audioPlayer.current.play();
    // } else {
    //     setIndex(prev => prev + 1);
    //     audioPlayer.current.src = playlist[index + 1];
    //     audioPlayer.current.play();
    // }
  }

  const toggleSkipBackward = () => {
    // if(index > 0) {
    //     setIndex(prev => prev - 1);
    //     audioPlayer.current.src = playlist[index - 1];
    //     audioPlayer.current.play();
    // }
  }

  function renderShuffleIcon() {
    return <ShuffleOutlined 
      sx={{ color: shuffleEnabled ? 'white' : listenerProfileTypePalete.base}} 
      onClick={() => setShuffleEnabled(state => !state)} />;
  }

  function renderRepeatIcon() {
    return repeatOneSong
      ? <RepeatOneOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setRepeatOneSong(false)} />
      : <RepeatOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setRepeatOneSong(true)} />;
  }

  function renderVolumeIcon() {
    return mute
      ? <VolumeOffOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
      : volume <= 25 ? <VolumeMuteOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
        : volume <= 75 ? <VolumeDownOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
          : <VolumeUpOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
  }

  return (
    <div className="song-player">
      <audio
        src={songUrl}
        ref={audioPlayer}
        muted={mute} />
      <div className="song-player-wrapper">
          
          <div style={{
            display: 'flex',
            gap: '20px',
            minWidth: '250px',
            alignItems: 'center'
          }}>
            <Avatar shape="square" size={64} src={coverImageurl} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifySelf: 'start'
            }}>
              <Title style={{margin: '0px'}} level={5}>{name}</Title>
              <Text>{artists?.map(artist => <RouterLink to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)}</Text>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateRows: 'repeat(2, 1fr)',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {renderShuffleIcon()}
              <SkipPreviousOutlined 
                sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} 
                onClick={toggleSkipBackward} />
              {!isPlaying
                ? <PlayArrowOutlined fontSize={'large'} sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={unpauseSong} />
                : <PauseOutlined fontSize={'large'} sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={pauseSong} />
              }
              <SkipNextOutlined 
                sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
                onClick={toggleSkipForward} />
              {renderRepeatIcon()}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>{formatTime(currentTime)}</Text>
              <Slider 
                tooltip={{open: false}} 
                style={{ width: '400px', marginLeft: '10px', marginRight: '5px' }} 
                value={currentTime} 
                onChange={(value) => changePlayerCurrentTime(value)}
                max={duration} />
              <Text>{formatTime(duration)}</Text>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginRight: '30px'
            }}>

            {renderVolumeIcon()}
            <Slider
              tooltip={{open: false}} 
              style={{ width: '100px' }}
              value={volume}
              onChange={(value) => changeVolume(value)}
            />
          </div>
      </div>
    </div>
  );
};