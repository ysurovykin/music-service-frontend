import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { listenerSelectors } from "../../store/listener.selectors";
import { Typography } from "antd";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { HeaderComponent } from "../header/header.component";

const { Title } = Typography;

export function PageNotFoundPage() {
  const backgroundColor = useSelector(listenerSelectors.backgroundColor);
  const name = useSelector(listenerSelectors.name);

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground(backgroundColor) }} className="page-not-found-page listener-group-page">
        <HeaderComponent
          text={name || ''}
          background={backgroundColor}
          showHeader={false} />
        <div className="page-not-found-page__wrapper">
          <div>
            <Title className='m-0' style={{fontSize: '96px'}}>404</Title>
          </div>
          <div>
            <Title level={2}>Page not found</Title>
          </div>
        </div>
      </div>
    </div>
  );
};