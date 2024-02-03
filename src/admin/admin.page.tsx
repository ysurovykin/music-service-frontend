import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../user/store/user.actions";

export function AdminPage() {

  const dispatch = useDispatch();
  const logout = () => dispatch(userActions.logout());

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};