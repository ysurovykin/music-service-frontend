import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenerActions } from "./store/listener.actions";
import { userSelectors } from "../user/store/user.selectors";
import { HeaderComponent } from "./components/header/header.component";
import { getBackground, renderPlaylistIcon } from "../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Avatar, Spin, Typography } from "antd";
import { listenerSelectors } from "./store/listener.selectors";
import { MostVisitedContentData } from "./store/listener.model";
import { PlaylistTagEnum } from "./playlist/store/playlist.model";
import { animated, useSpring } from "@react-spring/web"
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export function HomePage() {
  const { ref, inView } = useInView({ threshold: 0 });

  const navigate = useNavigate();

  const userId = useSelector(userSelectors.userId);
  const name = useSelector(userSelectors.name);
  const mostVisitedContent = useSelector(listenerSelectors.mostVisitedContent);
  const isMostVisitedContentLoading = useSelector(listenerSelectors.isMostVisitedContentLoading);
  const [backgroundColor, setBackgroundColor] = useState<string>('rgba(70, 70, 70, 1)');

  const [{ background }, api] = useSpring(() => ({
    background: getBackground(backgroundColor),
    config: {
      duration: 800
    }
  }));

  const dispatch = useDispatch();
  const getListenerById = (listenerId: string) => dispatch(listenerActions.getListenerById(listenerId));
  const getRecentMostVisitedContent = () => dispatch(listenerActions.getRecentMostVisitedContent());

  useEffect(() => {
    if (userId) {
      getListenerById(userId);
      getRecentMostVisitedContent();
    }
  }, [userId])

  useEffect(() => {
    api.start({background: getBackground(backgroundColor)})
  }, [backgroundColor])

  const renderPopularVisitCover = (content: MostVisitedContentData) => {
    if (content.type === 'album') {
      return (
        <div
          className='home-page__most-visited-content'
          key={`most-visited-${content.albumId}`}
          onClick={() => navigate(`/album/${content.albumId}`)}
          onMouseEnter={() => setBackgroundColor(content.backgroundColor!)}
          onMouseLeave={() => setBackgroundColor('rgba(70, 70, 70, 1)')}>
          {renderPlaylistIcon(64, 'relative', content.coverImageUrl, undefined, content.backgroundColor, content.name, '6px 0px 0px 6px')}
          <Title className="m-0 home-page__most-visited-content-title" level={5}>{content.name}</Title>
        </div>
      )
    } else if (content.type === 'artist') {
      return (
        <div
          className='home-page__most-visited-content'
          key={`most-visited-${content.artistId}`}
          onClick={() => navigate(`/artist/${content.artistId}`)}
          onMouseEnter={() => setBackgroundColor(content.backgroundColor!)}
          onMouseLeave={() => setBackgroundColor('rgba(70, 70, 70, 1)')}>
          <Avatar shape="square" size={64} style={{ borderRadius: '6px 0px 0px 6px' }} src={content.profileImageUrl} />
          <Title className="m-0 home-page__most-visited-content-title" level={5}>{content.name}</Title>
        </div>
      )
    } else if (content.type === 'playlist') {
      return (
        <div
          className='home-page__most-visited-content'
          key={`most-visited-${content.playlistId}`}
          onClick={() => navigate(`/playlist/${content.playlistId}`)}
          onMouseEnter={() => setBackgroundColor(content.backgroundColor!)}
          onMouseLeave={() => setBackgroundColor('rgba(70, 70, 70, 1)')}>
          {renderPlaylistIcon(64, 'relative', content.coverImageUrl, content.tag as PlaylistTagEnum, content.backgroundColor, content.name, '6px 0px 0px 6px')}
          <Title className="m-0 home-page__most-visited-content-title" level={5}>{content.name}</Title>
        </div>
      )
    }
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <animated.div style={{ background: background }} className="home-page listener-group-page">
        <HeaderComponent
          background={backgroundColor}
          showHeader={!inView}
          isHomePage={true} />
        <div className="home-page-wrapper">
          <Title
            className='mt-0'
            ref={ref}>
            Hi, {name}
          </Title>
          {mostVisitedContent?.length ?
            <div className={`home-page__popular-visits${mostVisitedContent?.length <= 4 ? '--one-row' : '--two-rows'}`}>
              {isMostVisitedContentLoading ?
                <div className='artist-page__loader-wrapper'><Spin /></div> :
                mostVisitedContent?.map(content => renderPopularVisitCover(content))
              }
            </div> :
            null
          }
        </div>
      </animated.div>
    </div>
  );
};