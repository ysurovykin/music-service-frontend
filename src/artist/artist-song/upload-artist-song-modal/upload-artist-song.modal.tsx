import React, { useMemo, useEffect, useState } from "react";
import { Avatar, Button, Checkbox, Divider, Input, Modal, Select, SelectProps, Table, Tag, Tooltip, Typography, Upload } from "antd";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { Delete } from "@mui/icons-material";
import { songGenres, songLanguages } from "../../../config";
import { renderTitleWithToolTip } from "../../../helpers/react/form.helper";

type TagRender = SelectProps['tagRender'];
const { Text, Title } = Typography;

export const UploadArtistSongModal = () => {
  const [songFile, setSongFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const dispatch = useDispatch();

  const genreOptions = useMemo(() => {
    return Object.keys(songGenres)?.map(genre => ({ label: songGenres[genre].label, value: genre }));
  }, [songGenres]);

  const languageOptions = useMemo(() => {
    return Object.keys(songLanguages)?.map(language => ({ label: songLanguages[language].label, value: language }));
  }, [songLanguages]);


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

  return (
    <Modal
      title='Upload new song'
      open={false}
      closable={false}
      onCancel={() => console.log()} //TODO FIX
      width={500}
      footer={[
        <Button
          className="upload-artist-song-modal__cancel-button"
          key="cancel"
          onClick={() => console.log()} /*TODO FIX*/>
          Cancel
        </Button>,
        <Tooltip key="tooltip" title={'ADD TEXT'}>
          <Button
            className="upload-artist-song-modal__ok-button"
            key="submit"
            type="primary"
            disabled={false} //TODO FIX
            onClick={() => console.log()}  /*TODO FIX*/>
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
        <Checkbox>
          Explicit
        </Checkbox>
        <Checkbox>
          Song has coartists?
        </Checkbox>
      </div>
    </Modal>
  );
};