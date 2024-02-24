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
  FavoriteBorder,
  Favorite
} from '@mui/icons-material';
import { Avatar, Slider, Tooltip, Typography } from "antd";
import { listenerProfileTypePalete } from "../../../config";
import { useDispatch } from "react-redux";
import { songActions } from "../../song/store/song.actions";
import { useSelector } from "react-redux";
import { songSelectors } from "../../song/store/song.selectors";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime } from "../../../helpers/react/song-player.helper";
import { SongInfoResponseData, PlaySongData, OpenEditPlaylistsModal } from "../../song/store/song.model";
import { RepeatSongStateEnum } from "../../store/listener.model";
import { queueSelectors } from "../../queue/store/queue.selectors";
import { queueActions } from "../../queue/store/queue.actions";
import { GenerateQueueRequestData } from "../../queue/store/queue.model";

const { Text, Title } = Typography;

export function SongPlayerComponent() {

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const songTitleRef = useRef<HTMLDivElement>(null);
  const songTitleWrapperRef = useRef<HTMLDivElement>(null);
  const songArtistRef = useRef<HTMLDivElement>(null);
  const songArtistWrapperRef = useRef<HTMLDivElement>(null);

  const lastSavedPlayTime: number = +(localStorage.getItem('playTime') || '0');
  const lastSavedRepeatSongState: RepeatSongStateEnum = localStorage.getItem('repeatSongState') as RepeatSongStateEnum ||
    JSON.stringify(RepeatSongStateEnum.none);
  const lastSavedShuffleEnabled: boolean = JSON.parse(localStorage.getItem('shuffleEnabled') || 'false');
  const lastSavedVolume: number = +(localStorage.getItem('volume') || '30');
  const lastSavedMuted: boolean = JSON.parse(localStorage.getItem('muted') || 'false');
  const lastListenedSongId = localStorage.getItem('songId');

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

  const isPlaying = useSelector(songSelectors.isPlaying);
  const name = useSelector(songSelectors.name);
  const songUrl = useSelector(songSelectors.songUrl);
  const coverImageUrl = useSelector(songSelectors.coverImageUrl);
  const artists = useSelector(songSelectors.artists);
  const duration = useSelector(songSelectors.duration);
  const currentSongId = useSelector(songSelectors.songId);
  const isEditPlaylistModalOpen = useSelector(songSelectors.isEditPlaylistModalOpen);
  const playlistIds = useSelector(songSelectors.playlistIds);
  const songId = useSelector(songSelectors.songId);
  const songsQueue = useSelector(queueSelectors.queue);

  const dispatch = useDispatch();
  const pauseSong = () => dispatch(songActions.pauseSong());
  const unpauseSong = () => dispatch(songActions.unpauseSong());
  const playSong = (songData: PlaySongData) => dispatch(songActions.playSong(songData));
  const getSongById = (songId: string) => dispatch(songActions.getSongById(songId));
  const openEditPlaylistsModal = (songInfo: OpenEditPlaylistsModal) => dispatch(songActions.openEditPlaylistsModal(songInfo));
  const closeEditPlaylistsModal = () => dispatch(songActions.closeEditPlaylistsModal());
  const getQueue = (songId: string) => dispatch(queueActions.getQueue(songId));
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

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

  useEffect(() => {
    if (!currentSongId && lastListenedSongId) {
      getSongById(lastListenedSongId);
      getQueue(lastListenedSongId);
    }
  }, [lastListenedSongId])

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

  const changeSongData = (newSongId: string) => {
    setPlayTime(0);
    localStorage.setItem('songId', newSongId || '');
    localStorage.setItem('playTime', JSON.stringify(0));
  }

  const generateQueueIfNeeded = (songIndex: number) => {
    if (((songsQueue || []).length - 1) === songIndex) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songId: songId || '',
        extendForward: true
      });
    } else if (songIndex === 0) {
      generateQueue({
        isNewQueue: false,
        shuffleEnabled: false,
        songId: songId || '',
        extendForward: false
      });
    }
  }

  const switchToPreviousSong = () => {
    if (audioPlayer.current && audioPlayer.current.currentTime > 10) {
      audioPlayer.current.currentTime = 0;
      setPlayTime(0);
      unpauseSong();
    } else {
      if (songsQueue) {
        if (playerIntervalId) {
          clearInterval(playerIntervalId);
        }
        const songIndex = songsQueue.findIndex(song => song.songId === songId);
        const previousSongIndex = songIndex - 1;
        const song = songsQueue[previousSongIndex];
        changeSongData(song?.songId || '');
        generateQueueIfNeeded(previousSongIndex)
        playSong({
          songId: song?.songId,
          name: song?.name,
          duration: song?.duration,
          coverImageUrl: song?.coverImageUrl,
          songUrl: song?.songUrl,
          artists: song?.artists,
          playlistIds: song?.playlistIds,
          backgroundColor: song?.backgroundColor,
          lyricsBackgroundShadow: song?.lyricsBackgroundShadow
        })
      }
    }
  }

  const switchToNextSong = () => {
    if (songsQueue) {
      if (playerIntervalId) {
        clearInterval(playerIntervalId);
      }
      const songIndex = songsQueue.findIndex(song => song.songId === songId);
      const nextSongIndex = songIndex + 1;
      const song = songsQueue[songIndex + 1];
      changeSongData(song?.songId || '');
      generateQueueIfNeeded(nextSongIndex)
      playSong({
        songId: song?.songId,
        name: song?.name,
        duration: song?.duration,
        coverImageUrl: song?.coverImageUrl,
        songUrl: song?.songUrl,
        artists: song?.artists,
        playlistIds: song?.playlistIds,
        backgroundColor: song?.backgroundColor,
        lyricsBackgroundShadow: song?.lyricsBackgroundShadow
      })
    }
  }

  const renderSongInfo = () => {
    return (
      <div className="song-player__info-wrapper">
        <div className="song-player__avatar-wrapper">
          <Avatar
            shape="square"
            size={64}
            src={coverImageUrl} />
        </div>
        <div className='song-player__credentials'>
          <div
            className='song-player__credentials-wrapper title'
            ref={songTitleWrapperRef}>
            <div className='song-player__song-title-wrapper'>
              <Title
                className='song-player__song-title'
                ref={songTitleRef}
                onMouseEnter={() => stopScrollSongText(songTitleRef, songTitleWrapperRef, isSongTitleScrollLeft,
                  setIsSongTitleScrollLeft, titleScrollIntervalId, setTitleScrollIntervalId)}
                onMouseLeave={() => startScrollSongText(songTitleRef, songTitleWrapperRef, isSongTitleScrollLeft,
                  setIsSongTitleScrollLeft, titleScrollIntervalId, setTitleScrollIntervalId)}
                level={5}>
                {name}
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
                {artists
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
              sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
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
              sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
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
            max={duration} />
          <Text className="song-player__song-time">{formatTime(duration || 0)}</Text>
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
            className="song-player__additional-controller-icon-wrapper"
            onClick={() => isEditPlaylistModalOpen ? closeEditPlaylistsModal() : openEditPlaylistsModal({
              editPlaylistsSongId: songId || '',
              editPlaylistsSongPlaylistIds: playlistIds || []
            })}>
            {playlistIds?.length ?
              <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            }
          </div>
        </Tooltip>
        <Tooltip
          title='Lyrics'>
          <div className="song-player__additional-controller-icon-wrapper">
            <RouterLink
              className="song-player__additional-controller"
              to='/lyrics'>
              <MicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
          </div>
        </Tooltip>
        <Tooltip
          title='Queue'>
          <div className="song-player__additional-controller-icon-wrapper">
            <RouterLink
              className="song-player__additional-controller"
              to='/queue'>
              <QueueMusicOutlined sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
            </RouterLink>
          </div>
        </Tooltip>
        <Tooltip
          title={muted ? 'Unmute' : 'Mute'}>
          <div className="song-player__additional-controller-icon-wrapper">
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
    <div className="song-player__wrapper">
      <audio
        src={songUrl}
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