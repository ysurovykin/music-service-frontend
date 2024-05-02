import { ArrowBack, ArrowForward, Logout, Person, PlayArrow, SwitchAccountOutlined } from '@mui/icons-material';
import { Avatar, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../user/store/user.selectors';
import { listenerProfileTypePalete } from '../../../config';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../user/store/user.actions';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { GenerateQueueOptions, GenerateQueueRequestData } from '../../queue/store/queue.model';
import { ReactNode } from 'react';
import { queueActions } from '../../queue/store/queue.actions';
import { GetSongsSortingOptions } from '../../song/store/song.model';
import { SwitchProfileTypeRequestData } from '../../../user/store/user.model';
import { listenerSelectors } from '../../store/listener.selectors';

const { Text, Title } = Typography;

export function HeaderComponent({
  showHeader,
  text = '',
  background = listenerProfileTypePalete.backgroundAccentLight,
  playSongsOptions,
  element,
  secondRow,
  isHomePage
}: {
  showHeader?: boolean,
  text?: string,
  background?: string,
  playSongsOptions?: {
    options?: GenerateQueueOptions,
    onlyLiked?: boolean,
    sortingOptions?: GetSongsSortingOptions,
  },
  element?: ReactNode,
  secondRow?: ReactNode,
  isHomePage?: boolean,
}) {
  const navigate = useNavigate();
  const listenerName = useSelector(listenerSelectors.name);
  const userId = useSelector(userSelectors.userId);
  const hasArtistProfile = useSelector(userSelectors.hasArtistProfile);

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());
  const generateQueue = (request: GenerateQueueRequestData) => dispatch(queueActions.generateQueue(request));
  const switchProfileType = (request: SwitchProfileTypeRequestData) => dispatch(userActions.switchProfileType(request));

  const pageHistoryIndex = window?.history?.state?.idx;
  const pagesForwardCount = window?.history?.length - window?.history?.state?.idx;

  const items: MenuProps['items'] = [
    {
      label: <RouterLink to={'/profile'}><div className='header__dropdown-item'><p>Profile</p> <Person /></div></RouterLink>,
      key: '0',
    },
    {
      label: <div className='header__dropdown-item' onClick={() => switchProfileType({
        newProfileType: 'artist',
        userId: userId!,
        shouldCreateNew: !hasArtistProfile
      })}>
        <p>{hasArtistProfile ? 'Switch to Artist profile' : 'Create Artist Profile'}</p> <SwitchAccountOutlined />
      </div>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <div className='header__dropdown-item' onClick={() => logout()}><p>Logout</p> <Logout /></div>,
      key: '2',
    }
  ];

  return (
    <div className={`header-wrapper${secondRow ? '--two-rows' : '--one-row'}`}>
      <div
        className={`header__background${isHomePage ? '--home-page' : ''}`}
        style={{ background: background, opacity: showHeader ? 1 : 0 }}>
        <div className='header__background-shadow'></div>
      </div>
      <div className={`header${secondRow ? '--two-rows' : '--one-row'}`}>
        <div className='header__content'>
          <div className='header__navigation-wrapper'>
            <Tooltip title={pageHistoryIndex === 0 ? '' : 'Go back'}>
              <div
                className={`header__icon-wrapper${pageHistoryIndex === 0 ? '--disabled' : '--active'}`}
                onClick={() => pageHistoryIndex !== 0 && navigate(-1)} >
                <ArrowBack fontSize='small' className={`header__icon${pageHistoryIndex === 0 ? '--disabled' : '--active'}`} />
              </div>
            </Tooltip>
            {/* <Tooltip title={pagesForwardCount <= 2 ? '' : 'Go forward'}>
              <div
                className={`header__icon-wrapper${(pagesForwardCount <= 2) ? '--disabled' : '--active'}`}
                onClick={() => (pagesForwardCount > 2) && navigate(1)} >
                <ArrowForward fontSize='small' className={`header__icon${(pagesForwardCount <= 2) ? '--disabled' : '--active'}`} />
              </div>
            </Tooltip> */}
            {text ? <div className='header__title' style={{ opacity: showHeader ? 1 : 0 }}>
              <Title className='m-0' level={4}>{text}</Title>
            </div> : null}
            {element ? <div className='header__title' style={{ opacity: showHeader ? 1 : 0 }}>
              {element}
            </div> : null}
            {playSongsOptions && <div style={{ opacity: showHeader ? 1 : 0 }}>
              <Tooltip title='Play'>
                <Avatar
                  className='header__play-button cursor-pointer'
                  onClick={() => generateQueue({
                    isNewQueue: true,
                    shuffleEnabled: false,
                    options: {
                      ...playSongsOptions.options
                    },
                    onlyLiked: playSongsOptions.onlyLiked,
                    sortingOptions: playSongsOptions.sortingOptions ? { ...playSongsOptions.sortingOptions } : {}
                  })}
                  style={{ background: listenerProfileTypePalete.base }}
                  icon={<PlayArrow sx={{ color: 'black' }} />} />
              </Tooltip>
            </div>}
          </div>
          <Dropdown overlayStyle={{ width: '170px' }} menu={{ items }} trigger={['click']}>
            <div className='header__icon-wrapper--active'>
              <Tooltip title={listenerName}>
                <Avatar
                  className='header__avatar'
                  size={'small'}
                  style={{ background: listenerProfileTypePalete.base }}>{listenerName?.charAt(0)}</Avatar>
              </Tooltip>
            </div>
          </Dropdown>
        </div>
        {secondRow ? <div className='header__content'>
          {secondRow}
        </div> : null}
      </div>
    </div>
  );
}