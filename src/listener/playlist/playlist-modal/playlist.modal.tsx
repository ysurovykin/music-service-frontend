import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Button, Dropdown, Form, Input, MenuProps, Modal, Tooltip, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Delete, FormatColorFill, MoreHoriz, Photo } from "@mui/icons-material";
import { CreatePlaylistRequestData, EditPlaylistRequestData } from "../store/playlist.model";

const { Title } = Typography;

type CreatePlaylistRequestFunction = (request: CreatePlaylistRequestData) => void;
type EditPlaylistRequestFunction = (request: EditPlaylistRequestData) => void;

export const PlaylistModal = memo(function PlaylistModal({
  title,
  okButtonText,
  isOpen,
  isLoading,
  onCancel,
  onDone,
  playlistId,
  playlistName,
  playlistDescription,
  backgroundColor,
  coverImageUrl
}: {
  title: string;
  okButtonText: string;
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onDone: CreatePlaylistRequestFunction | EditPlaylistRequestFunction;
  playlistId?: string;
  playlistName?: string;
  playlistDescription?: string;
  backgroundColor?: string;
  coverImageUrl?: string;
}) {
  const [isHovered, setIsHovered] = useState<boolean>();
  const [coverSrc, setCoverSrc] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File>();
  const [coverColor, setCoverColor] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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
      setCoverColor('');
    }
  };

  const editCoverColor = (color: string) => {
    setCoverColor(color);
    deleteCoverImage();
  }

  const deleteCoverImage = () => {
    setCoverSrc('');
    setCoverImage(undefined);
  }

  const createPlaylistDisabled = useMemo(() => {
    return !name || !coverColor && !coverSrc;
  }, [name, coverColor, coverSrc]);

  const createPlaylistDisabledText = useMemo(() => {
    if (!name) {
      return 'Playlist name is required';
    } else if (!coverColor && !coverSrc) {
      return 'Playlist must have cover image or fill color';
    } else {
      return '';
    }
  }, [name, coverColor, coverSrc]);

  useEffect(() => {
    if (playlistName && isOpen) {
      setName(playlistName);
    }
  }, [playlistName, isOpen]);

  useEffect(() => {
    if (playlistDescription && isOpen) {
      setDescription(playlistDescription);
    }
  }, [playlistDescription, isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (coverImageUrl) {
        setCoverSrc(coverImageUrl);
      } else if (backgroundColor) {
        setCoverColor(backgroundColor);
      }
    }
  }, [backgroundColor, coverImageUrl, isOpen]);

  const presetColors = [
    { value: 'rgb(222, 187, 0)', label: 'Gold' },
    { value: 'rgb(255, 165, 0)', label: 'Sunrise' },
    { value: 'rgb(255, 75, 0)', label: 'Sunset' },
    { value: 'rgb(146, 13, 40)', label: 'Crimson' },
    { value: 'rgb(153, 153, 181)', label: 'Lavender' },
    { value: 'rgb(102, 51, 153)', label: 'Purple' },
    { value: 'rgb(50, 0, 87)', label: 'Indigo' },
    { value: 'rgb(0, 0, 51)', label: 'Night' },
    { value: 'rgb(114, 165, 104)', label: 'Avocado' },
    { value: 'rgb(85, 165, 69)', label: 'Teal' },
    { value: 'rgb(106, 214, 0)', label: 'Lime' },
    { value: 'rgb(34, 139, 34)', label: 'Forest' },
    { value: 'rgb(204, 170, 149)', label: 'Apricot' },
    { value: 'rgb(167 121 141)', label: 'Lilac' },
    { value: 'rgb(238, 149, 151)', label: 'Pink' },
    { value: 'rgb(175, 24, 149)', label: 'Mulberry' },
  ];

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => startCoverImageSelecting()}>
        <Photo /><p>Change cover image</p>
        <input
          className="playlist-modal__file-input"
          type="file"
          ref={inputRef}
          onChange={(event) => editCoverImage(event.target)} />
      </div>,
      key: '0',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => deleteCoverImage()}>
        <Delete /><p>Delete cover image</p>
      </div>,
      key: '1',
    },
    {
      label: <div
        className='dropdown-item'
        onClick={() => { }}>
        <FormatColorFill /><p>Choose cover fill color</p>
      </div>,
      key: '2',
      children: [
        {
          className: 'playlist-modal__color-picker-dropdown',
          key: '2-1',
          onMouseEnter: () => { },
          onClick: () => { },
          label: <div className='playlist-modal__color-picker-dropdown-item'>
            {presetColors.map((preset) => (
              <div
                className="playlist-modal__color-picker-wrapper"
                key={preset.value}>
                <div
                  className="playlist-modal__color-picker"
                  style={{ backgroundColor: preset.value }}
                  onClick={() => editCoverColor(preset.value)}>
                </div>
              </div>
            ))}
          </div>
        }
      ],
    }
  ]

  const clearInfo = () => {
    setCoverSrc('');
    setCoverImage(undefined);
    setCoverColor('');
    setName('');
    setDescription('');
  };

  const onFinish = () => {
    onDone({
      playlistId: playlistId!,
      name,
      backgroundColor: coverColor,
      coverImage,
      description
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
          className="playlist-modal__cancel-button"
          key="cancel"
          onClick={() => onClose()}>
          Cancel
        </Button>,
        <Tooltip key="tooltip" title={createPlaylistDisabledText}>
          <Button
            className="playlist-modal__ok-button"
            key="submit"
            type="primary"
            disabled={createPlaylistDisabled}
            onClick={() => onFinish()}>
            {okButtonText}
          </Button>
        </Tooltip>
      ]}>
      <div className="playlist-modal__wrapper">
        <div
          className="playlist-modal__cover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {isHovered &&
            <div className="playlist-modal__edit-cover-button-wrapper">
              <Dropdown
                className="playlist-modal__edit-cover-button"
                menu={{ items }}
                trigger={['click']}>
                <MoreHoriz sx={{ color: 'white' }} />
              </Dropdown>
            </div>
          }
          <Avatar
            className="playlist-modal__cover-image"
            size={174}
            src={coverSrc}
            style={{ backgroundColor: coverColor }}
            shape="square">
            <Title className="m-0">{name?.trim()?.split('')[0]?.toUpperCase()}</Title>
          </Avatar>
        </div>
        <div className="playlist-modal__credits">
          <Input
            className="playlist-modal__playlist-name"
            placeholder='Playlist name'
            value={name}
            maxLength={50}
            onChange={(event) => setName(event.target.value)} />
        <Input.TextArea
          className="playlist-modal__playlist-description"
          placeholder='Playlist optional description'
          value={description}
          maxLength={200}
          onChange={(event) => setDescription(event.target.value)} />
      </div>
    </div>
    </Modal >
  );
});