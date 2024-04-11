import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenerActions } from "../store/listener.actions";
import { userSelectors } from "../../user/store/user.selectors";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground, renderPlaylistIcon } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Avatar, Spin, Typography } from "antd";
import { listenerSelectors } from "../store/listener.selectors";
import { HomePageContentResponseData, ContentData, GetHomePageContentRequestData } from "../store/listener.model";
import { PlaylistTagEnum } from "../playlist/store/playlist.model";
import { animated, useSpring } from "@react-spring/web"
import { useNavigate } from "react-router-dom";
import { AlbumCardComponent } from "../album/album-card/album-card.component";
import { ArtistCardComponent } from "../artist/artist-card/artist-card.component";
import { PlaylistCardComponent } from "../playlist/playlist-views/playlist-card/playlist-card.component";

const { Title } = Typography;

export function HomePage() {
  const { ref, inView } = useInView({ threshold: 0 });

  const navigate = useNavigate();

  const userId = useSelector(userSelectors.userId);
  const name = useSelector(userSelectors.name);
  const mostVisitedContent = useSelector(listenerSelectors.mostVisitedContent);
  const isMostVisitedContentLoading = useSelector(listenerSelectors.isMostVisitedContentLoading);
  const homePageContent = useSelector(listenerSelectors.homePageContent);
  const isHomePageContentLoading = useSelector(listenerSelectors.isHomePageContentLoading);
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
  const getHomePageContent = (requset: GetHomePageContentRequestData) => dispatch(listenerActions.getHomePageContent(requset));

  useEffect(() => {
    if (userId) {
      getListenerById(userId);
      getRecentMostVisitedContent();
      getHomePageContent({});
    }
  }, [userId])

  useEffect(() => {
    api.start({ background: getBackground(backgroundColor) })
  }, [backgroundColor])

  const renderPopularVisitCover = (content: ContentData) => {
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

  const renderHomePageContent = (contentData: Array<ContentData>) => {
    if (contentData?.length) {
      return contentData.map(contentElement => {
        if (contentElement.type === 'album') {
          return (
            <div
              onMouseEnter={() => setBackgroundColor(contentElement.backgroundColor!)}
              onMouseLeave={() => setBackgroundColor('rgba(70, 70, 70, 1)')}>
              <AlbumCardComponent
                showLikeButton={false}
                showArtistInfo={true}
                key={contentElement.albumId}
                album={contentElement} />
            </div>
          )
        } else if (contentElement.type === 'artist') {
          return (
            <div
              onMouseEnter={() => setBackgroundColor(contentElement.backgroundColor!)}
              onMouseLeave={() => setBackgroundColor('rgba(70, 70, 70, 1)')}>
              <ArtistCardComponent
                artist={contentElement}
                key={contentElement.artistId} />
            </div>
          )
        } else if (contentElement.type === 'playlist') {
          return (
            <div
              onMouseEnter={() => setBackgroundColor(contentElement.backgroundColor!)}
              onMouseLeave={() => setBackgroundColor('rgba(70, 70, 70, 1)')}>
              <PlaylistCardComponent
                playlist={contentElement}
                key={contentElement.playlistId} />
            </div>
          )
        } else {
          return <div></div>;
        }
      });
    } else {
      return <></>
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
          {homePageContent?.length ?
            <div>
              {isHomePageContentLoading ?
                <div className='artist-page__loader-wrapper'><Spin /></div> :
                <div>
                  {homePageContent?.map((contentData) =>
                    <div
                      key={contentData.contentTitle}
                      className="home-page__recomendation-content">
                      <Title level={3}>{contentData.contentTitle}</Title>
                      <div className='home-page__content-wrapper custom-scroll-x'>
                        <div className="home-page__content">
                          {renderHomePageContent(contentData.content)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              }
            </div> :
            null
          }
        </div>
      </animated.div>
    </div>
  );
};