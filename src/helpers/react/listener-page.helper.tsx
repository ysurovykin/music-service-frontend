import { Avatar, Typography } from "antd";
import { PlaylistTagEnum } from "../../listener/playlist/store/playlist.model";
import { Favorite } from "@mui/icons-material";

const { Title } = Typography

export const getBackground = (color: string = 'rgba(70, 70, 70, 1)') => {
  return `linear-gradient(180deg, ${color}, rgba(33, 33, 33, 1) 300px, rgba(33, 33, 33, 1) 400px)`;
}

export const formatPlaylistTime = (totalSeconds: number) => {
  const moment = require('moment');

  const duration = moment.duration(totalSeconds, 'seconds');

  const hours = duration.asHours();
  const minutes = duration.minutes();

  const formattedTime = `${Math.floor(hours)} hr ${minutes.toString()} min`;
  return formattedTime
}

export const renderPlaylistIcon = (size: number, position: 'absolute' | 'relative', coverImageUrl?: string, tag?: PlaylistTagEnum, backgroundColor?: string,
  name?: string) => {
  if (!!coverImageUrl) {
    return <Avatar style={{ position: position }} size={size} shape="square" src={coverImageUrl} />;
  }

  if (!tag) {
    return (
      <Avatar
        size={size}
        style={{
          display: 'flex',
          position: position,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: backgroundColor,
          border: '1px solid'
        }}
        shape="square">
        <Title level={size <= 48 ? 5 : 1} className="m-0">{name?.split('')[0]?.toUpperCase()}</Title>
      </Avatar>
    );
  } else {
    if (tag === PlaylistTagEnum.liked) {
      return (
        <Avatar
          className="playlist-icon-view__avatar playlist-icon-view__avatar--liked"
          style={{ position: position }}
          icon={<Favorite style={{ fontSize: size < 64 ? '22px' : '64px' }} />}
          size={size}
          shape="square" />
      );
    }
    return (
      <Avatar
        className="playlist-icon-view__avatar playlist-icon-view__avatar--default"
        style={{ position: position }}
        size={size}
        shape="square">
        {name?.split('')[0]?.toUpperCase()}
      </Avatar>
    );
  }
};