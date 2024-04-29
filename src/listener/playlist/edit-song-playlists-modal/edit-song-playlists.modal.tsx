import React, { useState } from "react";
import {
  Add,
  Search,
} from '@mui/icons-material';
import { Avatar, Button, Divider, Input, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { playlistSelectors } from "../store/playlist.selectors";
import { PlaylistInlineViewComponent } from "../playlist-views/playlist-inline-view/playlist-inline-view.component";
import { useLocation } from "react-router-dom";
import { playlistActions } from "../store/playlist.actions";
import { EditedPlaylist, PlaylistInfoResponseData } from "../store/playlist.model";

const { Text } = Typography;

export function EditSongPlaylistsModal() {
  let location = useLocation();
  const isEditSongPlaylistsModalOpen = useSelector(playlistSelectors.isEditSongPlaylistsModalOpen);
  const playlists = useSelector(playlistSelectors.playlists);
  const editPlaylistsSong = useSelector(playlistSelectors.editPlaylistsSong);
  const isEditSongPlaylistsLoading = useSelector(playlistSelectors.isEditSongPlaylistsLoading);

  const [editedPlaylists, setEditedPlaylists] = useState<Array<EditedPlaylist>>([]);
  const [playlistSearch, setPlaylistSearch] = useState<string>('');

  const dispatch = useDispatch();
  const closeEditSongPlaylistsModal = () => dispatch(playlistActions.closeEditSongPlaylistsModal());
  const openCreatePlaylistModal = () => dispatch(playlistActions.openCreatePlaylistModal());
  const editSongPlaylists = (songId: string, playlistsToEdit: Array<EditedPlaylist>, playlistIdToUpdate?: string, updateArtistLikedSongCount?: boolean) =>
    dispatch(playlistActions.editSongPlaylists({
      songId,
      editedPlaylists: playlistsToEdit,
      playlistIdToUpdate,
      updateArtistLikedSongCount
    }));

  const closeModal = () => {
    closeEditSongPlaylistsModal();
    setEditedPlaylists([])
    setPlaylistSearch('');
  }

  const editPlaylist = (playlist: PlaylistInfoResponseData) => {
    const editedPlaylist = editedPlaylists?.find(editedPlaylist => editedPlaylist.playlist.playlistId === playlist.playlistId!);
    if (editedPlaylist && ((editPlaylistsSong?.playlistIds?.includes(playlist?.playlistId!) && !editedPlaylist.added) ||
      (!editPlaylistsSong?.playlistIds?.includes(playlist?.playlistId!) && editedPlaylist.added))) {
      setEditedPlaylists(state => state ? [...state.filter(editedPlaylist => editedPlaylist.playlist.playlistId !== playlist.playlistId)] : state);
    } else if (!editedPlaylist) {
      const shouldBeAdded = !editPlaylistsSong?.playlistIds?.includes(playlist?.playlistId!);
      setEditedPlaylists(state => state ? [...state, { playlist: playlist, added: shouldBeAdded }] : state);
    }
  }

  const editPlaylistsDone = () => {
    const path = location.pathname;
    let playlistIdToUpdate: string = '';
    let updateArtistLikedSongCount: boolean = false;
    if (path.includes('playlist')) {
      playlistIdToUpdate = path.split('/')[2];
    } else if (path.includes('artist')) {
      const pathArtistId = path.split('/')[2];
      if (pathArtistId.length === 16 && editPlaylistsSong?.artists?.[0].id === pathArtistId) {
        updateArtistLikedSongCount = true;
      }
    }
    editSongPlaylists(editPlaylistsSong?.songId || '', editedPlaylists, playlistIdToUpdate, updateArtistLikedSongCount);
    closeModal();
  }

  const calculateIsLiked = (playlistId: string): boolean => {
    const editedPlaylist = editedPlaylists?.find(editedPlaylist => editedPlaylist.playlist?.playlistId === playlistId);
    if (editedPlaylist) {
      return !!editedPlaylist?.added;
    }
    return !!editPlaylistsSong?.playlistIds?.includes(playlistId);
  };

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
        <div className="edit-playlists-modal__playlist-list-wrapper custom-scroll-y">
          <div className="edit-playlists-modal__playlist-list">
            {playlists && playlists
              .filter(playlist => !playlistSearch || playlist.name?.toLowerCase()?.includes(playlistSearch.toLowerCase()))
              .map(playlist => (
                <div
                  className="edit-playlists-modal__playlist-wrapper"
                  key={playlist.playlistId}
                  onClick={() => editPlaylist(playlist!)}>
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