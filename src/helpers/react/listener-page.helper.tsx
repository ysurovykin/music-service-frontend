import { Avatar, Typography } from "antd";
import { PlaylistTagEnum } from "../../listener/playlist/store/playlist.model";
import { Favorite } from "@mui/icons-material";

const { Title } = Typography

export const getBackground = (color: string = 'rgba(70, 70, 70, 1)') => {
  return `linear-gradient(180deg, ${color}, rgba(33, 33, 33, 1) 250px, rgba(33, 33, 33, 1) 400px)`;
}

export const formatPlaylistTime = (totalMinutes: number) => {
  const moment = require('moment');

  const duration = moment.duration(totalMinutes, 'minutes');

  const hours = duration.asHours();
  const minutes = duration.minutes();

  const formattedTime = `${Math.floor(hours)} hr ${minutes.toString()} min`;
  return formattedTime
}

export const renderPlaylistIcon = (size: number, coverImageUrl?: string, tag?: PlaylistTagEnum, backgroundColor?: string,
  name?: string) => {
  if (!!coverImageUrl) {
    return <Avatar size={size} shape="square" src={coverImageUrl} />;
  }

  if (!tag) {
    return (
      <Avatar
        size={size}
        style={{
          display: 'flex',
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
          icon={<Favorite fontSize={size < 64 ? 'medium' : 'large'} />}
          size={size}
          shape="square" />
      );
    }
    return (
      <Avatar
        className="playlist-icon-view__avatar playlist-icon-view__avatar--default"
        size={size}
        shape="square">
        {name?.split('')[0]?.toUpperCase()}
      </Avatar>
    );
  }
};