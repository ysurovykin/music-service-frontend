import React from "react";
import { Avatar, Button, Tooltip, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { ArtistInfoResponseData } from "../store/artist.model";
import { Close } from "@mui/icons-material";

const { Text, Title } = Typography;

export function ArtistCardComponent({
  artist,
  showArtistTag,
  reference,
  onClickFunction,
  showCancelButton,
  onCancelFunction,
  shouldRedirectToArtistPage = true,
  choosed
}: {
  artist: ArtistInfoResponseData;
  showArtistTag?: boolean;
  reference?: ((node?: Element | null | undefined) => void) | null;
  onClickFunction?: () => void;
  showCancelButton?: boolean;
  onCancelFunction?: () => void;
  shouldRedirectToArtistPage?: boolean,
  choosed?: boolean;
}) {
  const navigate = useNavigate();

  const onClick = () => {
    if (shouldRedirectToArtistPage) {
      navigate(`/artist/${artist.artistId}`)
    }
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
      ref={reference}
      className={`artist-card ${choosed ? 'artist-card--choosed' : ''} cursor-pointer`}
      onClick={() => onClick()}>
      {showCancelButton ?
        <div
          className="artist-card__close-icon-wrapper"
          onClick={(event) => onCancel(event)}>
          <Close sx={{ color: '#ffffff' }} />
        </div> :
        null
      }
      <Avatar src={artist.profileImageUrl} size={128} />
      <div className="artist-card__title-wrapper">
        <Tooltip title={artist.name}>
          <Title className="artist-card__title m-0" level={5}>{artist.name}</Title>
        </Tooltip>
      </div>
      <div className="artist-card__tag-wrapper">
        {showArtistTag ? <Text style={{ color: 'grey' }} className="m-0">Artist</Text> : null}
      </div>
    </div>
  );
}