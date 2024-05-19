import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Modal, Tooltip, Typography } from "antd";
import { songGuesserSelectors } from "../store/song-guesser.selectors";
import { songGuesserActions } from "../store/song-guesser.actions";
import { listenerProfileTypePalete } from "../../../config";
import { formatedSecondsTime } from "../../../helpers/react/song-guesser.helper";
import { useNavigate } from "react-router-dom";
import { listenerSelectors } from "../../store/listener.selectors";

const { Title } = Typography;

export function SongGuesserStatsModal() {
  const navigate = useNavigate();

  const isGuesserStatsModalOpen = useSelector(songGuesserSelectors.isGuesserStatsModalOpen);
  const songGuesserStats = useSelector(songGuesserSelectors.songGuesserStats);
  const subscription = useSelector(listenerSelectors.subscription);

  const dispatch = useDispatch()
  const getFinishedSongGuesserStats = () => dispatch(songGuesserActions.getFinishedSongGuesserStats());
  const closeGuesserStatsModal = () => dispatch(songGuesserActions.closeGuesserStatsModal());

  useEffect(() => {
    if (isGuesserStatsModalOpen) {
      getFinishedSongGuesserStats();
    }
  }, [isGuesserStatsModalOpen])

  const navigateToBestGame = () => {
    closeGuesserStatsModal();
    navigate(`/finished-song-guesser/${songGuesserStats?.bestGameId}`);
  }

  const renderStats = () => {
    return (
      <div className="song-guesser-stats-modal__stats">
        <div className="song-guesser-stats-modal__stats--first-row">
          <Title className="m-0" level={4}>Total games: {songGuesserStats?.totalGames}</Title>
        </div>
        <div className="song-guesser-stats-modal__stats--first-row">
          <Title className="m-0" level={4}>Time spent: {formatedSecondsTime(songGuesserStats?.timeSpentInGuesserInSeconds!)}</Title>
        </div>
        <Divider className="m-0" style={{ background: 'white' }} />
        <div className="song-guesser-stats-modal__stats--second-row">
          <Title className="m-0" level={4}>
            Correct:
            <Tooltip title='Correct answers'>
              <span style={{ color: listenerProfileTypePalete.base }}> {songGuesserStats?.correctGuesses || 0} </span>
            </Tooltip>
          </Title>
          <Title className="m-0" level={4}>
            Incorrect:
            <Tooltip title='Incorrect answers'>
              <span style={{ color: '#cc2d2d' }}> {songGuesserStats?.incorrectGuesses || 0} </span>
            </Tooltip>
          </Title>
          <Title className="m-0" level={4}>
            Close:
            <Tooltip title='Close answers'>
              <span style={{ color: '#c4cc2d' }}> {songGuesserStats?.closeGuesses || 0} </span>
            </Tooltip>
          </Title>
          <Title className="m-0" level={4}>
            Skipped:
            <Tooltip title='Skipped answers'>
              <span style={{ color: '#ff7875' }}> {songGuesserStats?.skippedGuesses || 0}</span>
            </Tooltip>
          </Title>
        </div>
        <Divider className="m-0" style={{ background: 'white' }} />
        <div className="song-guesser-stats-modal__best-game-info">
          <Title className="m-0" level={4}>Most correct in one game: {songGuesserStats?.bestScore}</Title>
          <Button
            className="song-guesser-stats-modal__check-game-button"
            onClick={() => navigateToBestGame()}>
            Check best score game
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      title='Song Guesser Stats'
      open={isGuesserStatsModalOpen}
      onCancel={() => closeGuesserStatsModal()}
      width={650}
      style={{ maxHeight: 500 }}
      footer={[
        <Button
          type="primary"
          key="ok"
          onClick={() => closeGuesserStatsModal()}>
          OK
        </Button>
      ]}>
      {subscription === 'free' ?
        <Title level={3}>This feature is not available for free subscription</Title> :
        <div className="song-guesser-stats-modal__stats-wrapper">
          {renderStats()}
          <div className="song-guesser-stats-modal__record-guessers">
            <Title style={{ textAlign: 'center' }} level={3}>Record guessers</Title>
            <Divider className="m-0" style={{ background: 'white' }} />
            <div>
              <Title className="m-0" level={5}>Most correct: {songGuesserStats?.mostCorrectGuesser?.guesserArtistName} - {songGuesserStats?.mostCorrectGuesser?.guesserSongName} ( <span style={{ color: listenerProfileTypePalete.base }}>{songGuesserStats?.mostCorrectGuesser?.guesses}</span> )</Title>
              <Title className="m-0" level={5}>Most incorrect: {songGuesserStats?.mostIncorrectGuesser?.guesserArtistName} - {songGuesserStats?.mostIncorrectGuesser?.guesserSongName} ( <span style={{ color: '#cc2d2d' }}>{songGuesserStats?.mostIncorrectGuesser?.guesses}</span> )</Title>
              <Title className="m-0" level={5}>Most close: {songGuesserStats?.mostCloseGuesser?.guesserArtistName} - {songGuesserStats?.mostCloseGuesser?.guesserSongName} ( <span style={{ color: '#c4cc2d' }}>{songGuesserStats?.mostCloseGuesser?.guesses}</span> )</Title>
              <Title className="m-0" level={5}>Most skipped: {songGuesserStats?.mostSkippedGuesser?.guesserArtistName} - {songGuesserStats?.mostSkippedGuesser?.guesserSongName} ( <span style={{ color: '#ff7875' }}>{songGuesserStats?.mostSkippedGuesser?.guesses}</span> )</Title>
            </div>
          </div>
        </div>
      }
    </Modal >
  );
}