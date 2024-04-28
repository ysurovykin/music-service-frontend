import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Divider, Dropdown, DropdownProps, Input, Modal, Select, SelectProps, Slider, Spin, Tag, Tooltip, Typography } from "antd";
import { songGuesserSelectors } from "../store/song-guesser.selectors";
import { songGuesserActions } from "../store/song-guesser.actions";
import {
  CheckAnswerRequestData,
  CountAvailableSongsRequestData,
  FormatedGuessData,
  SkipSongRequestData,
  SongGuesserDifficultyEnum,
  SongGuesserFilterContentData,
  StartSongGuesserRequestData
} from "../store/song-guesser.model";
import { songGenres, listenerProfileTypePalete, songLanguages, songGuesserDifficulties } from "../../../config";
import { renderTextWithToolTip, renderTitleWithToolTip } from "../../../helpers/react/form.helper";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { MenuProps } from "antd/lib";
import { formatTime } from "../../../helpers/react/song-player.helper";
import { PauseOutlined, PlayArrowOutlined, VolumeDownOutlined, VolumeMuteOutlined, VolumeOffOutlined, VolumeUpOutlined } from "@mui/icons-material";
import { showNotification } from "../../../helpers/react/redux.helper";

const { Title, Text } = Typography;
type TagRender = SelectProps['tagRender'];

