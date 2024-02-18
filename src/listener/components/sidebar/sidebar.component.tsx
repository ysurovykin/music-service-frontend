import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  LibraryMusicOutlined,
  HomeOutlined,
  SearchOutlined,
  Favorite
} from "@mui/icons-material";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { useSelector } from "react-redux";
import { Avatar, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { userSelectors } from "../../../user/store/user.selectors";
import { PlaylistInfoResponseData, PlaylistTagEnum } from "../../playlist/store/playlist.model";

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

  const renderPlaylistCover = (playlist: PlaylistInfoResponseData) => {
    if (playlist.coverImageUrl) {
      return (
        <RouterLink to={`/playlist/${playlist.playlistId}`}>
          <Avatar size={48} shape="square" src={playlist.coverImageUrl} />
        </RouterLink>
      );
    }

    switch (playlist.tag as PlaylistTagEnum) {
      case PlaylistTagEnum.liked: {
        return (
          <RouterLink to={`/playlist/${playlist.playlistId}`}>
            <Avatar
              className="sidebar__avatar sidebar__avatar--liked"
              icon={<Favorite />}
              size={48}
              shape="square" />
          </RouterLink>
        );
      }
    }
  }

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
            placement="right"
            title={playlist.name}>
            <div className="sidebar__avatar-wrapper">
              {renderPlaylistCover(playlist)}
            </div>
          </Tooltip>)}
        </div>
      </div>
    </div>
  );
};