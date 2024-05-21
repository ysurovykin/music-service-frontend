import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { all } from "redux-saga/effects";
import { userReducer } from "./user/store/user.reducer";
import { userEffects } from "./user/store/user.effects";
import { UserState } from "./user/store/user.model";
import { ArtistState } from "./listener/artist/store/artist.model";
import { artistEffects } from "./listener/artist/store/artist.effects";
import { artistReducer } from "./listener/artist/store/artist.reducer";
import { AlbumState } from "./listener/album/store/album.model";
import { albumEffects } from "./listener/album/store/album.effects";
import { albumReducer } from "./listener/album/store/album.reducer";
import { songReducer } from "./listener/song/store/song.reducer";
import { songEffects } from "./listener/song/store/song.effects";
import { SongState } from "./listener/song/store/song.model";
import { ListenerState } from "./listener/store/listener.model";
import { listenerEffects } from "./listener/store/listener.effects";
import { listenerReducer } from "./listener/store/listener.reducer";
import { PlaylistState } from "./listener/playlist/store/playlist.model";
import { playlistEffects } from "./listener/playlist/store/playlist.effects";
import { playlistReducer } from "./listener/playlist/store/playlist.reducer";
import { QueueState } from "./listener/queue/store/queue.model";
import { queueReducer } from "./listener/queue/store/queue.reducer";
import { queueEffects } from "./listener/queue/store/queue.effects";
import { LyricsState } from "./listener/lyrics/store/lyrics.model";
import { lyricsReducer } from "./listener/lyrics/store/lyrics.reducer";
import { lyricsEffects } from "./listener/lyrics/store/lyrics.effects";
import { SongRadioState } from "./listener/song-radio/store/song-radio.model";
import { songRadioEffects } from "./listener/song-radio/store/song-radio.effects";
import { songRadioReducer } from "./listener/song-radio/store/song-radio.reducer";
import { SongGuesserState } from "./listener/song-guesser/store/song-guesser.model";
import { songGuesserEffects } from "./listener/song-guesser/store/song-guesser.effects";
import { songGuesserReducer } from "./listener/song-guesser/store/song-guesser.reducer";
import { ArtistProfileState } from "./artist/store/artist-profile.model";
import { artistProfileEffects } from "./artist/store/artist-profile.effects";
import { artistProfileReducer } from "./artist/store/artist-profile.reducer";
import { artistAlbumReducer } from "./artist/artist-album/store/artist-album.reducer";
import { ArtistAlbumState } from "./artist/artist-album/store/artist-album.model";
import { artistAlbumEffects } from "./artist/artist-album/store/artist-album.effects";
import { ArtistSongState } from "./artist/artist-song/store/artist-song.model";
import { artistSongEffects } from "./artist/artist-song/store/artist-song.effects";
import { artistSongReducer } from "./artist/artist-song/store/artist-song.reducer";

const rootReducer = combineReducers({
  artistAlbum: artistAlbumReducer,
  artistSong: artistSongReducer,
  artistProfile: artistProfileReducer,
  artist: artistReducer,
  album: albumReducer,
  playlist: playlistReducer,
  song: songReducer,
  listener: listenerReducer,
  user: userReducer,
  lyrics: lyricsReducer,
  queue: queueReducer,
  songRadio: songRadioReducer,
  songGuesser: songGuesserReducer,
});

function* rootEffects() {
  yield all([
    ...artistAlbumEffects,
    ...artistSongEffects,
    ...artistProfileEffects,
    ...artistEffects,
    ...albumEffects,
    ...playlistEffects,
    ...songEffects,
    ...listenerEffects,
    ...userEffects,
    ...lyricsEffects,
    ...queueEffects,
    ...songRadioEffects,
    ...songGuesserEffects,
  ]);
}

export interface InitialState {
  artistAlbum: ArtistAlbumState,
  artistSong: ArtistSongState,
  artistProfile: ArtistProfileState,
  artist: ArtistState,
  album: AlbumState,
  playlist: PlaylistState,
  song: SongState,
  listener: ListenerState,
  user: UserState,
  lyrics: LyricsState,
  queue: QueueState,
  songRadio: SongRadioState,
  songGuesser: SongGuesserState,
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootEffects);

export default store;