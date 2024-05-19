import React, { memo, useEffect, useState } from "react";
import { Avatar, Table, Tooltip, Typography } from "antd";
import { DOMAIN } from "../../config";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { formatTime } from "../../helpers/react/song-player.helper";
import { showNotification } from "../../helpers/react/redux.helper";
import { ColumnProps, ColumnsType } from "antd/es/table";
import { ArtistSongInfoResponseData } from "./store/artist-song.model";
import { AccessTime, Explicit } from "@mui/icons-material";

const { Text, Title } = Typography;

export const ArtistSongTableComponent = () => {
  const dispatch = useDispatch();

  const copySongLink = (song: ArtistSongInfoResponseData) => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${'song?.album?.id'}?songId=${'song?.songId'}`);
    showNotification('success', 'Song link copied to clipboard');
  }

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
                {record?.explicit ? <Tooltip title='Explicit'><Explicit fontSize="small" /></Tooltip> : <></>}
                {/* {record?.artists
                  ?.map<React.ReactNode>(artist => <RouterLink key={artist.name} to={`/artist/${artist.id}`}>{artist.name}</RouterLink>)
                  .reduce((prev, curr) => [prev, ', ', curr])} */}
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

    return [
      titleColumn,
      playsColumn,
      durationColumn
    ]
  }

  return (
    <Table
      // songs?.map(song => ({ ...song, key: song.songId }))
      dataSource={[{
        backgroundColor: 'rgb(66, 101, 160)',
        coverImageUrl: 'https://firebasestorage.googleapis.com/v0/b/music-service-3d701.appspot.com/o/album-covers%2FRwmvcNaySz604R3m%2FtWVkydVGN2VlJBLN?alt=media',
        duration: 181.08,
        explicit: false,
        hidden: false,
        name: 'New Song',
        plays: 0,
        songId: 'Hn8vPqRHv2HEbNBL'
      }]}
      columns={renderTableColumns()}
      pagination={false}
      bordered={false}
      sticky={{ offsetHeader: 64 }} />
  );
};