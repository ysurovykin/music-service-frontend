import { ArrowBack, ArrowForward, Logout, Person } from '@mui/icons-material';
import { Avatar, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../user/store/user.selectors';
import { listenerProfileTypePalete } from '../../../config';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../user/store/user.actions';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';

const { Text, Title } = Typography;

export function HeaderComponent({
  scrollY,
  text = '',
  background = 'rgb(33, 33, 33)'
}: {
  scrollY: number,
  text?: string,
  background?: string
}) {
  const navigate = useNavigate();
  const userName = useSelector(userSelectors.name);
  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());
  const pageHistoryIndex = window?.history?.state?.idx;
  const pagesForwardCount = window?.history?.length - window?.history?.state?.idx;

  const items: MenuProps['items'] = [
    {
      label: <RouterLink to={'profile'}><div className='header__dropdown-item'><p>Profile</p> <Person /></div></RouterLink>,
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

  const headerOpacity = useMemo(() => {
    if (scrollY < 50) {
      return 0;
    } else if (scrollY < 100) {
      return (scrollY - 50) / 50;
    } else {
      return 1;
    }
  }, [scrollY]);

  const headerTextOpacity = useMemo(() => {
    if (scrollY < 100) {
      return 0;
    } else {
      return 1;
    }
  }, [scrollY]);

  return (
    <div className='header-wrapper'>
      <div className='header__background' style={{ background: background, opacity: headerOpacity }}></div>
      <div className='header'>
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
          <div className='header__title' style={{ opacity: headerTextOpacity }}>
            <Title className='m-0' level={4}>{text}</Title>
          </div>
        </div>
        <Dropdown overlayStyle={{ width: '130px' }} menu={{ items }} trigger={['click']}>
          <div className='header__icon-wrapper--active'>
            <Tooltip title={userName}>
              <Avatar size={'small'} style={{ background: listenerProfileTypePalete.base }}>{userName?.charAt(0)}</Avatar>
            </Tooltip>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}