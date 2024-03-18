import React from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "./user/store/user.selectors";
import { HomePage } from "./listener/home.page";
import { ArtistPage } from "./artist/artist.page";
import { AdminPage } from "./admin/admin.page";

export function MainPage() {

  const profileType = useSelector(userSelectors.profileType);

  const profileTypePages = () => {
    switch (profileType) {
      case 'listener': return <HomePage />;
      case 'artist': return <ArtistPage />;
      case 'admin': return <AdminPage />;
      default: return <>Error</>;
    }
  };

  return profileTypePages();
};