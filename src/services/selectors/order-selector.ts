import { RootState } from '../../services/store';
import { createSelector } from '@reduxjs/toolkit';

const selectOrderState = (state: RootState) => state.orderState;
export const selectOrderItems = createSelector(
  [selectOrderState],
  (orderState) => orderState.orderItems
);
export const selectOrderData = createSelector(
  [selectOrderState],
  (orderState) => orderState.orderData
);
export const selectUserOrders = createSelector(
  [selectOrderState],
  (orderState) => orderState.userOrders
);
export const selectUserOrdersLoading = createSelector(
  [selectOrderState],
  (userOrdersState) => userOrdersState.isLoading
);
export const selectUserOrderRequest = createSelector(
  [selectOrderState],
  (userOrdersState) => userOrdersState.orderRequest
);
