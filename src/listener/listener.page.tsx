import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../user/store/user.actions";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { artistSelectors } from "./artist/store/artist.selectors";
import { List, Typography } from "antd";
import { artistActions } from "./artist/store/artist.actions";
import { listenerActions } from "./store/listener.actions";
import { userSelectors } from "../user/store/user.selectors";
import { listenerSelectors } from "./store/listener.selectors";
import { songActions } from "./song/store/song.actions";
import { songSelectors } from "./song/store/song.selectors";

const { Text, Title } = Typography;

export function ListenerPage() {
  const isArtistQueueLoading = useSelector(artistSelectors.isArtistQueueLoading);
  const artists = useSelector(artistSelectors.artists);
  const userId = useSelector(userSelectors.userId);
  const currentSongId = useSelector(songSelectors.songId);
  const lastListenedSongId = useSelector(listenerSelectors.songId);

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());
  const getArtistsData = () => dispatch(artistActions.getArtists());
  const getListenerById = (listenerId: string) => dispatch(listenerActions.getListenerById(listenerId));
  const getSongById = (songId: string) => dispatch(songActions.getSongById(songId));

  useEffect(() => {
    getArtistsData();
  }, []);

  useEffect(() => {
    if (userId) {
      getListenerById(userId);
    }
  }, [userId])
  
  useEffect(() => {
    if (!currentSongId && lastListenedSongId) {
      getSongById(lastListenedSongId);
    }
  }, [lastListenedSongId])

  return (
    <div className="listener-page">
      <Title 
        style={{margin: '0px'}}
        level={1}>
        Listener
      </Title>
      <button onClick={logout}>Logout</button>
      <div>
        {isArtistQueueLoading ?
          <Text>Loading</Text> :
          <List
            header={<Text>Artists:</Text>}
            bordered
            dataSource={artists}
            renderItem={(artist) => (
              <List.Item>
                <RouterLink to={`/artist/${artist.artistId}`}>{artist.name}</RouterLink>
              </List.Item>
            )}>
          </List>
        }
      </div>
    </div>
  );
};