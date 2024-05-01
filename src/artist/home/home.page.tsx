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

const { Title } = Typography;

export function HomePage() {
  const { ref, inView } = useInView({ threshold: 0 });

  const navigate = useNavigate();

  const userId = useSelector(userSelectors.userId);
  const name = useSelector(artistProfileSelectors.name);
  const [backgroundColor, setBackgroundColor] = useState<string>('rgba(70, 70, 70, 1)');

  const [{ background }, api] = useSpring(() => ({
    background: getBackground(backgroundColor),
    config: {
      duration: 800
    }
  }));

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (userId) {
     
    }
  }, [userId])

  useEffect(() => {
    api.start({ background: getBackground(backgroundColor) })
  }, [backgroundColor])

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
        </div>
      </animated.div>
    </div>
  );
};