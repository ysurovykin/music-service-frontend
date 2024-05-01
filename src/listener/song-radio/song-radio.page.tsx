import React, { useEffect, useMemo, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { useSelector } from "react-redux";
import { queueSelectors } from "../queue/store/queue.selectors";
import { useDispatch } from "react-redux";
import { songRadioActions } from "./store/song-radio.actions";
import { songRadioSelectors } from "./store/song-radio.selectors";
import { Avatar, Button, Spin, Typography } from "antd";
import moment from "moment";
import { formatPlaylistTime, getBackground, renderPlaylistIcon } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { SongTableComponent } from "../components/song-table/song-table.component";
import { GenerateQueueRequestData } from "../queue/store/queue.model";
import { queueActions } from "../queue/store/queue.actions";
import { songSelectors } from "../song/store/song.selectors";
import { PlayArrow } from "@mui/icons-material";
import { listenerProfileTypePalete } from "../../config";
import { renderTextWithToolTip, renderTitleWithToolTip } from "../../helpers/react/form.helper";
import { CreateSongRadioRequestData } from "./store/song-radio.model";

const { Title } = Typography;

export function SongRadioPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { songId } = useParams<{ songId: string }>();

  const [isCoverImageHovered, setIsCoverImageHovered] = useState<boolean>(false);

  const backgroundColor = useSelector(songRadioSelectors.backgroundColor);
  const name = useSelector(songRadioSelectors.name);
  const coverImageUrl = useSelector(songRadioSelectors.coverImageUrl);
  const isSongRadioLoading = useSelector(songRadioSelectors.isSongRadioLoading);
  const lastUpdatedAt = useSelector(songRadioSelectors.lastUpdatedAt);
  const songName = useSelector(songRadioSelectors.songName);
  const baseSongId = useSelector(songRadioSelectors.baseSongId);
  const songsTimeDuration = useSelector(songRadioSelectors.songsTimeDuration);
  const songsCount = useSelector(songRadioSelectors.songsCount);
  const songs = useSelector(songSelectors.songs);

  const dispatch = useDispatch()
  const getSongRadio = (songId: string) => dispatch(songRadioActions.getSongRadio(songId));
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const createSongRadio = (request: CreateSongRadioRequestData) => dispatch(songRadioActions.createSongRadio(request));

  useEffect(() => {
    if (songId) {
      localStorage.setItem('currentSourceId', songId);
      getSongRadio(songId);
    }
  }, [songId])

  const refreshSongRadio = () => {
    if (!isSongRadioLoading) {
      createSongRadio({ song: { songId: baseSongId, name: songName }, shouldRefresh: true });
    }
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="song-radio-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView}
          playSongsOptions={{ options: { songRadioBaseSongId: baseSongId } }} />
        <div className='song-radio-page__info'>
          <div
            className={`song-radio-page__cover-wrapper ${isCoverImageHovered ? 'cursor-pointer' : ''}`}
            onClick={() => isCoverImageHovered && generateQueue({
              isNewQueue: true,
              shuffleEnabled: false,
              options: {
                songRadioBaseSongId: baseSongId
              },
              sortingOptions: {}
            })}
            onMouseEnter={() => setIsCoverImageHovered(!!songs?.length && true)}
            onMouseLeave={() => setIsCoverImageHovered(false)}>
            <div className="song-radio-page__avatar-wrapper">
              <div>
                <Avatar
                  style={{ borderRadius: '4px' }}
                  shape='square'
                  size={128}
                  src={coverImageUrl} />
              </div>
              <Title
                className='m-0 song-radio-page__avatar-title'
                level={5}>{songName}</Title>
            </div>
            {isCoverImageHovered && <div className='song-radio-page__cover-shadow'></div>}
            {isCoverImageHovered && <PlayArrow sx={{ color: listenerProfileTypePalete.base }} className='song-radio-page__play-button' />}
          </div>
          <div className='song-radio-page__credits'>
            <Title
              className='m-0'
              level={5}>Song Radio</Title>
            <Title
              className={'mt-0'}
              level={1}
              style={{ width: 'fit-content' }}
              ref={ref}>
              {name}
            </Title>
            <Title
              className='m-0'
              level={5}>
              {songsCount} songs, {formatPlaylistTime(songsTimeDuration!)}, updated {moment(lastUpdatedAt).fromNow()}
            </Title>
            <div className="song-radio-page__refresh-button-wrapper">
              <Button onClick={() => refreshSongRadio()} className="song-radio-page__refresh-button">Refresh radio</Button>
              {renderTitleWithToolTip('', 'This action will generate new song radio repleacing existing and trying to avoid repeating songs from the current version. NOTE: Refreshing song radio counts to your daily song radio generation limit', 4, true)}
            </div>
          </div>
        </div>
        <SongTableComponent songsSourceOptions={{ songRadioBaseSongId: baseSongId }} />
      </div>
    </div>
  );
};