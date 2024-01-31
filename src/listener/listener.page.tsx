import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../user/store/user.actions";
import { SongPlayerComponent } from "./components/song-player.component";

export function ListenerPage() {

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logoutStart());

  return (
    <div>
      <h1>Listener</h1>
      <button onClick={logout}>Logout</button>
      <SongPlayerComponent />
    </div>
  );
};