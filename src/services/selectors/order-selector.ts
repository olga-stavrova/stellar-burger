import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';

const selectOrderState = (state: RootState) => state.orderState;
export const selectOrderItems = createSelector(
  [selectOrderState],
  (orderState) => orderState.orderItems
);
