import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  LibraryMusicOutlined,
  HomeOutlined,
  SearchOutlined
} from "@mui/icons-material";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { userSelectors } from "../../../user/store/user.selectors";
import { PlaylistIconViewComponent } from "../../playlist/playlist-views/playlist-icon-view/playlist-icon-view.component";

export function SidebarComponent() {

  const playlists = useSelector(playlistSelectors.playlists);
  const userId = useSelector(userSelectors.userId);

  const dispatch = useDispatch();
  const getPlaylists = (userId: string) => dispatch(playlistActions.getPlaylistsByListenerId(userId));

  useEffect(() => {
    if (userId) {
      getPlaylists(userId);
    }
  }, [userId]);

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
          {playlists?.map(playlist => <Tooltip
            key={playlist.playlistId}
            placement="right"
            title={playlist.name}>
            <div className="sidebar__avatar-wrapper">
              {<PlaylistIconViewComponent playlist={playlist} />}
            </div>
          </Tooltip>)}
        </div>
      </div>
    </div>
  );
};