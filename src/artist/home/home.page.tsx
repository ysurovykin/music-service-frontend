import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Avatar, Spin, Typography } from "antd";
import { animated, useSpring } from "@react-spring/web"
import { useNavigate } from "react-router-dom";
import { userSelectors } from "../../user/store/user.selectors";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { HeaderComponent } from "../components/header/header.component";
import { artistProfileSelectors } from "../store/artist-profile.selectors";
import { AlbumStatisticsComponent } from "./album-statistics/album-statistics.component";
import { artistAlbumSelectors } from "../artist-album/store/artist-album.selectors";
import { artistAlbumActions } from "../artist-album/store/artist-album.actions";

const { Title } = Typography;

export function HomePage() {
  const { ref, inView } = useInView({ threshold: 0 });
  const [backgroundColor, setBackgroundColor] = useState<string>('rgba(70, 70, 70, 1)');

  const navigate = useNavigate();

  const userId = useSelector(userSelectors.userId);
  const subscription = useSelector(artistProfileSelectors.subscription);
  const name = useSelector(artistProfileSelectors.name);
  const albumStats = useSelector(artistAlbumSelectors.albumStats);

  const [{ background }, api] = useSpring(() => ({
    background: getBackground(backgroundColor),
    config: {
      duration: 800
    }
  }));

  const dispatch = useDispatch();
  const getAlbumsStats = (artistId: string) => dispatch(artistAlbumActions.getAlbumsStats(artistId));

  useEffect(() => {
    if (userId) {
      getAlbumsStats(userId)
    }
  }, [userId])

  useEffect(() => {
    api.start({ background: getBackground(backgroundColor) })
  }, [backgroundColor])

  return (
    <div className='user-group-page__wrapper custom-scroll-y'>
      <animated.div style={{ background: background }} className="home-page user-group-page">
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
          {albumStats?.map(albumStat =>
            <AlbumStatisticsComponent
              album={albumStat}
              subscription={subscription!} />
          )}
        </div>
      </animated.div>
    </div>
  );
};