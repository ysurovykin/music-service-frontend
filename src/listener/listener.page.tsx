import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { listenerActions } from "./store/listener.actions";
import { userSelectors } from "../user/store/user.selectors";
import { artistActions } from "./artist/store/artist.actions";
import { artistSelectors } from "./artist/store/artist.selectors";
import { HeaderComponent } from "./components/header/header.component";
import { calculateScrollY } from "../helpers/react/listener-page.helper";

export function ListenerPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const userId = useSelector(userSelectors.userId);
  const artists = useSelector(artistSelectors.artists);
  const pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const getListenerById = (listenerId: string) => dispatch(listenerActions.getListenerById(listenerId));
  const getArtists = () => dispatch(artistActions.getArtists());

  useEffect(() => {
    if (userId) {
      getListenerById(userId);
    }
  }, [userId])

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div className="listener-page listener-group-page">
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