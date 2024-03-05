import React, { useMemo } from "react";
import { PlaylistModal } from "../playlist-modal/playlist.modal";
import { playlistSelectors } from "../store/playlist.selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playlistActions } from "../store/playlist.actions";
import { EditPlaylistRequestData } from "../store/playlist.model";
import { useLocation } from "react-router-dom";

export function EditPlaylistModal() {
  const location = useLocation();
  const { pathname } = location;

  const isEditPlaylistModalOpen = useSelector(playlistSelectors.isEditPlaylistModalOpen);
  const isEditPlaylistLoading = useSelector(playlistSelectors.isEditPlaylistLoading);
  const playlists = useSelector(playlistSelectors.playlists);

  const playlistId = useMemo(() => {
    return pathname?.split('/')[2];
  }, [pathname])

  const playlist = useMemo(() => {
    return playlists?.find(value => value.playlistId === playlistId);
  }, [playlists, playlistId]);

  const dispatch = useDispatch();
  const closeEditPlaylistModal = () => dispatch(playlistActions.closeEditPlaylistModal());
  const editPlaylist = (request: EditPlaylistRequestData) => dispatch(playlistActions.editPlaylist(request));

  return (
    <PlaylistModal
      title='Edit playlist'
      okButtonText='Edit'
      isOpen={isEditPlaylistModalOpen!}
      isLoading={isEditPlaylistLoading!}
      onDone={editPlaylist}
      onCancel={closeEditPlaylistModal}
      playlistId={playlistId}
      backgroundColor={playlist?.backgroundColor}
      coverImageUrl={playlist?.coverImageUrl}
      playlistName={playlist?.name}
      playlistDescription={playlist?.description}
    />
  );
}