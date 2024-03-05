import React, { useEffect, useMemo, useState } from "react";
import {
  Add,
  Clear,
  Search,
} from '@mui/icons-material';
import { Avatar, Button, Divider, Input, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { playlistSelectors } from "../store/playlist.selectors";
import { PlaylistInlineViewComponent } from "../playlist-views/playlist-inline-view/playlist-inline-view.component";
import { useLocation } from "react-router-dom";
import { playlistActions } from "../store/playlist.actions";
import { EditedPlaylist } from "../store/playlist.model";

const { Text } = Typography;

export function EditSongPlaylistsModal() {
  let location = useLocation();
  const isEditSongPlaylistsModalOpen = useSelector(playlistSelectors.isEditSongPlaylistsModalOpen);
  const playlists = useSelector(playlistSelectors.playlists);
  const editPlaylistsSongId = useSelector(playlistSelectors.editPlaylistsSongId);
  const editPlaylistsSongPlaylistIds = useSelector(playlistSelectors.editPlaylistsSongPlaylistIds);
  const isEditSongPlaylistsLoading = useSelector(playlistSelectors.isEditSongPlaylistsLoading);

  const [playlistIdToUpdate, setPlaylistIdToUpdate] = useState<string>();
  const [editedPlaylists, setEditedPlaylists] = useState<Array<EditedPlaylist>>([]);
  const [playlistSearch, setPlaylistSearch] = useState<string>('');

  const dispatch = useDispatch();
  const closeEditSongPlaylistsModal = () => dispatch(playlistActions.closeEditSongPlaylistsModal());
  const openCreatePlaylistModal = () => dispatch(playlistActions.openCreatePlaylistModal());
  const editSongPlaylists = (songId: string, playlistsToEdit: Array<EditedPlaylist>, playlistIdToUpdate?: string) =>
    dispatch(playlistActions.editSongPlaylists({ songId, editedPlaylists: playlistsToEdit, playlistIdToUpdate }));

  const closeModal = () => {
    closeEditSongPlaylistsModal();
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
    editSongPlaylists(editPlaylistsSongId || '', editedPlaylists, playlistIdToUpdate);
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
      open={isEditSongPlaylistsModalOpen}
      confirmLoading={isEditSongPlaylistsLoading}
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
        <Input
          placeholder="Find the playlist"
          onChange={(event) => setPlaylistSearch(event.target.value)}
          prefix={<Search className="edit-playlists-modal__search-icon" />}
          allowClear />
        <div
          className="edit-playlists-modal__create-new-playlist"
          onClick={() => openCreatePlaylistModal()}>
          <Avatar shape="square" size={48} icon={<Add />} />
          <Text>New playlist</Text>
        </div>
        <Divider className="m-0" />
        <div className="edit-playlists-modal__playlist-list-wrapper custom-scroll">
          <div className="edit-playlists-modal__playlist-list">
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
      </div>
    </Modal>
  );
}