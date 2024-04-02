import React from "react";
import { Avatar, Tooltip, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { PlaylistInfoResponseData } from "../../store/playlist.model";
import { PlaylistIconViewComponent } from "../playlist-icon-view/playlist-icon-view.component";

const { Text, Title } = Typography;

export function PlaylistCardComponent({
  playlist
}: {
  playlist: PlaylistInfoResponseData;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="playlist-card cursor-pointer"
      onClick={() => navigate(`/playlist/${playlist.playlistId}`)}>
      <PlaylistIconViewComponent
        size={128}
        position="relative"
        playlist={playlist}
        containLink={false} />
      <div className="playlist-card__title-wrapper">
        <Tooltip title={playlist.name}>
          <Title className="playlist-card__title m-0" level={5}>{playlist.name}</Title>
        </Tooltip>
      </div>
      <div className="playlist-card__info">
        <Text>{moment(playlist.date).year()}</Text>
      </div>
    </div>
  );
}