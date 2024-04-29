import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Modal, Tooltip, Typography } from "antd";
import { songGuesserSelectors } from "../store/song-guesser.selectors";
import { songGuesserActions } from "../store/song-guesser.actions";
import { listenerProfileTypePalete } from "../../../config";
import { formatedSecondsTime } from "../../../helpers/react/song-guesser.helper";

const { Title } = Typography;

export function SongGuesserGameOverModal() {

  const isGameOverModalOpen = useSelector(songGuesserSelectors.isGameOverModalOpen)
  const gameOverInfo = useSelector(songGuesserSelectors.gameOverInfo)

  const dispatch = useDispatch()
  const closeGameOverModal = () => dispatch(songGuesserActions.closeGameOverModal());

  return (
    <Modal
      title='Song Guesser Results'
      open={isGameOverModalOpen}
      closable={false}
      width={700}
      style={{ maxHeight: 500 }}
      footer={[]}>
      <div className="song-guesser-game-over-modal__content">
        <Title level={3}>Game Overview</Title>
        <Divider className='m-0' style={{ background: 'white' }} />
        <div className="song-guesser-game-over-modal__stats">
          <Title className="m-0" level={2}>
            <Tooltip title='Correct answers'>
              <span style={{ color: listenerProfileTypePalete.base }}>{gameOverInfo?.correctAnswers || 0} </span>
            </Tooltip>
            /
            <Tooltip title='Incorrect answers'>
              <span style={{ color: '#cc2d2d' }}> {gameOverInfo?.incorrectAnswers || 0} </span>
            </Tooltip>
            /
            <Tooltip title='Close answers'>
              <span style={{ color: '#c4cc2d' }}> {gameOverInfo?.closeAnswers || 0} </span>
            </Tooltip>
            /
            <Tooltip title='Skipped answers'>
              <span style={{ color: '#ff7875' }}> {gameOverInfo?.skippedAnswers || 0}</span>
            </Tooltip>
          </Title>
          <Title level={5}>Time: {formatedSecondsTime(gameOverInfo?.timeSpentInSeconds!)}</Title>
          <Button
            key="ok"
            type="primary"
            onClick={() => closeGameOverModal()}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};