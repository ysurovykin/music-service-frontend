import React, { useEffect, useMemo, useRef, useState } from "react";
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
  FavoriteBorder,
  Favorite
} from '@mui/icons-material';
import { Avatar, Slider, Tooltip, Typography } from "antd";
import { listenerProfileTypePalete } from "../../../config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { formatTime } from "../../../helpers/react/song-player.helper";
import { RepeatSongStateEnum } from "../../store/listener.model";
import { queueSelectors } from "../../queue/store/queue.selectors";
import { queueActions } from "../../queue/store/queue.actions";
import { GenerateQueueRequestData, QueueSongInfoResponseData } from "../../queue/store/queue.model";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { openEditSongPlaylistsModal } from "../../playlist/store/playlist.model";

const { Text, Title } = Typography;

export function SongPlayerComponent() {

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const songTitleRef = useRef<HTMLDivElement>(null);
  const songTitleWrapperRef = useRef<HTMLDivElement>(null);
  const songArtistRef = useRef<HTMLDivElement>(null);
  const songArtistWrapperRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const lastSavedPlayTime: number = +(localStorage.getItem('playTime') || '0');
  const lastSavedRepeatSongState: RepeatSongStateEnum = localStorage.getItem('repeatSongState') as RepeatSongStateEnum ||
    JSON.stringify(RepeatSongStateEnum.none);
  const lastSavedShuffleEnabled: boolean = JSON.parse(localStorage.getItem('shuffleEnabled') || 'false');
  const lastSavedVolume: number = +(localStorage.getItem('volume') || '30');
  const lastSavedMuted: boolean = JSON.parse(localStorage.getItem('muted') || 'false');
  const lastListenedSongQueueId = localStorage.getItem('songQueueId');

  const [playTime, setPlayTime] = useState<number>();
  const [volume, setVolume] = useState<number>();
  const [repeatSongState, setRepeatSongState] = useState<RepeatSongStateEnum>(JSON.parse(lastSavedRepeatSongState));
  const [shuffleEnabled, setShuffleEnabled] = useState<boolean>(lastSavedShuffleEnabled);
  const [muted, setMuted] = useState<boolean>(lastSavedMuted);
  const [isSongTitleScrollLeft, setIsSongTitleScrollLeft] = useState(true);
  const [isSongArtistScrollLeft, setIsSongArtistScrollLeft] = useState(true);
  const [playerIntervalId, setPlayerIntervalId] = useState<ReturnType<typeof setInterval>>();
  const [titleScrollIntervalId, setTitleScrollIntervalId] = useState<ReturnType<typeof setInterval>>();
  const [artistScrollIntervalId, setArtistScrollIntervalId] = useState<ReturnType<typeof setInterval>>();

  const isPlaying = useSelector(queueSelectors.isPlaying);
  const isEditSongPlaylistsModalOpen = useSelector(playlistSelectors.isEditSongPlaylistsModalOpen);
  const songsQueue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);
  const isMoreSongsBehindForLoading = useSelector(queueSelectors.isMoreSongsBehindForLoading);
  const isMoreSongsForwardForLoading = useSelector(queueSelectors.isMoreSongsForwardForLoading);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(queueActions.pauseSong());
  const unpauseSong = () => dispatch(queueActions.unpauseSong());
  const switchSong = (songQueueId: string) => dispatch(queueActions.switchSong(songQueueId));
  const openEditSongPlaylistsModal = (songInfo: openEditSongPlaylistsModal) => dispatch(playlistActions.openEditSongPlaylistsModal(songInfo));
  const closeEditSongPlaylistsModal = () => dispatch(playlistActions.closeEditSongPlaylistsModal());
  const getQueue = (songQueueId: string) => dispatch(queueActions.getQueue(songQueueId));
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

  const isSongPlayerLoading = useMemo(() => {
    return !songQueueId && !songsQueue?.length;
  }, [songQueueId, songsQueue]);

  const currentlyPlayingSong = useMemo(() => {
    return songsQueue?.find(song => song.songQueueId === songQueueId);
  }, [songQueueId, songsQueue]);

  const isAbleToSwitchToPreviousSong = useMemo(() => {
    if (songsQueue && songQueueId && repeatSongState) {
      const songIndex = songsQueue.findIndex(song => song.songQueueId === currentlyPlayingSong?.songQueueId);
      if (songIndex === 0) {
        if (repeatSongState === RepeatSongStateEnum.none) {
          return false;
        } else if (repeatSongState === RepeatSongStateEnum.loop) {
          return true;
        }
      } else {
        return true;
      }
    }
  }, [songQueueId, songsQueue, repeatSongState]);

  const isAbleToswitchToNextSong = useMemo(() => {
    if (songsQueue && songQueueId && repeatSongState) {
      const songIndex = songsQueue.findIndex(song => song.songQueueId === currentlyPlayingSong?.songQueueId);
      if (songIndex === songsQueue.length - 1) {
        if (repeatSongState === RepeatSongStateEnum.none) {
          return false;
        } else if (repeatSongState === RepeatSongStateEnum.loop) {
          return true;
        }
      } else {
        return true;
      }
    }
  }, [songQueueId, songsQueue, repeatSongState]);

  useEffect(() => {
    if (isPlaying) {
      if (audioPlayer.current) {
        const playPromise = audioPlayer.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(_ => { })
            .catch(error => { });
        }
      }
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
      const intervalId = setInterval(() => {
        if (audioPlayer.current && audioPlayer.current.readyState === audioPlayer.current.HAVE_ENOUGH_DATA) {
          setPlayTime(audioPlayer?.current?.currentTime);
          dispatchEvent(new CustomEvent('SERVICE_EVENT.PLAY_TIME_CHANGED', {
            detail: {
              playTime: audioPlayer?.current?.currentTime
            }
          }));
          if ((currentlyPlayingSong?.duration! - audioPlayer?.current?.currentTime) < 0.5) {
            if (repeatSongState !== RepeatSongStateEnum.one) {
              switchToNextSong();
            } else {
              localStorage.setItem('playTime', JSON.stringify(0));
              audioPlayer.current.currentTime = 0;
              dispatchEvent(new CustomEvent('SERVICE_EVENT.PLAY_TIME_CHANGED', {
                detail: {
                  playTime: 0
                }
              }));
              setPlayTime(0);
            }
          }
        }
      }, 1000)
      setPlayerIntervalId(intervalId);
    } else {
      if (audioPlayer.current && audioPlayer.current.currentTime > 0 && !audioPlayer.current.paused &&
        audioPlayer.current.readyState > audioPlayer.current.HAVE_CURRENT_DATA) {
        audioPlayer.current.pause()
      }
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
    }
    return () => {
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
    }
  }, [isPlaying, currentlyPlayingSong]);

  useEffect(() => {
    if (playTime && audioPlayer?.current?.currentTime) {
      localStorage.setItem('playTime', JSON.stringify(audioPlayer.current.currentTime));
    }
  }, [playTime]);

  useEffect(() => {
    const setCurrentTimeEventListener = (e: CustomEvent) => {
      const time = e.detail.playTime;
      localStorage.setItem('playTime', JSON.stringify(time));
      if (audioPlayer.current) {
        audioPlayer.current.currentTime = time;
      }
      setPlayTime(e.detail.playTime);
      unpauseSong();
    }
    if (audioPlayer.current) {
      window.addEventListener('SERVICE_EVENT.SONG_TEXT_PLAY_TIME_CHANGED', (setCurrentTimeEventListener) as EventListener);
      if (lastSavedPlayTime) {
        setPlayTime(lastSavedPlayTime);
        audioPlayer.current.currentTime = lastSavedPlayTime;
      }
      if (lastSavedVolume) {
        setVolume(lastSavedVolume);
        audioPlayer.current.volume = lastSavedVolume / 100;
      }
    }
    if (lastListenedSongQueueId) {
      getQueue(lastListenedSongQueueId);
    }
    return () => {
      window.removeEventListener('SERVICE_EVENT.SONG_TEXT_PLAY_TIME_CHANGED', (setCurrentTimeEventListener) as EventListener);
    }
  }, []);

  const startScrollSongText = (songRef: React.RefObject<HTMLDivElement>, songWrapperRef: React.RefObject<HTMLDivElement>,
    isTextScrollLeft: boolean, setIsTextScrollLeft: React.Dispatch<React.SetStateAction<boolean>>, intervalId: NodeJS.Timer | undefined,
    setScrollIntervalIdFunc: React.Dispatch<React.SetStateAction<NodeJS.Timer | undefined>>) => {
    if (!intervalId) {
      let isScrollLeft = isTextScrollLeft;
      const newIntervalId = setInterval(function () {
        if (songRef?.current && songWrapperRef?.current) {
          const titleTransformValue = songRef.current.style.transform;
          const titleScrollValue = titleTransformValue.substring(titleTransformValue.indexOf('(') + 1, titleTransformValue.indexOf('px'));

          const expectedTransform = songRef.current.offsetWidth - songWrapperRef.current.offsetWidth;
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
      dispatchEvent(new CustomEvent('SERVICE_EVENT.PLAY_TIME_CHANGED', {
        detail: {
          playTime: value
        }
      }));
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
    generateQueue({
      isNewQueue: true,
      shuffleEnabled: state,
      songId: currentlyPlayingSong?.songId || ''
    });
    localStorage.setItem('shuffleEnabled', JSON.stringify(state))
  }

  const renderShuffleIcon = () => {
    return <ShuffleOutlined
      sx={shuffleEnabled ?
        { color: listenerProfileTypePalete.base, '&:hover': { color: listenerProfileTypePalete.secondary } } :
        { color: 'grey', '&:hover': { color: 'white' } }}
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

  const changeSongData = (newSongQueueId: string) => {
    setPlayTime(0);
    dispatchEvent(new CustomEvent('SERVICE_EVENT.PLAY_TIME_CHANGED', {
      detail: {
        playTime: 0
      }
    }));
    localStorage.setItem('songQueueId', newSongQueueId || '');
    localStorage.setItem('playTime', JSON.stringify(0));
  }

  const generateQueueIfNeeded = (songIndex: number, song: QueueSongInfoResponseData) => {
    if (((songsQueue || []).length - 1 === songIndex) && isMoreSongsForwardForLoading) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songQueueId: song?.songQueueId || '',
        extendForward: true
      });
    } else if ((songIndex === 0) && isMoreSongsBehindForLoading) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songQueueId: song?.songQueueId || '',
        extendForward: false
      });
    }
  }

  const switchToPreviousSong = () => {
    if (audioPlayer.current && audioPlayer.current.currentTime > 10) {
      audioPlayer.current.currentTime = 0;
      setPlayTime(0);
      dispatchEvent(new CustomEvent('SERVICE_EVENT.PLAY_TIME_CHANGED', {
        detail: {
          playTime: 0
        }
      }));
      unpauseSong();
    } else {
      if (songsQueue) {
        if (playerIntervalId) {
          clearInterval(playerIntervalId);
        }
        const songIndex = songsQueue.findIndex(song => song.songQueueId === currentlyPlayingSong?.songQueueId);
        const expectedPreviousSongIndex = songIndex - 1;
        let previousSongIndex = expectedPreviousSongIndex;
        if (expectedPreviousSongIndex < 0) {
          if (repeatSongState === RepeatSongStateEnum.none) {
            return;
          } else if (repeatSongState === RepeatSongStateEnum.loop) {
            previousSongIndex = songsQueue.length - 1;
          }
        }
        const song = songsQueue[previousSongIndex];
        changeSongData(song?.songQueueId || '');
        generateQueueIfNeeded(previousSongIndex, song);
        switchSong(song?.songQueueId || '');
      }
    }
  }

  const switchToNextSong = () => {
    if (songsQueue) {
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
      const songIndex = songsQueue.findIndex(song => song.songQueueId === currentlyPlayingSong?.songQueueId);
      const expectedNextSongIndex = songIndex + 1;
      let nextSongIndex = expectedNextSongIndex;
      if (expectedNextSongIndex > songsQueue.length - 1) {
        if (repeatSongState === RepeatSongStateEnum.none) {
          return;
        } else if (repeatSongState === RepeatSongStateEnum.loop) {
          nextSongIndex = 0;
        }
      }
      const song = songsQueue[nextSongIndex];
      changeSongData(song?.songQueueId || '');
      generateQueueIfNeeded(nextSongIndex, song);
      switchSong(song?.songQueueId || '');
    }
  }

  const renderSongInfo = () => {
    return (
      <div className="song-player__info-wrapper">
        <div className="song-player__avatar-wrapper">
          <Avatar
            shape="square"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/album/${currentlyPlayingSong?.album?.id}`)}
            size={64}
            src={currentlyPlayingSong?.coverImageUrl} />
        </div>
        <div className='song-player__credentials'>
          <div
            className='song-player__credentials-wrapper title'
            ref={songTitleWrapperRef}>
            <div className='song-player__song-title-wrapper'>
              <Title
                className='song-player__song-title'
                ref={songTitleRef}
                onClick={() => navigate(`/album/${currentlyPlayingSong?.album?.id}`)}
                onMouseEnter={() => stopScrollSongText(songTitleRef, songTitleWrapperRef, isSongTitleScrollLeft,
                  setIsSongTitleScrollLeft, titleScrollIntervalId, setTitleScrollIntervalId)}
                onMouseLeave={() => startScrollSongText(songTitleRef, songTitleWrapperRef, isSongTitleScrollLeft,
                  setIsSongTitleScrollLeft, titleScrollIntervalId, setTitleScrollIntervalId)}
                level={5}>
                {currentlyPlayingSong?.name}
              </Title>
            </div>
          </div>
          <div
            className='song-player__credentials-wrapper artist'
            ref={songArtistWrapperRef}>
            <div className='song-player__song-artists-wrapper'>
              <Title
                className='song-player__song-artists'
                ref={songArtistRef}
                onMouseEnter={() => stopScrollSongText(songArtistRef, songArtistWrapperRef, isSongArtistScrollLeft,
                  setIsSongArtistScrollLeft, artistScrollIntervalId, setArtistScrollIntervalId)}
                onMouseLeave={() => startScrollSongText(songArtistRef, songArtistWrapperRef, isSongArtistScrollLeft,
                  setIsSongArtistScrollLeft, artistScrollIntervalId, setArtistScrollIntervalId)}
                level={5}>
                {currentlyPlayingSong?.artists
                  ?.map<React.ReactNode>(artist => <RouterLink key={artist.name} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
                  .reduce((prev, curr) => [prev, ', ', curr])}
              </Title>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSongControllers = () => {
    return (
      <div>
        <div className="song-player__controllers-wrapper">
          <div className="song-player__controller-icon-wrapper">
            {renderShuffleIcon()}
          </div>
          <div className="song-player__controller-icon-wrapper">
            <SkipPreviousOutlined
              fontSize={'large'}
              sx={isAbleToSwitchToPreviousSong ?
                { color: 'white', cursor: 'pointer', '&:hover': { color: listenerProfileTypePalete.base } } :
                { color: 'grey' }}
              onClick={() => switchToPreviousSong()} />
          </div>
          <div className="song-player__controller-icon-wrapper">
            {!isPlaying
              ? <PlayArrowOutlined
                fontSize={'large'}
                sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
                onClick={unpauseSong} />
              : <PauseOutlined
                fontSize={'large'}
                sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
                onClick={pauseSong} />
            }
          </div>
          <div className="song-player__controller-icon-wrapper">
            <SkipNextOutlined
              fontSize={'large'}
              sx={isAbleToswitchToNextSong ?
                { color: 'white', cursor: 'pointer', '&:hover': { color: listenerProfileTypePalete.base } } :
                { color: 'grey' }}
              onClick={() => switchToNextSong()} />
          </div>
          <div className="song-player__controller-icon-wrapper">
            {renderRepeatIcon()}
          </div>
        </div>
        <div className="song-player__controllers-wrapper">
          <Text className="song-player__song-time">{formatTime(playTime!)}</Text>
          <Slider
            className="song-player__song-slider"
            tooltip={{ open: false }}
            value={playTime}
            onChange={(value) => changePlayerCurrentPlayTime(value)}
            max={currentlyPlayingSong?.duration} />
          <Text className="song-player__song-time">{formatTime(currentlyPlayingSong?.duration || 0)}</Text>
        </div>
      </div>
    );
  };

  const renderSongAdditionalControllers = () => {
    return (
      <div className="song-player__additional-controllers-wrapper">
        <Tooltip
          title='Add to playlist'>
          <div
            className="song-player__additional-controller-icon-wrapper cursor-pointer"
            onClick={() => isEditSongPlaylistsModalOpen ? closeEditSongPlaylistsModal() : openEditSongPlaylistsModal({
              editPlaylistsSong: currentlyPlayingSong!
            })}>
            {currentlyPlayingSong?.playlistIds?.length ?
              <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            }
          </div>
        </Tooltip>
        <Tooltip
          title='Lyrics'>
          <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
            <RouterLink
              className="song-player__additional-controller"
              to='/lyrics'>
              <MicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
          </div>
        </Tooltip>
        <Tooltip
          title='Queue'>
          <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
            <RouterLink
              className="song-player__additional-controller"
              to='/queue'>
              <QueueMusicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
          </div>
        </Tooltip>
        <Tooltip
          title={muted ? 'Unmute' : 'Mute'}>
          <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
            {renderVolumeIcon()}
          </div>
        </Tooltip>
        <Slider
          className="song-player__volume-slider"
          tooltip={{ open: false }}
          value={volume}
          onChange={(value) => changeSongVolume(value)}
          onChangeComplete={(value) => localStorage.setItem('volume', JSON.stringify(value))}
        />
      </div>
    );
  };

  return (
    <div style={{ display: isSongPlayerLoading ? 'none' : 'grid' }} className="song-player__wrapper">
      <audio
        src={currentlyPlayingSong?.songUrl}
        ref={audioPlayer}
        muted={muted} />
      <div className="song-player">
        <div className="song-player__info">
          {renderSongInfo()}
        </div>

        <div className="song-player__controllers">
          {renderSongControllers()}
        </div>

        <div className="song-player__additional-controllers">
          {renderSongAdditionalControllers()}
        </div>
      </div>
    </div>
  );

};