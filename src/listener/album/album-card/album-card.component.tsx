import React, { useMemo } from "react";
import { Avatar, Tooltip, Typography } from "antd";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Cancel, Close, Favorite, FavoriteBorder } from "@mui/icons-material";
import { AlbumInfoResponseData } from "../store/album.model";
import moment from "moment";
import { useDispatch } from "react-redux";
import { albumActions } from "../store/album.actions";
import { listenerProfileTypePalete } from "../../../config";

const { Text, Title, Link } = Typography;

export function AlbumCardComponent({
  album,
  showArtistInfo,
  showLikeButton,
  showYear = true,
  reference,
  onClickFunction,
  showCancelButton,
  onCancelFunction
}: {
  album: AlbumInfoResponseData;
  showArtistInfo?: boolean;
  showLikeButton?: boolean;
  showYear?: boolean;
  reference?: ((node?: Element | null | undefined) => void) | null;
  onClickFunction?: () => void;
  showCancelButton?: boolean;
  onCancelFunction?: () => void;
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

  const onClick = () => {
    navigate(`/album/${album.albumId}`)
    if (onClickFunction) {
      onClickFunction();
    }
  }

  const onCancel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (onCancelFunction) {
      onCancelFunction();
    }
  }

  return (
    <div
      className="album-card cursor-pointer"
      ref={reference}
      onClick={() => onClick()}>
      {showCancelButton ?
        <div
          className="album-card__close-icon-wrapper"
          onClick={(event) => onCancel(event)}>
          <Close sx={{ color: '#ffffff' }} />
        </div> :
        null
      }
      <Avatar shape='square' size={128} src={album.coverImageUrl} />
      <div className="album-card__title-wrapper">
        <Tooltip title={album.name}>
          <Title className="album-card__title m-0" level={5}>{album.name}</Title>
        </Tooltip>
      </div>
      {showArtistInfo ? <div className="album-card__artist-info-wrapper">
        <Tooltip title={album.artist?.name}>
          <Text className="album-card__title m-0">
            <RouterLink onClick={(event) => event.stopPropagation()} key={album.artist?.id} to={`/artist/${album.artist?.id}`}>{album.artist?.name}</RouterLink>
          </Text>
        </Tooltip>
      </div> : null}
      <div className="album-card__info">
        {showYear ? <Text>{moment(album.date).year()}</Text> : null}
        {showLikeButton ? <Tooltip title={album.isAddedToLibrary ? `Remove album ${album.name} from your library` : `Save album ${album.name} to your library`}>
          <div
            className='cursor-pointer'
            onClick={(event) => changeAlbumPresenceInLibrary(event)}>
            {album.isAddedToLibrary ?
              <Favorite sx={{ color: listenerProfileTypePalete.base }} /> :
              <FavoriteBorder sx={{ color: 'white', '&:hover': { color: listenerProfileTypePalete.base } }} />}
          </div>
        </Tooltip> : null}
      </div>
    </div>
  );
}