import React, { useMemo, useEffect, useState, useRef } from "react";
import { Button, Checkbox, Input, InputRef, Modal, Select, SelectProps, Tag, Tooltip, Typography, Upload } from "antd";
import { useDispatch } from "react-redux";
import { Close, Delete } from "@mui/icons-material";
import { artistProfileTypePalete, songGenres, songLanguages } from "../../../config";
import { renderTitleWithToolTip } from "../../../helpers/react/form.helper";
import { artistSongActions } from "../store/artist-song.actions";
import { UploadSongRequestData } from "../store/artist-song.model";
import { useSelector } from "react-redux";
import { artistSongSelectors } from "../store/artist-song.selectors";
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from "@ant-design/icons";

type TagRender = SelectProps['tagRender'];
const { Text, Title } = Typography;

export const UploadArtistSongModal = () => {
  const [songFile, setSongFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [explicit, setExplicit] = useState<boolean>(false);
  const [hasCoArtists, setHasCoArtists] = useState<boolean>(false);
  const [coArtistIds, setCoArtistIds] = useState<Array<string>>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  const isUploadSongModalOpen = useSelector(artistSongSelectors.isUploadSongModalOpen);
  const isUploadSongLoading = useSelector(artistSongSelectors.isUploadSongLoading);

  const dispatch = useDispatch();
  const closeUploadSongModal = () => dispatch(artistSongActions.closeUploadSongModal());
  const uploadSong = (request: UploadSongRequestData) => dispatch(artistSongActions.uploadSong(request));

  const genreOptions = useMemo(() => {
    return Object.keys(songGenres)?.map(genre => ({ label: songGenres[genre].label, value: genre }));
  }, [songGenres]);

  const languageOptions = useMemo(() => {
    return Object.keys(songLanguages)?.map(language => ({ label: songLanguages[language].label, value: language }));
  }, [songLanguages]);

  const uploadSongDisabled = useMemo(() => {
    return !name || !selectedGenres.length || !selectedLanguage || isUploadSongLoading;
  }, [name, selectedGenres, selectedLanguage, isUploadSongLoading]);

  const uploadSongDisabledText = useMemo(() => {
    if (!name) {
      return 'Song name is required';
    } else if (!selectedGenres) {
      return 'Song must have at least one genre';
    } else if (!selectedLanguage) {
      return 'Song language is required';
    } else {
      return '';
    }
  }, [name, selectedGenres, selectedLanguage]);

  const genreTagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={songGenres[value]?.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedCoartistId: string) => {
    const newCoArtistIds = coArtistIds.filter((coartistId) => coartistId !== removedCoartistId);
    setCoArtistIds(newCoArtistIds);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && coArtistIds.indexOf(inputValue) === -1) {
      setCoArtistIds([...coArtistIds, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const renderAddCoArtistSection = () => {
    return (
      <>
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag onClick={showInput} style={{ borderStyle: 'dashed', background: 'transparent', color: 'white' }}>
            <PlusOutlined /> Coartist Id
          </Tag>
        )}
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            appear={false}
            enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            onEnd={(e) => {
              if (e.type === 'appear' || e.type === 'enter') {
                (e.target as any).style = 'display: inline-block';
              }
            }}
          >
            {coArtistIds.map((tag: string) => (
              <span key={tag} style={{ display: 'inline-block' }}>
                <Tag
                  style={{ background: artistProfileTypePalete.base, color: 'white' }}
                  closable
                  onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                  }}
                >
                  {tag}
                </Tag>
              </span>))
            }
          </TweenOneGroup>
        </div>
      </>
    );
  }

  return (
    <Modal
      title='Upload new song'
      open={isUploadSongModalOpen}
      closable={false}
      onCancel={() => closeUploadSongModal()}
      width={500}
      footer={[
        <Button
          className="upload-artist-song-modal__cancel-button"
          key="cancel"
          onClick={() => closeUploadSongModal()}>
          Cancel
        </Button>,
        <Tooltip key="tooltip" title={uploadSongDisabledText}>
          <Button
            className="upload-artist-song-modal__ok-button"
            key="submit"
            type="primary"
            disabled={uploadSongDisabled}
            onClick={() => uploadSong({
              albumId: localStorage.getItem('currentArtistAlbumId')!,
              explicit: explicit,
              genres: selectedGenres,
              language: selectedLanguage,
              name: name,
              song: songFile!,
              coArtistIds: hasCoArtists ? coArtistIds : []
            })}>
            Upload song
          </Button>
        </Tooltip>
      ]}>
      <div className="upload-artist-song-modal__song-info-section">
        <Input
          className="upload-artist-song-modal__song-name"
          placeholder='Song name'
          value={name}
          maxLength={50}
          onChange={(event) => setName(event.target.value)} />
        <Upload
          beforeUpload={(file) => {
            setSongFile(file);
            return false;
          }}
          maxCount={1}
          itemRender={() => null}>
          <Button type="primary">{songFile ? 'Change song' : 'Upload song'}</Button>
        </Upload>
      </div>
      {songFile && <div className="upload-artist-song-modal__song-data-section">
        <Text style={{ fontSize: '12px' }}>Uploaded file name: {songFile.name}</Text>
        <Delete
          fontSize="small"
          className="upload-artist-song-modal__delete-uploaded-file"
          sx={{ color: 'white' }} />
      </div>}
      <div className="upload-artist-song-modal__song-details-section">
        <div>
          {renderTitleWithToolTip('Song genres', 'If you do not find the required genre, please contact support', 5, true)}
          <Select
            mode="multiple"
            tagRender={genreTagRender}
            allowClear
            style={{ width: '100%' }}
            placeholder="Genres"
            onChange={(value) => setSelectedGenres(value)}
            options={genreOptions}
          />
        </div>
        <div>
          {renderTitleWithToolTip('Song main language', 'If you do not find the required language, please contact support', 5, true)}
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            placeholder="Languages"
            onChange={(value) => setSelectedLanguage(value)}
            options={languageOptions}
          />
        </div>
        <Checkbox
          onChange={(event) => setExplicit(event.target.checked)}>
          Explicit
        </Checkbox>
        <Checkbox
          onChange={(event) => setHasCoArtists(event.target.checked)}>
          Song has coartists?
        </Checkbox>
        {hasCoArtists ? renderAddCoArtistSection() : <></>}
      </div>
    </Modal>
  );
};