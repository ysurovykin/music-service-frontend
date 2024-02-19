import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar } from "antd";
import { PlaylistInfoResponseData, PlaylistTagEnum } from "../../store/playlist.model";
import { Favorite } from "@mui/icons-material";

export function PlaylistIconViewComponent({
  playlist,
  containLink = true
}: {
  playlist: PlaylistInfoResponseData
  containLink?: boolean
}) {

  const renderIcon = () => {
    if (playlist.coverImageUrl) {
      return (
        <Avatar size={48} shape="square" src={playlist.coverImageUrl} />
      );
    }

    switch (playlist.tag as PlaylistTagEnum) {
      case PlaylistTagEnum.liked: {
        return (
          <Avatar
            className="playlist-icon-view__avatar playlist-icon-view__avatar--liked"
            icon={<Favorite />}
            size={48}
            shape="square" />
        );
      }
      default: {
        return (
          <Avatar
            className="playlist-icon-view__avatar playlist-icon-view__avatar--default"
            size={48}
            shape="square">
            {playlist.name}
          </Avatar>
        );
      }
    }
  };

  return containLink ?
    (<RouterLink to={`/playlist/${playlist.playlistId}`}>
      {renderIcon()}
    </RouterLink >) :
    renderIcon();
}