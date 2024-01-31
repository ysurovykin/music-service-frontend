import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const userState = (state: InitialState) => state.user;

const email = createSelector(userState, user => user?.email);
const birthDate = createSelector(userState, user => user?.birthDate);
const country = createSelector(userState, user => user?.country);
const gender = createSelector(userState, user => user?.gender);
const isAuthorizationLoading = createSelector(userState, user => user?.isAuthorizationLoading);
const name = createSelector(userState, user => user?.name);
const role = createSelector(userState, user => user?.role);
const userId = createSelector(userState, user => user?.userId);
const avatar = createSelector(userState, user => user?.avatar);
const profileType = createSelector(userState, user => user?.profileType);

export const userSelectors = {
  email,
  birthDate,
  country,
  gender,
  isAuthorizationLoading,
  name,
  role,
  userId,
  avatar,
  profileType
};