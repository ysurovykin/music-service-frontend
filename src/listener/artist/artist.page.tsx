import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { artistActions } from './store/artist.actions';
import { useSelector } from 'react-redux';
import { artistSelectors } from './store/artist.selectors';
import { Avatar, List, Typography } from 'antd';
import { HeaderComponent } from '../components/header/header.component';
import { getBackground } from '../../helpers/react/listener-page.helper';
import { useInView } from 'react-intersection-observer';

const { Text, Title, Link } = Typography;

export function ArtistPage() {

  const { ref, inView } = useInView({ threshold: 1 });

  const { artistId } = useParams<{ artistId: string }>();

  const name = useSelector(artistSelectors.name);
  const country = useSelector(artistSelectors.country);
  const description = useSelector(artistSelectors.description);
  const socialLinks = useSelector(artistSelectors.socialLinks);
  const followers = useSelector(artistSelectors.followers);
  const albums = useSelector(artistSelectors.albums);
  const backgroundColor = useSelector(artistSelectors.backgroundColor);

  const dispatch = useDispatch()
  const getArtistData = (artistId: string) => dispatch(artistActions.getArtistById(artistId));

  useEffect(() => {
    if (artistId) {
      getArtistData(artistId);
    }
  }, [artistId]);

  return (
    <div className='listener-group-page__wrapper custom-scroll'>
      <div style={{ background: getBackground(backgroundColor) }} className="artist-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={!inView} />
        <div>
          {name && <Title ref={ref} level={4}>Name: {name}</Title>}
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
              </List.Item>
            )}>
          </List>
        </div>
      </div>
    </div>
  );
}
