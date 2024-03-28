import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const EmptySongListComponent = () => {
  return (
    <div >
      <Title className="empty-song-list" level={4}>No songs found <SentimentVeryDissatisfied /></Title>
    </div>
  )
}