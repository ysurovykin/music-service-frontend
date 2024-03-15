import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistInfoResponseData, PlaylistTagEnum } from "../../store/playlist.model";
import { renderPlaylistIcon } from "../../../../helpers/react/listener-page.helper";

export function PlaylistIconViewComponent({
  playlist,
  containLink = true,
  size = 48,
  position = 'absolute'
}: {
  playlist: PlaylistInfoResponseData
  containLink?: boolean
  size?: number
  position?: 'absolute' | 'relative'
}) {

  return <div
    className="playlist-icon-view__side-bar-icon"
    style={{ height: size, width: size }}>
    {containLink ?
      (<RouterLink to={`/playlist/${playlist.playlistId}`}>
        {renderPlaylistIcon(size, position, playlist.coverImageUrl, playlist.tag as PlaylistTagEnum, playlist.backgroundColor, playlist.name)}
      </RouterLink >) :
      renderPlaylistIcon(size, position, playlist.coverImageUrl, playlist.tag as PlaylistTagEnum, playlist.backgroundColor, playlist.name)}
  </div>
}