import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Button, Dropdown, Form, Input, MenuProps, Modal, Tooltip, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Delete, FormatColorFill, MoreHoriz, Photo } from "@mui/icons-material";
import { CreateAlbumRequestData, EditAlbumRequestData } from "../store/artist-album.model";
import { userSelectors } from "../../../user/store/user.selectors";

const { Title } = Typography;

type CreateAlbumRequestFunction = (request: CreateAlbumRequestData) => void;
type EditAlbumRequestFunction = (request: EditAlbumRequestData) => void;

export const AlbumModal = memo(function AlbumModal({
  title,
  okButtonText,
  isOpen,
  isLoading,
  onCancel,
  onDone,
  albumId,
  albumName,
  coverImageUrl
}: {
  title: string;
  okButtonText: string;
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onDone: CreateAlbumRequestFunction | EditAlbumRequestFunction;
  albumId?: string;
  albumName?: string;
  coverImageUrl?: string;
}) {
  const [isHovered, setIsHovered] = useState<boolean>();
  const [coverSrc, setCoverSrc] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const artistId = useSelector(userSelectors.userId)

  const inputRef = useRef<HTMLInputElement>(null);

  const startCoverImageSelecting = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const editCoverImage = (value: HTMLInputElement) => {
    if (value.files) {
      const fileUploaded = value.files[0];
      setCoverImage(fileUploaded);
      const objectURL = URL.createObjectURL(fileUploaded);
      setCoverSrc(objectURL);
    }
  };

  const deleteCoverImage = () => {
    setCoverSrc('');
    setCoverImage(undefined);
  }

  const createAlbumDisabled = useMemo(() => {
    return (!name || !coverSrc) || isLoading;
  }, [name, coverSrc, isLoading]);

  const createAlbumDisabledText = useMemo(() => {
    if (!name) {
      return 'Album name is required';
    } else if (!coverSrc) {
      return 'Album must have cover image';
    } else {
      return '';
    }
  }, [name, coverSrc]);

  useEffect(() => {
    if (albumName && isOpen) {
      setName(albumName);
    }
  }, [albumName, isOpen]);

  useEffect(() => {
    if (isOpen && coverImageUrl) {
      setCoverSrc(coverImageUrl);
    }
  }, [coverImageUrl, isOpen]);

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => startCoverImageSelecting()}>
        <Photo /><p>Change cover image</p>
        <input
          className="album-modal__file-input"
          type="file"
          ref={inputRef}
          onChange={(event) => editCoverImage(event.target)} />
      </div>,
      key: '0',
    },
    {
      label: coverSrc ? <div
        className='dropdown-item'
        onClick={() => deleteCoverImage()}>
        <Delete /><p>Delete cover image</p>
      </div> : <></>,
      key: '1',
    },
  ]

  const clearInfo = () => {
    setCoverSrc('');
    setCoverImage(undefined);
    setName('');
    setDescription('');
  };

  const onFinish = () => {
    onDone({
      albumId: albumId!,
      name,
      coverImage: coverImage!
    });
  };

  const onClose = () => {
    onCancel();
    clearInfo()
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      confirmLoading={isLoading}
      closable={false}
      onCancel={() => onClose()}
      width={500}
      footer={[
        <Button
          className="album-modal__cancel-button"
          key="cancel"
          onClick={() => onClose()}>
          Cancel
        </Button>,
        <Tooltip key="tooltip" title={createAlbumDisabledText}>
          <Button
            className="album-modal__ok-button"
            key="submit"
            type="primary"
            disabled={createAlbumDisabled}
            onClick={() => onFinish()}>
            {okButtonText}
          </Button>
        </Tooltip>
      ]}>
      <div className="album-modal__wrapper">
        <div
          className="album-modal__cover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {isHovered &&
            <div className="album-modal__edit-cover-button-wrapper">
              <Dropdown
                className="album-modal__edit-cover-button"
                menu={{ items }}
                trigger={['click']}>
                <MoreHoriz sx={{ color: 'white' }} />
              </Dropdown>
            </div>
          }
          <Avatar
            className="album-modal__cover-image"
            size={174}
            src={coverSrc}
            shape="square">
          </Avatar>
        </div>
        <div className="album-modal__credits">
          <Input
            className="album-modal__album-name"
            placeholder='Album name'
            value={name}
            maxLength={50}
            onChange={(event) => setName(event.target.value)} />
        </div>
      </div>
    </Modal >
  );
});