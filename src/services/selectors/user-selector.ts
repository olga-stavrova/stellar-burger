import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';

const selectUserState = (state: RootState) => state.user;

export const selectUserLoading = createSelector(
  [selectUserState],
  (state) => state.isLoading
);
export const selectUserError = createSelector(
  [selectUserState],
  (state) => state.error
);
export const selectUserErrorMessage = createSelector(
  [selectUserState],
  (state) => state.errorMessage
);
export const selectGetUser = createSelector(
  [selectUserState],
  (state) => state.user?.success && state.user.user
);
export const selectIsAuthChecked = createSelector(
  [selectUserState],
  (state) => state.user?.success
);
