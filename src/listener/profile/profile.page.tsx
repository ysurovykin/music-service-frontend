import React, { useEffect, useMemo, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { listenerActions } from "../store/listener.actions";
import { listenerSelectors } from "../store/listener.selectors";
import { listenerProfileTypePalete } from "../../config";
import { Avatar, Button, Divider, Spin, Typography } from "antd";
import { songSelectors } from "../song/store/song.selectors";
import { SongComponent } from "../song/song.component";
import { queueSelectors } from "../queue/store/queue.selectors";
import { formatSongQueue } from "../../helpers/react/song-player.helper";
import { userSelectors } from "../../user/store/user.selectors";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { songActions } from "../song/store/song.actions";
import { GetSongsRequestData } from "../song/store/song.model";
import { albumSelectors } from "../album/store/album.selectors";
import { artistSelectors } from "../artist/store/artist.selectors";
import { ArtistCardComponent } from "../artist/artist-card/artist-card.component";
import { AlbumCardComponent } from "../album/album-card/album-card.component";
import { artistActions } from "../artist/store/artist.actions";
import { albumActions } from "../album/store/album.actions";
import { GetListenerTopArtistsThisMonthRequest } from "../artist/store/artist.model";
import { GetListenerTopAlbumsThisMonthRequest } from "../album/store/album.model";

const { Title, Link } = Typography;

export function ProfilePage() {
  const { ref, inView } = useInView({ threshold: 1 }); //TODO set ref to show header
  const { ref: albumRef, inView: albumInView } = useInView({ threshold: 0 });
  const { ref: artistRef, inView: artistInView } = useInView({ threshold: 0 });
  const navigate = useNavigate();

  const [albumOffset, setAlbumOffset] = useState<number>(0);
  const [artistOffset, setArtistOffset] = useState<number>(0);

  const name = useSelector(listenerSelectors.name);
  const subscription = useSelector(listenerSelectors.subscription);
  const subscriptionCanceledAtDate = useSelector(listenerSelectors.subscriptionCanceledAtDate);
  const profileImageUrl = useSelector(listenerSelectors.profileImageUrl);
  const backgroundColor = useSelector(listenerSelectors.backgroundColor);
  const playlistCount = useSelector(listenerSelectors.playlistCount);
  const followedArtistsCount = useSelector(listenerSelectors.followedArtistsCount);
  const likedAlbumsCount = useSelector(listenerSelectors.likedAlbumsCount);
  const topAlbumsThisMonth = useSelector(albumSelectors.topAlbumsThisMonth);
  const isTopAlbumsThisMonthLoading = useSelector(albumSelectors.isTopAlbumsThisMonthLoading);
  const isMoreTopAlbumsThisMonthForLoading = useSelector(albumSelectors.isMoreTopAlbumsThisMonthForLoading);
  const topArtistsThisMonth = useSelector(artistSelectors.topArtistsThisMonth);
  const isTopArtistsThisMonthLoading = useSelector(artistSelectors.isTopArtistsThisMonthLoading);
  const isMoreTopArtistsThisMonthForLoading = useSelector(artistSelectors.isMoreTopArtistsThisMonthForLoading);
  const userId = useSelector(userSelectors.userId);
  const songs = useSelector(songSelectors.songs);
  const isSongsLoading = useSelector(songSelectors.isSongsLoading);
  const queue = useSelector(queueSelectors.queue);
  const songQueueId = useSelector(queueSelectors.songQueueId);

  const formatedQueue = useMemo(() => {
    if (songQueueId && queue) {
      return formatSongQueue(songQueueId, queue)
    }
  }, [songQueueId, queue])

  const formatedSubscription = useMemo(() => {
    if (!subscriptionCanceledAtDate) {
      return subscription;
    } else {
      return `${subscription} until ${subscriptionCanceledAtDate}`;
    }
  }, [subscriptionCanceledAtDate, subscription]);

  const dispatch = useDispatch()
  const openEditProfileModal = () => dispatch(listenerActions.openEditProfileModal());
  const getAccountContentCount = () => dispatch(listenerActions.getAccountContentCount());
  const getSongs = (request: GetSongsRequestData) => dispatch(songActions.getSongs(request));
  const getListenerTopArtistsThisMonth = (request: GetListenerTopArtistsThisMonthRequest) => dispatch(artistActions.getListenerTopArtistsThisMonth(request));
  const getListenerTopAlbumsThisMonth = (request: GetListenerTopAlbumsThisMonthRequest) => dispatch(albumActions.getListenerTopAlbumsThisMonth(request));
  const loadMoreListenerTopArtistsThisMonth = (request: GetListenerTopArtistsThisMonthRequest) => dispatch(artistActions.loadMoreListenerTopArtistsThisMonth(request));
  const loadMoreListenerTopAlbumsThisMonth = (request: GetListenerTopAlbumsThisMonthRequest) => dispatch(albumActions.loadMoreListenerTopAlbumsThisMonth(request));
  const openChangeSubscriptionModal = () => dispatch(listenerActions.openChangeSubscriptionModal());

  useEffect(() => {
    if (userId) {
      localStorage.setItem('currentSourceId', userId);
      getAccountContentCount();
      getListenerTopArtistsThisMonth({
        limit: 10,
        offset: 0
      });
      setArtistOffset(1);

      getListenerTopAlbumsThisMonth({
        limit: 10,
        offset: 0
      });
      setAlbumOffset(1);

      getSongs({
        options: { listenerId: userId },
        offset: 0,
        limit: 5
      });
    }
  }, [userId])


  const handleLoadMoreAlbums = async () => {
    if (!isTopAlbumsThisMonthLoading && (typeof isMoreTopAlbumsThisMonthForLoading === 'undefined' || isMoreTopAlbumsThisMonthForLoading)) {
      loadMoreListenerTopAlbumsThisMonth({
        offset: albumOffset,
        limit: 10
      });
      setAlbumOffset(state => state + 1);
    }
  };

  const handleLoadMoreArtists = async () => {
    if (!isTopArtistsThisMonthLoading && (typeof isMoreTopArtistsThisMonthForLoading === 'undefined' || isMoreTopArtistsThisMonthForLoading)) {
      loadMoreListenerTopArtistsThisMonth({
        offset: artistOffset,
        limit: 10
      });
      setArtistOffset(state => state + 1);
    }
  };
  useEffect(() => {
    if (albumInView) {
      handleLoadMoreAlbums();
    }
  }, [albumInView]);

  useEffect(() => {
    if (artistInView) {
      handleLoadMoreArtists();
    }
  }, [artistInView]);

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor || 'rgb(17, 102, 11)') }} className="profile-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor || 'rgb(17, 102, 11)'}
          showHeader={!inView} />
        <div className='profile-page__info'>
          <div
            className={'profile-page__cover-wrapper'}>
            {profileImageUrl ?
              <Avatar size={160} shape="circle" src={profileImageUrl} /> :
              <Avatar size={160} shape='circle' style={{
                backgroundColor: listenerProfileTypePalete.base,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Title level={1} className="m-0">{name?.split('')[0]?.toUpperCase()}</Title>
              </Avatar>}
          </div>
          <div className='profile-page__credits'>
            <Title
              className='m-0'
              level={5}>Listener profile</Title>
            <Title
              className={'mt-0 cursor-pointer'}
              level={1}
              style={{ width: 'fit-content' }}
              ref={ref}
              onClick={() => openEditProfileModal()}>
              {name}
            </Title>
            <Title
              className='m-0'
              level={5}>
              {playlistCount} <Link onClick={() => navigate('/library/playlists')}>playlists</Link>, {followedArtistsCount} <Link onClick={() => navigate('/library/artists')}>followed artists</Link>, {likedAlbumsCount} <Link onClick={() => navigate('/library/albums')}>liked albums</Link>
            </Title>
            <div className="profile-page__subscription-section">
              <Title
                className='m-0'
                level={5}>
                Current subscription: {formatedSubscription}
              </Title>
              {subscriptionCanceledAtDate ?
                <></> :
                <Button
                  className="profile-page__change-subscription-button"
                  onClick={() => openChangeSubscriptionModal()}>
                  Change
                </Button>}
            </div>
          </div>
        </div>
        <Divider className='m-0' />
        <div className="profile-page__top-content">
          <div className='profile-page__content-wrapper'>
            {songs?.length ?
              <>
                <Title level={3}>Top songs this month</Title>
                {isSongsLoading ?
                  <div className='profile-page__loader-wrapper'><Spin /></div> :
                  <>
                    {songs.slice(0, 5).map((song, index) => <SongComponent
                      key={song.songId}
                      song={song}
                      currentlyPlayingSong={formatedQueue?.[0] || {}}
                      showAlbumInfo={true}
                      listenerId={userId}
                      index={index + 1} />
                    )}
                    <Link
                      onClick={() => navigate('/profile/top-songs')}
                      style={{ textDecoration: 'none', paddingLeft: '28px' }}>
                      See all songs
                    </Link>
                  </>}
              </> :
              null}
          </div>
          {topArtistsThisMonth?.length ?
            <>
              <div className='profile-page__title'>
                <Title className='m-0' level={3}>Top artists this month</Title>
                <Title className='m-0' level={4}><RouterLink to={'/profile/top-artists'}>Show all</RouterLink></Title>
              </div>
              <div className='profile-page__content-wrapper custom-scroll-x'>
                <div className="profile-page__content">
                  {isTopArtistsThisMonthLoading && !topArtistsThisMonth?.length ?
                    <div className='profile-page__loader-wrapper'><Spin /></div> :
                    topArtistsThisMonth?.map((artist, index) =>
                      <ArtistCardComponent
                        artist={artist}
                        key={artist.artistId}
                        reference={((index === topArtistsThisMonth?.length && isMoreTopArtistsThisMonthForLoading)) ? artistRef : null} />
                    )}
                </div>
              </div>
            </> :
            null
          }
          {topAlbumsThisMonth?.length ?
            <>
              <div className='profile-page__title'>
                <Title className='m-0' level={3}>Top albums this month</Title>
                <Title className='m-0' level={4}><RouterLink to={'/profile/top-albums'}>Show all</RouterLink></Title>
              </div>
              <div className='profile-page__content-wrapper custom-scroll-x'>
                <div className="profile-page__content">
                  {isTopAlbumsThisMonthLoading && !topAlbumsThisMonth?.length ?
                    <div className='profile-page__loader-wrapper'><Spin /></div> :
                    topAlbumsThisMonth?.map((album, index) =>
                      <AlbumCardComponent
                        showLikeButton={false}
                        showArtistInfo={true}
                        key={album.albumId}
                        album={album}
                        reference={((index === topAlbumsThisMonth?.length - 1) && isMoreTopAlbumsThisMonthForLoading) ? albumRef : null} />
                    )}
                </div>
              </div>
            </> :
            null
          }
        </div>
      </div>
    </div >
  );
};