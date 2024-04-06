import React, { useEffect } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground, renderPlaylistIcon } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listenerActions } from "../store/listener.actions";
import { listenerSelectors } from "../store/listener.selectors";
import { listenerProfileTypePalete } from "../../config";
import { Avatar, Typography } from "antd";

const { Title } = Typography;

export function ProfilePage() {
  const { ref, inView } = useInView({ threshold: 1 }); //TODO set ref to show header

  const name = useSelector(listenerSelectors.name);
  const subscription = useSelector(listenerSelectors.subscription);
  const profileImageUrl = useSelector(listenerSelectors.profileImageUrl);
  const backgroundColor = useSelector(listenerSelectors.backgroundColor);
  const playlistCount = useSelector(listenerSelectors.playlistCount);
  const followedArtistsCount = useSelector(listenerSelectors.followedArtistsCount);
  const likedAlbumsCount = useSelector(listenerSelectors.likedAlbumsCount);

  const dispatch = useDispatch()
  const openEditProfileModal = () => dispatch(listenerActions.openEditProfileModal());
  const getAccountContentCount = () => dispatch(listenerActions.getAccountContentCount());

  useEffect(() => {
    getAccountContentCount();
  }, [])

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor || 'rgb(17, 102, 11)') }} className="profile-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView} />
        <div className='profile-page__info'>
          <div
            className={'profile-page__cover-wrapper'}>
            {profileImageUrl ?
              <Avatar size={160} shape="circle" src={profileImageUrl} /> :
              <Avatar size={160} shape='circle' style={{
                backgroundColor: listenerProfileTypePalete.base,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Title level={1} className="m-0">{name?.split('')[0]?.toUpperCase()}</Title>
              </Avatar>}
          </div>
          <div className='profile-page__credits'>
            <Title
              className='m-0'
              level={5}>Listener profile</Title>
            <Title
              className={'m-0 cursor-pointer'}
              level={1}
              style={{ width: 'fit-content' }}
              ref={ref}
              onClick={() => openEditProfileModal()}>
              {name}
            </Title>
            <Title
              className='m-0'
              level={5}>
              {playlistCount} playlists, {followedArtistsCount} followed artists, {likedAlbumsCount} liked albums
            </Title>
            <Title
              className='m-0'
              level={5}>
              Current subscription: {subscription}
            </Title>
          </div>
        </div>
      </div>
    </div >
  );
};