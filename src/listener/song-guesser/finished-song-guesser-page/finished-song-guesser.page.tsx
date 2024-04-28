import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Collapse, CollapseProps, Divider, Spin, Tooltip, Typography } from "antd";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { songGuesserSelectors } from "../store/song-guesser.selectors";
import { songGuesserActions } from "../store/song-guesser.actions";
import {
  GetFinishedSongGuessersRequestData,
  GuesserAttemptData,
  SongGuesserAnswersFullData,
  SongGuesserDifficultyEnum,
  SongGuesserFilterContentData,
  SongGuesserSortTypeEnum
} from "../store/song-guesser.model";
import { useInView } from "react-intersection-observer";
import { listenerProfileTypePalete, songGenres, songGuesserDifficulties, songLanguages } from "../../../config";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { HeaderComponent } from "../../components/header/header.component";
import { Link as RouterLink, useParams } from "react-router-dom";
import { formatedSecondsTime } from "../../../helpers/react/song-guesser.helper";
import { listenerSelectors } from "../../store/listener.selectors";

const { Title, Text } = Typography;

export function FinishedSongGuesserDetailsPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { songGuesserId } = useParams<{ songGuesserId: string }>();

  const finishedSongGuesserData = useSelector(songGuesserSelectors.finishedSongGuesserData);
  const isFinishedSongGuesserDataLoading = useSelector(songGuesserSelectors.isFinishedSongGuesserDataLoading);
  const playlists = useSelector(playlistSelectors.playlists);
  const subscription = useSelector(listenerSelectors.subscription);

  const dispatch = useDispatch()
  const getFinishedSongGuesserById = (songGuesserId: string) => dispatch(songGuesserActions.getFinishedSongGuesserById(songGuesserId));

  useEffect(() => {
    if (songGuesserId) {
      getFinishedSongGuesserById(songGuesserId);
    }
  }, [songGuesserId])

  const renderHeaderComponent = () => {
    return (
      <Title className="m-0" level={4}>
        Score:
        <Tooltip title='Correct answers'>
          <span style={{ color: listenerProfileTypePalete.base }}> {finishedSongGuesserData?.correctAnswers || 0} </span>
        </Tooltip>
        /
        <Tooltip title='Incorrect answers'>
          <span style={{ color: '#cc2d2d' }}> {finishedSongGuesserData?.mistakes || 0} </span>
        </Tooltip>
        /
        <Tooltip title='Close answers'>
          <span style={{ color: '#c4cc2d' }}> {finishedSongGuesserData?.closeAnswers || 0} </span>
        </Tooltip>
        /
        <Tooltip title='Skipped answers'>
          <span style={{ color: '#ff7875' }}> {finishedSongGuesserData?.skippedAnswers || 0}</span>
        </Tooltip>
      </Title>
    )
  }

  const renderStats = () => {
    return (
      <div>
        <Title className="m-0" level={3}>
          Correct:
          <Tooltip title='Correct answers'>
            <span style={{ color: listenerProfileTypePalete.base }}> {finishedSongGuesserData?.correctAnswers || 0} </span>
          </Tooltip>
        </Title>
        <Title className="m-0" level={3}>
          Incorrect:
          <Tooltip title='Incorrect answers'>
            <span style={{ color: '#cc2d2d' }}> {finishedSongGuesserData?.mistakes || 0} </span>
          </Tooltip>
        </Title>
        <Title className="m-0" level={3}>
          Close:
          <Tooltip title='Close answers'>
            <span style={{ color: '#c4cc2d' }}> {finishedSongGuesserData?.closeAnswers || 0} </span>
          </Tooltip>
        </Title>
        <Title className="m-0" level={3}>
          Skipped:
          <Tooltip title='Skipped answers'>
            <span style={{ color: '#ff7875' }}> {finishedSongGuesserData?.skippedAnswers || 0}</span>
          </Tooltip>
        </Title>
        <Title className="mt-0" level={3}>Time spent: {formatedSecondsTime(finishedSongGuesserData?.timeSpentInSeconds!)}</Title>
      </div>
    );
  }

  const renderFilters = () => {
    return (
      <div className="song-guesser-card__filters-wrapper">
        <div className="song-guesser-card__filter">
          Languages: {finishedSongGuesserData?.filter?.languages?.length ?
            finishedSongGuesserData?.filter?.languages?.map(language => <span
              className="song-guesser-card__filter-item"
              key={language}
              style={{ background: songLanguages[language]?.color }}>
              {songLanguages[language].label}
            </span>) :
            'any'}
        </div>
        <div className="song-guesser-card__filter">
          Genres: {finishedSongGuesserData?.filter?.genres?.length ?
            finishedSongGuesserData?.filter?.genres?.map(genre => <span
              className="song-guesser-card__filter-item"
              key={genre}
              style={{ background: songGenres[genre]?.color }}>
              {songGenres[genre].label}
            </span>) :
            'any'}
        </div>
        <div className="song-guesser-card__filter">
          Playlists: {finishedSongGuesserData?.filter?.playlists?.length ?
            finishedSongGuesserData?.filter?.playlists?.map(playlist => <span
              className="song-guesser-card__filter-item"
              key={playlist.id}
              style={{ background: playlists?.find(curPlaylist => curPlaylist.playlistId === playlist.id)?.backgroundColor }}>
              {playlist.name}
            </span>) :
            'any'}
        </div>
        <div className="song-guesser-card__filter">
          Artist: {finishedSongGuesserData?.filter?.fromFollowedArtists ?
            'only followed' :
            finishedSongGuesserData?.filter?.artist ?
              <Text>
                <RouterLink to={`/artist/${finishedSongGuesserData?.filter?.artist?.id}`}>{finishedSongGuesserData?.filter?.artist?.name}</RouterLink>
              </Text> :
              'any'}
        </div>
        <div className="song-guesser-card__filter">
          Album: {finishedSongGuesserData?.filter?.fromLikedAlbums ?
            'only liked' :
            finishedSongGuesserData?.filter?.album ?
              <Text>
                <RouterLink to={`/album/${finishedSongGuesserData?.filter?.album?.id}`}>{finishedSongGuesserData?.filter?.album?.name}</RouterLink>
              </Text> :
              'any'}
        </div>
      </div>
    );
  }

  const renderAnswerTag = (answer: SongGuesserAnswersFullData) => {
    if (answer.answered) {
      if (answer.isCloseAnswer) {
        return <div className="finished-song-guesser-page__answer-tag-close">
          <Text>Answered on the {answer.attemptsCount} attempt with hint</Text>
        </div>;
      } else if (answer.attemptsCount === 1) {
        return <div className="finished-song-guesser-page__answer-tag-correct--first-try">
          <Text>Answer on the first try</Text>
        </div>;
      }
      return <div className="finished-song-guesser-page__answer-tag-correct--multiple-try">
        <Text>Answered on the {answer.attemptsCount} attempt</Text>
      </div>;
    } else {
      if (answer.skipped) {
        return <div className="finished-song-guesser-page__answer-tag-skipped">
          <Text>Skipped on the {answer.attemptsCount} attempt</Text>
        </div>;
      }
      return <div className="finished-song-guesser-page__answer-tag-incorrect">
        <Text>Remained unanswered</Text>
      </div>;
    }
  }

  const renderAttemptTag = (attempt: GuesserAttemptData) => {
    if (attempt.answered) {
      return <div className="finished-song-guesser-page__attempt-tag-correct">
        <Text>Correct</Text>
      </div>;
    } else {
      if (attempt.skipped) {
        return <div className="finished-song-guesser-page__attempt-tag-skipped">
          <Text>Skipped</Text>
        </div>;
      } else if (attempt.isCloseAnswer) {
        return <div className="finished-song-guesser-page__attempt-tag-close">
          <Text>Close</Text>
        </div>;
      }
      return <div className="finished-song-guesser-page__attempt-tag-incorrect">
        <Text>Incorrect</Text>
      </div>;
    }
  }

  const renderAttemptArtistName = (attempt: GuesserAttemptData) => {
    if (attempt.formatedArtistNameGuess?.length) {
      return <Text>
        {attempt.formatedArtistNameGuess?.map(guess =>
          <span className={`finished-song-guesser-page__formated-guess--${guess.type}`}>{guess.symbol}</span>)}
      </Text>;
    } else {
      return <Text>{attempt.artistNameGuess}</Text>;
    }
  }

  const renderAttemptSongName = (attempt: GuesserAttemptData) => {
    if (attempt.formatedSongNameGuess?.length) {
      return <Text>
        {attempt.formatedSongNameGuess?.map(guess =>
          <span className={`finished-song-guesser-page__formated-guess--${guess.type}`}>{guess.symbol}</span>)}
      </Text>;
    } else {
      return <Text>{attempt.songNameGuess}</Text>;
    }
  }

  const renderAttempt = (attempt: GuesserAttemptData, index: number, attemptsCount: number) => {
    return (
      <div className="finished-song-guesser-page__attempt-wrapper">
        <div className="finished-song-guesser-page__attempt-title">
          <Title className="m-0" level={5}>
            {index}. Guess: {renderAttemptArtistName(attempt)} - {renderAttemptSongName(attempt)}
          </Title>
          {renderAttemptTag(attempt)}
        </div>
        <div>
          <Text>Time spent: {formatedSecondsTime(attempt?.spentTimeInSeconds!)}</Text>
        </div>
        {index === attemptsCount ? <></> : <Divider style={{ margin: '5px 0px', backgroundColor: 'white' }} />}
      </div>
    );
  }

  const renderAnswer = (answer: SongGuesserAnswersFullData) => {

    const collapseItems: CollapseProps['items'] = [
      {
        key: '1',
        label: <Text>Attempts</Text>,
        children: answer?.attempts?.map((attempt, index) => renderAttempt(attempt, index + 1, answer?.attemptsCount))
      }
    ]

    return (
      <div className="finished-song-guesser-page__answer-wrapper">
        <div className="finished-song-guesser-page__answer-title">
          <Title className="m-0" level={5}>
            Correct answer: <RouterLink to={`/artist/${answer.artist.id}`}>{answer.artist.name}</RouterLink> - <RouterLink to={`/album/${answer.albumId}?songId=${answer.song.id}`}>{answer.song.name}</RouterLink>
          </Title>
          {renderAnswerTag(answer)}
        </div>
        <div>
          <Text>Time spent: {formatedSecondsTime(answer?.spentTimeInSeconds!)}</Text>
        </div>
        <Divider className="mt-0" />
        <Collapse items={collapseItems}>Attempts</Collapse>
      </div>
    );
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="finished-song-guesser-page listener-group-page">
        <HeaderComponent
          element={renderHeaderComponent()}
          showHeader={!inView} />
        {subscription === 'free' ?
          <Title level={3}>This feature is not available for free subscription</Title> :
          isFinishedSongGuesserDataLoading ?
            <div className='finished-song-guesser-page__loader-wrapper'><Spin /></div> :
            <div className="finished-song-guesser-page-wrapper">
              <Title
                level={1}
                ref={ref}>
                Finished Guesser Details
              </Title>
              {renderStats()}
              {renderFilters()}
              <Divider className="mt-0" />
              <Title level={3}>
                Answers
              </Title>
              <div className="finished-song-guesser-page__answers-wrapper">
                {finishedSongGuesserData?.answers?.map(answer => renderAnswer(answer))}
              </div>
            </div>
        }
      </div>
    </div >
  );
};