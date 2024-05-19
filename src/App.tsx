import React, { useEffect, useMemo } from 'react';
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

  const currentPalete = useMemo(() => {
    if (profileType === 'listener') {
      return listenerProfileTypePalete;
    } else if (profileType === 'artist') {
      return artistProfileTypePalete;
    } else {
      return listenerProfileTypePalete;
    }
  }, [profileType])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      refreshUserData();
    }
  }, [])

  return (
    <div className="App">
      <ConfigProvider
        renderEmpty={() => <></>}
        theme={{
          components: {
            Steps: {
              colorTextDescription: '#ffffff45',
              colorText: '#ffffff',
              colorPrimary: currentPalete.base
            },
            Carousel: {
              colorBgContainer: currentPalete.base
            },
            List: {
              colorText: '#ffffff'
            },
            Switch: {
              trackHeight: 32,
              trackMinWidth: 54,
              innerMaxMargin: 36,
              handleSize: 28,
              colorTextLightSolid: '#ffffff',
              colorPrimary: artistProfileTypePalete.base,
              colorPrimaryHover: artistProfileTypePalete.base,
              colorTextTertiary: listenerProfileTypePalete.base,
              colorTextQuaternary: listenerProfileTypePalete.base,
            },
            Typography: {
              colorText: '#ffffff',
              colorTextHeading: '#ffffff',
              colorLink: currentPalete.base,
              colorLinkHover: currentPalete.secondary,
              colorLinkActive: currentPalete.base
            },
            Slider: {
              railBg: currentPalete.backgroundAccent,
              railHoverBg: currentPalete.backgroundAccent,
              trackBg: '#ffffff',
              trackHoverBg: currentPalete.base
            },
            Modal: {
              contentBg: currentPalete.backgroundAccent,
              headerBg: currentPalete.backgroundAccent,
              colorTextHeading: currentPalete.backgroundAccentLight,
              colorIconHover: '#ffffff',
              colorIcon: '#ffffff',
            },
            Dropdown: {
              colorBgElevated: currentPalete.backgroundAccent,
              controlItemBgHover: currentPalete.backgroundAccentSemiLight
            },
            Table: {
              colorBgContainer: 'transparent',
              colorText: '#ffffff',
              colorTextHeading: '#ffffff',
              borderColor: 'transparent',
              headerSplitColor: 'transparent',
              headerBorderRadius: 0,
              headerBg: currentPalete.backgroundAccent
            },
            Input: {
              colorText: '#ffffff',
              colorTextPlaceholder: 'grey',
              hoverBg: currentPalete.backgroundAccent,
              activeBg: currentPalete.backgroundAccent,
              colorBgContainer: currentPalete.backgroundAccent,
              colorIconHover: '#ffffff',
              colorIcon: '#ffffff',
            },
            Button: {
              colorText: '#ffffff'
            },
            Select: {
              colorText: '#ffffff',
              colorIconHover: '#ffffff',
              colorIcon: '#ffffff',
              colorTextPlaceholder: 'grey',
              optionActiveBg: currentPalete.backgroundAccentSemiDark,
              optionSelectedBg: currentPalete.backgroundAccentSemiLight,
              selectorBg: currentPalete.backgroundAccent,
              colorBgElevated: currentPalete.backgroundAccent,
              colorTextQuaternary: 'grey'
            },
            Form: {
              colorTextHeading: '#ffffff',
            },
            Checkbox: {
              colorText: '#ffffff',
            },
            Collapse: {
              contentBg: currentPalete.backgroundAccent,
              colorTextHeading: '#ffffff',
            },
            DatePicker: {
              colorBgContainer: currentPalete.backgroundAccent,
              colorBgElevated: currentPalete.backgroundAccent,
              colorTextHeading: '#ffffff',
              colorText: '#ffffff',
              colorTextDescription: 'grey',
              colorTextPlaceholder: 'grey',
              colorPrimary: currentPalete.base,
              activeBorderColor: currentPalete.base,
              colorIconHover: '#ffffff',
              colorIcon: '#ffffff',
            },
            Upload: {
              actionsColor: '#ffffff',
              colorText: '#ffffff',
              colorTextDescription: '#ffffff',
            }
          },
          token: {
            colorPrimary: currentPalete.base,
            colorTextDisabled: '#ffffff',
            colorBgContainerDisabled: (currentPalete.base) + '50'
          }
        }}>
        <AppRouter />
      </ConfigProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
