import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { artistActions } from './store/artist.actions';
import { useSelector } from 'react-redux';
import { artistSelectors } from './store/artist.selectors';
import { Avatar, Button, Divider, Dropdown, Spin, Tooltip, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { getBackground } from '../../helpers/react/listener-page.helper';
import { useInView } from 'react-intersection-observer';
import { ContentCopyOutlined, Info, MoreHoriz, PersonAddAlt, PersonRemove, PlayArrow, QuizOutlined } from '@mui/icons-material';
import { DOMAIN, listenerProfileTypePalete } from '../../config';
import { MenuProps } from 'antd/lib';
import { GetSongsRequestData } from '../song/store/song.model';
import { SongComponent } from '../song/song.component';
import { queueSelectors } from '../queue/store/queue.selectors';
import { formatSongQueue } from '../../helpers/react/song-player.helper';
import { AlbumCardComponent } from '../album/album-card/album-card.component';
import { albumSelectors } from '../album/store/album.selectors';
import { albumActions } from '../album/store/album.actions';
import { showNotification } from '../../helpers/react/redux.helper';
import { songActions } from '../song/store/song.actions';
import { songSelectors } from '../song/store/song.selectors';
import { GenerateQueueRequestData } from '../queue/store/queue.model';
import { queueActions } from '../queue/store/queue.actions';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { listenerSelectors } from '../store/listener.selectors';
import { songGuesserActions } from '../song-guesser/store/song-guesser.actions';
import { OpenGuesserGameModalData } from '../song-guesser/store/song-guesser.model';

const { Text, Title, Link } = Typography;

export function ArtistPage() {

  const { ref, inView } = useInView({ threshold: 1 });
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();

  const [isCoverImageHovered, setIsCoverImageHovered] = useState<boolean>(false);

  const name = useSelector(artistSelectors.name);
  const profileImageUrl = useSelector(artistSelectors.profileImageUrl);
  const socialLinks = useSelector(artistSelectors.socialLinks);
  const monthlyListeners = useSelector(artistSelectors.monthlyListeners);
  const albums = useSelector(albumSelectors.albums);
  const isAlbumsLoading = useSelector(albumSelectors.isAlbumsLoading);
  const albumsArtistAppearsIn = useSelector(albumSelectors.albumsArtistAppearsIn);
  const isAlbumsArtistAppearsInLoading = useSelector(albumSelectors.isAlbumsArtistAppearsInLoading);
  const isFollowed = useSelector(artistSelectors.isFollowed);
  const backgroundColor = useSelector(artistSelectors.backgroundColor);
  const songs = useSelector(songSelectors.songs);
  const isSongsLoading = useSelector(songSelectors.isSongsLoading);
  const queue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);
  const likedSongsCount = useSelector(artistSelectors.likedSongsCount);
  const fansAlsoLikeArtists = useSelector(artistSelectors.fansAlsoLikeArtists);
  const isFansAlsoLikeArtistsLoading = useSelector(artistSelectors.isFansAlsoLikeArtistsLoading);
  const subscription = useSelector(listenerSelectors.subscription);

  const dispatch = useDispatch()
  const getArtistData = (artistId: string) => dispatch(artistActions.getArtistById(artistId));
  const getAlbumsByArtistId = (artistId: string) => dispatch(albumActions.getAlbumsByArtistId(artistId));
  const getAlbumsWhereArtistAppears = (artistId: string) => dispatch(albumActions.getAlbumsWhereArtistAppears(artistId));
  const followArtist = (artistId: string) => dispatch(artistActions.followArtist(artistId));
  const unfollowArtist = (artistId: string) => dispatch(artistActions.unfollowArtist(artistId));
  const clearSongs = () => dispatch(songActions.clearSongs());
  const getSongs = (request: GetSongsRequestData) => dispatch(songActions.getSongs(request));
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const openDiscoverArtistModal = () => dispatch(artistActions.openDiscoverArtistModal());
  const getFansAlsoLikeArtists = (artistId: string) => dispatch(artistActions.getFansAlsoLikeArtists(artistId));
  const openGuesserGameModal = (data: OpenGuesserGameModalData) => dispatch(songGuesserActions.openGuesserGameModal(data));

  const formatedQueue = useMemo(() => {
    if (songQueueId && queue) {
      return formatSongQueue(songQueueId, queue)
    }
  }, [songQueueId, queue])

  useEffect(() => {
    clearSongs();
    if (artistId) {
      localStorage.setItem('currentSourceId', artistId);
      getArtistData(artistId);
      getAlbumsByArtistId(artistId);
      getAlbumsWhereArtistAppears(artistId);
      getFansAlsoLikeArtists(artistId);
      getSongs({
        options: { artistId: artistId },
        offset: 0,
        limit: 5,
        sortingOptions: { plays: -1 }
      });
    }
  }, [artistId]);

  const copyArtistLink = () => {
    navigator.clipboard.writeText(`${DOMAIN}/artist/${artistId}`);
    showNotification('success', 'Artist link copied to clipboard');
  }

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => isFollowed ? unfollowArtist(artistId!) : followArtist(artistId!)}>
        {isFollowed ?
          <><PersonRemove /><p>Unfollow artist</p></> :
          <><PersonAddAlt /><p>Follow artist</p></>}
      </div>,
      key: '0',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => openDiscoverArtistModal()}>
        <Info /><p>Discover artist</p>
      </div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <Tooltip title={subscription === 'free' ? 'This feature is not available for free subscription' : ''}>
        <div
          className='dropdown-item'
          onClick={() => subscription === 'free' ? {} : openGuesserGameModal({ artist: { name: name!, id: artistId! } })}>
          <QuizOutlined /><p>Start Song Guesser by artist</p>
        </div>
      </Tooltip>,
      key: '2',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => copyArtistLink()}>
        <ContentCopyOutlined /><p>Copy artist link</p>
      </div>,
      key: '3',
    },
  ];

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="artist-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView} />
        <div className='artist-page__info'>
          <div
            className={`artist-page__cover-wrapper ${isCoverImageHovered ? 'cursor-pointer' : ''}`}
            onClick={() => isCoverImageHovered && generateQueue({
              isNewQueue: true,
              shuffleEnabled: false,
              options: {
                artistId
              },
              sortingOptions: {}
            })}
            onMouseEnter={() => setIsCoverImageHovered(!!songs?.length && true)}
            onMouseLeave={() => setIsCoverImageHovered(false)}>
            <Avatar style={{ position: 'absolute' }} size={160} src={profileImageUrl} />
            {isCoverImageHovered && <div className='artist-page__cover-shadow'></div>}
            {isCoverImageHovered && <PlayArrow sx={{ color: listenerProfileTypePalete.base }} className='artist-page__play-button' />}
          </div>
          <div className='artist-page__credits'>
            <Title className='m-0' level={5}>Artist</Title>
            <Title className='mt-0' ref={ref} level={1}>{name}</Title>
            <Title className='m-0' level={5}>{monthlyListeners || 0} monthly listeners</Title>
          </div>
        </div>
        <div className='artist-page__actions-section'>
          <Tooltip title={isFollowed ? `Unfollow artist ${name}` : `Follow artist ${name}`}>
            <div
              className="cursor-pointer"
              onClick={() => isFollowed ? unfollowArtist(artistId!) : followArtist(artistId!)}>
              {isFollowed ?
                <Button className='artist-page__follow-button'>Unfollow</Button> :
                <Button className='artist-page__follow-button'>Follow</Button>}
            </div>
          </Tooltip>
          <Tooltip title={`More options for artist ${name}`}>
            <Dropdown menu={{ items }} trigger={['click']}>
              <MoreHoriz className='cursor-pointer' sx={{ color: 'white' }} />
            </Dropdown>
          </Tooltip>
        </div>
        <Divider className='m-0' />
        <div className='artist-page__content-wrapper'>
          <div className={`artist-page__songs-wrapper ${likedSongsCount ? 'artist-page__songs-wrapper--with-liked-songs' : ''}`}>
            <div>
              {songs?.length ?
                <>
                  <Title level={3}>Popular songs</Title>
                  {isSongsLoading ?
                    <div className='artist-page__loader-wrapper'><Spin /></div> :
                    <>
                      {songs.slice(0, 5).map((song, index) => <SongComponent
                        key={song.songId}
                        song={song}
                        currentlyPlayingSong={formatedQueue?.[0] || {}}
                        showPlaysInfo={true}
                        showAlbumInfo={!likedSongsCount}
                        artistId={artistId}
                        index={index + 1} />
                      )}
                      <Link
                        onClick={() => navigate(`/artist/all-songs/${artistId}`)}
                        style={{ textDecoration: 'none', paddingLeft: '28px' }}>
                        See all songs
                      </Link>
                    </>}
                </> :
                null}
            </div>
            {songs?.length && likedSongsCount ? <div>
              <Title level={3}>Liked songs</Title>
              <div className='artist-page__liked-songs-section'>
                <Avatar size={96} src={profileImageUrl} />
                <div>
                  <Title level={5}>You've liked {likedSongsCount} songs</Title>
                  <Link
                    onClick={() => navigate(`/artist/liked-songs/${artistId}`)}
                    style={{ textDecoration: 'none' }}>
                    See liked songs
                  </Link>
                </div>
              </div>
            </div> : null}
          </div>
          {songs?.length ? <Divider className='m-0' /> : null}
          {albums?.length ? <>
            <Title className='m-0' level={3}>Artist albums</Title>
            <div className='artist-page__albums-wrapper custom-scroll-x'>
              <div className='artist-page__albums'>
                {isAlbumsLoading ?
                  <div className='artist-page__loader-wrapper'><Spin /></div> :
                  albums?.map(album =>
                    <AlbumCardComponent
                      showLikeButton={true}
                      key={album.albumId}
                      album={album} />
                  )}
              </div>
            </div>
          </> : null}
          {albumsArtistAppearsIn?.length ? <>
            <Title level={3}>Appears on</Title>
            <div className='artist-page__albums-wrapper custom-scroll-x'>
              <div className='artist-page__albums'>
                {isAlbumsArtistAppearsInLoading ?
                  <div className='artist-page__loader-wrapper'><Spin /></div> :
                  albumsArtistAppearsIn?.map(album =>
                    <AlbumCardComponent
                      key={album.albumId}
                      showLikeButton={true}
                      showArtistInfo={true}
                      album={album} />
                  )}
              </div>
            </div>
          </> : null}
          {fansAlsoLikeArtists?.length ? <>
            <Title className='m-0' level={3}>Fans also like</Title>
            <div className='artist-page__albums-wrapper custom-scroll-x'>
              <div className='artist-page__albums'>
                {isFansAlsoLikeArtistsLoading ?
                  <div className='artist-page__loader-wrapper'><Spin /></div> :
                  fansAlsoLikeArtists?.map(artist =>
                    <ArtistCardComponent key={artist.artistId} artist={artist} />
                  )}
              </div>
            </div>
          </> : null}
          {socialLinks?.map(socialLink =>
            <Link key={socialLink.link} href={socialLink.link}>{socialLink.name}</Link>
          )}
        </div>
      </div>
    </div >
  );
}
