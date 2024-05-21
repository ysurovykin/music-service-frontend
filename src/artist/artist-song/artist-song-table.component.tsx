import React, { memo, useEffect, useState } from "react";
import { Avatar, Dropdown, Table, Tooltip, Typography } from "antd";
import { DOMAIN } from "../../config";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime } from "../../helpers/react/song-player.helper";
import { showNotification } from "../../helpers/react/redux.helper";
import { ColumnProps, ColumnsType } from "antd/es/table";
import { ArtistSongInfoResponseData } from "./store/artist-song.model";
import { AccessTime, ContentCopyOutlined, Explicit, MoreHoriz, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { artistSongActions } from "./store/artist-song.actions";
import { useSelector } from "react-redux";
import { artistSongSelectors } from "./store/artist-song.selectors";
import { MenuProps } from "antd/lib";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export const ArtistSongTableComponent = ({
  albumId
}: {
  albumId: string
}) => {
  const artistSongs = useSelector(artistSongSelectors.artistSongs);

  const dispatch = useDispatch();
  const getArtistAlbumSongs = (albumId: string) => dispatch(artistSongActions.getArtistAlbumSongs(albumId));
  const hideSong = (songId: string) => dispatch(artistSongActions.hideSong(songId));
  const unhideSong = (songId: string) => dispatch(artistSongActions.unhideSong(songId));

  const copySongLink = (songId: string) => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${albumId}?songId=${songId}`);
    showNotification('success', 'Song link copied to clipboard');
  }

  useEffect(() => {
    if (albumId) {
      getArtistAlbumSongs(albumId)
      localStorage.setItem('currentArtistAlbumId', albumId)
    }
  }, [albumId])

  const renderTableColumns = (): ColumnsType<ArtistSongInfoResponseData> => {
    const titleColumn: ColumnProps<ArtistSongInfoResponseData> = {
      title: <p style={{ paddingLeft: '16px' }}>Title</p>,
      width: '60%',
      dataIndex: 'name',
      key: 'name',
      render: (value, record, index) => (
        <div
          className='artist-song__wrapper artist-song__wrapper--without-cover'
          key={record.songId}>
          <div className="artist-song__index-wrapper">
            <Text>{index + 1}</Text>
          </div>
          <div className="artist-song__credentials">
            <Title className="m-0" level={5}>{record?.name}</Title>
            <div>
              <Text className='artist-song__credentials-artists-wrapper'>
                {record?.hidden ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
                {record?.explicit ? <Tooltip title='Explicit'><Explicit fontSize="small" /></Tooltip> : <></>}
                {record?.coArtists && <div>
                  <Text>Feat: </Text><Text>{record?.coArtists
                    ?.map<React.ReactNode>(artist => <Text>{artist.name}</Text>)
                    .reduce((prev, curr) => [prev, ', ', curr])}</Text>
                </div>}
              </Text>
            </div>
          </div>
        </div >
      )
    };

    const playsColumn: ColumnProps<ArtistSongInfoResponseData> = {
      title: 'Plays',
      align: 'center',
      width: '30%',
      dataIndex: 'plays',
      key: 'plays'
    };

    const durationColumn: ColumnProps<ArtistSongInfoResponseData> = {
      title: <AccessTime fontSize='small' />,
      align: 'center',
      width: '10%',
      dataIndex: 'duration',
      render: (value, record) => formatTime(record.duration || 0),
      key: 'duration'
    };

    const generateMenuItems = (record: ArtistSongInfoResponseData): MenuProps['items'] => {
      return [
        (record.hidden ? {
          label: <div
            className='dropdown-item'
            onClick={() => unhideSong(record.songId!)}>
            <VisibilityOutlined /><p>Unhide song</p><Tooltip title={'This option will return the song to users\` recommendations and return the ability to play it. You can always change its visibility'}> <QuestionCircleOutlined /></Tooltip>
          </div>,
          key: '0',
        } : {
          label: <div
            className='dropdown-item'
            onClick={() => hideSong(record.songId!)}>
            <VisibilityOffOutlined /><p>Hide song</p><Tooltip title={'This option will temporarily remove the song from users\` recommendations and remove the ability to and play it. You can always change its visibility'}> <QuestionCircleOutlined /></Tooltip>
          </div>,
          key: '0',
        }),
        {
          type: 'divider',
        },
        {
          label: <div
            className='dropdown-item'
            onClick={() => copySongLink(record?.songId || '')}>
            <ContentCopyOutlined /><p>Copy song link</p>
          </div>,
          key: '1',
        }
      ]
    };

    const menuColumn: ColumnProps<ArtistSongInfoResponseData> = {
      align: 'center',
      width: '75px',
      dataIndex: 'duration',
      render: (value, record) =>
        <Tooltip title={`More options for song ${record.name}`}>
          <div className="song-player__additional-controller-icon-wrapper cursor-pointer">
            <Dropdown menu={{ items: generateMenuItems(record) }} trigger={['click']}>
              <MoreHoriz sx={{ color: 'white' }} />
            </Dropdown>
          </div>
        </Tooltip>,
      key: 'menu'
    };

    return [
      titleColumn,
      playsColumn,
      durationColumn,
      menuColumn
    ]
  }

  return (
    <Table
      dataSource={artistSongs?.map(song => ({ ...song, key: song.songId }))}
      columns={renderTableColumns()}
      pagination={false}
      bordered={false}
      sticky={{ offsetHeader: 64 }} />
  );
};