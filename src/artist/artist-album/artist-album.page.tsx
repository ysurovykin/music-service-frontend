import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { artistAlbumActions } from './store/artist-album.actions';
import { useSelector } from 'react-redux';
import { artistAlbumSelectors } from './store/artist-album.selectors';
import { Avatar, Dropdown, Tooltip, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { formatPlaylistTime, getBackground, renderPlaylistIcon } from '../../helpers/react/listener-page.helper';
import { useInView } from 'react-intersection-observer';
import { ContentCopyOutlined, Favorite, FavoriteBorder, MoreHoriz, PlayArrow, PlaylistAdd, PlaylistAddCheck, QuizOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { DOMAIN, listenerProfileTypePalete } from '../../config';
import { MenuProps } from 'antd/lib';
import { showNotification } from '../../helpers/react/redux.helper';
import { artistProfileSelectors } from '../store/artist-profile.selectors';
import { renderTextWithToolTip } from '../../helpers/react/form.helper';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

export function AlbumPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { albumId } = useParams<{ albumId: string }>();

  const name = useSelector(artistAlbumSelectors.name);
  const date = useSelector(artistAlbumSelectors.date);
  const albumCoverImageUrl = useSelector(artistAlbumSelectors.coverImageUrl);
  const backgroundColor = useSelector(artistAlbumSelectors.backgroundColor);
  const songsCount = useSelector(artistAlbumSelectors.songsCount);
  const songsTimeDuration = useSelector(artistAlbumSelectors.songsTimeDuration);
  const subscription = useSelector(artistProfileSelectors.subscription);

  const dispatch = useDispatch()
  const getAlbumData = (albumId: string) => dispatch(artistAlbumActions.getAlbumById(albumId));
  const openEditAlbumModal = () => dispatch(artistAlbumActions.openEditAlbumModal());

  useEffect(() => {
    if (albumId) {
      getAlbumData(albumId);
    }
  }, [albumId]);

  const copyAlbumLink = () => {
    navigator.clipboard.writeText(`${DOMAIN}/album/${albumId}`);
    showNotification('success', 'Album link copied to clipboard');
  }

  const items: MenuProps['items'] = [
    {
      label: <div
        className='dropdown-item'
        onClick={() => copyAlbumLink()}>
        <ContentCopyOutlined /><p>Copy album link</p>
      </div>,
      key: '0',
    },
    (true ? {
      label: <div
        className='dropdown-item'
        onClick={() => { }}>
        <VisibilityOffOutlined /><p>Hide album</p><Tooltip title={'This option will temporarily remove the album and all its songs from users\` recommendations and remove the ability to view it and play its songs for users. You can always change its visibility'}> <QuestionCircleOutlined /></Tooltip>
      </div>,
      key: '1',
    } : {
      label: <div
        className='dropdown-item'
        onClick={() => { }}>
        <VisibilityOutlined /><p>Unhide album</p><Tooltip title={'This option will return the album and all its songs to users\` recommendations and return the ability to view it and play its songs. You can always change its visibility'}> <QuestionCircleOutlined /></Tooltip>
      </div>,
      key: '1',
    })
  ];

  return (
    <div className='user-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="album-page user-group-page">
        <HeaderComponent
          text={name || ''}
          showHeader={!inView}
          background={backgroundColor} />
        <div className='album-page__info'>
          <div className='album-page__cover-wrapper'>
            {renderPlaylistIcon(160, 'absolute', albumCoverImageUrl, undefined, backgroundColor, name)}
          </div>
          <div className='album-page__credits'>
            <Title className='m-0' level={5}>Album</Title>
            <Title
              className='mt-0 cursor-pointer'
              ref={ref}
              level={1}
              onClick={() => openEditAlbumModal()}>
              {name}
            </Title>
            <div className='album-page__info-section'>
              <Title className='m-0' level={5}>
                {songsCount} songs, {formatPlaylistTime(songsTimeDuration!)}
              </Title>
              <Tooltip title={`More options for album ${name}`}>
                <Dropdown menu={{ items }} trigger={['click']}>
                  <MoreHoriz className='cursor-pointer' sx={{ color: 'white' }} />
                </Dropdown>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
