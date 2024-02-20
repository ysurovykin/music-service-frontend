import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "antd";
import { listenerActions } from "./store/listener.actions";
import { userSelectors } from "../user/store/user.selectors";
import { artistActions } from "./artist/store/artist.actions";
import { artistSelectors } from "./artist/store/artist.selectors";
import { HeaderComponent } from "./components/header/header.component";

const { Text, Title } = Typography;

export function ListenerPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const userId = useSelector(userSelectors.userId);
  const artists = useSelector(artistSelectors.artists);
  const pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const getListenerById = (listenerId: string) => dispatch(listenerActions.getListenerById(listenerId));
  const getArtists = () => dispatch(artistActions.getArtists());

  const calculateScrollY = () => {
    return Math.abs((pageRef?.current?.getBoundingClientRect().top || 0) - (pageRef?.current?.offsetTop || 0));
  }

  useEffect(() => {
    if (userId) {
      getListenerById(userId);
    }
  }, [userId])

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className='listener-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY())}>
      <div className="listener-page">
        <HeaderComponent background={'red'} scrollY={scrollY} />
        {artists?.map(artist => (
          <div>
            <RouterLink to={`/artist/${artist.artistId}`}>
              {artist.name}
            </RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
};