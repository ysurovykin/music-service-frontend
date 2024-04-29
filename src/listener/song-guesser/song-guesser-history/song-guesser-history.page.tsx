import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Divider, Select, SelectProps, Spin, Tag, Typography } from "antd";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { songGuesserSelectors } from "../store/song-guesser.selectors";
import { songGuesserActions } from "../store/song-guesser.actions";
import {
  GetFinishedSongGuessersRequestData,
  SongGuesserDifficultyEnum,
  SongGuesserFilterContentData,
  SongGuesserSortTypeEnum
} from "../store/song-guesser.model";
import { useInView } from "react-intersection-observer";
import { songGenres, songGuesserDifficulties, songLanguages } from "../../../config";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { HeaderComponent } from "../../components/header/header.component";
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@mui/icons-material";
import { SongGuesserCardComponent } from "../song-guesser-card/song-guesser-card.component";
import { listenerSelectors } from "../../store/listener.selectors";

const { Title, Text } = Typography;
type TagRender = SelectProps['tagRender'];

export function SongGuesserHistoryPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { ref: songGuesserRef, inView: songGuesserInView } = useInView({ threshold: 0 });

  const [songGuesserOffset, setSongGuesserOffset] = useState<number>(0);
  const [difficulties, setDifficulties] = useState<Array<SongGuesserDifficultyEnum>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Array<string>>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Array<SongGuesserFilterContentData>>([]);
  const [onlyFollowedArtists, setOnlyFollowedArtists] = useState<boolean | undefined>();
  const [onlyLikedAlbums, setOnlyLikedAlbums] = useState<boolean | undefined>();
  const [finishedAtSort, setFinishedAtSort] = useState<SongGuesserSortTypeEnum>(SongGuesserSortTypeEnum.DESC);
  const [answersSort, setAnswersSort] = useState<SongGuesserSortTypeEnum>(SongGuesserSortTypeEnum.NEUTRAL);
  const [timeSpentSort, setTimeSpentSort] = useState<SongGuesserSortTypeEnum>(SongGuesserSortTypeEnum.NEUTRAL);

  const isMoreFinishedSongGuessersForLoading = useSelector(songGuesserSelectors.isMoreFinishedSongGuessersForLoading);
  const isFinishedSongGuessersLoading = useSelector(songGuesserSelectors.isFinishedSongGuessersLoading);
  const finishedSongGuessers = useSelector(songGuesserSelectors.finishedSongGuessers);
  const playlists = useSelector(playlistSelectors.playlists);
  const subscription = useSelector(listenerSelectors.subscription);

  const dispatch = useDispatch()
  const getFinishedSongGuessers = (request: GetFinishedSongGuessersRequestData) => dispatch(songGuesserActions.getFinishedSongGuessers(request));
  const loadMoreFinishedSongGuessers = (request: GetFinishedSongGuessersRequestData) => dispatch(songGuesserActions.loadMoreFinishedSongGuessers(request));

  const difficultiesOptions = useMemo(() => {
    return Object.values(SongGuesserDifficultyEnum)?.map(difficulty => ({ label: songGuesserDifficulties[difficulty].label, value: difficulty }));
  }, [songGenres]);

  const genreOptions = useMemo(() => {
    return Object.keys(songGenres)?.map(genre => ({ label: songGenres[genre].label, value: genre }));
  }, [songGenres]);

  const languageOptions = useMemo(() => {
    return Object.keys(songLanguages)?.map(language => ({ label: songLanguages[language].label, value: language }));
  }, [songLanguages]);

  const playlistsOptions = useMemo(() => {
    return playlists?.map(playlist => ({ label: playlist.name, value: playlist.playlistId }));
  }, [playlists]);

  const handleLoadMoreAlbums = async () => {
    if (!isFinishedSongGuessersLoading && (typeof isMoreFinishedSongGuessersForLoading === 'undefined' || isMoreFinishedSongGuessersForLoading)) {
      loadMoreFinishedSongGuessers({
        difficulties: difficulties,
        filter: {
          genres: selectedGenres,
          languages: selectedLanguages,
          playlists: selectedPlaylists,
          fromLikedAlbums: onlyLikedAlbums,
          fromFollowedArtists: onlyFollowedArtists,
        },
        sort: {
          finishedAt: finishedAtSort,
          answers: answersSort,
          timeSpent: timeSpentSort,
        },
        offset: songGuesserOffset,
        limit: 10
      });
      setSongGuesserOffset(state => state + 1);
    }
  };

  const updateFiltersForFinishedSongGuessers = () => {
    getFinishedSongGuessers({
      difficulties: difficulties,
      filter: {
        genres: selectedGenres,
        languages: selectedLanguages,
        playlists: selectedPlaylists,
        fromLikedAlbums: onlyLikedAlbums,
        fromFollowedArtists: onlyFollowedArtists,
      },
      sort: {
        finishedAt: finishedAtSort,
        answers: answersSort,
        timeSpent: timeSpentSort,
      },
      offset: 0,
      limit: 10
    });
    setSongGuesserOffset(1);
  }

  useEffect(() => {
    updateFiltersForFinishedSongGuessers();
  }, [])

  useEffect(() => {
    if (songGuesserInView) {
      handleLoadMoreAlbums();
    }
  }, [songGuesserInView]);

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

  const difficultyTagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={songGuesserDifficulties[value]?.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  const setSelectedPlaylistsFunction = (playlistIds: Array<string>) => {
    const choosedPlaylists = playlists?.filter(playlist => playlistIds.includes(playlist.playlistId!));
    const formatedPlaylists = choosedPlaylists?.map(playlist => ({ id: playlist.playlistId!, name: playlist.name! }));
    setSelectedPlaylists(formatedPlaylists!);
  }

  const getNewSortDirection = (currentState: SongGuesserSortTypeEnum) => {
    if (currentState === SongGuesserSortTypeEnum.ASC) {
      setFinishedAtSort(SongGuesserSortTypeEnum.NEUTRAL);
      return SongGuesserSortTypeEnum.DESC;
    } else if (currentState === SongGuesserSortTypeEnum.DESC) {
      setFinishedAtSort(SongGuesserSortTypeEnum.DESC);
      return SongGuesserSortTypeEnum.NEUTRAL;
    } else if (currentState === SongGuesserSortTypeEnum.NEUTRAL) {
      setFinishedAtSort(SongGuesserSortTypeEnum.NEUTRAL);
      return SongGuesserSortTypeEnum.ASC;
    }
    setFinishedAtSort(SongGuesserSortTypeEnum.DESC);
    return SongGuesserSortTypeEnum.NEUTRAL;
  }

  const changeSortDirection = (sortingOption: string) => {
    if (sortingOption === 'finishedAt') {
      setFinishedAtSort(state => {
        if (state === SongGuesserSortTypeEnum.ASC) {
          return SongGuesserSortTypeEnum.DESC;
        } else if (state === SongGuesserSortTypeEnum.DESC) {
          return SongGuesserSortTypeEnum.ASC;
        }
        return SongGuesserSortTypeEnum.ASC;
      });
      setTimeSpentSort(SongGuesserSortTypeEnum.NEUTRAL);
      setAnswersSort(SongGuesserSortTypeEnum.NEUTRAL);
    } else if (sortingOption === 'answers') {
      setAnswersSort(state => getNewSortDirection(state))
      setTimeSpentSort(SongGuesserSortTypeEnum.NEUTRAL);
    } else if (sortingOption === 'timeSpent') {
      setTimeSpentSort(state => getNewSortDirection(state))
      setAnswersSort(SongGuesserSortTypeEnum.NEUTRAL);
    }
  }

  const renderSortDirection = (sortingOption: string) => {
    let sortingDirection: SongGuesserSortTypeEnum;
    if (sortingOption === 'finishedAt') {
      sortingDirection = finishedAtSort;
    } else if (sortingOption === 'answers') {
      sortingDirection = answersSort;
    } else if (sortingOption === 'timeSpent') {
      sortingDirection = timeSpentSort;
    } else {
      return;
    }
    if (sortingDirection === SongGuesserSortTypeEnum.ASC) {
      return <ArrowUpwardOutlined />
    } else if (sortingDirection === SongGuesserSortTypeEnum.DESC) {
      return <ArrowDownwardOutlined />
    }
    return;
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="song-guesser-history-page listener-group-page">
        <HeaderComponent
          text='Guesser History'
          showHeader={!inView} />
        {subscription === 'free' ?
          <Title level={3}>This feature is not available for free subscription</Title> :
          <div className="song-guesser-history-page-wrapper">
            <Title
              level={1}
              ref={ref}>
              Guesser History
            </Title>
            <div className="song-guesser-history-page__filters">
              <Title
                className='m-0'
                level={3}>
                Filters
              </Title>
              <div className="song-guesser-history-page__selectors--first-row">
                <div className="song-guesser-history-page__select-wrapper">
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
              </div>
              <div className="song-guesser-history-page__selectors--second-row">
                <div className="song-guesser-history-page__select-wrapper">
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
                <div className="song-guesser-history-page__select-wrapper">
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
              </div>
              <div className="song-guesser-history-page__selectors--third-row">
                <div className="song-guesser-history-page__select-wrapper">
                  <Select
                    mode="multiple"
                    tagRender={difficultyTagRender}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Difficulties"
                    onChange={(value) => setDifficulties(value)}
                    options={difficultiesOptions}
                  />
                </div>
                <div className="song-guesser-history-page__checkbox-wrapper">
                  <div className="song-guesser-history-page__select-wrapper">
                    <Checkbox
                      onChange={(event) => setOnlyFollowedArtists(event.target.checked)}>Only followed artists</Checkbox>
                  </div>
                  <div className="song-guesser-history-page__select-wrapper">
                    <Checkbox
                      onChange={(event) => setOnlyLikedAlbums(event.target.checked)}>Only liked albums</Checkbox>
                  </div>
                </div>
              </div>
              <div className="song-guesser-history-page__selectors--fourth-row">
                <Button
                  className="song-guesser-history-page__sort-button"
                  onClick={() => changeSortDirection('finishedAt')}>
                  Most recent {renderSortDirection('finishedAt')}
                </Button>
                <Button
                  className="song-guesser-history-page__sort-button"
                  onClick={() => changeSortDirection('answers')}>
                  Correct answers amount {renderSortDirection('answers')}
                </Button>
                <Button
                  className="song-guesser-history-page__sort-button"
                  onClick={() => changeSortDirection('timeSpent')}>
                  Time spent {renderSortDirection('timeSpent')}
                </Button>
              </div>
              <div className="song-guesser-history-page__selectors--fifth-row">
                <Button
                  type="primary"
                  onClick={() => updateFiltersForFinishedSongGuessers()}>
                  Apply filters
                </Button>
              </div>
            </div>
            <Divider />
            {isFinishedSongGuessersLoading ?
              <div className='song-guesser-history-page__loader-wrapper'><Spin /></div> :
              <div className="song-guesser-history-page__records">
                {finishedSongGuessers?.map((finishedSongGuesser, index) =>
                  <SongGuesserCardComponent
                    key={finishedSongGuesser.songGuesserId}
                    songGuesser={finishedSongGuesser}
                    reference={((index === finishedSongGuessers?.length - 1) && isMoreFinishedSongGuessersForLoading) ? songGuesserRef : null} />
                )}
              </div>
            }
          </div>
        }
      </div>
    </div >
  );
};