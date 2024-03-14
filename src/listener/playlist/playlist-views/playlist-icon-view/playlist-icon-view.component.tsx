import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistInfoResponseData, PlaylistTagEnum } from "../../store/playlist.model";
import { renderPlaylistIcon } from "../../../../helpers/react/listener-page.helper";

export function PlaylistIconViewComponent({
  playlist,
  containLink = true
}: {
  playlist: PlaylistInfoResponseData
  containLink?: boolean
}) {

  return <div className="playlist-icon-view__side-bar-icon">
    {containLink ?
      (<RouterLink to={`/playlist/${playlist.playlistId}`}>
        {renderPlaylistIcon(48, playlist.coverImageUrl, playlist.tag as PlaylistTagEnum, playlist.backgroundColor, playlist.name)}
      </RouterLink >) :
      renderPlaylistIcon(48, playlist.coverImageUrl, playlist.tag as PlaylistTagEnum, playlist.backgroundColor, playlist.name)}
  </div>
}