export function SongGuesserGameModal() {
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const [isFilterStage, setIsFilterStage] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<SongGuesserDifficultyEnum>(SongGuesserDifficultyEnum.NEW_TO_MUSIC);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Array<string>>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Array<SongGuesserFilterContentData>>([]);
  const [onlyFollowedArtists, setOnlyFollowedArtists] = useState<boolean>(false);
  const [onlyLikedAlbums, setOnlyLikedAlbums] = useState<boolean>(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [playTime, setPlayTime] = useState<number>();
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [playerIntervalId, setPlayerIntervalId] = useState<ReturnType<typeof setInterval>>();
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(30);
  const [guessedArtistName, setGuessedArtistName] = useState<string>('');
  const [guessedSongName, setGuessedSongName] = useState<string>('');
  const [showCloseArtistGuess, setShowCloseArtistGuess] = useState<boolean>(false);
  const [showCloseSongGuess, setShowCloseSongGuess] = useState<boolean>(false);

  const isGuesserGameModalOpen = useSelector(songGuesserSelectors.isGuesserGameModalOpen);
  const availableSongsByFilter = useSelector(songGuesserSelectors.availableSongsByFilter);
  const isCountAvailableSongsLoading = useSelector(songGuesserSelectors.isCountAvailableSongsLoading);
  const guesserBaseArtist = useSelector(songGuesserSelectors.guesserBaseArtist);
  const guesserBaseAlbum = useSelector(songGuesserSelectors.guesserBaseAlbum);
  const playlists = useSelector(playlistSelectors.playlists);
  const songGuesserId = useSelector(songGuesserSelectors.songGuesserId);
  const mistakes = useSelector(songGuesserSelectors.mistakes);
  const songUrl = useSelector(songGuesserSelectors.songUrl);
  const startTime = useSelector(songGuesserSelectors.startTime);
  const isCheckAnswerLoading = useSelector(songGuesserSelectors.isCheckAnswerLoading);
  const formatedArtistNameGuess = useSelector(songGuesserSelectors.formatedArtistNameGuess);
  const formatedSongNameGuess = useSelector(songGuesserSelectors.formatedSongNameGuess);
  const isSongNameCorrect = useSelector(songGuesserSelectors.isSongNameCorrect);
  const isArtistNameCorrect = useSelector(songGuesserSelectors.isArtistNameCorrect);

  const dispatch = useDispatch()
  const startSongGuesser = (request: StartSongGuesserRequestData) => dispatch(songGuesserActions.startSongGuesser(request));
  const countAvailableSongs = (request: CountAvailableSongsRequestData) => dispatch(songGuesserActions.countAvailableSongs(request));
  const checkAnswer = (request: CheckAnswerRequestData) => dispatch(songGuesserActions.checkAnswer(request));
  const skipSong = (request: SkipSongRequestData) => dispatch(songGuesserActions.skipSong(request));
  const closeGuesserGameModal = () => dispatch(songGuesserActions.closeGuesserGameModal());

  const guessButtonDisabled = useMemo(() => {
    return !guessedArtistName || !guessedSongName;
  }, [guessedArtistName, guessedSongName]);

  const genreOptions = useMemo(() => {
    return Object.keys(songGenres)?.map(genre => ({ label: songGenres[genre].label, value: genre }));
  }, [songGenres]);

  const languageOptions = useMemo(() => {
    return Object.keys(songLanguages)?.map(language => ({ label: songLanguages[language].label, value: language }));
  }, [songLanguages]);

  const playlistsOptions = useMemo(() => {
    return playlists?.map(playlist => ({ label: playlist.name, value: playlist.playlistId }));
  }, [playlists]);

  const okButtonText = useMemo(() => {
    if (availableSongsByFilter! === 0) {
      return 'No songs found';
    }
    return <Text>Start Guesser by {isCountAvailableSongsLoading ?
      <Spin indicator={<LoadingOutlined style={{ color: '#FFFFFF' }} />} /> :
      availableSongsByFilter! > 1000 ?
        'more than 1000' :
        availableSongsByFilter} songs</Text>
  }, [isCountAvailableSongsLoading, availableSongsByFilter]);

  const endTime = useMemo(() => {
    if (startTime && difficulty) {
      return startTime + songGuesserDifficulties[difficulty].seconds;
    }
    return 0;
  }, [startTime, difficulty]);

  const formatedSongNameGuessElement = useMemo(() => {
    return <Text>
      {formatedSongNameGuess?.map(guess =>
        <span className={`song-guesser-game-modal__game-stage-formated-guess--${guess.type}`}>{guess.symbol}</span>)}
    </Text>
  }, [formatedSongNameGuess]);

  const formatedArtistNameGuessElement = useMemo(() => {
    return <Text>
      {formatedArtistNameGuess?.map(guess =>
        <span className={`song-guesser-game-modal__game-stage-formated-guess--${guess.type}`}>{guess.symbol}</span>)}
    </Text>
  }, [formatedArtistNameGuess]);

  const mistakesColor = useMemo(() => {
    switch (mistakes) {
      case 0: {
        return 'rgb(255, 255, 255)';
      }
      case 1: {
        return 'rgb(255, 255, 204)';
      }
      case 2: {
        return 'rgb(255, 204, 153)';
      }
      case 3: {
        return 'rgb(255, 153, 153)';
      }
      default: {
        return 'rgb(255, 255, 255)';
      }
    }
  }, [mistakes])

  const modalTitle = useMemo(() => {
    if (guesserBaseArtist) {
      return `Song Guesser by ${guesserBaseArtist.name}`;
    } else if (guesserBaseAlbum) {
      return `Song Guesser by ${guesserBaseAlbum.name}`;
    } else {
      return 'Song Guesser';
    }
  }, [guesserBaseArtist, guesserBaseAlbum]);

  useEffect(() => {
    if (isPlaying && isGuesserGameModalOpen) {
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
          if ((endTime! - audioPlayer?.current?.currentTime) < 0.5) {
            setPlayTime(startTime);
            audioPlayer.current.currentTime = startTime!;
            setIsPlaying(false);
          }
        }
      }, 1000)
      setPlayerIntervalId(intervalId);
    } else {
      if (playerIntervalId) {
        if (audioPlayer.current && audioPlayer.current.currentTime > 0 && !audioPlayer.current.paused &&
          audioPlayer.current.readyState > audioPlayer.current.HAVE_CURRENT_DATA) {
          audioPlayer.current.pause()
        }
        clearInterval(playerIntervalId);
      }
    }
    return () => {
      if (playerIntervalId) {
        if (audioPlayer.current) {
          audioPlayer.current.pause()
        }
        clearInterval(playerIntervalId);
      }
    }
  }, [isPlaying, songUrl]);

  useEffect(() => {
    if (isGuesserGameModalOpen) {
      countAvailableSongs({
        filter: {
          artist: guesserBaseArtist,
          album: guesserBaseAlbum,
          genres: selectedGenres,
          languages: selectedLanguages,
          playlists: selectedPlaylists,
          fromFollowedArtists: onlyFollowedArtists,
          fromLikedAlbums: onlyLikedAlbums,
        }
      });
    }
  }, [guesserBaseArtist, guesserBaseAlbum, selectedGenres, selectedLanguages, selectedPlaylists, onlyFollowedArtists, onlyLikedAlbums]);

  useEffect(() => {
    if (songGuesserId) {
      setIsFilterStage(false);
    }

    if (startTime) {
      setPlayTime(startTime);
      if (audioPlayer.current) {
        audioPlayer.current.currentTime = startTime!;
      }
    }
  }, [songGuesserId, startTime]);

  useEffect(() => {
    setGuessedArtistName('');
    setGuessedSongName('')
  }, [songUrl]);

  useEffect(() => {
    if (isGuesserGameModalOpen) {
      setIsFilterStage(true);
      setDifficulty(SongGuesserDifficultyEnum.NEW_TO_MUSIC);
      setSelectedGenres([]);
      setSelectedLanguages([]);
      setSelectedPlaylists([]);
      setOnlyFollowedArtists(false);
      setOnlyLikedAlbums(false);
      setIsPlaying(false);
      setPlayTime(undefined);
      setGuessedArtistName('');
      setGuessedSongName('');
      setShowCloseArtistGuess(false);
      setShowCloseSongGuess(false);
    }
  }, [isGuesserGameModalOpen]);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setDropDownOpen(nextOpen);
    }
  };

  const genreTagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={songGenres[value]?.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  const languageTagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={songLanguages[value]?.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  const playlistsTagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const selectedPlaylist = playlists?.find(playlist => playlist.playlistId === value);

    return (
      <Tag
        color={selectedPlaylist?.backgroundColor}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  const items: MenuProps['items'] = [
    {
      label: <div className='song-guesser-game-modal__game-stage-dropdown-item'
        onClick={() => { }}>
        Languages: {selectedLanguages.length ?
          selectedLanguages.map(language => <span
            className="song-guesser-game-modal__game-stage-dropdown-filter-item"
            key={language}
            style={{ background: songLanguages[language]?.color }}>
            {songLanguages[language].label}
          </span>) :
          'any'}
      </div >,
      key: '0',
    },
    {
      label: <div className='song-guesser-game-modal__game-stage-dropdown-item'
        onClick={() => { }}>
        Genres: {selectedGenres.length ?
          selectedGenres.map(genre => <span
            className="song-guesser-game-modal__game-stage-dropdown-filter-item"
            key={genre}
            style={{ background: songGenres[genre]?.color }}>
            {songGenres[genre].label}
          </span>) :
          'any'}
      </div >,
      key: '1',
    },
    {
      label: <div className='song-guesser-game-modal__game-stage-dropdown-item'
        onClick={() => { }}>
        Playlists: {selectedPlaylists.length ?
          selectedPlaylists.map(playlist => <span
            className="song-guesser-game-modal__game-stage-dropdown-filter-item"
            key={playlist.id}
            style={{ background: playlists?.find(curPlaylist => curPlaylist.playlistId === playlist.id)?.backgroundColor }}>
            {playlist.name}
          </span>) :
          'any'}
      </div >,
      key: '2',
    },
    {
      label: <div className='song-guesser-game-modal__game-stage-dropdown-item'
        onClick={() => { }}>
        Artist: {onlyFollowedArtists ? 'only followed' : guesserBaseArtist ? guesserBaseArtist.name : 'any'}
      </div >,
      key: '3',
    },
    {
      label: <div className='song-guesser-game-modal__game-stage-dropdown-item'
        onClick={() => { }}>
        Album: {onlyLikedAlbums ? 'only liked' : guesserBaseAlbum ? guesserBaseAlbum.name : 'any'}
      </div >,
      key: '4',
    },
  ];

  const setSelectedPlaylistsFunction = (playlistIds: Array<string>) => {
    const choosedPlaylists = playlists?.filter(playlist => playlistIds.includes(playlist.playlistId!));
    const formatedPlaylists = choosedPlaylists?.map(playlist => ({ id: playlist.playlistId!, name: playlist.name! }));
    setSelectedPlaylists(formatedPlaylists!);
  }

  const startSongGuesserFunction = () => {
    startSongGuesser({
      difficulty: difficulty,
      filter: {
        artist: guesserBaseArtist,
        album: guesserBaseAlbum,
        genres: selectedGenres,
        languages: selectedLanguages,
        playlists: selectedPlaylists,
        fromFollowedArtists: onlyFollowedArtists,
        fromLikedAlbums: onlyLikedAlbums,
      }
    })
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

  const skipSongFunction = () => {
    const skipSongGuesserSongLoadingNotificationId = showNotification('info', 'Skipping song..', 10000, true);
    localStorage.setItem('skipSongGuesserSongLoadingNotificationId', skipSongGuesserSongLoadingNotificationId.toString());
    skipSong({ songGuesserId: songGuesserId! })
  }

  const checkAnswerFunction = () => {
    setShowCloseArtistGuess(false);
    setShowCloseSongGuess(false);
    const checkAnswerLoadingNotificationId = showNotification('info', 'Checking answer..', 10000, true);
    localStorage.setItem('checkAnswerLoadingNotificationId', checkAnswerLoadingNotificationId.toString());
    checkAnswer({
      answer: { artistName: guessedArtistName, songName: guessedSongName },
      songGuesserId: songGuesserId!
    })
  }

  const renderFilterStage = () => {
    return (
      <div>
        <div>
          <Title level={3}>Choose game options</Title>
        </div>
        <div>
          <Title level={4}>Choose difficulty</Title>
          <div className="song-guesser-game-modal__difficulties">
            <div
              className={`song-guesser-game-modal__difficulty-info${difficulty === SongGuesserDifficultyEnum.NEW_TO_MUSIC ? '--selected' : ''}`}
              onClick={() => setDifficulty(SongGuesserDifficultyEnum.NEW_TO_MUSIC)}
              style={{ backgroundColor: songGuesserDifficulties['NEW_TO_MUSIC'].color }}>
              <Title className="m-0" level={4}>{songGuesserDifficulties['NEW_TO_MUSIC'].label}</Title>
              <Divider style={{ margin: '10px 0px' }} />
              <Text>Random {songGuesserDifficulties['NEW_TO_MUSIC'].seconds} seconds from song available for guessing</Text>
            </div>
            <div
              className={`song-guesser-game-modal__difficulty-info${difficulty === SongGuesserDifficultyEnum.FREQUENT_LISTENER ? '--selected' : ''}`}
              onClick={() => setDifficulty(SongGuesserDifficultyEnum.FREQUENT_LISTENER)}
              style={{ backgroundColor: songGuesserDifficulties['FREQUENT_LISTENER'].color }}>
              <Title className="m-0" level={4}>{songGuesserDifficulties['FREQUENT_LISTENER'].label}</Title>
              <Divider style={{ margin: '10px 0px' }} />
              <Text>Random {songGuesserDifficulties['FREQUENT_LISTENER'].seconds} seconds from song available for guessing</Text>
            </div>
            <div
              className={`song-guesser-game-modal__difficulty-info${difficulty === SongGuesserDifficultyEnum.TRUE_FAN ? '--selected' : ''}`}
              onClick={() => setDifficulty(SongGuesserDifficultyEnum.TRUE_FAN)}
              style={{ backgroundColor: songGuesserDifficulties['TRUE_FAN'].color }}>
              <Title className="m-0" level={4}>{songGuesserDifficulties['TRUE_FAN'].label}</Title>
              <Divider style={{ margin: '10px 0px' }} />
              <Text>Random {songGuesserDifficulties['TRUE_FAN'].seconds} seconds from song available for guessing</Text>
            </div>
          </div>
        </div>
        <Divider style={{ margin: '10px 0px' }} />
        <div>
          <div>
            <Title level={4}>Choose filters</Title>
          </div>
          <div className="song-guesser-game-modal__filters">
            {renderTitleWithToolTip('Genres', 'Only songs with this genres will be used in Guesser', 5, true)}
            <div className="song-guesser-game-modal__select-wrapper">
              <Select
                mode="multiple"
                tagRender={genreTagRender}
                allowClear
                style={{ width: '100%' }}
                placeholder="Genres"
                onChange={(value) => setSelectedGenres(value)}
                options={genreOptions}
              />
            </div>
            {renderTitleWithToolTip('Languages', 'Only songs with this languages will be used in Guesser', 5, true)}
            <div className="song-guesser-game-modal__select-wrapper">
              <Select
                mode="multiple"
                tagRender={languageTagRender}
                allowClear
                style={{ width: '100%' }}
                placeholder="Languages"
                onChange={(value) => setSelectedLanguages(value)}
                options={languageOptions}
              />
            </div>
            {renderTitleWithToolTip('Playlists', 'Only songs from this playlists will be used in Guesser', 5, true)}
            <div className="song-guesser-game-modal__select-wrapper">
              <Select
                mode="multiple"
                tagRender={playlistsTagRender}
                allowClear
                style={{ width: '100%' }}
                placeholder="Playlists"
                onChange={(value) => setSelectedPlaylistsFunction(value)}
                options={playlistsOptions}
              />
            </div>
            <div className="song-guesser-game-modal__checkbox-wrapper">
              <div className="song-guesser-game-modal__select-wrapper">
                <Checkbox
                  onChange={(event) => setOnlyFollowedArtists(event.target.checked)}>Only followed artists</Checkbox>
              </div>
              <div className="song-guesser-game-modal__select-wrapper">
                <Checkbox
                  onChange={(event) => setOnlyLikedAlbums(event.target.checked)}>Only liked albums</Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderVolumeIcon = () => {
    if (!isNaN(volume!)) {
      if (muted) {
        return <VolumeOffOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => setMuted(!muted)} />
      } else if (volume! <= 25) {
        return <VolumeMuteOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => setMuted(!muted)} />
      } else if (volume! <= 75) {
        return <VolumeDownOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => setMuted(!muted)} />
      } else {
        return <VolumeUpOutlined
          sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
          onClick={() => setMuted(!muted)} />
      }
    }
  }

  const renderGameStage = () => {
    return (
      <div className="song-guesser-game-modal__game-stage">
        <div className="song-guesser-game-modal__game-stage-header">
          <Text
            className="song-guesser-game-modal__game-stage-mistakes"
            style={{ color: mistakesColor, borderColor: mistakesColor }}>
            Mistakes: {mistakes || 0}
          </Text>
          <Dropdown
            menu={{ items }}
            onOpenChange={handleOpenChange}
            open={dropDownOpen}
            placement="bottomRight">
            <Text className="song-guesser-game-modal__game-stage-filters">Filters</Text>
          </Dropdown>
        </div>
        <div className="song-guesser-game-modal__game-stage-song-content">
          <div className="song-guesser-game-modal__game-stage-controllers-wrapper">
            <div className="song-guesser-game-modal__game-stage-controller-icon-wrapper">
              {!isPlaying
                ? <PlayArrowOutlined
                  fontSize={'large'}
                  sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
                  onClick={() => setIsPlaying(true)} />
                : <PauseOutlined
                  fontSize={'large'}
                  sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }}
                  onClick={() => setIsPlaying(false)} />
              }
            </div>
          </div>
          <div className="song-guesser-game-modal__game-stage-controllers-wrapper">
            <Text className="song-guesser-game-modal__game-stage-song-time">{formatTime(playTime!)}</Text>
            <Slider
              className="song-guesser-game-modal__game-stage-song-slider"
              tooltip={{ open: false }}
              styles={{ rail: { background: listenerProfileTypePalete.backgroundAccentSemiDark } }}
              value={playTime}
              onChange={(value) => changePlayerCurrentPlayTime(value)}
              min={startTime}
              max={endTime} />
            <Text className="song-guesser-game-modal__game-stage-song-time">{formatTime(endTime || 0)}</Text>
          </div>
          <div className="song-guesser-game-modal__game-stage-controllers-wrapper">
            <Tooltip
              title={muted ? 'Unmute' : 'Mute'}>
              <div className="song-guesser-game-modal__game-stage-controller-icon-wrapper cursor-pointer">
                {renderVolumeIcon()}
              </div>
            </Tooltip>
            <Slider
              className="song-guesser-game-modal__game-stage-volume-slider"
              tooltip={{ open: false }}
              styles={{ rail: { background: listenerProfileTypePalete.backgroundAccentSemiDark } }}
              value={volume}
              onChange={(value) => changeSongVolume(value)}
            />
          </div>
        </div>
        <div className="song-guesser-game-modal__game-stage-answer">
          <div>
            <div className="song-guesser-game-modal__game-stage-answer-title">
              <Text>Artist</Text>
              {formatedArtistNameGuess ? <Text style={{ color: 'white' }}>
                <Text
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowCloseArtistGuess(state => !state)}>
                  {`${showCloseArtistGuess ? 'Hide' : 'Check'} close answer `}
                </Text>
                <Tooltip title={'One of your guesses was close to the answer, but not quite the same. You can see difference by pressing \'Check close answer\''}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Text> : ''}
            </div>
            {showCloseArtistGuess ?
              <div className="song-guesser-game-modal__game-stage-formated-guess">{formatedArtistNameGuessElement}</div> :
              <Input
                value={guessedArtistName}
                disabled={isCheckAnswerLoading || isArtistNameCorrect}
                onChange={(e) => setGuessedArtistName(e.target.value)} />
            }
          </div>
          <div>
            <div className="song-guesser-game-modal__game-stage-answer-title">
              <Text>Song name</Text>
              {formatedSongNameGuess ? <Text style={{ color: 'white' }}>
                <Text
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowCloseSongGuess(state => !state)}>
                  {`${showCloseSongGuess ? 'Hide' : 'Check'} close answer `}
                </Text>
                <Tooltip title={'One of your guesses was close to the answer, but not quite the same. You can see difference by pressing \'Check close answer\''}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Text> : ''}
            </div>
            {showCloseSongGuess ?
              <div className="song-guesser-game-modal__game-stage-formated-guess">{formatedSongNameGuessElement}</div> :
              <Input
                value={guessedSongName}
                disabled={isCheckAnswerLoading || isSongNameCorrect}
                onChange={(e) => setGuessedSongName(e.target.value)} />
            }
          </div>
        </div>
      </div >
    )
  }

  return (
    <Modal
      title={modalTitle}
      open={isGuesserGameModalOpen}
      closable={false}
      width={700}
      style={{ maxHeight: 500 }}
      footer={[
        isFilterStage ?
          <Button
            className="song-guesser-game-modal__cancel-button"
            key="cancel"
            onClick={() => closeGuesserGameModal()}>
            Cancel
          </Button> :
          <Button
            className="song-guesser-game-modal__game-stage-skip-button"
            key="skip"
            onClick={() => skipSongFunction()}>
            Skip
          </Button>,
        isFilterStage ?
          <Button
            key="start"
            type="primary"
            disabled={availableSongsByFilter === 0}
            onClick={() => startSongGuesserFunction()}>
            {okButtonText}
          </Button> :
          <Tooltip
            key='tooltip'
            title={guessButtonDisabled ? 'Write artist and song guesses' : ''}>
            <Button
              key="guess"
              type="primary"
              disabled={guessButtonDisabled}
              onClick={() => checkAnswerFunction()}>
              Guess
            </Button>
          </Tooltip>
      ]}>
      <div className={`song-guesser-game-modal__stage-wrapper${isFilterStage ? '--filters' : '--game'} custom-scroll-y`}>
        <audio
          src={songUrl}
          ref={audioPlayer}
          muted={muted} />
        {isFilterStage ? renderFilterStage() : renderGameStage()}
      </div>
    </Modal>
  );
};