import React, { useRef, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { calculateScrollY } from "../../helpers/react/listener-page.helper";

export function SearchPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div className="search-page listener-group-page">
        <HeaderComponent background={'red'} scrollY={scrollY} />
        Search
      </div>
    </div>
  );
};