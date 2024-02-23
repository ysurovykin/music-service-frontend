import React, { useEffect, useMemo, useState } from "react";
import {
  Clear,
  Search,
} from '@mui/icons-material';
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { songSelectors } from "../store/song.selectors";
import { songActions } from "../store/song.actions";
import { playlistSelectors } from "../../playlist/store/playlist.selectors";
import { PlaylistInlineViewComponent } from "../../playlist/playlist-views/playlist-inline-view/playlist-inline-view.component";
import { EditedPlaylist } from "../store/song.model";
import { useLocation } from "react-router-dom";

export function EditPlaylistModal() {
  let location = useLocation();
  const isEditPlaylistModalOpen = useSelector(songSelectors.isEditPlaylistModalOpen);
  const playlists = useSelector(playlistSelectors.playlists);
  const editPlaylistsSongId = useSelector(songSelectors.editPlaylistsSongId);
  const editPlaylistsSongPlaylistIds = useSelector(songSelectors.editPlaylistsSongPlaylistIds);
  const isPlaylistIdsLoading = useSelector(songSelectors.isPlaylistIdsLoading);

  const [playlistIdToUpdate, setPlaylistIdToUpdate] = useState<string>();
  const [editedPlaylists, setEditedPlaylists] = useState<Array<EditedPlaylist>>([]);
  const [playlistSearch, setPlaylistSearch] = useState<string>('');

  const dispatch = useDispatch();
  const closeEditPlaylistsModal = () => dispatch(songActions.closeEditPlaylistsModal());
  const editPlaylists = (songId: string, playlistsToEdit: Array<EditedPlaylist>, playlistIdToUpdate?: string) =>
    dispatch(songActions.editPlaylists({ songId, editedPlaylists: playlistsToEdit, playlistIdToUpdate }));

  const closeModal = () => {
    closeEditPlaylistsModal();
    setEditedPlaylists([])
    setPlaylistSearch('');
    setPlaylistIdToUpdate('');
  }

  const editPlaylist = (playlistId: string) => {
    const editedPlaylist = editedPlaylists?.find(editedPlaylist => editedPlaylist.playlistId === playlistId!);
    if (editedPlaylist && ((editPlaylistsSongPlaylistIds?.includes(playlistId) && !editedPlaylist.added) ||
      (!editPlaylistsSongPlaylistIds?.includes(playlistId) && editedPlaylist.added))) {
      setEditedPlaylists(state => state ? [...state.filter(playlist => playlist.playlistId !== playlistId)] : state);
    } else if (!editedPlaylist) {
      const shouldBeAdded = !editPlaylistsSongPlaylistIds?.includes(playlistId);
      setEditedPlaylists(state => state ? [...state, { playlistId, added: shouldBeAdded }] : state);
    }
  }

  const editPlaylistsDone = () => {
    editPlaylists(editPlaylistsSongId || '', editedPlaylists, playlistIdToUpdate);
    closeModal();
  }

  const calculateIsLiked = (playlistId: string): boolean => {
    const editedPlaylist = editedPlaylists?.find(editedPlaylist => editedPlaylist.playlistId === playlistId);
    if (editedPlaylist) {
      return !!editedPlaylist?.added;
    }
    return !!editPlaylistsSongPlaylistIds?.includes(playlistId);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('playlist')) {
      setPlaylistIdToUpdate(path.split('/')[2]);
    }
  }, [location])

  return (
    <Modal
      title='Add to playlist'
      open={isEditPlaylistModalOpen}
      confirmLoading={isPlaylistIdsLoading}
      closable={false}
      onCancel={() => closeModal()}
      width={400}
      footer={[
        <Button
          className="edit-playlists-modal__cancel-button"
          key="cancel"
          onClick={() => closeModal()}>
          Cancel
        </Button>,
        editedPlaylists.length ? <Button
          className="edit-playlists-modal__ok-button"
          key="submit"
          type="primary"
          onClick={() => editPlaylistsDone()}>
          Done
        </Button> : null
      ]}
    >
      <div>
        <div className="edit-playlists-modal__search">
          <Search className="edit-playlists-modal__search-icon" />
          <input
            value={playlistSearch}
            className="edit-playlists-modal__search-input"
            placeholder="Find the playlist"
            onChange={(event) => setPlaylistSearch(event.target.value)} />
          <div
            className="edit-playlists-modal__search-icon-wrapper"
            onClick={() => setPlaylistSearch('')}>
            <Clear className="edit-playlists-modal__search-icon" />
          </div>
        </div>
        <div>
          {playlists && playlists
            .filter(playlist => !playlistSearch || playlist.name?.toLowerCase()?.includes(playlistSearch.toLowerCase()))
            .map(playlist => (
              <div
                className="edit-playlists-modal__playlist-wrapper"
                key={playlist.playlistId}
                onClick={() => editPlaylist(playlist.playlistId!)}>
                <PlaylistInlineViewComponent
                  playlist={playlist}
                  liked={calculateIsLiked(playlist.playlistId || '')}
                  playlistSearch={playlistSearch} />
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}