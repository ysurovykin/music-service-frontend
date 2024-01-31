import React, { useEffect } from 'react';
import AppRouter from './app-router.component';
import { ConfigProvider } from 'antd';
import './App.scss'
import { artistProfileTypePalete, listenerProfileTypePalete } from './config';
import { useSelector } from 'react-redux';
import { userSelectors } from './user/store/user.selectors';
import { useDispatch } from 'react-redux';
import { userActions } from './user/store/user.actions';

function App() {

  const profileType = useSelector(userSelectors.profileType);
  const dispatch = useDispatch();
  const refreshUserData = () => dispatch(userActions.refreshStart());

  useEffect(() => {
    if (localStorage.getItem('token')) {
      refreshUserData();
    }
  }, [])

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          components: {
            Steps: {
              colorTextDescription: '#ffffff45',
              colorText: '#ffffff',
              colorPrimary: profileType === 'listener' ? listenerProfileTypePalete.base : artistProfileTypePalete.base
            },
            Carousel: {
              colorBgContainer: profileType === 'listener' ? listenerProfileTypePalete.base : artistProfileTypePalete.base
            },
            Switch: {
              trackHeight: 32,
              trackMinWidth: 54,
              innerMaxMargin: 36,
              handleSize: 28,
              colorTextLightSolid: '#000000',
              colorPrimary: artistProfileTypePalete.base,
              colorPrimaryHover: artistProfileTypePalete.base,
              colorTextTertiary: listenerProfileTypePalete.base,
              colorTextQuaternary: listenerProfileTypePalete.base,
            },
            Typography: {
              colorText: '#ffffff'
            },
            Slider: {
              railBg: listenerProfileTypePalete.backgroundAccent,
              railHoverBg: listenerProfileTypePalete.backgroundAccent,
              trackBg: '#ffffff',
              trackHoverBg: listenerProfileTypePalete.base
            }
          },
          token: {
            colorPrimary: profileType === 'listener' ? listenerProfileTypePalete.base : artistProfileTypePalete.base,
            colorTextDisabled: '#ffffff',
            colorBgContainerDisabled: (profileType === 'listener' ? listenerProfileTypePalete.base : artistProfileTypePalete.base) + '50'
          }
        }}>
        <AppRouter />
      </ConfigProvider>
    </div>
  );
}

export default App;
