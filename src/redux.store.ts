import { combineReducers } from "redux";
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { userReducer } from "./user/store/user.reducer";
import { all } from "redux-saga/effects";
import { userEffects } from "./user/store/user.effects";
import { UserState, userInitialState } from "./user/store/user.model";

const rootReducer = combineReducers({
  user: userReducer,
});

function* rootEffects() {
  yield all([
    ...userEffects
  ]);
}

export interface InitialState {
  user: UserState
}

// const initialState: InitialState = {
//   user: userInitialState
// }

const sagaMiddleware = createSagaMiddleware();
const store  = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootEffects);

export default store;