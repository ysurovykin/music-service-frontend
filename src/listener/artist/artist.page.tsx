import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { artistActions } from './store/artist.actions';
import { useSelector } from 'react-redux';
import { artistSelectors } from './store/artist.selectors';
import { Avatar, Button, List, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { calculateScrollY } from '../../helpers/react/listener-page.helper';

const { Text, Title, Link } = Typography;

export function ArtistPage() {

  const [scrollY, setScrollY] = useState<number>(0);

  const { artistId } = useParams<{ artistId: string }>();

  const name = useSelector(artistSelectors.name);
  const country = useSelector(artistSelectors.country);
  const description = useSelector(artistSelectors.description);
  const socialLinks = useSelector(artistSelectors.socialLinks);
  const followers = useSelector(artistSelectors.followers);
  const albums = useSelector(artistSelectors.albums);
  const backgroundColor = useSelector(artistSelectors.backgroundColor);

  const pageRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  const getArtistData = (artistId: string) => dispatch(artistActions.getArtistById(artistId));

  useEffect(() => {
    if (artistId) {
      getArtistData(artistId);
    }
  }, [artistId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div ref={pageRef} className="artist-page listener-group-page">
        <HeaderComponent background={backgroundColor} scrollY={scrollY} />
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
                <Avatar shape='square' size={64} src={album.coverImageUrl} />
                <RouterLink to={`/album/${album.albumId}`}>{album.name}</RouterLink>
                <Text>{album.likes} likes</Text>
              </List.Item>
            )}>
          </List>
        </div>
      </div>
    </div>
  );
}
