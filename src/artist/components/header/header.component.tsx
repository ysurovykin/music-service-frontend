import { ArrowBack, ArrowForward, Logout, Person, PlayArrow, SwitchAccountOutlined } from '@mui/icons-material';
import { Avatar, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../user/store/user.selectors';
import { artistProfileTypePalete } from '../../../config';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../user/store/user.actions';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { SwitchProfileTypeRequestData } from '../../../user/store/user.model';
import { artistProfileSelectors } from '../../store/artist-profile.selectors';

const { Title } = Typography;

export function HeaderComponent({
  showHeader,
  text = '',
  background = artistProfileTypePalete.backgroundAccentLight,
  isHomePage
}: {
  showHeader?: boolean,
  text?: string,
  background?: string,
  isHomePage?: boolean,
}) {
  const navigate = useNavigate();
  const artistName = useSelector(artistProfileSelectors.name);
  const userId = useSelector(userSelectors.userId);
  const profileImageUrl = useSelector(artistProfileSelectors.profileImageUrl);
  const hasListenerProfile = useSelector(userSelectors.hasListenerProfile);

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());
  const switchProfileType = (request: SwitchProfileTypeRequestData) => dispatch(userActions.switchProfileType(request));

  const pageHistoryIndex = window?.history?.state?.idx;

  const switchProfileTypeFunction = () => {
    switchProfileType({
      newProfileType: 'listener',
      userId: userId!,
      shouldCreateNew: !hasListenerProfile
    });
    navigate('/');
  }

  const items: MenuProps['items'] = [
    {
      label: <RouterLink to={'/profile'}><div className='header__dropdown-item'><p>Profile</p> <Person /></div></RouterLink>,
      key: '0',
    },
    {
      label: <div className='header__dropdown-item' onClick={() => switchProfileTypeFunction()}>
        <p>{hasListenerProfile ? 'Switch to Listener profile' : 'Create Listener Profile'}</p> <SwitchAccountOutlined />
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
    <div className='header-wrapper'>
      <div
        className={`header__background${isHomePage ? '--home-page' : ''}`}
        style={{ background: background, opacity: showHeader ? 1 : 0 }}>
        <div className='header__background-shadow'></div>
      </div>
      <div className='header'>
        <div className='header__content'>
          <div className='header__navigation-wrapper'>
            <Tooltip title={pageHistoryIndex === 0 ? '' : 'Go back'}>
              <div
                className={`header__icon-wrapper${pageHistoryIndex === 0 ? '--disabled' : '--active'}`}
                onClick={() => pageHistoryIndex !== 0 && navigate(-1)} >
                <ArrowBack fontSize='small' className={`header__icon${pageHistoryIndex === 0 ? '--disabled' : '--active'}`} />
              </div>
            </Tooltip>
            {text ? <div className='header__title' style={{ opacity: showHeader ? 1 : 0 }}>
              <Title className='m-0' level={4}>{text}</Title>
            </div> : null}
          </div>
          <Dropdown overlayStyle={{ width: '170px' }} menu={{ items }} trigger={['click']}>
            <div className='header__icon-wrapper--active'>
              <Tooltip title={artistName}>
                <Avatar
                  className='header__avatar'
                  size={'small'}
                  src={profileImageUrl}
                  style={profileImageUrl ? {} : { background: artistProfileTypePalete.base }}>{artistName?.charAt(0)}</Avatar>
              </Tooltip>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}