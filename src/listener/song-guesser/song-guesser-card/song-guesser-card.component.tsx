import React, { useMemo } from "react";
import { Avatar, Button, Tooltip, Typography } from "antd";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Close, Favorite, FavoriteBorder } from "@mui/icons-material";
import { FinishedSongGuesserInfoResponseData } from "../store/song-guesser.model";
import moment from "moment";
import { listenerProfileTypePalete, songGenres, songGuesserDifficulties, songLanguages } from "../../../config";
import { useSelect } from "@mui/base";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { useSelector } from "react-redux";
import { formatedSecondsTime } from "../../../helpers/react/song-guesser.helper";

const { Text, Title, Link } = Typography;

export function SongGuesserCardComponent({
  songGuesser,
  reference,
}: {
  songGuesser: FinishedSongGuesserInfoResponseData;
  reference?: ((node?: Element | null | undefined) => void) | null;
}) {
  const navigate = useNavigate();

  const playlists = useSelector(playlistSelectors.playlists);

  return (
    <div
      className="song-guesser-card"
      ref={reference}>
      <div className="song-guesser-card__title">
        <div
          className="song-guesser-card__difficulty"
          style={{ background: songGuesserDifficulties[songGuesser.difficulty].color }}>
          <Title
            className="m-0"
            level={5}>
            {songGuesserDifficulties[songGuesser.difficulty].label}
          </Title>
        </div>
      </div>
      <div>
        <div>
          <Title className="m-0" level={2}>
            Score:
            <Tooltip title='Correct answers'>
              <span style={{ color: listenerProfileTypePalete.base }}> {songGuesser?.correctAnswers || 0} </span>
            </Tooltip>
            /
            <Tooltip title='Incorrect answers'>
              <span style={{ color: '#cc2d2d' }}> {songGuesser?.mistakes || 0} </span>
            </Tooltip>
            /
            <Tooltip title='Close answers'>
              <span style={{ color: '#c4cc2d' }}> {songGuesser?.closeAnswers || 0} </span>
            </Tooltip>
            /
            <Tooltip title='Skipped answers'>
              <span style={{ color: '#ff7875' }}> {songGuesser?.skippedAnswers || 0}</span>
            </Tooltip>
          </Title>
        </div>
        <div>
          <Title level={2}>Time spent: {formatedSecondsTime(songGuesser?.timeSpentInSeconds)}</Title>
        </div>
        <div className="song-guesser-card__filters-wrapper">
          <div className="song-guesser-card__filter">
            Languages: {songGuesser?.filter?.languages?.length ?
              songGuesser?.filter?.languages?.map(language => <span
                className="song-guesser-card__filter-item"
                key={language}
                style={{ background: songLanguages[language]?.color }}>
                {songLanguages[language].label}
              </span>) :
              'any'}
          </div>
          <div className="song-guesser-card__filter">
            Genres: {songGuesser?.filter?.genres?.length ?
              songGuesser?.filter?.genres?.map(genre => <span
                className="song-guesser-card__filter-item"
                key={genre}
                style={{ background: songGenres[genre]?.color }}>
                {songGenres[genre].label}
              </span>) :
              'any'}
          </div>
          <div className="song-guesser-card__filter">
            Playlists: {songGuesser?.filter?.playlists?.length ?
              songGuesser?.filter?.playlists?.map(playlist => <span
                className="song-guesser-card__filter-item"
                key={playlist.id}
                style={{ background: playlists?.find(curPlaylist => curPlaylist.playlistId === playlist.id)?.backgroundColor }}>
                {playlist.name}
              </span>) :
              'any'}
          </div>
          <div className="song-guesser-card__filter">
            Artist: {songGuesser?.filter?.fromFollowedArtists ?
              'only followed' :
              songGuesser?.filter?.artist ?
                <Text>
                  <RouterLink to={`/artist/${songGuesser?.filter?.artist?.id}`}>{songGuesser?.filter?.artist?.name}</RouterLink>
                </Text> :
                'any'}
          </div>
          <div className="song-guesser-card__filter">
            Album: {songGuesser?.filter?.fromLikedAlbums ?
              'only liked' :
              songGuesser?.filter?.album ?
                <Text>
                  <RouterLink to={`/album/${songGuesser?.filter?.album?.id}`}>{songGuesser?.filter?.album?.name}</RouterLink>
                </Text> :
                'any'}
          </div>
        </div>
      </div>
      <div className="song-guesser-card__footer">
        <Button
          onClick={() => navigate(`/finished-song-guesser/${songGuesser?.songGuesserId}`)}
          type="primary">
          See details
        </Button>
        <Title className="m-0" level={5}>{moment(songGuesser.finishedAt).format('yyyy/M/D')}</Title>
      </div>
    </div>
  );
}