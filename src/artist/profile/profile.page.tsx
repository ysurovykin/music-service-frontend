import React, { useEffect, useMemo } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { artistProfileTypePalete, listenerProfileTypePalete } from "../../config";
import { Avatar, Button, Divider, Tooltip, Typography } from "antd";
import { userSelectors } from "../../user/store/user.selectors";
import { artistProfileSelectors } from "../store/artist-profile.selectors";
import { artistProfileActions } from "../store/artist-profile.actions";
import { renderTitleWithToolTip } from "../../helpers/react/form.helper";
import { DoNotDisturbAltOutlined } from "@mui/icons-material";

const { Title, Link } = Typography;

export function ProfilePage() {
  const { ref, inView } = useInView({ threshold: 1 });

  const name = useSelector(artistProfileSelectors.name);
  const subscription = useSelector(artistProfileSelectors.subscription);
  const subscriptionCanceledAtDate = useSelector(artistProfileSelectors.subscriptionCanceledAtDate);
  const profileImageUrl = useSelector(artistProfileSelectors.profileImageUrl);
  const backgroundColor = useSelector(artistProfileSelectors.backgroundColor);
  const generalStats = useSelector(artistProfileSelectors.generalStats);
  const advancedStats = useSelector(artistProfileSelectors.advancedStats);
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
  const getArtistStats = (artistId: string) => dispatch(artistProfileActions.getArtistStats(artistId));

  useEffect(() => {
    if (userId) {
      getArtistStats(userId);
    }
  }, [userId]);

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
        <div className='profile-page__stats'>
          <div className="profile-page__general-stats-section">
            <Title className="profile-page__general-stats-section-title m-0" level={4}>General stats</Title>
            <Divider className='m-0' style={{ background: 'white' }} />
            <div className="profile-page__general-stats-section-content">
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Followers', 'Total followers count', 5, true)} <span>{generalStats?.followers}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Listeners', 'Total monthly listeners count', 5, true)} <span>{generalStats?.listeners}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Songs count', 'Total songs count', 5, true)} <span>{generalStats?.songsCount}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Duration', 'Total songs time duration', 5, true)} <span>{generalStats?.songsDuration}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Likes', 'Total likes count', 5, true)} <span>{generalStats?.likes}</span>
              </Title>
            </div>
          </div>
          <div className="profile-page__advanced-stats-section">
            <Divider className='m-0' style={{ background: 'white' }} />
            <Title className="profile-page__advanced-stats-section-title m-0" level={4}>Advanced stats</Title>
            <Divider className='m-0' style={{ background: 'white' }} />
            <div className="profile-page__advanced-stats-section-content">
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Plays', 'Total number of song plays', 5, true)} <span>{subscription !== 'free' ? advancedStats?.plays : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Dynamics', 'Monthly listeners dynamics changes over the past month', 5, true)} <span className={subscription !== 'free' ? `album-statistics-component__plays-dynamics--${advancedStats?.playsDynamics?.startsWith('+') ? 'positive' : 'negative'}` : ''}>{subscription !== 'free' ? advancedStats?.playsDynamics : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Radios', 'Radios generated based on your songs', 5, true)} <span>{subscription !== 'free' ? advancedStats?.songRadios : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
              <Title
                className="profile-page__info-data m-0"
                level={5}>
                {renderTitleWithToolTip('Guessers', 'Guessers played based on your songs', 5, true)} <span>{subscription !== 'free' ? advancedStats?.songGuessers : <Tooltip title={'This information is only available with a paid subscription'}> <DoNotDisturbAltOutlined fontSize="small" /></Tooltip>}</span>
              </Title>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};