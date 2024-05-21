import React, { useMemo } from "react";
import { AlbumModal } from "../album-modal/album.modal";
import { artistAlbumSelectors } from "../store/artist-album.selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { artistAlbumActions } from "../store/artist-album.actions";
import { EditAlbumRequestData } from "../store/artist-album.model";
import { useLocation } from "react-router-dom";

export function EditAlbumModal() {
  const location = useLocation();
  const { pathname } = location;

  const isEditAlbumModalOpen = useSelector(artistAlbumSelectors.isEditAlbumModalOpen);
  const isEditAlbumLoading = useSelector(artistAlbumSelectors.isEditAlbumLoading);
  const albums = useSelector(artistAlbumSelectors.albums);

  const albumId = useMemo(() => {
    return pathname?.split('/')[2];
  }, [pathname])

  const album = useMemo(() => {
    return albums?.find(value => value.albumId === albumId);
  }, [albums, albumId]);

  const dispatch = useDispatch();
  const closeEditAlbumModal = () => dispatch(artistAlbumActions.closeEditAlbumModal());
  const editAlbum = (request: EditAlbumRequestData) => dispatch(artistAlbumActions.editAlbum(request));

  return (
    <AlbumModal
      title='Edit album'
      okButtonText='Edit'
      isOpen={isEditAlbumModalOpen!}
      isLoading={isEditAlbumLoading!}
      onDone={editAlbum}
      onCancel={closeEditAlbumModal}
      albumId={albumId}
      coverImageUrl={album?.coverImageUrl}
      albumReleaseDate={album?.releaseDate}
      albumName={album?.name}
    />
  );
}