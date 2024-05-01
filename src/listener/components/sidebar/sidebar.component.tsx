import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  LibraryMusicOutlined,
  HomeOutlined,
  SearchOutlined,
  PushPin,
  PushPinOutlined,
  QuizOutlined
} from "@mui/icons-material";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { PlaylistIconViewComponent } from "../../playlist/playlist-views/playlist-icon-view/playlist-icon-view.component";
import { listenerProfileTypePalete } from "../../../config";
import { ChangePlaylistPinRequestData, GetPlaylistsRequest } from "../../playlist/store/playlist.model";

export function SidebarComponent() {

  const playlists = useSelector(playlistSelectors.playlists);

  const dispatch = useDispatch();
  const getPlaylists = (request: GetPlaylistsRequest) => dispatch(playlistActions.getPlaylistsByListenerId(request));
  const pinPlaylist = (request: ChangePlaylistPinRequestData) => dispatch(playlistActions.pinPlaylist(request));
  const unpinPlaylist = (request: ChangePlaylistPinRequestData) => dispatch(playlistActions.unpinPlaylist(request));

  useEffect(() => {
    getPlaylists({});
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
        <Tooltip
          placement="right"
          title='Song guesser'>
          <RouterLink to='/song-guesser'><QuizOutlined fontSize="large" /></RouterLink>
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
                        onClick={() => unpinPlaylist({
                          playlistId: playlist.playlistId!,
                          playlistName: playlist.name!
                        })}>
                        <PushPin
                          sx={{ cursor: 'pointer', color: listenerProfileTypePalete.base }} />
                      </div>
                    </Tooltip> :
                    <Tooltip
                      title='Pin playlist'>
                      <div
                        className="sidebar__tooltip"
                        onClick={() => pinPlaylist({
                          playlistId: playlist.playlistId!,
                          playlistName: playlist.name!
                        })}>
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