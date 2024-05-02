import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Avatar, Typography } from 'antd';
import { HeaderComponent } from '../../components/header/header.component';
import { getBackground } from '../../../helpers/react/listener-page.helper';
import { SongTableComponent } from '../../components/song-table/song-table.component';
import { useInView } from 'react-intersection-observer';
import { GenerateQueueRequestData } from '../../queue/store/queue.model';
import { queueActions } from '../../queue/store/queue.actions';
import { PlayArrow } from '@mui/icons-material';
import { listenerProfileTypePalete } from '../../../config';
import { listenerSelectors } from '../../store/listener.selectors';
import { userSelectors } from '../../../user/store/user.selectors';

const { Title, Text } = Typography;

export function ListenerTopSongsPage() {
  const { ref, inView } = useInView({ threshold: 1 });

  const [isCoverImageHovered, setIsCoverImageHovered] = useState<boolean>(false);

  const userId = useSelector(userSelectors.userId);
  const name = useSelector(listenerSelectors.name);
  const profileImageUrl = useSelector(listenerSelectors.profileImageUrl);
  const backgroundColor = useSelector(listenerSelectors.backgroundColor);

  const dispatch = useDispatch()
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));

  return (
    <div className='user-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor || 'rgb(17, 102, 11)') }} className="listener-top-songs-page user-group-page">
        <HeaderComponent
          text={name || ''}
          showHeader={!inView}
          background={backgroundColor || 'rgb(17, 102, 11)'}
          playSongsOptions={{ options: { listenerId: userId } }} />
        <div className='listener-top-songs-page__info'>
          <div
            className='listener-top-songs-page__cover-wrapper cursor-pointer'
            onClick={() => generateQueue({
              isNewQueue: true,
              shuffleEnabled: false,
              options: {
                listenerId: userId
              },
              sortingOptions: {}
            })}
            onMouseEnter={() => setIsCoverImageHovered(true)}
            onMouseLeave={() => setIsCoverImageHovered(false)}>
            {profileImageUrl ?
              <Avatar size={160} shape="circle" style={{ position: 'absolute' }} src={profileImageUrl} /> :
              <Avatar size={160} shape='circle' style={{
                position: 'absolute',
                backgroundColor: listenerProfileTypePalete.base,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Title level={1} className="m-0">{name?.split('')[0]?.toUpperCase()}</Title>
              </Avatar>}
            {isCoverImageHovered && <div className='listener-top-songs-page__cover-shadow'></div>}
            {isCoverImageHovered && <PlayArrow sx={{ color: listenerProfileTypePalete.base }} className='listener-top-songs-page__play-button' />}
          </div>
          <div className='listener-top-songs-page__credits'>
            <Title className='m-0' level={5}>Top songs this month</Title>
            <Title className='m-0' ref={ref} level={1}>{name}</Title>
          </div>
        </div>
        <SongTableComponent songsSourceOptions={{ listenerId: userId }} />
      </div>
    </div>
  );
}
