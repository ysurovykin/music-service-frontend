import React from "react";
import { AlbumModal } from "../album-modal/album.modal";
import { artistAlbumSelectors } from "../store/artist-album.selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { artistAlbumActions } from "../store/artist-album.actions";
import { CreateAlbumRequestData } from "../store/artist-album.model";

export function CreateAlbumModal() {
  const isCreateAlbumModalOpen = useSelector(artistAlbumSelectors.isCreateAlbumModalOpen);
  const isCreateAlbumLoading = useSelector(artistAlbumSelectors.isCreateAlbumLoading);

  const dispatch = useDispatch();
  const closeCreateAlbumModal = () => dispatch(artistAlbumActions.closeCreateAlbumModal());
  const createAlbum = (request: CreateAlbumRequestData) => dispatch(artistAlbumActions.createAlbum(request));

  return (
    <AlbumModal
      title='Create new album'
      okButtonText='Create'
      isOpen={isCreateAlbumModalOpen!}
      isLoading={isCreateAlbumLoading!}
      onDone={createAlbum}
      onCancel={closeCreateAlbumModal}
    />
  );
}