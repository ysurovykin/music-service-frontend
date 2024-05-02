import React, { useMemo } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { artistProfileTypePalete, listenerProfileTypePalete } from "../../config";
import { Avatar, Button, Divider, Typography } from "antd";
import { userSelectors } from "../../user/store/user.selectors";
import { artistProfileSelectors } from "../store/artist-profile.selectors";
import { artistProfileActions } from "../store/artist-profile.actions";

const { Title, Link } = Typography;

export function ProfilePage() {
  const { ref, inView } = useInView({ threshold: 1 });

  const name = useSelector(artistProfileSelectors.name);
  const subscription = useSelector(artistProfileSelectors.subscription);
  const subscriptionCanceledAtDate = useSelector(artistProfileSelectors.subscriptionCanceledAtDate);
  const profileImageUrl = useSelector(artistProfileSelectors.profileImageUrl);
  const backgroundColor = useSelector(artistProfileSelectors.backgroundColor);
  const userId = useSelector(userSelectors.userId);

  const formatedSubscription = useMemo(() => {
    if (!subscriptionCanceledAtDate) {
      return subscription;
    } else {
      return `${subscription} until ${subscriptionCanceledAtDate}`;
    }
  }, [subscriptionCanceledAtDate, subscription]);

  const dispatch = useDispatch()
  const openEditProfileModal = () => dispatch(artistProfileActions.openEditProfileModal());
  const openChangeSubscriptionModal = () => dispatch(artistProfileActions.openChangeSubscriptionModal());

  return (
    <div className='user-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor || 'rgb(35, 69, 174)') }} className="profile-page user-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor || 'rgb(35, 69, 174)'}
          showHeader={!inView} />
        <div className='profile-page__info'>
          <div
            className={'profile-page__cover-wrapper'}>
            {profileImageUrl ?
              <Avatar size={160} shape="circle" src={profileImageUrl} /> :
              <Avatar size={160} shape='circle' style={{
                backgroundColor: artistProfileTypePalete.base,
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
              level={5}>Artist profile</Title>
            <Title
              className={'mt-0 cursor-pointer'}
              level={1}
              style={{ width: 'fit-content' }}
              ref={ref}
              onClick={() => openEditProfileModal()}>
              {name}
            </Title>
            <Title
              className='m-0'
              level={5}>
              {/* {playlistCount} <Link onClick={() => navigate('/library/playlists')}>playlists</Link>, {followedArtistsCount} <Link onClick={() => navigate('/library/artists')}>followed artists</Link>, {likedAlbumsCount} <Link onClick={() => navigate('/library/albums')}>liked albums</Link> */}
            </Title>
            <div className="profile-page__subscription-section">
              <Title
                className='m-0'
                level={5}>
                Current subscription: {formatedSubscription}
              </Title>
              {subscriptionCanceledAtDate ?
                <></> :
                <Button
                  className="profile-page__change-subscription-button"
                  onClick={() => openChangeSubscriptionModal()}>
                  Change
                </Button>}
            </div>
          </div>
        </div>
        <Divider className='m-0' />
      </div>
    </div >
  );
};