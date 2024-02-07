import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { artistActions } from './store/artist.actions';
import { useSelector } from 'react-redux';
import { artistSelectors } from './store/artist.selectors';
import { Avatar, Button, List, Typography } from 'antd';

const { Text, Title, Link } = Typography;

export function ArtistPage() {
  let navigate = useNavigate();

  const { artistId } = useParams<{artistId: string}>();
  const name = useSelector(artistSelectors.name);
  const country = useSelector(artistSelectors.country);
  const description = useSelector(artistSelectors.description);
  const socialLinks = useSelector(artistSelectors.socialLinks);
  const followers = useSelector(artistSelectors.followers);
  const albums = useSelector(artistSelectors.albums);
  
  const dispatch = useDispatch()
  const getArtistData = (artistId: string) => dispatch(artistActions.getArtistById(artistId));

  useEffect(() => {
    if (artistId) {
      getArtistData(artistId);
    }
  }, [artistId]);
  
  return (
    <div className="artist-page">
      <Button
        onClick={() => navigate(-1)} >
        {'< Back'}
      </Button>
      <div>
        {name && <Title level={4}>Name: {name}</Title>}
        {country && <Title level={4}>Country: {country}</Title>}
        {description && <Title level={4}>Description: {description}</Title>}
        {socialLinks && socialLinks.map(socialLink => 
          <Link href={socialLink.link}>{socialLink.name}</Link>  
        )}
        <Title level={4}>Followers: {followers || 0}</Title>
        <List
            header={<Text>Albums:</Text>}
            bordered
            dataSource={albums}
            renderItem={(album) => (
              <List.Item>
                <Avatar shape='square' size={64} src={album.downloadUrl}/>
                <RouterLink to={`/album/${album.albumId}`}>{album.name}</RouterLink>
                <Text>{album.likes} likes</Text>
              </List.Item>
            )}>
          </List>
      </div>
    </div>
  );
}
