import React, { useEffect } from 'react';
import AppRouter from './app.router';
import { ConfigProvider, Spin } from 'antd';
import './App.scss'
import { artistProfileTypePalete, listenerProfileTypePalete } from './config';
import { useSelector } from 'react-redux';
import { userSelectors } from './user/store/user.selectors';
import { useDispatch } from 'react-redux';
import { userActions } from './user/store/user.actions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  const profileType = useSelector(userSelectors.profileType);
  const dispatch = useDispatch();
  const refreshUserData = () => dispatch(userActions.refresh());

  useEffect(() => {
    if (localStorage.getItem('token')) {
      refreshUserData();
    }
  }, [])

  return (
    <div className="App">
      <ConfigProvider
        renderEmpty={() => <Spin />}
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
              colorText: '#ffffff',
              colorTextHeading: '#ffffff',
              colorLink: listenerProfileTypePalete.base,
              colorLinkHover: listenerProfileTypePalete.secondary,
              colorLinkActive: listenerProfileTypePalete.base
            },
            Slider: {
              railBg: listenerProfileTypePalete.backgroundAccent,
              railHoverBg: listenerProfileTypePalete.backgroundAccent,
              trackBg: '#ffffff',
              trackHoverBg: listenerProfileTypePalete.base
            },
            Modal: {
              contentBg: listenerProfileTypePalete.backgroundAccent,
              headerBg: listenerProfileTypePalete.backgroundAccent,
              colorTextHeading: listenerProfileTypePalete.backgroundAccentLight
            },
            Dropdown: {
              colorBgElevated: listenerProfileTypePalete.backgroundAccent,
              controlItemBgHover: listenerProfileTypePalete.backgroundAccentSemiLight
            },
            Table: {
              colorBgContainer: 'transparent',
              colorText: '#ffffff',
              colorTextHeading: '#ffffff',
              borderColor: 'transparent',
              headerSplitColor: 'transparent',
              headerBorderRadius: 0,
              headerBg: listenerProfileTypePalete.backgroundAccent
            },
            Input: {
              colorText: '#ffffff',
              colorTextPlaceholder: 'grey',
              hoverBg: listenerProfileTypePalete.backgroundAccent,
              activeBg: listenerProfileTypePalete.backgroundAccent,
              colorBgContainer: listenerProfileTypePalete.backgroundAccent
            },
            Button: {
              colorText: '#ffffff'
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
      <ToastContainer />
    </div>
  );
}

export default App;
