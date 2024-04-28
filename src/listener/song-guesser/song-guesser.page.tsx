import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { songGuesserActions } from "./store/song-guesser.actions";
import { Button, Tooltip, Typography } from "antd";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { songSelectors } from "../song/store/song.selectors";
import { OpenGuesserGameModalData, StartSongGuesserRequestData } from "./store/song-guesser.model";
import { songGuesserSelectors } from "./store/song-guesser.selectors";
import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "../components/header/header.component";
import { listenerSelectors } from "../store/listener.selectors";

const { Title, Text } = Typography;

export function SongGuesserPage() {
  const navigate = useNavigate();

  const subscription = useSelector(listenerSelectors.subscription);

  const dispatch = useDispatch()
  const openGuesserRulesModal = () => dispatch(songGuesserActions.openGuesserRulesModal());
  const openGuesserGameModal = (data: OpenGuesserGameModalData) => dispatch(songGuesserActions.openGuesserGameModal(data));
  const openGuesserStatsModal = () => dispatch(songGuesserActions.openGuesserStatsModal());

  useEffect(() => {

  }, [])

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="song-guesser-page listener-group-page">
        <HeaderComponent
          text={''}
          showHeader={false} />
        <div className="song-guesser-page__info">
          <div className="song-guesser-page__title">
            <Title
              className="m-0"
              style={{ fontSize: '64px' }}>
              Song Guesser
            </Title>
            <Button
              onClick={() => openGuesserRulesModal()}
              className="song-guesser-page__check-rules-button">
              Rules
            </Button>
          </div>
          <div className="song-guesser-page__buttons">
            <Button
              size='large'
              onClick={() => openGuesserGameModal({})}
              type="primary">
              Start new Guesser
            </Button>
            <div className="song-guesser-page__stats-buttons">
              <Tooltip title={subscription === 'free' ? 'This feature is not available for free subscription' : ''}>
                <Button
                  className="song-guesser-page__show-history-button"
                  onClick={() => navigate('/song-guesser-history')}
                  disabled={subscription === 'free'}
                  size='large'>
                  Guesser history
                </Button>
              </Tooltip>
              <Tooltip title={subscription === 'free' ? 'This feature is not available for free subscription' : ''}>
                <Button
                  className="song-guesser-page__show-history-button"
                  onClick={() => openGuesserStatsModal()}
                  disabled={subscription === 'free'}
                  size='large'>
                  Guesser stats
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};