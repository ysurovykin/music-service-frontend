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

const { Text } = Typography;

export function SongPlayerComponent() {

  const audioPlayer = useRef<HTMLAudioElement>(null)

  // const [index, setIndex] = useState(0);

  // const [currentSong] = useState(playlist[index]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [repeatOneSong, setRepeatOneSong] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerIntervalId, setPlayerIntervalId] = useState<ReturnType<typeof setInterval>>();
  // console.log('values', isPlaying, volume, mute, currentTime, duration)
  useEffect(() => {
    if (isPlaying) {
      console.log('start', playerIntervalId)
      const intervalId = setInterval(() => {
        console.log('here', playerIntervalId, audioPlayer?.current?.currentTime)
        if (audioPlayer.current) {
          setCurrentTime(audioPlayer?.current?.currentTime);
        }
      }, 1000)
      setPlayerIntervalId(intervalId);
    } else {
      console.log('playerIntervalId', playerIntervalId)
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioPlayer.current) {
      const songDuration = Math.floor(audioPlayer.current.duration);
      setDuration(songDuration);
    }
  }, [audioPlayer?.current?.readyState]);

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

  const togglePlay = () => {
    if (!isPlaying && audioPlayer.current) {
      audioPlayer.current.play()
    } else if (audioPlayer.current) {
      audioPlayer.current.pause()
    }
    setIsPlaying(prev => !prev)
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
        src="https://firebasestorage.googleapis.com/v0/b/music-service-3d701.appspot.com/o/songs%2FSkryabin%2FThe%20Best%2F%D0%9B%D1%8E%D0%B4%D0%B8%20%D1%8F%D0%BA%20%D0%BA%D0%BE%D1%80%D0%B0%D0%B1%D0%BB%D1%96?alt=media&token=845355d3-1c64-4956-b761-ae019326baad"
        ref={audioPlayer}
        muted={mute} />
      <div className="song-player-wrapper">
          
          <div style={{
            display: 'flex',
            gap: '20px',
            minWidth: '250px',
            alignItems: 'center'
          }}>
            <Avatar shape="square" style={{backgroundColor: listenerProfileTypePalete.base}} size={64} icon={<ProfileOutlined/>}/>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifySelf: 'start'
            }}>
              <Text>Song Name</Text>
              <Text>Artist</Text>
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
                ? <PlayArrowOutlined fontSize={'large'} sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={togglePlay} />
                : <PauseOutlined fontSize={'large'} sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={togglePlay} />
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