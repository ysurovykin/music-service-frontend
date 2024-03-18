import { ArrowBack, ArrowForward, Logout, Person, PlayArrow } from '@mui/icons-material';
import { Avatar, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../user/store/user.selectors';
import { listenerProfileTypePalete } from '../../../config';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../user/store/user.actions';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { GenerateQueueOptions } from '../../queue/store/queue.model';
import { ReactNode } from 'react';

const { Text, Title } = Typography;

export function HeaderComponent({
  showHeader,
  text = '',
  background = listenerProfileTypePalete.backgroundAccentLight,
  songsSourceOptions,
  element,
  secondRow,
  isHomePage
}: {
  showHeader?: boolean,
  text?: string,
  background?: string,
  songsSourceOptions?: GenerateQueueOptions,
  element?: ReactNode,
  secondRow?: ReactNode,
  isHomePage?: boolean,
}) {
  const navigate = useNavigate();
  const userName = useSelector(userSelectors.name);

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());

  const pageHistoryIndex = window?.history?.state?.idx;
  const pagesForwardCount = window?.history?.length - window?.history?.state?.idx;

  const items: MenuProps['items'] = [
    {
      label: <RouterLink to={'/profile'}><div className='header__dropdown-item'><p>Profile</p> <Person /></div></RouterLink>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <div className='header__dropdown-item' onClick={() => logout()}><p>Logout</p> <Logout /></div>,
      key: '1',
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
            <Tooltip title={pagesForwardCount <= 2 ? '' : 'Go forward'}>
              <div
                className={`header__icon-wrapper${(pagesForwardCount <= 2) ? '--disabled' : '--active'}`}
                onClick={() => (pagesForwardCount > 2) && navigate(1)} >
                <ArrowForward fontSize='small' className={`header__icon${(pagesForwardCount <= 2) ? '--disabled' : '--active'}`} />
              </div>
            </Tooltip>
            {text ? <div className='header__title' style={{ opacity: showHeader ? 1 : 0 }}>
              <Title className='m-0' level={4}>{text}</Title>
            </div> : null}
            {element ? <div className='header__title' style={{ opacity: showHeader ? 1 : 0 }}>
              {element}
            </div> : null}
            {songsSourceOptions && <div style={{ opacity: showHeader ? 1 : 0 }}>
              <Tooltip title='Play'>
                <Avatar
                  className='header__play-button cursor-pointer'
                  style={{ background: listenerProfileTypePalete.base }}
                  icon={<PlayArrow sx={{ color: 'black' }} />} />
              </Tooltip>
            </div>}
          </div>
          <Dropdown overlayStyle={{ width: '130px' }} menu={{ items }} trigger={['click']}>
            <div className='header__icon-wrapper--active'>
              <Tooltip title={userName}>
                <Avatar size={'small'} style={{ background: listenerProfileTypePalete.base }}>{userName?.charAt(0)}</Avatar>
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