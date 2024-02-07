import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../user/store/user.actions";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { artistSelectors } from "./artist/store/artist.selectors";
import { List, Typography } from "antd";
import { artistActions } from "./artist/store/artist.actions";

const { Text, Title } = Typography;

export function ListenerPage() {
  const isArtistQueueLoading = useSelector(artistSelectors.isArtistQueueLoading);
  const artists = useSelector(artistSelectors.artists);

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());
  const getArtistsData = () => dispatch(artistActions.getArtists());

  useEffect(() => {
    getArtistsData();
  }, []);

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