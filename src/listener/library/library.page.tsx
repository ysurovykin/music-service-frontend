import React from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";

export function LibraryPage() {
  const { ref, inView } = useInView({ threshold: 1 }); //TODO set ref to show header

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-page listener-group-page">
        <HeaderComponent showHeader={!inView} />
        Library
      </div>
    </div>
  );
};