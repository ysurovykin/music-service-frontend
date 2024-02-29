import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { listenerActions } from "./store/listener.actions";
import { userSelectors } from "../user/store/user.selectors";
import { artistActions } from "./artist/store/artist.actions";
import { artistSelectors } from "./artist/store/artist.selectors";
import { HeaderComponent } from "./components/header/header.component";
import { getBackground } from "../helpers/react/listener-page.helper";
import { listenerSelectors } from "./store/listener.selectors";
import { useInView } from "react-intersection-observer";

export function ListenerPage() {
  const { ref, inView } = useInView({ threshold: 1 }); //TODO set ref to show header

  const userId = useSelector(userSelectors.userId);
  const artists = useSelector(artistSelectors.artists);
  const backgroundColor = useSelector(listenerSelectors.backgroundColor);

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
    <div className='listener-group-page__wrapper custom-scroll'>
      <div style={{background: getBackground(backgroundColor)}} className="listener-page listener-group-page">
        <HeaderComponent
          background={backgroundColor}
          showHeader={!inView} />
        {artists?.map(artist => (
          <div key={artist.artistId}>
            <RouterLink to={`/artist/${artist.artistId}`}>
              {artist.name}
            </RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
};