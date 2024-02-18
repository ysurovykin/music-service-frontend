import { Routes, Route } from 'react-router-dom';
import { SongPlayerComponent } from '../song-player/song-player.component';
import { ArtistPage } from '../../artist/artist.page';
import { AlbumPage } from '../../album/album.page';
import { QueuePage } from '../../queue/queue.page';
import { ListenerPage } from '../../listener.page';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlaylistPage } from '../../playlist/playlist.page';

export default function ListenerRouter() {
  return (
    <>
      <SidebarComponent />
      <div className='listener-router__wrapper'>
        <Routes>
          <Route path="/" element={<ListenerPage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
          <Route path="/queue" element={<QueuePage />} />
        </Routes>
      </div>
      <SongPlayerComponent />
    </>
  );
}