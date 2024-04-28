import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Divider, Modal, Typography } from "antd";
import { songGuesserSelectors } from "../store/song-guesser.selectors";
import { songGuesserActions } from "../store/song-guesser.actions";

const { Title, Text } = Typography;

export function SongGuesserRulesModal() {
  const isGuesserRulesModalOpen = useSelector(songGuesserSelectors.isGuesserRulesModalOpen);

  const dispatch = useDispatch()
  const closeGuesserRulesModal = () => dispatch(songGuesserActions.closeGuesserRulesModal());

  return (
    <Modal
      title='Song Guesser Rules'
      open={isGuesserRulesModalOpen}
      onCancel={() => closeGuesserRulesModal()}
      width={600}
      style={{ maxHeight: 500 }}
      footer={[
        <Button
          type="primary"
          key="ok"
          onClick={() => closeGuesserRulesModal()}>
          OK
        </Button>
      ]}>
      <div className="custom-scroll-y">
        <div className="song-guesser-rules-modal__sections">
          <div>
            <Title className="song-guesser-rules-modal__title" level={3}>1. Start Game</Title>
            <ul className="song-guesser-rules-modal__ul">
              <li className="song-guesser-rules-modal__li">
                <Title className="song-guesser-rules-modal__title m-0" level={5}>Choose filters</Title>
              </li>
              <ul className="song-guesser-rules-modal__ul">
                <li className="song-guesser-rules-modal__li">
                  <Text>Select one of provided difficulties</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>Choose optional filters for songs</Text>
                </li>
              </ul>
              <li className="song-guesser-rules-modal__li">
                <Title className="song-guesser-rules-modal__title m-0" level={5}>Check available songs amount placed on start Guesser button</Title>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Title className="song-guesser-rules-modal__title m-0" level={5}>Start the game by pressing start Guesser button</Title>
              </li>
            </ul>
          </div>
          <div>
            <Title className="song-guesser-rules-modal__title" level={3}>2. Difficulties</Title>
            <ul className="song-guesser-rules-modal__ul">
              <li className="song-guesser-rules-modal__li">
                <Text>The difference between the difficulties is only in the length of the audio for guessing</Text>
              </li>
              <ul className="song-guesser-rules-modal__ul">
                <li className="song-guesser-rules-modal__li">
                  <Text>New To Music: random 15 seconds of the song to guess</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>Frequent Listener: random 10 seconds of the song to guess</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>True Fan: random 5 seconds of the song to guess</Text>
                </li>
              </ul>
            </ul>
          </div>
          <div>
            <Title className="song-guesser-rules-modal__title" level={3}>3. Game proccess</Title>
            <ul className="song-guesser-rules-modal__ul">
              <li className="song-guesser-rules-modal__li">
                <Text>You will receive a random part of a random song with a duration according to the selected difficulty</Text>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Text>Your task is to guess the exact name of the artist and the title of the song</Text>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Text>If you do not know the song, you can skip it by pressing the corresponding button. Skip counts as a mistake (unless you have already made a mistake on the same guesser)</Text>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Text>For every wrong guess, your mistakes counter will increase</Text>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Text>If your guess was close enough, but not 100% accurate <span style={{ textDecoration: 'underline' }}>(not sensitive to letter case)</span>, the first such guess will not be counted as an mistake and the program will show you inaccuracies</Text>
              </li>
            </ul>
          </div>
          <div>
            <Title className="song-guesser-rules-modal__title" level={3}>4. Close guesses</Title>
            <ul className="song-guesser-rules-modal__ul">
              <li className="song-guesser-rules-modal__li">
                <Text>Green color means the letter is in the right place</Text>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Text>Yellow color means that the required letter is indicated with an error of 1 character</Text>
              </li>
              <li className="song-guesser-rules-modal__li">
                <Text>Red color means the letter is incorrect</Text>
              </li>
            </ul>
          </div>
          <div>
            <Title className="song-guesser-rules-modal__title" level={3}>5. Game over</Title>
            <ul className="song-guesser-rules-modal__ul">
              <li className="song-guesser-rules-modal__li">
                <Text>The game ends in two cases</Text>
              </li>
              <ul className="song-guesser-rules-modal__ul">
                <li className="song-guesser-rules-modal__li">
                  <Text>Player reached the limit of 3 mistakes</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>All songs using the specified filters were played</Text>
                </li>
              </ul>
              <li className="song-guesser-rules-modal__li">
                <Text>As a result of completing the game, the player will receive results including:</Text>
              </li>
              <ul className="song-guesser-rules-modal__ul">
                <li className="song-guesser-rules-modal__li">
                  <Text>Amount of correct answers</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>Amount of close answers</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>Amount of incorrect answers</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>Amount of skipped answers</Text>
                </li>
                <li className="song-guesser-rules-modal__li">
                  <Text>Amount of time spent on the game</Text>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};