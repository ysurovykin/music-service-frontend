import React from "react";
import { Avatar, Tooltip, Typography } from "antd";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Close } from "@mui/icons-material";
import { AlbumInfoResponseData } from "../store/artist-album.model";
import moment from "moment";

const { Text, Title, Link } = Typography;

export function AlbumCardComponent({
  album,
  showYear = true,
  reference,
  onClickFunction,
  showCancelButton,
  onCancelFunction
}: {
  album: AlbumInfoResponseData;
  showYear?: boolean;
  reference?: ((node?: Element | null | undefined) => void) | null;
  onClickFunction?: () => void;
  showCancelButton?: boolean;
  onCancelFunction?: () => void;
}) {
  const navigate = useNavigate();

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
      <div className="album-card__info">
        {showYear ? <Text>{moment(album.date).year()}</Text> : null}
      </div>
    </div>
  );
}