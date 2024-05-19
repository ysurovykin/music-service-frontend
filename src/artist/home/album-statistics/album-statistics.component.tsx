import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Divider, Spin, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AlbumFullResponseData, AlbumStatsResponseData } from "../../artist-album/store/artist-album.model";
import { renderTitleWithToolTip } from "../../../helpers/react/form.helper";
import { formatPlaylistTime } from "../../../helpers/react/listener-page.helper";
import { DoNotDisturbAltOutlined } from "@mui/icons-material";

const { Title } = Typography;

export function AlbumStatisticsComponent({
  album,
  subscription
}: {
  album: AlbumStatsResponseData,
  subscription: string
}) {
  const dispatch = useDispatch();

  return (
    <div className='album-statistics-component'>
      <div className="album-statistics-component__title">
        <Title level={3}>{album.name}</Title>
      </div>
      <Divider className='m-0' style={{ background: 'white' }} />
      <div className="album-statistics-component__content">
        <div className="album-statistics-component__album-avatar">
          <Avatar
            className="album-modal__cover-image"
            style={{ borderRadius: '0px 0px 0px 8px' }}
            size={200}
            src={album.coverImageUrl}
            shape="square">
          </Avatar>
        </div>
        <Divider className='m-0' style={{ background: 'white', height: 'auto' }} type="vertical" />
        <div className="album-statistics-component__album-stats">
          <div className="album-statistics-component__album-general-stats-section">
            <Title className="album-statistics-component__album-general-stats-section-title m-0" level={4}>General stats</Title>
            <Divider className='m-0' style={{ background: 'white' }} />
            <div className="album-statistics-component__album-general-stats-section-content">
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Songs count', 'Total songs count', 5, true)} <span>{album?.generalStats?.songsCount}</span>
              </Title>
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Duration', 'Total songs time duration', 5, true)} <span>{formatPlaylistTime(album?.generalStats?.songsTimeDuration!)}</span>
              </Title>
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Likes', 'Total likes', 5, true)} <span>{album?.generalStats?.likes}</span>
              </Title>
            </div>
          </div>
          <Divider className='m-0' style={{ background: 'white', height: 'auto' }} type="vertical" />
          <div className="album-statistics-component__album-advanced-stats-section">
            <Title className="album-statistics-component__album-advanced-stats-section-title m-0" level={4}>Advanced stats</Title>
            <Divider className='m-0' style={{ background: 'white' }} />
            <div className="album-statistics-component__album-advanced-stats-section-content">
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Plays', 'Total number of song plays', 5, true)} <span>{subscription !== 'free' ? album?.advancedStats?.plays : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Dynamics', 'Listening dynamics changes over the past month', 5, true)} <span className={subscription !== 'free' ? `album-statistics-component__plays-dynamics--${album?.advancedStats?.playsDynamics?.startsWith('+') ? 'positive' : 'negative'}` : ''}>{subscription !== 'free' ? album?.advancedStats?.playsDynamics : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Radios', 'Radios generated based on songs from this album', 5, true)} <span>{subscription !== 'free' ? album?.advancedStats?.songRadios : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
              <Title
                className="album-statistics-component__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Guessers', 'Guessers played based on this album', 5, true)} <span>{subscription !== 'free' ? album?.advancedStats?.songGuessers : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};