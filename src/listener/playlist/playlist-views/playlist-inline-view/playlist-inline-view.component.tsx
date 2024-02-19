import React, { useMemo } from "react";
import { Typography } from "antd";
import { PlaylistInfoResponseData } from "../../store/playlist.model";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { PlaylistIconViewComponent } from "../playlist-icon-view/playlist-icon-view.component";

const { Title } = Typography;

export function PlaylistInlineViewComponent({
  playlist,
  playlistSearch,
  liked
}: {
  playlist: PlaylistInfoResponseData;
  playlistSearch: string;
  liked: boolean;
}) {
  const playlistTitle = useMemo(() => {
    if (playlistSearch && playlist.name) {
      const parts = playlist.name.split(new RegExp(`(${playlistSearch})`, 'gi'));
      return <p className="playlist-inline-view__title">
        {parts.map(part => part.toLowerCase() === playlistSearch.toLowerCase() ? <span>{part}</span> : part)}
      </p>;
    } else {
      return <p className="playlist-inline-view__title">{playlist.name}</p>;
    }
  }, [playlist.name, playlistSearch])

  return (
    <div className="playlist-inline-view">
      <PlaylistIconViewComponent
        playlist={playlist}
        containLink={false} />
      {playlistTitle}
      {liked ?
        <Favorite className="playlist-inline-view__icon" /> :
        <FavoriteBorder className="playlist-inline-view__icon" />}
    </div>
  );
}