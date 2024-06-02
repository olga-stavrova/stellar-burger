import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
//import { getIngredientsApi } from '../../utils/burger-api';
import { TConstructorIngredient, TOrder } from '../../utils/types';

interface OrderState {
  orderData: TOrder | null;
  orderItems: {
    items: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
  orderRequest: boolean;
}

const initialState: OrderState = {
  orderData: null,
  orderItems: {
    items: [],
    bun: null
  },
  orderRequest: false
};

// Create the order ingredients slice
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
    }
  }
});

// Export the reducer from the slice
//export default ingredientsSlice.reducer;
