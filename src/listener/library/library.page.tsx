import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { artistSelectors } from "../artist/store/artist.selectors";
import { artistActions } from "../artist/store/artist.actions";
import { albumActions } from "../album/store/album.actions";
import { albumSelectors } from "../album/store/album.selectors";
import { GetArtistsInListenerLibraryRequest } from "../artist/store/artist.model";
import { GetAlbumsInListenerLibraryRequest } from "../album/store/album.model";
import { playlistActions } from "../playlist/store/playlist.actions";
import { playlistSelectors } from "../playlist/store/playlist.selectors";
import { AlbumCardComponent } from "../album/album-card/album-card.component";
import { PlaylistCardComponent } from "../playlist/playlist-views/playlist-card/playlist-card.component";
import { ArtistCardComponent } from "../artist/artist-card/artist-card.component";
import { Link as RouterLink } from "react-router-dom";
import { GetPlaylistsRequest } from "../playlist/store/playlist.model";
import { songRadioSelectors } from "../song-radio/store/song-radio.selectors";
import { songRadioActions } from "../song-radio/store/song-radio.actions";
import { GetListenerSongRadiosRequestData } from "../song-radio/store/song-radio.model";
import { SongRadioCardComponent } from "../song-radio/song-radio-card/song-radio-card.component";

const { Title } = Typography;

