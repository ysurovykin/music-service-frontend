import React, { useEffect } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { PlaylistCardComponent } from "../../playlist/playlist-views/playlist-card/playlist-card.component";
const { Title } = Typography;

export function LibraryPlaylistsPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const playlists = useSelector(playlistSelectors.playlists);
  const isPlaylistsLoading = useSelector(playlistSelectors.isPlaylistsLoading);

  const dispatch = useDispatch()
  const getPlaylistsByListenerId = () => dispatch(playlistActions.getPlaylistsByListenerId());

  useEffect(() => {
    getPlaylistsByListenerId();
  }, [])

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-playlists-page listener-group-page">
        <HeaderComponent text="Your Playlists" showHeader={!inView} />
        <div className="library-playlists-page-wrapper">
          <Title ref={ref} className="mt-0" level={1}>Your Playlists</Title>
          <div className="library-playlists-page__content">
            {isPlaylistsLoading ?
              <div className='library-playlists-page__loader-wrapper'><Spin /></div> :
              playlists?.map(playlist =>
                <PlaylistCardComponent
                  playlist={playlist}
                  key={playlist.playlistId} />
              )}
          </div>
        </div>
      </div>
    </div >
  );
};