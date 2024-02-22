import React, { useRef, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { calculateScrollY, getBackground } from "../../helpers/react/listener-page.helper";

export function ListenerPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div className='listener-group-page__wrapper custom-scroll' onScroll={() => setScrollY(calculateScrollY(pageRef))}>
      <div ref={pageRef} style={{ background: getBackground() }} className="library-page listener-group-page">
        <HeaderComponent scrollY={scrollY} />
        Library
      </div>
    </div>
  );
};