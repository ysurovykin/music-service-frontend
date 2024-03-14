import React, { useMemo } from "react";
import { Avatar, Tooltip, Typography } from "antd";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AlbumInfoResponseData } from "../store/album.model";
import moment from "moment";
import { useDispatch } from "react-redux";
import { albumActions } from "../store/album.actions";
import { listenerProfileTypePalete } from "../../../config";

const { Text, Title, Link } = Typography;

export function AlbumCardComponent({
  album,
  showArtistInfo
}: {
  album: AlbumInfoResponseData;
  showArtistInfo?: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const addAlbumToLibrary = (albumId: string) => dispatch(albumActions.addAlbumToLibrary(albumId));
  const removeAlbumFromLibrary = (albumId: string) => dispatch(albumActions.removeAlbumFromLibrary(albumId));

  const changeAlbumPresenceInLibrary = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (album.isAddedToLibrary) {
      removeAlbumFromLibrary(album.albumId!);
    } else {
      addAlbumToLibrary(album.albumId!);
    }
  };

  return (
    <div
      className="album-card cursor-pointer"
      onClick={() => navigate(`/album/${album.albumId}`)}>
      <Avatar shape='square' size={128} src={album.coverImageUrl} />
      <div className="album-card__title-wrapper">
        <Title className="album-card__title m-0" level={5}>{album.name}</Title>
      </div>
      {showArtistInfo ? <div className="album-card__title-wrapper">
        <Text className="album-card__title m-0">
          <RouterLink onClick={(event) => event.stopPropagation()} key={album.artist?.id} to={`/artist/${album.artist?.id}`}>{album.artist?.name}</RouterLink>
        </Text>
      </div> : null}
      <div className="album-card__info">
        <Text>{moment(album.date).year()}</Text>
        <Tooltip title={album.isAddedToLibrary ? `Remove album ${album.name} from your library` : `Save album ${album.name} to your library`}>
          <div
            className='cursor-pointer'
            onClick={(event) => changeAlbumPresenceInLibrary(event)}>
            {album.isAddedToLibrary ?
              <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />}
          </div>
        </Tooltip>
      </div>
    </div>
  );
}