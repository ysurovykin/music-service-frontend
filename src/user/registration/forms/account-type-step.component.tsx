import React, { useRef } from 'react';
import { Carousel, Form, FormInstance, List, Row, Switch, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { artistProfileTypePalete, listenerProfileTypePalete } from '../../../config';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user.actions';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.selectors';
import { ProfileTypeEnum } from '../../store/user.model';

const { Title } = Typography;

export function AccountTypeStep({ form }: { form?: FormInstance }) {

  const dispatch = useDispatch();
  const profileType = useSelector(userSelectors.profileType);
  const switchUserToArtist = () => dispatch(userActions.switchUserToArtist());
  const switchUserToListener = () => dispatch(userActions.switchUserToListener());

  const userData = [
    'Listen to any artists around the world.',
    'Create playlists with your favorite tracks.',
    'Get personal recommendations.',
    'Get your music activity statistics.',
  ];

  const artistData = [
    'Add your own music.',
    'Create and edit albums.',
    'Track the number of song plays.',
    'Track your content statistics.',
  ];

  const carouselRef = useRef<CarouselRef>(null);

  const handleSwitchChange = (artistProfileType: boolean) => {
    artistProfileType ? switchUserToArtist() : switchUserToListener();
    if (carouselRef && carouselRef.current) {
      carouselRef.current.goTo(artistProfileType ? 1 : 0);
    }
  };

  return (
    <>
      <Row
        className="place-center"
        gutter={16}>
        <Title
          className="account-type-step__title"
          level={5}>
          Profile type capabilities
        </Title>
      </Row>
      <Carousel
        style={{ marginBottom: '24px' }}
        ref={carouselRef}
        dots={false}
        initialSlide={profileType === ProfileTypeEnum.artist ? 1 : 0}
        fade={true}>
        <div>
          <List
            bordered
            style={{ backgroundColor: listenerProfileTypePalete.base }}
            dataSource={userData}
            renderItem={(item: string) => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </div>
        <div>
          <List
            bordered
            style={{ backgroundColor: artistProfileTypePalete.base }}
            dataSource={artistData}
            renderItem={(item: string) => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </div>
      </Carousel>
      <Form.Item className="place-center" >
        <Row
          className="place-center"
          gutter={16}>
          <Switch
            checked={profileType === ProfileTypeEnum.artist}
            onChange={handleSwitchChange}
            checkedChildren="Artist profile"
            unCheckedChildren="Listener profile" />
        </Row>
      </Form.Item>
    </>
  );
}