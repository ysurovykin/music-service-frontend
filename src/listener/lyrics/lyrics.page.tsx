import React, { useEffect, useMemo, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { useSelector } from "react-redux";
import { queueSelectors } from "../queue/store/queue.selectors";
import { useDispatch } from "react-redux";
import { lyricsActions } from "./store/lyrics.actions";
import { lyricsSelectors } from "./store/lyrics.selectors";
import { Spin, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

export function LyricsPage() {
  const [currentTime, setCurrentTime] = useState<string>(localStorage.getItem('playTime') || '0');

  const lyrics = useSelector(lyricsSelectors.lyrics);
  const synchronized = useSelector(lyricsSelectors.synchronized);
  const isLyricsLoading = useSelector(lyricsSelectors.isLyricsLoading);
  const songsQueue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);

  const dispatch = useDispatch()
  const getSongLyrics = (songId: string) => dispatch(lyricsActions.getSongLyrics(songId));

  const currentlyPlayingSong = useMemo(() => {
    return songsQueue?.find(song => song.songQueueId === songQueueId);
  }, [songQueueId, songsQueue]);

  useEffect(() => {
    const setCurrentTimeEventListener = (e: CustomEvent) => setCurrentTime(e.detail.playTime);
    if (currentlyPlayingSong) {
      getSongLyrics(currentlyPlayingSong.songId!);
      window.addEventListener('SERVICE_EVENT.PLAY_TIME_CHANGED', (setCurrentTimeEventListener) as EventListener);
    }
    return () => {
      window.removeEventListener('SERVICE_EVENT.PLAY_TIME_CHANGED', (setCurrentTimeEventListener) as EventListener);
    }
  }, [currentlyPlayingSong])

  const getSynchronizedTextClassName = (textStartTime: string, textEndTime: string) => {
    const currentTimeFormated = moment.duration(+currentTime, "seconds").asMilliseconds() || 0;
    const textStartTimeSplited = textStartTime.split(':');
    const textStartTimeFormated = moment.duration(textStartTimeSplited[0], "hours")
      .add(textStartTimeSplited[1], "minutes")
      .add(textStartTimeSplited[2], "seconds")
      .asMilliseconds();
    const textEndTimeSplited = textEndTime.split(':');
    const textEndTimeFormated = moment.duration(textEndTimeSplited[0], "hours")
      .add(textEndTimeSplited[1], "minutes")
      .add(textEndTimeSplited[2], "seconds")
      .asMilliseconds();
    if (currentTimeFormated < textStartTimeFormated) {
      return 'lyrics-page__text--inactive';
    } else if (currentTimeFormated > textEndTimeFormated) {
      return 'lyrics-page__text--passed';
    } else if (currentTimeFormated > textStartTimeFormated && currentTimeFormated < textEndTimeFormated) {
      return 'lyrics-page__text--active';
    }
  }

  const getPhraseStartTime = (textStartTime: string) => {
    const textStartTimeSplited = textStartTime.split(':');
    const seconds = moment.duration(textStartTimeSplited[0], "hours")
      .add(textStartTimeSplited[1], "minutes")
      .add(textStartTimeSplited[2], "seconds")
      .asSeconds();
    return seconds;
  }

  const renderLyrics = () => {
    if (!lyrics?.length) {
      return <Title style={{ textAlign: 'center' }}>
        Sorry, the lyrics for this song are not available yet
      </Title>
    }
    if (!synchronized) {
      return lyrics.map(phrase =>
        <Title className='lyrics-page__text lyrics-page__text--inactive'>
          {phrase.text}
        </Title>
      );
    } else {
      return lyrics.map(phrase =>
        <Title
          onClick={() => dispatchEvent(new CustomEvent('SERVICE_EVENT.SONG_TEXT_PLAY_TIME_CHANGED', {
            detail: {
              playTime: getPhraseStartTime(phrase.start!)
            }
          }))}
          className={`lyrics-page__text lyrics-page__text--synchronized ${getSynchronizedTextClassName(phrase.start!, phrase.end!)}`}>
          {phrase.text}
        </Title >
      );
    }
  }

  return (
    <div className='user-group-page__wrapper'>
      <div
        className="user-group-page__wrapper custom-scroll-y"
        style={{ background: currentlyPlayingSong?.backgroundColor }} >
        <div
          className="lyrics-page user-group-page"
          style={currentlyPlayingSong?.lyricsBackgroundShadow ? { background: currentlyPlayingSong.lyricsBackgroundShadow } : {}}>
          <HeaderComponent showHeader={false} />
          <div className="lyrics-page__content">
            {isLyricsLoading ?
              <div className='lyrics-page__loader-wrapper'><Spin /></div> :
              <div>
                {renderLyrics()}
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
};