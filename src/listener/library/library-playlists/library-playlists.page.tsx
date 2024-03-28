import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Input, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../playlist/store/playlist.actions";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { PlaylistCardComponent } from "../../playlist/playlist-views/playlist-card/playlist-card.component";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
import { GetPlaylistsRequest } from "../../playlist/store/playlist.model";
const { Title } = Typography;

export function LibraryPlaylistsPage() {
  const playlistsInListenerLibrary = useSelector(playlistSelectors.playlistsInListenerLibrary);
  const isPlaylistsInListenerLibraryLoading = useSelector(playlistSelectors.isPlaylistsInListenerLibraryLoading);

  const [search, setSearch] = useState<string>('');

  const [debouncedSearch] = useDebounce(search, 500);

  const dispatch = useDispatch()
  const getPlaylistsInListenerLibrary = (request: GetPlaylistsRequest) => dispatch(playlistActions.getPlaylistsInListenerLibrary(request));

  useEffect(() => {
    getPlaylistsInListenerLibrary({ search: debouncedSearch });
  }, [debouncedSearch])

  const renderSearchInput = () => {
    return (
      <Input
        placeholder="Playlist name"
        style={{ width: '300px', borderRadius: '50px' }}
        onChange={(event) => setSearch(event.target.value)}
        prefix={<Search className="search-page__search-icon" />}
        allowClear />
    );
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-playlists-page listener-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()} />
        <div className="library-playlists-page-wrapper">
          <Title className="mt-0" level={1}>Your Playlists</Title>
          <div className="library-playlists-page__content">
            {isPlaylistsInListenerLibraryLoading ?
              <div className='library-playlists-page__loader-wrapper'><Spin /></div> :
              playlistsInListenerLibrary?.map(playlist =>
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