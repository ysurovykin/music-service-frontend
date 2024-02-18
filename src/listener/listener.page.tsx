import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "antd";
import { listenerActions } from "./store/listener.actions";
import { userSelectors } from "../user/store/user.selectors";
import { artistActions } from "./artist/store/artist.actions";
import { artistSelectors } from "./artist/store/artist.selectors";

const { Text, Title } = Typography;

export function ListenerPage() {
  const userId = useSelector(userSelectors.userId);
  const artists = useSelector(artistSelectors.artists);

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
    <div className="listener-page listener-group-page">
      {artists?.map(artist => (
        <div>
          <RouterLink to={`/artist/${artist.artistId}`}>
            {artist.name}
          </RouterLink>
        </div>
      ))}
    </div>
  );
};