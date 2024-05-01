import React from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "./user/store/user.selectors";
import { HomePage as ListenerHomePage } from "./listener/home/home.page";
import { HomePage as ArtistHomePage} from "./artist/home/home.page";
import { AdminPage } from "./admin/admin.page";

export function MainPage() {

  const profileType = useSelector(userSelectors.profileType);

  const profileTypePages = () => {
    switch (profileType) {
      case 'listener': return <ListenerHomePage />;
      case 'artist': return <ArtistHomePage />;
      case 'admin': return <AdminPage />;
      default: return <>Error</>;
    }
  };

  return profileTypePages();
};