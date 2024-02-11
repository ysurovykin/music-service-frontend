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
  ShuffleOutlined,
  QueueMusicOutlined
} from '@mui/icons-material';
import { Avatar, Slider, Typography } from "antd";
import { listenerProfileTypePalete } from "../../../config";
import { useDispatch } from "react-redux";
import { songActions } from "../../song/store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "../../song/store/song.selectors";
import { Link as RouterLink} from 'react-router-dom';
import { formatTime } from "../../../helpers/react/song-player.helper";
import { SongShortData } from "../../song/store/song.model";
import { listenerActions } from "../../store/listener.actions";
import { 
  RepeatSongStateEnum, 
  SavePlayTimeRequest, 
  UpdateSongPlayerDataRequest, 
  ChangeVolumeRequest, 
  ChangeRepeatSongStateRequest, 
  ChangeShuffleStateRequest 
} from "../../store/listener.model";
import { userSelectors } from "../../../user/store/user.selectors";
import { listenerSelectors } from "../../store/listener.selectors";

const { Text, Title } = Typography;

export function SongPlayerComponent() {

  const audioPlayer = useRef<HTMLAudioElement>(null)
  const [mute, setMute] = useState(false);

  const playTime = useSelector(listenerSelectors.playTime);
  const [currentTime, setCurrentTime] = useState(playTime);
  const [playerIntervalId, setPlayerIntervalId] = useState<ReturnType<typeof setInterval>>();
  console.log('playTime',playTime, currentTime)
  const isPlaying = useSelector(songSelectors.isPlaying);
  const name = useSelector(songSelectors.name);
  const songUrl = useSelector(songSelectors.songUrl);
  const coverImageUrl = useSelector(songSelectors.coverImageUrl);
  const artists = useSelector(songSelectors.artists);
  const duration = useSelector(songSelectors.duration);
  const userId = useSelector(userSelectors.userId);
  const songsQueue = useSelector(listenerSelectors.songsQueue);
  const repeatSongState = useSelector(listenerSelectors.repeatSongState);
  const songIndex = useSelector(listenerSelectors.songIndex);
  const shuffleEnabled = useSelector(listenerSelectors.shuffleEnabled);
  const volume = useSelector(listenerSelectors.volume);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(songActions.pauseSong());
  const unpauseSong = () => dispatch(songActions.unpauseSong());
  const playSong = (songData: SongShortData) => dispatch(songActions.playSong(songData));
  const updateSongPlayerData = (updateSongDataRequest: UpdateSongPlayerDataRequest) => 
    dispatch(listenerActions.updateSongPlayerData(updateSongDataRequest));
  const changeVolume = (changeVolumeRequest: ChangeVolumeRequest) => 
    dispatch(listenerActions.changeVolume(changeVolumeRequest));
  const savePlayTime = (savePlayTimeRequest: SavePlayTimeRequest) => 
    dispatch(listenerActions.savePlayTime(savePlayTimeRequest));
  const changeRepeatSongState = (changeRepeatSongStateRequest: ChangeRepeatSongStateRequest) => 
    dispatch(listenerActions.changeRepeatSongState(changeRepeatSongStateRequest));
  const changeShuffleState = (changeShuffleStateRequest: ChangeShuffleStateRequest) => 
    dispatch(listenerActions.changeShuffleState(changeShuffleStateRequest));

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
          if ((duration! - audioPlayer?.current?.currentTime) < 0.5) {
            switchToNextSong();
          }
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
    if (playTime && audioPlayer.current) {
      setCurrentTime(playTime);
      audioPlayer.current.currentTime = playTime;
    }
  }, [playTime]);

  useEffect(() => { //TODO find stable way to save last play time
    const saveLastPlayTime = () => {
      if (userId && currentTime) {
        console.log('save', currentTime)
        savePlayTime({listenerId: userId, playTime: currentTime})
      }
    }
    console.log('here')
    window.addEventListener('beforeunload', saveLastPlayTime);
    // return () => {
    //   console.log('removeEvent')
    //   window.removeEventListener('beforeunload', saveLastPlayTime);
    // }
  }, [])
  
  const changePlayerCurrentTime = (value: number) => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = value;
      setCurrentTime(value);
    }
  }

  const changeSongVolume = (value: number) => {
    changeVolume({listenerId: userId, volume: value})
    if (audioPlayer.current && !isNaN(volume!)) {
      audioPlayer.current.volume = volume! / 100;
    }
  }

  const renderShuffleIcon = () => {
    return <ShuffleOutlined 
      sx={ shuffleEnabled ? 
        { color: 'grey', '&:hover': { color: 'white' } } : 
        { color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary }}} 
      onClick={() => changeShuffleState({
        listenerId: userId,
        shuffleEnabled: !shuffleEnabled
      })} />;
  }

  const renderRepeatIcon = () => {
    switch (repeatSongState) {
      case RepeatSongStateEnum.none: {
        return <RepeatOutlined 
          sx={{ color: 'grey', '&:hover': { color: 'white' } }}
          onClick={() => changeRepeatSongState({
            listenerId: userId,
            repeatSongState: RepeatSongStateEnum.loop
          })} />
      }
      case RepeatSongStateEnum.loop: {
        return <RepeatOutlined 
          sx={{ color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary } }}
          onClick={() => changeRepeatSongState({
            listenerId: userId,
            repeatSongState: RepeatSongStateEnum.one
          })} />
      }
      case RepeatSongStateEnum.one: {
        return <RepeatOneOutlined 
          sx={{ color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary } }} 
          onClick={() => changeRepeatSongState({
            listenerId: userId,
            repeatSongState: RepeatSongStateEnum.none
          })} />
      }
      default: {
        return <RepeatOutlined 
          sx={{ color: 'grey', '&:hover': { color: 'white' } }}
          onClick={() => changeRepeatSongState({
            listenerId: userId,
            repeatSongState: RepeatSongStateEnum.loop
          })} />
      }
    }
  }

  const renderVolumeIcon = () => {
    if (!isNaN(volume!)) {
      return mute
        ? <VolumeOffOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
        : volume! <= 25 ? <VolumeMuteOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
          : volume! <= 75 ? <VolumeDownOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
            : <VolumeUpOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={() => setMute(!mute)} />
    }
  }

  const switchToPreviousSong = () => {
    if (audioPlayer.current && audioPlayer.current.currentTime > 5) {
      audioPlayer.current.currentTime = 0;
      setCurrentTime(0);
      unpauseSong();
    } else {
      if (songsQueue && songIndex) {
        if (playerIntervalId) {
          clearInterval(playerIntervalId);
        }
        const song = songsQueue[songIndex - 1];
        updateSongPlayerData({
          listenerId: userId!,
          songData: {
            songsQueue,
            songId: song?.songId,
            songIndex: songIndex - 1
          }
        });
        playSong({
          songId: song?.songId,
          name: song?.name,
          duration: song?.duration,
          coverImageUrl: song?.coverImageUrl,
          songUrl: song?.songUrl,
          artists: song?.artists
        })
      }
    }
  }

  const switchToNextSong = () => {
    if (songsQueue && !isNaN(songIndex!) && (songIndex! < songsQueue.length - 1)) {
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
      const song = songsQueue[songIndex! + 1];
      updateSongPlayerData({
        listenerId: userId!,
        songData: {
          songsQueue,
          songId: song?.songId,
          songIndex: songIndex! + 1
        }
      });
      playSong({
        songId: song?.songId,
        name: song?.name,
        duration: song?.duration,
        coverImageUrl: song?.coverImageUrl,
        songUrl: song?.songUrl,
        artists: song?.artists
      })
    }
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
            <Avatar shape="square" size={64} src={coverImageUrl} />
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
                onClick={() => switchToPreviousSong()} />
              {!isPlaying
                ? <PlayArrowOutlined fontSize={'large'} sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={unpauseSong} />
                : <PauseOutlined fontSize={'large'} sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} onClick={pauseSong} />
              }
              <SkipNextOutlined 
                sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
                onClick={() => switchToNextSong()} />
              {renderRepeatIcon()}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>{formatTime(currentTime!)}</Text>
              <Slider 
                tooltip={{open: false}} 
                style={{ width: '400px', marginLeft: '10px', marginRight: '5px' }} 
                value={currentTime} 
                onChange={(value) => changePlayerCurrentTime(value)}
                max={duration} />
              <Text>{formatTime(duration || 0)}</Text>
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
            <RouterLink to='/queue'>
              <QueueMusicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
            {renderVolumeIcon()}
            <Slider
              tooltip={{open: false}} 
              style={{ width: '100px' }}
              value={volume}
              onChangeComplete={(value) => changeSongVolume(value)}
            />
          </div>
      </div>
    </div>
  );

};