import React from "react";
import { PlaylistModal } from "../playlist-modal/playlist.modal";
import { playlistSelectors } from "../store/playlist.selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playlistActions } from "../store/playlist.actions";
import { CreatePlaylistRequestData } from "../store/playlist.model";

export function CreatePlaylistModal() {
  const isCreatePlaylistModalOpen = useSelector(playlistSelectors.isCreatePlaylistModalOpen);
  const isCreatePlaylistLoading = useSelector(playlistSelectors.isCreatePlaylistLoading);

  const dispatch = useDispatch();
  const closeCreatePlaylistModal = () => dispatch(playlistActions.closeCreatePlaylistModal());
  const createPlaylist = (request: CreatePlaylistRequestData) => dispatch(playlistActions.createPlaylist(request));

  return (
    <PlaylistModal
      title='Create new playlist'
      okButtonText='Create'
      isOpen={isCreatePlaylistModalOpen!}
      isLoading={isCreatePlaylistLoading!}
      onDone={createPlaylist}
      onCancel={closeCreatePlaylistModal}
    />
  );
}