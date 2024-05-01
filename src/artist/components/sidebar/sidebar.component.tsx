import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  LibraryMusicOutlined,
  HomeOutlined,
  SearchOutlined,
  PushPin,
  PushPinOutlined,
  QuizOutlined
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { listenerProfileTypePalete } from "../../../config";

export function SidebarComponent() {

  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__home-section">
        <Tooltip
          placement="right"
          title='Home'>
          <RouterLink to='/'><HomeOutlined fontSize="large" /></RouterLink>
        </Tooltip>
      </div>
      <div className="sidebar__library-section">
        <div className="sidebar__library-pins">
          
        </div>
      </div>
    </div>
  );
};