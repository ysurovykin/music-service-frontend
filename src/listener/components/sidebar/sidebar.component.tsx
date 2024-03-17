import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  LibraryMusicOutlined,
  HomeOutlined,
  SearchOutlined,
  PushPin,
  PushPinOutlined
} from "@mui/icons-material";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { PlaylistIconViewComponent } from "../../playlist/playlist-views/playlist-icon-view/playlist-icon-view.component";
import { listenerProfileTypePalete } from "../../../config";

export function SidebarComponent() {

  const playlists = useSelector(playlistSelectors.playlists);

  const dispatch = useDispatch();
  const getPlaylists = () => dispatch(playlistActions.getPlaylistsByListenerId());
  const pinPlaylist = (playlistId: string) => dispatch(playlistActions.pinPlaylist(playlistId));
  const unpinPlaylist = (playlistId: string) => dispatch(playlistActions.unpinPlaylist(playlistId));

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__home-section">
        <Tooltip
          placement="right"
          title='Home'>
          <RouterLink to='/'><HomeOutlined fontSize="large" /></RouterLink>
        </Tooltip>
        <Tooltip
          placement="right"
          title='Search'>
          <RouterLink to='/search'><SearchOutlined fontSize="large" /></RouterLink>
        </Tooltip>
        <Tooltip
          placement="right"
          title='Library'>
          <RouterLink to='/library'><LibraryMusicOutlined fontSize="large" /></RouterLink>
        </Tooltip>
      </div>
      <div className="sidebar__library-section">
        <div className="sidebar__library-pins">
          {playlists?.map(playlist =>
            <Tooltip
              key={playlist.playlistId}
              placement="right"
              title={
                <div className="sidebar__tooltip">
                  {playlist.name}
                  {playlist.pinned ?
                    <Tooltip
                      title='Unpin playlist'>
                      <div
                        className="sidebar__tooltip"
                        onClick={() => unpinPlaylist(playlist.playlistId!)}>
                        <PushPin
                          sx={{ cursor: 'pointer', color: listenerProfileTypePalete.base }} />
                      </div>
                    </Tooltip> :
                    <Tooltip
                      title='Pin playlist'>
                      <div
                        className="sidebar__tooltip"
                        onClick={() => pinPlaylist(playlist.playlistId!)}>
                        <PushPinOutlined
                          sx={{ cursor: 'pointer', color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />
                      </div>
                    </Tooltip>
                  }
                </div>
              }>
              <div className="sidebar__avatar-wrapper">
                {<PlaylistIconViewComponent playlist={playlist} />}
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};