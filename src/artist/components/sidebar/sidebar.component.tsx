import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  HomeOutlined,
  AlbumOutlined
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Avatar, Tooltip, Typography } from "antd";
import { useDispatch } from "react-redux";
import { artistAlbumActions } from "../../artist-album/store/artist-album.actions";
import { artistAlbumSelectors } from "../../artist-album/store/artist-album.selectors";
import { GetAlbumsRequest } from "../../artist-album/store/artist-album.model";

const { Text } = Typography;

export function SidebarComponent() {

  const albums = useSelector(artistAlbumSelectors.albums);

  const dispatch = useDispatch();
  const openCreateAlbumModal = () => dispatch(artistAlbumActions.openCreateAlbumModal());
  const getAlbums = (request: GetAlbumsRequest) => dispatch(artistAlbumActions.getAlbums(request));

  useEffect(() => {
    getAlbums({
      limit: 10,
      offset: 0
    });
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
          title='Create album'>
          <Text
            className="sidebar__button"
            onClick={() => openCreateAlbumModal()}><AlbumOutlined fontSize="large" /></Text>
        </Tooltip>
      </div>
      <div className="sidebar__library-section">
        <div className="sidebar__library-albums">
          {albums?.map(album =>
            <Tooltip
              placement="right"
              title={album.name}>
              <div className="sidebar__avatar-wrapper">
                <RouterLink to={`/album/${album.albumId}`}>
                  <Avatar size={48} shape="square" src={album.coverImageUrl} />
                </RouterLink>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};