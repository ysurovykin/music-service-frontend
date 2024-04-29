import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Typography } from "antd";
import { songRadioSelectors } from "../store/song-radio.selectors";
import { songRadioActions } from "../store/song-radio.actions";
import { CreateSongRadioRequestData } from "../store/song-radio.model";

const { Text } = Typography;

export function RefreshSongRadioModal() {

  const isOpen = useSelector(songRadioSelectors.isRefreshSongRadioModalOpen);
  const songName = useSelector(songRadioSelectors.songName);
  const baseSongId = useSelector(songRadioSelectors.baseSongId);
  const isSongRadioLoading = useSelector(songRadioSelectors.isSongRadioLoading);

  const dispatch = useDispatch();
  const createSongRadio = (request: CreateSongRadioRequestData) => dispatch(songRadioActions.createSongRadio(request));
  const closeRefreshSongRadioModalAction = () => dispatch(songRadioActions.closeRefreshSongRadioModalAction());

  const onClose = () => {
    closeRefreshSongRadioModalAction();
  }

  const onFinish = () => {
    if (!isSongRadioLoading) {
      createSongRadio({
        song: { songId: baseSongId, name: songName },
        shouldRefresh: true
      });
    }
  }

  return (
    <Modal
      title='Song radio already exists'
      open={isOpen}
      closable={false}
      onCancel={() => onClose()}
      width={500}
      footer={[
        <Button
          className="refresh-song-radio-modal__cancel-button"
          key="cancel"
          onClick={() => onClose()}>
          Cancel
        </Button>,
        <Button
          className="refresh-song-radio-modal__ok-button"
          key="submit"
          type="primary"
          onClick={() => onFinish()}>
          Refresh
        </Button>
      ]}>
      <div className="refresh-song-radio-modal__wrapper">
        <div>
          <Text><span>{songName}</span> song radio already exists. You can find it by this link.</Text>
        </div>
        <div>
          <Text>This action will generate new song radio repleacing existing and trying to avoid repeating songs from the current version</Text>
        </div>
        <div>
          <Text>NOTE: Refreshing song radio counts to your daily song radio generation limit</Text>
        </div>
      </div>
    </Modal >
  );

}