import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomePage } from '../../home/home.page';
import { useEffect } from 'react';
import { userSelectors } from '../../../user/store/user.selectors';
import { artistProfileActions } from '../../store/artist-profile.actions';
import { ChangeSubscriptionModal } from '../../profile/change-subscription-modal/change-subscription.modal';
import { ProfilePage } from '../../profile/profile.page';
import { EditProfileModal } from '../../profile/edit-profile-modal/edit-profile.modal';

export default function ArtistProfileRouter() {
  const userId = useSelector(userSelectors.userId);

  const dispatch = useDispatch();
  const getArtistProfileById = (id: string) => dispatch(artistProfileActions.getArtistProfileById(id));

  useEffect(() => {
    if (userId) {
      getArtistProfileById(userId);
    }
  }, [userId])

  return (
    <>
      <SidebarComponent />
      <div className='artist-router'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <ChangeSubscriptionModal />
      <EditProfileModal />
    </>
  );
}