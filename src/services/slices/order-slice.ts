import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  TNewOrderResponse,
  TOrderResponse
} from '../../utils/burger-api';
import { TConstructorIngredient, TOrder } from '../../utils/types';

interface OrderState {
  orderData: TOrder | null;
  orderItems: {
    items: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
  orderRequest: boolean;
  userOrders: TOrder[] | null;
  isLoading: boolean;
  orderDetails: TOrder | null;
  isLoadingDetails: boolean;
  errorMessage: string;
}

const initialState: OrderState = {
  orderData: null,
  orderItems: {
    items: [],
    bun: null
  },
  orderRequest: false,
  userOrders: null,
  isLoading: false,
  orderDetails: null,
  isLoadingDetails: false,
  errorMessage: ''
};

export const getUserOrders = createAsyncThunk(
  'orderState/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getOrderByNumber = createAsyncThunk(
  'orderState/getOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addUserOrder = createAsyncThunk(
  'orderState/addUserOrder',
  async (items: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(items);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const orderSlice = createSlice({
  name: 'orderState',
  initialState,
  reducers: {
    addItem(state, action) {
      console.log('addItem', action);
      if (action.payload.type === 'bun') {
        state.orderItems.bun = action.payload;
      } else {
        state.orderItems.items.push(action.payload);
      }
    },
    removeItem(state, action) {
      console.log('removeItem', action);
      const index = state.orderItems.items.findIndex(
        (item) => item._id === action.payload.ingredient._id
      );
      if (index !== -1) {
        state.orderItems.items.splice(index, 1);
      }
    },
    moveItem(state, { payload }: PayloadAction<{ from: number; to: number }>) {
      console.log('moveItem', payload);
      const { from, to } = payload;
      const items = [...state.orderItems.items];
      items.splice(to, 0, items.splice(from, 1)[0]);
      state.orderItems.items = items;
    },
    setBun(state, action) {
      console.log('setBun', action);
      state.orderItems.bun = action.payload;
    },
    resetOrderData(state, action: PayloadAction<TOrder>) {
      console.log('resetOrderData', action);
      //state.userOrders?.push(action.payload);
      //state.orderData && state.userOrders?.push(state.orderData);
      state.orderData = null;
      state.orderItems = initialState.orderItems;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.userOrders = action.payload;
          state.isLoading = false;
          state.errorMessage = '';
          console.log('getUserOrders.fulfilled', state.userOrders);
        }
      )
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
        console.log('getUserOrders.rejected', state.errorMessage);
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoadingDetails = true;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.orderDetails = action.payload.orders[0];
          state.isLoadingDetails = false;
          state.errorMessage = '';
          console.log('getOrderByNumber.fulfilled', state.orderDetails);
          state.isLoading = false;
          state.errorMessage = '';
        }
      )
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.errorMessage = action.payload as string;
        console.log('getOrderByNumber.rejected', state.errorMessage);
      })
      .addCase(addUserOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(
        addUserOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderData = action.payload.order;
          state.userOrders?.push(state.orderData);
          //state.orderItems = initialState.orderItems;
          state.orderRequest = false;
          state.errorMessage = '';
          console.log('addUserOrder.fulfilled', state.orderData);
        }
      )
      .addCase(addUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.errorMessage = action.payload as string;
        console.log('addUserOrder.rejected', state.errorMessage);
      });
  }
});
