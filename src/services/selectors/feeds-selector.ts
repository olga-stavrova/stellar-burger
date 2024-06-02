import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';

const selectFeedsState = (state: RootState) => state.feeds;
export const selectFeedsOrders = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.feeds.orders
);
export const selectFeedsTotal = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.feeds.total
);
export const selectFeedsTotalToday = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.feeds.totalToday
);
export const selectFeedsLoading = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.loading
);
export const selectFeedsLoaded = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.loaded
);
export const selectFeedsError = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.error
);
