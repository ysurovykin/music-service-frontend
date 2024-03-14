import React, { useEffect, useMemo } from "react";
import { Avatar, Divider, Modal, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { artistSelectors } from "../store/artist.selectors";
import { artistActions } from "../store/artist.actions";
import { PieChart } from '@mui/x-charts';
import { GENRES, listenerProfileTypePalete } from "../../../config";
import { Box } from "@mui/material";
import { renderTitleWithToolTip } from "../../../helpers/react/form.helper";

const { Text, Title } = Typography;

export function DiscoverArtistModal() {
  const isDiscoverArtistModalOpen = useSelector(artistSelectors.isDiscoverArtistModalOpen);
  const name = useSelector(artistSelectors.name);
  const genres = useSelector(artistSelectors.genres);
  const artistId = useSelector(artistSelectors.artistId);
  const songsCount = useSelector(artistSelectors.songsCount);
  const albumsCount = useSelector(artistSelectors.albumsCount);
  const albumsWhereAppearsCount = useSelector(artistSelectors.albumsWhereAppearsCount);
  const profileImageUrl = useSelector(artistSelectors.profileImageUrl);
  const description = useSelector(artistSelectors.description);
  const followers = useSelector(artistSelectors.followers);

  const pieData = useMemo(() => {
    return genres?.map((genre, index) => ({
      id: index,
      value: genre.percentage,
      label: GENRES[genre.name].label || '',
      color: GENRES[genre.name].color || ''
    })) || [];
  }, [genres]);

  const dispatch = useDispatch();
  const closeDiscoverArtistModal = () => dispatch(artistActions.closeDiscoverArtistModal());
  const getGenres = (artistId: string) => dispatch(artistActions.getGenres(artistId));

  const closeModal = () => {
    closeDiscoverArtistModal();
  }

  useEffect(() => {
    if (artistId) {
      getGenres(artistId);
    }
  }, [artistId])

  return (
    <Modal
      title={name}
      open={isDiscoverArtistModalOpen}
      onCancel={() => closeModal()}
      width={700}
      style={{ maxHeight: 500 }}
      footer={[]}>
      <div style={{ maxHeight: 400 }} className="custom-scroll-y">
        <div>
          <div className="discover-artist-modal__info-section">
            <div className="discover-artist-modal__stats-wrapper">
              <div>
                <Avatar size={128} src={profileImageUrl} />
              </div>
              <div className="discover-artist-modal__stats">
                <div className="discover-artist-modal__listeners">
                  <div className="discover-artist-modal__stat">
                    <Title
                      className="m-0"
                      level={5}>
                      {followers}
                    </Title>
                    <Text
                      className="m-0 info-text">
                      Followers
                    </Text>
                  </div>
                  <div className="discover-artist-modal__stat">
                    <Title
                      className="m-0"
                      level={5}>
                      {followers}
                    </Title>
                    <Text
                      className="m-0 info-text">
                      Monthly listeners
                    </Text>
                  </div>
                </div>
                <div className="discover-artist-modal__releases">
                  <div className="discover-artist-modal__stat">
                    <Title
                      className="m-0"
                      level={5}>
                      {songsCount}
                    </Title>
                    <Text
                      className="m-0 info-text">
                      {songsCount === 1 ? 'Song' : 'Songs'}
                    </Text>
                  </div>
                  <div className="discover-artist-modal__stat">
                    <Title
                      className="m-0"
                      level={5}>
                      {albumsCount}
                    </Title>
                    <Text
                      className="m-0 info-text">
                      {albumsCount === 1 ? 'Album' : 'Albums'}
                    </Text>
                  </div>
                  <div className="discover-artist-modal__stat">
                    <Title
                      className="m-0"
                      level={5}>
                      {albumsWhereAppearsCount}
                    </Title>
                    <Text
                      className="m-0 info-text">
                      {albumsWhereAppearsCount === 1 ? 'Appearance' : 'Appearances'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Text className="info-text">{description}</Text>
            </div>
          </div>
          {pieData.length ? <>
            <Divider />
            <div>
              {renderTitleWithToolTip("Frequency of genre appearance", "Percentage of songs by an artist in a given genre", 4, true)}
              <Box>
                <PieChart series={[
                  {
                    data: pieData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    valueFormatter: (element) => `${element.value}%`
                  }
                ]}
                  margin={{
                    right: 400
                  }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      labelStyle: {
                        fontSize: 14,
                        fill: listenerProfileTypePalete.backgroundAccentLight
                      }
                    }
                  }}
                  height={300}
                />
              </Box>
            </div>
          </> : null
          }
        </div>
      </div>
    </Modal >
  );
}