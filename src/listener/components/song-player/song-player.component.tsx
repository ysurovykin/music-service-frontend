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
  QueueMusicOutlined,
  MicOutlined,
  FavoriteBorder
} from '@mui/icons-material';
import { Avatar, Slider, Typography } from "antd";
import { listenerProfileTypePalete } from "../../../config";
import { useDispatch } from "react-redux";
import { songActions } from "../../song/store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "../../song/store/song.selectors";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime } from "../../../helpers/react/song-player.helper";
import { SongInfoResponseData, SongShortData } from "../../song/store/song.model";
import { RepeatSongStateEnum } from "../../store/listener.model";

const { Text, Title } = Typography;

export function SongPlayerComponent() {

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const songTitleRef = useRef<HTMLDivElement>(null);
  const songTitleWrapperRef = useRef<HTMLDivElement>(null);
  const songArtistRef = useRef<HTMLDivElement>(null);
  const songArtistWrapperRef = useRef<HTMLDivElement>(null);

  const lastSavedPlayTime: number = +(localStorage.getItem('playTime') || '0');
  const lastSavedSongsQueue: Array<SongInfoResponseData> = JSON.parse(localStorage.getItem('songsQueue') || '[]');
  const lastSavedRepeatSongState: RepeatSongStateEnum = localStorage.getItem('repeatSongState') as RepeatSongStateEnum || 
    JSON.stringify(RepeatSongStateEnum.none);
  const lastSavedSongIndex: number = +(localStorage.getItem('songIndex') || '');
  const lastSavedShuffleEnabled: boolean = JSON.parse(localStorage.getItem('shuffleEnabled') || 'false');
  const lastSavedVolume: number = +(localStorage.getItem('volume') || '30');
  const lastSavedMuted: boolean = JSON.parse(localStorage.getItem('muted') || 'false');

  const [playTime, setPlayTime] = useState<number>();
  const [volume, setVolume] = useState<number>();
  const [songsQueue, setSongsQueue] = useState<Array<SongInfoResponseData>>(lastSavedSongsQueue);
  const [repeatSongState, setRepeatSongState] = useState<RepeatSongStateEnum>(JSON.parse(lastSavedRepeatSongState));
  const [songIndex, setSongIndex] = useState<number>(lastSavedSongIndex);
  const [shuffleEnabled, setShuffleEnabled] = useState<boolean>(lastSavedShuffleEnabled);
  const [muted, setMuted] = useState<boolean>(lastSavedMuted);
  const [isSongTitleScrollLeft, setIsSongTitleScrollLeft] = useState(true);
  const [isSongArtistScrollLeft, setIsSongArtistScrollLeft] = useState(true);
  const [playerIntervalId, setPlayerIntervalId] = useState<ReturnType<typeof setInterval>>();
  const [titleScrollIntervalId, setTitleScrollIntervalId] = useState<ReturnType<typeof setInterval>>();
  const [artistScrollIntervalId, setArtistScrollIntervalId] = useState<ReturnType<typeof setInterval>>();

  const isPlaying = useSelector(songSelectors.isPlaying);
  const name = useSelector(songSelectors.name);
  const songUrl = useSelector(songSelectors.songUrl);
  const coverImageUrl = useSelector(songSelectors.coverImageUrl);
  const artists = useSelector(songSelectors.artists);
  const duration = useSelector(songSelectors.duration);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(songActions.pauseSong());
  const unpauseSong = () => dispatch(songActions.unpauseSong());
  const playSong = (songData: SongShortData) => dispatch(songActions.playSong(songData));

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
          setPlayTime(audioPlayer?.current?.currentTime);
          // localStorage.setItem('playTime', JSON.stringify(audioPlayer?.current?.currentTime)); //TODO make stable sync
          if ((duration! - audioPlayer?.current?.currentTime) < 0.5) {
            localStorage.setItem('playTime', JSON.stringify(0));
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
    if (lastSavedPlayTime && audioPlayer.current) {
      setPlayTime(lastSavedPlayTime);
      audioPlayer.current.currentTime = lastSavedPlayTime;
    }
  }, [lastSavedPlayTime]);

  useEffect(() => {
    if (lastSavedVolume && audioPlayer.current) {
      setVolume(lastSavedVolume);
      audioPlayer.current.volume = lastSavedVolume / 100;
    }
  }, [lastSavedVolume]);

  const startScrollSongText = (songRef: React.RefObject<HTMLDivElement>, songWrapperRef: React.RefObject<HTMLDivElement>, 
    isTextScrollLeft: boolean, setIsTextScrollLeft: React.Dispatch<React.SetStateAction<boolean>>, intervalId: NodeJS.Timer | undefined,
    setScrollIntervalIdFunc: React.Dispatch<React.SetStateAction<NodeJS.Timer | undefined>>) => {
    if (!intervalId) {
      let isScrollLeft = isTextScrollLeft;
      const newIntervalId = setInterval(function () {
        if (songRef?.current && songWrapperRef?.current) {
          const titleTransformValue = songRef.current.style.transform;
          const titleScrollValue = titleTransformValue.substring(titleTransformValue.indexOf('(') + 1, titleTransformValue.indexOf('px'));

          const expectedTransform = songRef.current.offsetWidth - songWrapperRef.current.offsetWidth; // TODO check equals and then 
          const currentTransform = Math.abs(+titleScrollValue);
          const distanceLeft = Math.abs((isScrollLeft ? expectedTransform : 0) - currentTransform);
          const scrollStep = Math.min(2, distanceLeft);
          if (songRef.current.offsetWidth === songWrapperRef.current.offsetWidth) {
            isScrollLeft = false;
            setIsTextScrollLeft(false);
          }
          if (isScrollLeft && (currentTransform < expectedTransform)) {
            songRef.current.style.transform = `translateX(-${currentTransform + scrollStep}px)`;
            return;
          }
          if (isScrollLeft && (currentTransform === expectedTransform)) {
            isScrollLeft = false;
            setIsTextScrollLeft(false);
            return;
          }
          if (!isScrollLeft && (currentTransform > 0)) {
            songRef.current.style.transform = `translateX(-${currentTransform - scrollStep}px)`;
          } else {
            isScrollLeft = true;
            setIsTextScrollLeft(true);
            setScrollIntervalIdFunc(undefined);
            clearInterval(newIntervalId)
          }
        }
      }, 200);
      setScrollIntervalIdFunc(newIntervalId);
    }
  }

  const stopScrollSongText = (songRef: React.RefObject<HTMLDivElement>, songWrapperRef: React.RefObject<HTMLDivElement>, 
    isTextScrollLeft: boolean, setIsTextScrollLeft: React.Dispatch<React.SetStateAction<boolean>>, intervalId: NodeJS.Timer | undefined,
    setScrollIntervalIdFunc: React.Dispatch<React.SetStateAction<NodeJS.Timer | undefined>>) => {
    if (!intervalId) {
      startScrollSongText(songRef, songWrapperRef, isTextScrollLeft, setIsTextScrollLeft, intervalId, setScrollIntervalIdFunc)
    } else {
      clearInterval(intervalId);
      setScrollIntervalIdFunc(undefined);
    }
  }

  const changePlayerCurrentPlayTime = (value: number) => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = value;
      setPlayTime(value);
    }
  }

  const changeSongVolume = (value: number) => {
    setVolume(value);
    if (audioPlayer.current && !isNaN(volume!)) {
      audioPlayer.current.volume = volume! / 100;
    }
  }
  const changeShuffleEnabled = (state: boolean) => {
    setShuffleEnabled(state);
    localStorage.setItem('shuffleEnabled', JSON.stringify(state))
  }

  const renderShuffleIcon = () => {
    return <ShuffleOutlined
      sx={shuffleEnabled ?
        { color: 'grey', '&:hover': { color: 'white' } } :
        { color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary } }}
      onClick={() => changeShuffleEnabled(!shuffleEnabled)} />;
  }

  const changeRepeatSongState = (state: RepeatSongStateEnum) => {
    setRepeatSongState(state);
    localStorage.setItem('repeatSongState', JSON.stringify(state));
  }

  const renderRepeatIcon = () => {
    switch (repeatSongState as RepeatSongStateEnum) {
      case RepeatSongStateEnum.none: {
        return <RepeatOutlined
          sx={{ color: 'grey', '&:hover': { color: 'white' } }}
          onClick={() => changeRepeatSongState(RepeatSongStateEnum.loop)} />
      }
      case RepeatSongStateEnum.loop: {
        return <RepeatOutlined
          sx={{ color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary } }}
          onClick={() => changeRepeatSongState(RepeatSongStateEnum.one)} />
      }
      case RepeatSongStateEnum.one: {
        return <RepeatOneOutlined
          sx={{ color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary } }}
          onClick={() => changeRepeatSongState(RepeatSongStateEnum.none)} />
      }
      default: {
        return <RepeatOutlined
          sx={{ color: 'grey', '&:hover': { color: 'white' } }}
          onClick={() => changeRepeatSongState(RepeatSongStateEnum.none)} />
      }
    }
  }

  const changeMuted = (state: boolean) => {
    setMuted(state);
    localStorage.setItem('muted', JSON.stringify(state));
  }

  const renderVolumeIcon = () => {
    if (!isNaN(volume!)) {
      if (muted) {
        return <VolumeOffOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => changeMuted(!muted)} />
      } else if (volume! <= 25) {
        return <VolumeMuteOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => changeMuted(!muted)} />
      } else if (volume! <= 75) {
        return <VolumeDownOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => changeMuted(!muted)} />
      } else {
        return <VolumeUpOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => changeMuted(!muted)} />
      }
    }
  }

  const changeSongData = (newSongId: string, newSongsQueue: Array<SongInfoResponseData>, newSongIndex: number) => {
    setSongsQueue(newSongsQueue);
    setSongIndex(newSongIndex);
    setPlayTime(0);
    localStorage.setItem('songId', newSongId || '');
    localStorage.setItem('songQueue', JSON.stringify(newSongsQueue));
    localStorage.setItem('songIndex', newSongIndex.toString());
    localStorage.setItem('playTime', JSON.stringify(0));
  }

  const switchToPreviousSong = () => {
    if (audioPlayer.current && audioPlayer.current.currentTime > 5) {
      audioPlayer.current.currentTime = 0;
      setPlayTime(0);
      unpauseSong();
    } else {
      if (songsQueue && songIndex) {
        if (playerIntervalId) {
          clearInterval(playerIntervalId);
        }
        const previousSongIndex = songIndex - 1;
        const song = songsQueue[previousSongIndex];
        changeSongData(song?.songId || '', songsQueue, previousSongIndex);
        
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
    if (songsQueue && !isNaN(songIndex) && (songIndex < songsQueue.length - 1)) {
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
      const nextSongIndex = songIndex + 1;
      const song = songsQueue[songIndex + 1];
      changeSongData(song?.songId || '', songsQueue, nextSongIndex);

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
        muted={muted} />
      <div className="song-player-wrapper">
        <div style={{
          minWidth: '200px',
          width: '30%',
          paddingInlineStart: '8px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <div style={{ marginInlineEnd: '8px' }}>
              <Avatar shape="square" size={64} src={coverImageUrl} />
            </div>
            <div className='song-info'>
              <div 
                ref={songTitleWrapperRef}
                className='song-info-wrapper title'>
                <div style={{display: 'flex'}}>
                  <Title 
                    ref={songTitleRef}
                    onMouseEnter={() => stopScrollSongText(songTitleRef, songTitleWrapperRef, isSongTitleScrollLeft, 
                      setIsSongTitleScrollLeft, titleScrollIntervalId, setTitleScrollIntervalId)}
                    onMouseLeave={() => startScrollSongText(songTitleRef, songTitleWrapperRef, isSongTitleScrollLeft, 
                      setIsSongTitleScrollLeft, titleScrollIntervalId, setTitleScrollIntervalId)}
                    level={5} 
                    className='song-name'>
                      {name}
                  </Title>
                </div>
              </div>
              <div
                ref={songArtistWrapperRef}
                className='song-info-wrapper artist'>
                <div style={{display: 'flex'}}>
                  <Title 
                    ref={songArtistRef}
                    onMouseEnter={() => stopScrollSongText(songArtistRef, songArtistWrapperRef, isSongArtistScrollLeft,
                      setIsSongArtistScrollLeft, artistScrollIntervalId, setArtistScrollIntervalId)}
                    onMouseLeave={() => startScrollSongText(songArtistRef, songArtistWrapperRef, isSongArtistScrollLeft,
                      setIsSongArtistScrollLeft, artistScrollIntervalId, setArtistScrollIntervalId)}
                    level={5}
                    className='song-name'>
                    {artists
                      ?.map<React.ReactNode>(artist => <RouterLink key={artist.name} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
                      .reduce((prev, curr) => [prev, ', ', curr])}
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '40%', maxWidth: '722px' }}>
          <div>
            <div style={{
              display: 'flex',
              width: '100%',
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
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <Text style={{minWidth: '40px'}}>{formatTime(playTime!)}</Text>
              <Slider
                tooltip={{ open: false }}
                style={{ width: '100%', marginLeft: '5px', marginRight: '5px' }}
                value={playTime}
                onChange={(value) => changePlayerCurrentPlayTime(value)}
                max={duration} />
              <Text style={{minWidth: '40px'}}>{formatTime(duration || 0)}</Text>
            </div>
          </div>
        </div>

        <div style={{ width: '30%', minWidth: '180px' }}>
          <div
            style={{
              display: 'flex',
              gap: '5px',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: '5px'
            }}>
            <RouterLink 
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} 
              to='/lyrics'>
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} /> {/* FavoriteOutlined */}
            </RouterLink>
            <RouterLink 
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} 
              to='/lyrics'>
              <MicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
            <RouterLink 
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} 
              to='/queue'>
              <QueueMusicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
            {renderVolumeIcon()}
            <Slider
              tooltip={{ open: false }}
              style={{ width: '100px' }}
              value={volume}
              onChange={(value) => changeSongVolume(value)}
              onChangeComplete={(value) => localStorage.setItem('volume', JSON.stringify(value))}
            />
          </div>
        </div>
      </div>
    </div>
  );

};