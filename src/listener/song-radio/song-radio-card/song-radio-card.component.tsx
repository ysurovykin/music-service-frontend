import React, { useMemo } from "react";
import { Avatar, Tooltip, Typography } from "antd";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import moment from "moment";
import { useDispatch } from "react-redux";
import { listenerProfileTypePalete } from "../../../config";
import { SongRadioInfoResponseData } from "../store/song-radio.model";

const { Text, Title, Link } = Typography;

export function SongRadioCardComponent({
  songRadio,
  reference
}: {
  songRadio: SongRadioInfoResponseData;
  reference?: ((node?: Element | null | undefined) => void) | null;
}) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/song-radio/${songRadio.baseSongId}`)
  }

  return (
    <div
      className="song-radio-card cursor-pointer"
      ref={reference}
      onClick={() => onClick()}>
      <div className="song-radio-card__avatar-wrapper">
        <div>
          <Avatar shape='square' size={96} src={songRadio.coverImageUrl} />
        </div>
        <div className="song-radio-card__avatar-title-wrapper">
          <Title
            className='song-radio-card__avatar-title m-0'
            level={5}>{songRadio.songName}</Title>
        </div>
      </div>
      <div className="song-radio-card__title-wrapper">
        <Tooltip title={songRadio.name}>
          <Title className="song-radio-card__title m-0" level={5}>{songRadio.name}</Title>
        </Tooltip>
      </div>
    </div>
  );
}