import React from "react";
import { Avatar, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { ArtistInfoResponseData } from "../store/artist.model";
import { useInView } from "react-intersection-observer";

const { Text, Title } = Typography;

export function ArtistCardComponent({
  artist,
  reference
}: {
  artist: ArtistInfoResponseData;
  reference?: ((node?: Element | null | undefined) => void) | null
}) {
  const navigate = useNavigate();
  return (
    <div
      ref={reference}
      className="artist-card cursor-pointer"
      onClick={() => navigate(`/artist/${artist.artistId}`)}>
      <Avatar src={artist.profileImageUrl} size={128} />
      <div className="artist-card__title-wrapper">
        <Title className="artist-card__title m-0" level={5}>{artist.name}</Title>
      </div>
    </div>
  );
}