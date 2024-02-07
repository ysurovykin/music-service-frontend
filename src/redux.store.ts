import { combineReducers } from "redux";
import {configureStore} from '@reduxjs/toolkit'
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

const rootReducer = combineReducers({
  artist: artistReducer,
  album: albumReducer,
  song: songReducer,
  user: userReducer,
});

function* rootEffects() {
  yield all([
    ...artistEffects,
    ...albumEffects,
    ...songEffects,
    ...userEffects,
  ]);
}

export interface InitialState {
  artist: ArtistState,
  album: AlbumState,
  song: SongState,
  user: UserState,
}

const sagaMiddleware = createSagaMiddleware();
const store  = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootEffects);

export default store;