export function LibraryPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { ref: albumRef, inView: albumInView } = useInView({ threshold: 0 });
  const { ref: artistRef, inView: artistInView } = useInView({ threshold: 0 });
  const { ref: songRadioRef, inView: songRadioInView } = useInView({ threshold: 1 });

  const [albumOffset, setAlbumOffset] = useState<number>(0);
  const [artistOffset, setArtistOffset] = useState<number>(0);
  const [songRadiosOffset, setSongRadiosOffset] = useState<number>(0);

  const playlists = useSelector(playlistSelectors.playlists);
  const isPlaylistsLoading = useSelector(playlistSelectors.isPlaylistsLoading);
  const followedArtists = useSelector(artistSelectors.followedArtists);
  const isMoreFollowedArtistsForLoading = useSelector(artistSelectors.isMoreFollowedArtistsForLoading);
  const isFollowedArtistsLoading = useSelector(artistSelectors.isFollowedArtistsLoading);
  const isLikedAlbumsLoading = useSelector(albumSelectors.isLikedAlbumsLoading);
  const likedAlbums = useSelector(albumSelectors.likedAlbums);
  const isMoreLikedAlbumsForLoading = useSelector(albumSelectors.isMoreLikedAlbumsForLoading);
  const listenerSongRadios = useSelector(songRadioSelectors.listenerSongRadios);
  const isMoreListenerSongRadiosForLoading = useSelector(songRadioSelectors.isMoreListenerSongRadiosForLoading);
  const isListenerSongRadiosLoading = useSelector(songRadioSelectors.isListenerSongRadiosLoading);

  const dispatch = useDispatch()
  const getPlaylistsByListenerId = (request: GetPlaylistsRequest) => dispatch(playlistActions.getPlaylistsByListenerId(request));
  const getArtistsInListenerLibrary = (request: GetArtistsInListenerLibraryRequest) => dispatch(artistActions.getArtistsInListenerLibrary(request));
  const getAlbumsInListenerLibrary = (request: GetAlbumsInListenerLibraryRequest) => dispatch(albumActions.getAlbumsInListenerLibrary(request));
  const loadMoreArtistsInListenerLibrary = (request: GetArtistsInListenerLibraryRequest) => dispatch(artistActions.loadMoreArtistsInListenerLibrary(request));
  const loadMoreAlbumsInListenerLibrary = (request: GetAlbumsInListenerLibraryRequest) => dispatch(albumActions.loadMoreAlbumsInListenerLibrary(request));
  const getListenerSongRadios = (request: GetListenerSongRadiosRequestData) =>
    dispatch(songRadioActions.getListenerSongRadios(request));
  const loadMoreListenerSongRadios = (request: GetListenerSongRadiosRequestData) =>
    dispatch(songRadioActions.loadMoreListenerSongRadios(request));

  const handleLoadMoreAlbums = async () => {
    if (!isLikedAlbumsLoading && (typeof isMoreLikedAlbumsForLoading === 'undefined' || isMoreLikedAlbumsForLoading)) {
      loadMoreAlbumsInListenerLibrary({
        offset: albumOffset,
        limit: 10
      });
      setAlbumOffset(state => state + 1);
    }
  };

  const handleLoadMoreArtists = async () => {
    if (!isFollowedArtistsLoading && (typeof isMoreFollowedArtistsForLoading === 'undefined' || isMoreFollowedArtistsForLoading)) {
      loadMoreArtistsInListenerLibrary({
        offset: artistOffset,
        limit: 10
      });
      setArtistOffset(state => state + 1);
    }
  };

  const handleLoadMoreListenerSongRadios = async () => {
    if (!isListenerSongRadiosLoading && (typeof isMoreListenerSongRadiosForLoading === 'undefined' || isMoreListenerSongRadiosForLoading)) {
      loadMoreListenerSongRadios({
        offset: songRadiosOffset,
        limit: 10
      });
      setSongRadiosOffset(state => state + 1);
    }
  };

  useEffect(() => {
    getArtistsInListenerLibrary({
      limit: 10,
      offset: 0
    });
    setArtistOffset(1);

    getAlbumsInListenerLibrary({
      limit: 10,
      offset: 0
    });
    setAlbumOffset(1);

    getListenerSongRadios({
      limit: 10,
      offset: 0
    });
    setSongRadiosOffset(1);

    getPlaylistsByListenerId({});
  }, [])

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

  useEffect(() => {
    if (songRadioInView) {
      handleLoadMoreListenerSongRadios();
    }
  }, [songRadioInView]);

  return (
    <div className='user-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-page user-group-page">
        <HeaderComponent text="Your Library" showHeader={!inView} />
        <div className="library-page-wrapper">
          <Title ref={ref} className="mt-0" level={1}>Your Library</Title>
          {playlists?.length ?
            <> <div className='library-page__title'>
              <Title className='m-0' level={3}>Playlists</Title>
              <Title className='m-0' level={4}><RouterLink to={'/library/playlists'}>Show all</RouterLink></Title>
            </div>
              <div className='library-page__content-wrapper custom-scroll-x'>
                <div className="library-page__content">
                  {isPlaylistsLoading ?
                    <div className='library-page__loader-wrapper'><Spin /></div> :
                    playlists?.map(playlist =>
                      <PlaylistCardComponent
                        playlist={playlist}
                        key={playlist.playlistId} />
                    )}
                </div>
              </div>
            </> :
            null
          }
          {followedArtists?.length ?
            <>
              <div className='library-page__title'>
                <Title className='m-0' level={3}>Artists</Title>
                <Title className='m-0' level={4}><RouterLink to={'/library/artists'}>Show all</RouterLink></Title>
              </div>
              <div className='library-page__content-wrapper custom-scroll-x'>
                <div className="library-page__content">
                  {isFollowedArtistsLoading && !followedArtists?.length ?
                    <div className='library-page__loader-wrapper'><Spin /></div> :
                    followedArtists?.map((artist, index) =>
                      <ArtistCardComponent
                        artist={artist}
                        key={artist.artistId}
                        reference={((index === followedArtists?.length && isMoreFollowedArtistsForLoading)) ? artistRef : null} />
                    )}
                </div>
              </div>
            </> :
            null
          }
          {likedAlbums?.length ?
            <>
              <div className='library-page__title'>
                <Title className='m-0' level={3}>Albums</Title>
                <Title className='m-0' level={4}><RouterLink to={'/library/albums'}>Show all</RouterLink></Title>
              </div>
              <div className='library-page__content-wrapper custom-scroll-x'>
                <div className="library-page__content">
                  {isLikedAlbumsLoading && !likedAlbums?.length ?
                    <div className='library-page__loader-wrapper'><Spin /></div> :
                    likedAlbums?.map((album, index) =>
                      <AlbumCardComponent
                        showLikeButton={false}
                        showArtistInfo={true}
                        key={album.albumId}
                        album={album}
                        reference={((index === likedAlbums?.length - 1) && isMoreLikedAlbumsForLoading) ? albumRef : null} />
                    )}
                </div>
              </div>
            </> :
            null
          }
          {listenerSongRadios?.length ?
            <>
              <div className='library-page__title'>
                <Title className='m-0' level={3}>Song Radios</Title>
                <Title className='m-0' level={4}><RouterLink to={'/library/song-radios'}>Show all</RouterLink></Title>
              </div>
              <div className='library-page__content-wrapper custom-scroll-x'>
                <div className="library-page__content">
                  {isListenerSongRadiosLoading && !listenerSongRadios?.length ?
                    <div className='library-page__loader-wrapper'><Spin /></div> :
                    listenerSongRadios?.map((songRadio, index) =>
                      <SongRadioCardComponent
                        songRadio={songRadio}
                        key={'song-radio' + songRadio.baseSongId}
                        reference={((index === listenerSongRadios?.length && isMoreListenerSongRadiosForLoading)) ? songRadioRef : null} />
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