import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { artistActions } from '../store/artist.actions';
import { useSelector } from 'react-redux';
import { artistSelectors } from '../store/artist.selectors';
import { Switch, Typography } from 'antd';
import { HeaderComponent } from '../../components/header/header.component';
import { formatPlaylistTime, getBackground, renderPlaylistIcon } from '../../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../../components/song-table/song-table.component';
import { useInView } from 'react-intersection-observer';
import { GenerateQueueRequestData } from '../../queue/store/queue.model';
import { queueActions } from '../../queue/store/queue.actions';
import { PlayArrow } from '@mui/icons-material';
import { listenerProfileTypePalete } from '../../../config';

const { Title, Text } = Typography;

export function ArtistLikedSongsPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { artistId } = useParams<{ artistId: string }>();

  const [isCoverImageHovered, setIsCoverImageHovered] = useState<boolean>(false);

  const name = useSelector(artistSelectors.name);
  const profileImageUrl = useSelector(artistSelectors.profileImageUrl);
  const backgroundColor = useSelector(artistSelectors.backgroundColor);
  const likedSongsCount = useSelector(artistSelectors.likedSongsCount);
  const likedSongsTimeDuration = useSelector(artistSelectors.likedSongsTimeDuration);

  const dispatch = useDispatch()
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const getArtistData = (artistId: string) => dispatch(artistActions.getArtistById(artistId));

  useEffect(() => {
    if (artistId) {
      localStorage.setItem('currentSourceId', artistId);
      getArtistData(artistId);
    }
  }, [artistId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="artist-songs-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          showHeader={!inView}
          background={backgroundColor}
          playSongsOptions={{ options: { artistId }, sortingOptions: { plays: -1 }, onlyLiked: true }} />
        <div className='artist-songs-page__info'>
          <div
            className='artist-songs-page__cover-wrapper cursor-pointer'
            onClick={() => generateQueue({
              isNewQueue: true,
              shuffleEnabled: false,
              onlyLiked: true,
              options: {
                artistId
              },
              sortingOptions: { plays: -1 }
            })}
            onMouseEnter={() => setIsCoverImageHovered(true)}
            onMouseLeave={() => setIsCoverImageHovered(false)}>
            {renderPlaylistIcon(160, 'absolute', profileImageUrl, undefined, backgroundColor, name)}
            {isCoverImageHovered && <div className='artist-songs-page__cover-shadow'></div>}
            {isCoverImageHovered && <PlayArrow sx={{ color: listenerProfileTypePalete.base }} className='artist-songs-page__play-button' />}
          </div>
          <div className='artist-songs-page__credits'>
            <Title className='m-0' level={5}>Liked artist songs</Title>
            <Title className='mt-0' ref={ref} level={1}>{name}</Title>
            <div className='artist-songs-page__info-section'>
              <Title className='m-0' level={5}>
                <RouterLink to={`/artist/${artistId}`}>{name}</RouterLink>, {likedSongsCount} songs, {formatPlaylistTime(likedSongsTimeDuration!)}
              </Title>
            </div>
          </div>
        </div>
        <SongTableComponent onlyLiked={true} sortingOptions={{ plays: -1 }} songsSourceOptions={{ artistId }} />
      </div>
    </div>
  );
}
